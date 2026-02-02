import { useState, useEffect, useRef } from "react";
import { MdMyLocation } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { ImLocation } from "react-icons/im";
import { GoPin } from "react-icons/go";
import Footer from "../components/Footer";
import ContactUsBanner from "../components/ContactUsBanner";
import ContactGetInTouchSection from "../components/ContactGetInTouchSection";
// import {contactcall} from "../assets/Photo/contactcal.png";
import { MdEmail } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { signInWithPhoneNumber } from "firebase/auth";
import { createRecaptcha, clearRecaptcha, auth } from "../Firebase/Setup";
// import {contactusBanner} from "../assets/Photo/Contactusbanner.png";
import headsetSupportImage from "../assets/Photo/young woman in headset using laptop and taking notes.png";
import rectangle265Background from "../assets/Photo/Rectangle 265.png";

// Haversine formula to calculate distance between two lat/lng points (in KM)
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in KM
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const LOCATIONS = [
  {
    city: "MURSHIDABAD",
    address: "Govt Colony, Raghunathganj, West Bengal - 742225",
    phone: "+91 9800808595", 

    
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Govt%20Colony%2C%20Raghunathganj%2C%20West%20Bengal%20742225",
    lat: 24.4639,
    lng: 88.0621,
  },
  {
    city: "MURSHIDABAD",
    address:
      "Chatina Kandi, behind Kandi Bus Station, West Bengal - 742138",
    phone: "+91 9800808595",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Chatina%20Kandi%2C%20behind%20Kandi%20Bus%20Station%2C%20West%20Bengal%20742138",
    lat: 23.9659,
    lng: 88.0367,
  },
  {
    city: "MURSHIDABAD",
    address:
      "Shasthitala, Sadikhan's Diyar, Jalangi, West Bengal - 742303",
    phone: "+91 9800808595",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Shasthitala%2C%20Sadikhan%27s%20Diyar%2C%20Jalangi%2C%20West%20Bengal%20742303",
    lat: 24.1192,
    lng: 88.6496,
  },
  {
    city: "MALDA",
    address: "Gajol, Malda, West Bengal - 732124",
    phone: "+91 9800808595",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Gazole%2C%20Maldah%2C%20West%20Bengal%20732124",
    lat: 25.2158916,
    lng: 88.1933032,
  },
  {
    city: "KOLKATA",
    address: "12, B.T. Road, Narendra Nagar, Dunlop, Kolkata - 700056",
    phone: "+91 9800808595",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=12%2C%20B.T.%20Road%2C%20Narendra%20Nagar%2C%20Dunlop%2C%20Kolkata%20700056",
    lat: 22.6564,
    lng: 88.3772,
  },
  {
    city: "SILIGURI",
    address:
      "Baghajatin Colony Main Road, P.S.-Pradhan Nagar, Ward No.-45, Near Laal Building, Dist.-Darjeeling",
    phone: "+91 9800808595",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Baghajatin%20Colony%20Main%20Road%2C%20Pradhan%20Nagar%2C%20Siliguri%2C%20Darjeeling%2C%20West%20Bengal",
    lat: 26.7087372,
    lng: 88.4322092,
  },
  {
    city: "BANGLADESH",
    address: "Rongpur, Bangladesh - 5400",
    phone: "+880 1616-850300",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Rangpur%2C%20Bangladesh%205400",
    lat: 25.760085,
    lng: 89.2673581,
  },
];

const CLINIC_CARD_CLIP_PATH =
  "polygon(0 0, 88% 0, 88% 30%, 100% 50%, 88% 70%, 88% 100%, 0 100%)";

const CLINIC_STRIPES_STYLE = {
  backgroundImage:
    "repeating-linear-gradient(90deg, rgba(244, 63, 94, 0.08) 0px, rgba(244, 63, 94, 0.08) 22px, rgba(244, 63, 94, 0.02) 22px, rgba(244, 63, 94, 0.02) 92px)",
};

