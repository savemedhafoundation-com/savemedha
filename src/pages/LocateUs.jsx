import { useEffect, useRef, useState } from "react";
import { signInWithPhoneNumber } from "firebase/auth";
import { Seo } from "../components/Seo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactGetInTouchSection from "../components/ContactGetInTouchSection";
import ContactPageLayout from "../components/ContactPageLayout";
import modernSupportAgentImage from "../assets/Photo/modern-support-agent.png";
import { createRecaptcha, clearRecaptcha, auth } from "../Firebase/Setup";

const LOCATIONS = [
  {
    city: "MURSHIDABAD",
    address: "Govt Colony, Raghunathganj, West Bengal - 742225",
    phone: "+91 9800808595",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Govt%20Colony%2C%20Raghunathganj%2C%20West%20Bengal%20742225",
    lat: 24.4639,
    lng: 88.0621,
  },
  {
    city: "MURSHIDABAD",
    address: "Chatina Kandi, behind Kandi Bus Station, West Bengal - 742138",
    phone: "+91 9800808595",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Chatina%20Kandi%2C%20behind%20Kandi%20Bus%20Station%2C%20West%20Bengal%20742138",
    lat: 23.9659,
    lng: 88.0367,
  },
  {
    city: "MURSHIDABAD",
    address: "Shasthitala, Sadikhan's Diyar, Jalangi, West Bengal - 742303",
    phone: "+91 9800808595",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Shasthitala%2C%20Sadikhan%27s%20Diyar%2C%20Jalangi%2C%20West%20Bengal%20742303",
    lat: 24.1192,
    lng: 88.6496,
  },
  {
    city: "MALDA",
    address: "Gajol, Malda, West Bengal - 732124",
    phone: "+91 9800808595",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Gazole%2C%20Maldah%2C%20West%20Bengal%20732124",
    lat: 25.2158916,
    lng: 88.1933032,
  },
  {
    city: "KOLKATA",
    address: "12, B.T. Road, Narendra Nagar, Dunlop, Kolkata - 700056",
    phone: "+91 9800808595",
    mapLink: "https://www.google.com/maps/search/?api=1&query=12%2C%20B.T.%20Road%2C%20Narendra%20Nagar%2C%20Dunlop%2C%20Kolkata%20700056",
    lat: 22.6564,
    lng: 88.3772,
  },
  {
    city: "MUMBAI",
    address: "301, Rangoli Time Complex (3rd Floor), Dr Babasaheb Ambedkar Marg, Parel, Mumbai - 400012",
    phone: "+91 9800808595",
    mapLink: "https://www.google.com/maps/search/?api=1&query=301%2C%20Rangoli%20Time%20Complex%20%283rd%20Floor%29%2C%20Dr%20Babasaheb%20Ambedkar%20Marg%2C%20Parel%2C%20Mumbai%20400012",
    lat: 19.0054,
    lng: 72.8424,
  },
  {
    city: "SILIGURI",
    address: "Baghajatin Colony Main Road, P.S.-Pradhan Nagar, Ward No.-45, Near Laal Building, Dist.-Darjeeling",
    phone: "+91 9800808595",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Baghajatin%20Colony%20Main%20Road%2C%20Pradhan%20Nagar%2C%20Siliguri%2C%20Darjeeling%2C%20West%20Bengal",
    lat: 26.7087372,
    lng: 88.4322092,
  },
  {
    city: "BANGLADESH",
    address: "Rongpur, Bangladesh - 5400",
    phone: "+880 1616-850300",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Rangpur%2C%20Bangladesh%205400",
    lat: 25.760085,
    lng: 89.2673581,
  },
];

const CLINIC_NAMES = [
  "Raghunathganj Clinic",
  "Chatina Kandi",
  "Jalangi Centre",
  "Gajol Centre",
  "Dunlop Centre",
  "Mumbai Clinic",
  "Siliguri Clinic",
  "Bangladesh Clinic",
];

const getDistance = (lat1, lon1, lat2, lon2) => {
  const radius = 6371;
  const latitudeDelta = (lat2 - lat1) * (Math.PI / 180);
  const longitudeDelta = (lon2 - lon1) * (Math.PI / 180);
  const calculation =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(longitudeDelta / 2) ** 2;

  return radius * 2 * Math.atan2(Math.sqrt(calculation), Math.sqrt(1 - calculation));
};

export default function LocateUs({ onNavigate }) {
  const [userLocation, setUserLocation] = useState(null);
  const [nearestLocation, setNearestLocation] = useState(null);
  const [detecting, setDetecting] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [step, setStep] = useState(1);
  const cardRefs = useRef([]);

  useEffect(() => {
    createRecaptcha().catch(console.error);
    return () => clearRecaptcha();
  }, []);

  const sendOtp = async () => {
    if (!/^\d{10}$/.test(phone.trim())) {
      window.alert("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      if (!window.recaptchaVerifier) {
        window.alert("reCAPTCHA not loaded. Please refresh the page.");
        return;
      }
      const result = await signInWithPhoneNumber(auth, `+91${phone.trim()}`, window.recaptchaVerifier);
      setConfirmationResult(result);
      setStep(2);
      window.alert("OTP sent successfully!");
    } catch (error) {
      console.error("Firebase OTP Error:", error);
      clearRecaptcha();
      createRecaptcha().catch(console.error);
      window.alert(error?.code === "auth/too-many-requests" ? "Too many attempts. Try again later." : "Failed to send OTP. Please try again.");
    }
  };

  const verifyOtp = async () => {
    if (!confirmationResult || !otp.trim()) {
      window.alert("Enter the OTP sent to your phone");
      return;
    }
    try {
      await confirmationResult.confirm(otp.trim());
      setStep(3);
      window.alert("Phone verified successfully!");
    } catch (error) {
      console.error("OTP verification error:", error);
      window.alert("Invalid OTP");
    }
  };

  const openMap = (link) => window.open(link, "_blank", "noopener,noreferrer");

  const detectLocation = () => {
    if (!navigator.geolocation) {
      window.alert("Geolocation is not supported by your browser");
      return;
    }

    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const currentLocation = { lat: coords.latitude, lng: coords.longitude };
        const nearest = LOCATIONS.reduce((closest, location) => {
          const distance = getDistance(currentLocation.lat, currentLocation.lng, location.lat, location.lng);
          return !closest || distance < closest.distance ? { location, distance } : closest;
        }, null)?.location;

        setUserLocation(currentLocation);
        setNearestLocation(nearest);
        setDetecting(false);
        window.setTimeout(() => {
          const index = LOCATIONS.indexOf(nearest);
          cardRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setDetecting(false);
        window.alert("Unable to retrieve your location. Please allow location access.");
      },
      { timeout: 10000 }
    );
  };

  return (
    <>
      <Seo title="Contact Us" description="Get in touch with Save Medha Foundation. Find our location, phone, and email for inquiries about Natural Immunotherapy treatment." path="/contact-us" />
      <Navbar currentPage="locateus" onNavigate={onNavigate} />
      <main>
        <ContactGetInTouchSection />
        <ContactPageLayout
          locations={LOCATIONS}
          clinicNames={CLINIC_NAMES}
          nearestLocation={nearestLocation}
          userLocation={userLocation}
          detecting={detecting}
          detectLocation={detectLocation}
          openMap={openMap}
          cardRefs={cardRefs}
          phone={phone}
          onPhoneChange={(event) => setPhone(event.target.value.replace(/\D/g, ""))}
          otp={otp}
          onOtpChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
          step={step}
          sendOtp={sendOtp}
          verifyOtp={verifyOtp}
          supportImage={modernSupportAgentImage}
        />
      </main>
      <Footer onNavigate={onNavigate} />
    </>
  );
}