const SHOW_CLINIC_STRIPES = false;

const formatCityLabel = (value) => {
  if (!value) return "";
  return value
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function LocateUs({ onNavigate }) {
  const [userLocation, setUserLocation] = useState(null);
  const [nearestLocation, setNearestLocation] = useState(null);
  const [detecting, setDetecting] = useState(false);
  const cardRefs = useRef([]);

  const [formData, setFormData] = useState({
    phone: "",
  });

  console.log("formData",formData);

  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [step, setStep] = useState(1);


  
useEffect(() => {
  // Create reCAPTCHA exactly once when component mounts
  createRecaptcha().catch(console.error);

  // Cleanup on unmount
  return () => {
    clearRecaptcha();
  };
}, []); // ← Empty array = run only once


//   useEffect(() => {
//   // Create reCAPTCHA once when component mounts
//   getRecaptchaVerifier();

//   // Cleanup when component unmounts
//   return () => {
//     clearRecaptcha();
//   };
// }, []); // Empty array = run only once



  // Inside your component, add this useEffect
// useEffect(() => {
//   // Setup Recaptcha ONLY ONCE when component mounts
//   setUpRecaptcha();

//   // Cleanup on unmount (very important!)
//   return () => {
//     if (window.recaptchaVerifier) {
//       window.recaptchaVerifier.clear();
//       window.recaptchaVerifier = undefined;
//     }
//   };
// }, []);



  const handleChange = (e) => {
    //  setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//  const sendOtp = async () => {
//   if (!formData.phone || formData.phone.length !== 10) {
//     alert("Enter valid 10-digit mobile number");
//     return;
//   }
//   setUpRecaptcha();

//   const phoneNumber = "+91" + formData.phone;

//   try {
//     const appVerifier = window.recaptchaVerifier;
//     const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
//     setConfirmationResult(result);
//     setStep(2);
//     alert("OTP Sent!");
//   } catch (error) {
//     console.log(error);
//     alert("Failed to send OTP");
//   }
// };

// const sendOtp = async () => {
//   if (!formData.phone || formData.phone.length !== 10) {
//     alert("Please enter a valid 10-digit mobile number");
//     return;
//   }

//   const phoneNumber = "+91" + formData.phone;

//   try {
//     const appVerifier = window.recaptchaVerifier;
//     if (!appVerifier) {
//       alert("Recaptcha not initialized");
//       return;
//     }

//     const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
//     setConfirmationResult(confirmationResult);
//     setStep(2);
//     alert("OTP sent successfully!");
//   } catch (error) {
//     console.error("OTP Error:", error.code, error.message);

//     // Common user-friendly messages
//     let message = "Failed to send OTP. ";
//     if (error.code === "auth/too-many-requests") {
//       message += "Too many attempts. Try again later.";
//     } else if (error.code === "auth/invalid-phone-number") {
//       message += "Invalid phone number.";
//     } else if (error.code === "auth/missing-client-identifier") {
//       message += "Recaptcha issue. Reload page and try again.";
//     } else {
//       message += "Please try again.";
//     }

//     alert(message);

//     // Reset recaptcha on error
//     if (window.recaptchaVerifier) {
//       window.recaptchaVerifier.render().catch(() => {
//         window.recaptchaVerifier = undefined;
//         setupRecaptcha();
//       });
//     }
//   }
// };


const sendOtp = async () => {
  if (!formData.phone || formData.phone.length !== 10) {
    alert("Please enter a valid 10-digit mobile number");
    return;
  }

  const phoneNumber = "+91" + formData.phone.trim();

  try {
    const appVerifier = window.recaptchaVerifier;

    if (!appVerifier) {
      alert("reCAPTCHA not loaded. Please refresh the page.");
      return;
    }

    // This will trigger invisible reCAPTCHA automatically
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);

    setConfirmationResult(confirmationResult);
    setStep(2);
    alert("OTP sent successfully!");
  } catch (error) {
    console.error("Firebase OTP Error:", error.code, error.message);

    // Reset reCAPTCHA on error (very important!)
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = undefined;
      // getRecaptchaVerifier(); // Recreate for next try
    }

    let msg = "Failed to send OTP. ";
    if (error.code === "auth/too-many-requests") {
      msg += "Too many attempts. Try again later.";
    } else if (error.code === "auth/invalid-phone-number") {
      msg += "Invalid phone number.";
    } else if (error.code === "auth/captcha-check-failed") {
      msg += "Security check failed. Try again.";
    } else {
      msg += "Please try again.";
    }
    alert(msg);
  }
};


 const verifyOtp = async () => {
  if (!otp) {
    alert("Enter OTP");
    return;
  }

  try {
    await confirmationResult.confirm(otp);
    setStep(3);
    alert("Phone Verified Successfully!");
  } catch (error) {
    console.log(error);
    alert("Invalid OTP");
  }
};


  const openMap = (link) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    } else {
      // Fallback for Rongpur - direct search
      window.open(
        `https://www.google.com/maps/search/Save+Medha+Foundation+Rongpur+Bangladesh`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        // Find nearest location
        let minDist = Infinity;
        let nearest = null;

        LOCATIONS.forEach((loc) => {
          const dist = getDistance(latitude, longitude, loc.lat, loc.lng);
          if (dist < minDist) {
            minDist = dist;
            nearest = loc;
          }
        });

        setNearestLocation(nearest);
        setDetecting(false);

        // Scroll to nearest card
        setTimeout(() => {
          const index = LOCATIONS.indexOf(nearest);
          if (cardRefs.current[index]) {
            cardRefs.current[index].scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }, 300);
      },
      (error) => {
        setDetecting(false);
        alert(
          "Unable to retrieve your location. Please allow location access."
        );
        console.error(error);
      },
      { timeout: 10000 }
    );
  };

  useEffect(() => {
    // Optional: Auto-detect on page load (uncomment if you want)
    // detectLocation();
  }, []);

	  return (
    <>
      <Navbar currentPage="locateus" onNavigate={onNavigate} />
      <ContactUsBanner />
      <ContactGetInTouchSection />

		      <section className="relative bg-[#fbf5fc]">
            {SHOW_CLINIC_STRIPES ? (
              <div
                className="absolute inset-0"
                style={CLINIC_STRIPES_STYLE}
                aria-hidden="true"
              />
            ) : null}
		        <div className="relative mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 md:px-20">
	          <div className="mt-10 flex flex-col items-center text-center">
	            <h2 className="text-4xl font-semibold tracking-wide text-[#74C425] sm:text-5xl">
	              CLINIC CENTERS
	            </h2>
            <div className="mt-3 flex items-center gap-2 text-slate-600">
              <ImLocation className="text-[#003399] size-6" />
              <span className="text-sm sm:text-base">
                Find the nearest Save Medha Foundation center
              </span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={detectLocation}
              disabled={detecting}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-base font-bold shadow-lg transition sm:w-auto ${
                detecting
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-[#003399] text-white hover:bg-[#002266]"
              }`}
            >
              <MdMyLocation
                className={detecting ? "animate-pulse" : ""}
                size={20}
              />
              {detecting ? "Detecting your location..." : "Find Nearest Center"}
            </button>
            {userLocation && nearestLocation ? (
              <p className="mt-4 text-[#003399] font-semibold text-base sm:text-lg">
                Nearest Center Highlighted!
              </p>
            ) : null}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-x-0 gap-y-12 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {LOCATIONS.map((loc, index) => {
              const isNearest = nearestLocation === loc;
              const cityLabel = formatCityLabel(loc.city);

              return (
                <div
                  key={`${loc.city}-${loc.address}`}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="relative"
                >
                  {isNearest ? (
                    <div className="absolute -top-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-[#003399] px-6 py-2 text-sm font-bold text-white shadow-lg">
                      Nearest to You!
                    </div>
                  ) : null}

                  <div
                    className={`relative flex h-full min-h-[360px] flex-col bg-[#74C425] px-10 py-7 text-white shadow-[0_14px_30px_rgba(0,0,0,0.15)] ${
                      isNearest
                        ? "ring-4 ring-[#003399]/25 shadow-[0_16px_40px_rgba(0,51,153,0.28)]"
                        : ""
                    }`}
                    style={{ clipPath: CLINIC_CARD_CLIP_PATH }}
                  >
                    <div className="mx-auto w-full max-w-[300px] rounded-sm -translate-x-5 bg-white px-4 py-3 text-center text-2xl font-semibold text-slate-900 shadow-sm">
                      {cityLabel}
                    </div>

                    <div className="mt-6 flex flex-1 flex-col">
                      <p
                        className="text-sm font-medium leading-relaxed text-white/95 sm:text-base line-clamp-4 max-h-[104px] overflow-hidden"
                        title={loc.address}
                      >
                        {loc.address}
                      </p>

                      <p className="mt-6 text-sm font-semibold text-white/95 sm:text-base">
                        Phone: <span className="font-medium">{loc.phone}</span>
                      </p>

                      <div className="mt-auto pt-8">
                        <button
                          type="button"
                          onClick={() => openMap(loc.mapLink)}
                          className="flex w-full items-center justify-center gap-3 rounded-sm -translate-x-5 bg-white px-4 py-3 text-lg font-semibold text-[#003399] shadow-sm transition hover:bg-white/95"
                        >
                          <GoPin className="text-[#E7581F]" size={20} />
                          Location
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Query Form Section */}
          <div
            className="relative bg-cover bg-center rounded-2xl shadow-2xl p-5 sm:p-8 md:p-12 max-w-8xl mx-auto overflow-hidden"
            style={{ backgroundImage: `url(${rectangle265Background})` }}
          >
            {/* Background dimming layer */}
            <div className="absolute inset-0 bg-[#F3FFECCC]/90"></div>

            {/* Content layer */}
            <div className="relative z-10 max-w-7xl mx-auto">
              <h2 className="text-3xl sm:text-[48px] font-normal leading-[100%] tracking-[0] md:text-4xl font-thick text-center text-[#57A30B] mb-2 font-sen">
                #have questions?
              </h2>
              <h2 className="text-center text-[#020202] text-4xl sm:text-[60px] font-mormal leading-[100%] tracking-[0] mb-3 sm:mb-5 font-poppins">
                Fill this Form
              </h2>

              <div className="grid md:grid-cols-[2fr_1fr] gap-6 sm:gap-8 items-start">
                {/* Left: Contact Form */}
                <form className="space-y-6 bg-[#fbf5fc] py-6 sm:py-8 px-4 sm:px-30 rounded-2xl font-sen">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="border-2 border-gray-300 focus:border-green-600 px-2 py-3 outline-none text-gray-700 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="border-2 border-gray-300 focus:border-green-600 px-2 py-3 outline-none text-gray-700 rounded"
                    />
                  </div>

                  {/* Mobile Section */}
                  {/* <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Mobile *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 bg-gray-100 border border-r-0 border-gray-300 rounded-l">
                      India +91
                    </span>
                    <input
                      type="tel"
                      required
                      className="flex-1 border border-gray-300 rounded-r px-4 py-3 outline-none focus:border-green-600"
                    />
                  </div>
                  {step === 1 && <button
                    type="button"
                    className="mt-3 bg-gradient-to-r from-[#59961C] to-[#74C425] hover:shadow-xl text-white font-semibold py-2 px-6 rounded transition transform hover:scale-105"
                  >
                    Verify Mobile
                  </button>
}

                </div> */}
                  {/* Mobile Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Mobile *
                    </label>

                    <div className="flex">
                      <span className="inline-flex items-center px-4 bg-gray-100 border border-r-0 border-gray-300 rounded-l">
                        +91
                      </span>

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength={10}
                        required
                        className="flex-1 border border-gray-300 rounded-r px-4 py-3 outline-none focus:border-green-600"
                        placeholder="Enter mobile number"
                      />
                    </div>

                    {/* OTP Button (Step 1) */}
                    {step === 1 && (
                      <button
                        type="button"
                        onClick={sendOtp}
                        className="mt-3 w-full sm:w-auto bg-gradient-to-r from-[#59961C] to-[#74C425] sm:hover:shadow-xl text-white font-semibold font-poppins py-2 px-6 rounded transition transform sm:hover:scale-105"
                      >
                        Send OTP
                      </button>
                    )}

                    {/* Enter OTP (Step 2) */}
                    {step === 2 && (
                      <div className="mt-3">
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="border border-gray-300 rounded px-4 py-3 w-full outline-none"
                          placeholder="Enter OTP"
                        />

                        <button
                          type="button"
                          onClick={verifyOtp}
                          className="mt-3 w-full sm:w-auto bg-blue-600 text-white font-semibold font-poppins py-2 px-6 rounded sm:hover:bg-blue-700"
                        >
                          Verify OTP
                        </button>
                      </div>
                    )}

                    {/* Success Message */}
                    {step === 3 && (
                      <p className="mt-2 text-green-600 font-semibold">
                        Phone Verified ✔
                      </p>
                    )}

                    {/* hidden div for recaptcha */}
                    <div id="recaptcha-container"></div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:border-green-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Comment or Message
                    </label>
                    <textarea
                      rows={5}
                      className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:border-green-600 resize-none"
                      placeholder="Write your message here..."
                    />
                  </div>

                  <div className="text-left">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-gradient-to-r from-[#59961C] to-[#74C425] sm:hover:shadow-xl text-white font-bold font-poppins text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-12 rounded shadow-lg transition transform sm:hover:scale-105"
                    >
                      Submit
                    </button>
                  </div>
                </form>

                {/* Right */}
                <div className="bg-gradient-to-b from-[#74C425] to-[#385E12] text-white rounded-2xl p-6 sm:p-10 text-center space-y-6 sm:space-y-8 shadow-xl h-full pt-6 sm:pt-10 relative">
                  <img
                    src={headsetSupportImage}
                    alt="Support representative"
                    className="pointer-events-none select-none hidden md:block absolute -top-40 left-30 h-[220px] w-auto object-contain drop-shadow-xl"
                  />
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-3xl sm:text-4xl">
                      <MdEmail />
                    </div>
                    <p className="text-lg sm:text-xl font-semibold font-poppins">
                      Let's Call or Email
                    </p>
                    <p className="text-base sm:text-lg font-normal font-sen">
                      +91 9800808595
                    </p>
                    <p className="text-base sm:text-lg font-normal font-sen">
                      info@savemedha.com
                    </p>
                  </div>

                  <hr className="border-white/30" />

                  <div className="flex flex-col items-center gap-2">
                    <div className="text-3xl sm:text-4xl">
                      <MdPeopleAlt />
                    </div>
                    <p className="text-lg sm:text-xl font-semibold font-poppins">
                      Be Our Creative Team
                    </p>
                    <p className="text-base sm:text-lg font-normal font-sen">
                      +91 9800808595
                    </p>
                    <p className="text-base sm:text-lg font-normal font-sen">
                      info@savemedha.com
                    </p>
                  </div>

                  <hr className="border-white/30" />

                  <div className="flex flex-col items-center gap-2">
                    <div className="bg-white text-green-700 rounded-full p-2 sm:p-3 text-xl sm:text-2xl">
                      <FaLinkedin />
                    </div>
                    <p className="text-lg sm:text-xl font-semibold font-poppins">
                      Let's Talk To Us
                    </p>
                    <p className="text-base sm:text-lg font-normal font-sen">
                      Save Medha Foundation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
