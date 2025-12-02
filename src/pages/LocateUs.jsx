// import { useState, useEffect, useRef } from "react";
// import { MdLocationPin, MdPhone, MdMyLocation } from "react-icons/md";
// import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
// import Navbar from "../components/Navbar";
// import { ImLocation } from "react-icons/im";
// import { GoPin } from "react-icons/go";
// import Footer from "../components/Footer";
// import {contactcall} from "../assets/photo/contactcall.png";
// import { MdEmail } from "react-icons/md";
// import { MdPeopleAlt } from "react-icons/md";
// import { FaLinkedin } from "react-icons/fa";
// import { signInWithPhoneNumber } from "firebase/auth";
// import { createRecaptcha, clearRecaptcha, auth } from "../Firebase/Setup";
// import {contactusBanner} from "../assets/Photo/Contactusbanner.png";

// // Haversine formula to calculate distance between two lat/lng points (in KM)
// const getDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371; // Earth's radius in KM
//   const dLat = (lat2 - lat1) * (Math.PI / 180);
//   const dLon = (lon2 - lon1) * (Math.PI / 180);
//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(lat1 * (Math.PI / 180)) *
//       Math.cos(lat2 * (Math.PI / 180)) *
//       Math.sin(dLon / 2) ** 2;
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// };

// const LOCATIONS = [
//   {
//     city: "MURSHIDABAD",
//     address: "Govt Colony, Raghunathganj, West Bengal - 742225",
//     phone: "+91-9800808595",
//     mapLink:
//       "https://www.google.com/maps/place/SAVE+MEDHA+FOUNDATION/@24.4638945,88.0617446,21z/data=!4m6!3m5!1s0x39fa37b3ddfe5de3:0xa89ed48bed496e9c!8m2!3d24.4639024!4d88.0621392!16s%2Fg%2F11pldtpkhx?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D",
//     lat: 24.4639,
//     lng: 88.0621,
//   },
//   {
//     city: "MURSHIDABAD",
//     address: "Chatina Kandi, behind Kandi Bus Station, Murshidabad - 742138",
//     phone: "+91-9800808595",
//     mapLink:
//       "https://www.google.com/maps/place/SAVE+MEDHA+FOUNDATION+(Kandi)/@23.9659375,88.0366875,19z/data=!3m1!4b1!4m6!3m5!1s0x39f98500654daeb3:0x58de039a2d6f8d8f!8m2!3d23.9659375!4d88.0366875!16s%2Fg%2F11y3sjt7_0?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D",
//     lat: 23.9659,
//     lng: 88.0367,
//   },
//   {
//     city: "MURSHIDABAD",
//     address: "Shashtitala, Sadikhan's Diyar, Jalangi, Murshidabad - 742303",
//     phone: "+91-9800808595",
//     mapLink:
//       "https://www.google.com/maps/place/Save+Medha+Foundation,+Jalangi+Murshidabad/@24.1192108,88.6489302,19z/data=!3m1!4b1!4m6!3m5!1s0x39f957001b2532a7:0xe51ce0dcd5837374!8m2!3d24.1192108!4d88.6495753!16s%2Fg%2F11wn18hn54?entry=tts&g_ep=EgoyMDI1MDEwOC4wIPu8ASoASAFQAw%3D%3D",
//     lat: 24.1192,
//     lng: 88.6496,
//   },
//   {
//     city: "BANGLADESH",
//     address: "Rongpur, Bangladesh - 5400",
//     phone: "+880 1616-850300",
//     mapLink: "",
//     lat: 25.7449,
//     lng: 89.2752,
//   },
//   {
//     city: "KOLKATA",
//     address: "12, B. T. Road, Narendra Nagar, Dunlop, Kolkata - 700056",
//     phone: "+91-9800808595",
//     mapLink:
//       "https://www.google.com/maps/place/SAVE+MEDHA+FOUNDATION/@22.6565535,88.3768677,20z/data=!4m6!3m5!1s0x39f89d000952858d:0x6a6a8a1fea1a20cc!8m2!3d22.6564235!4d88.3772227!16s%2Fg%2F11vyh_tw_r?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D",
//     lat: 22.6564,
//     lng: 88.3772,
//   },
//   {
//     city: "KOLKATA",
//     address: "Amadighi, Phulbari, Siliguri, West Bengal - 735210",
//     phone: "+91-9800808595",
//     mapLink:
//       "https://www.google.com/maps/place/Save+Medha+Foundation,+Fulbari/@26.3645737,88.0784624,10z/data=!4m6!3m5!1s0x39e44300776c4c55:0x2e0e3d31f99341a5!8m2!3d26.6455949!4d88.4169501!16s%2Fg%2F11w3rwk99w?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D",
//     lat: 26.6456,
//     lng: 88.417,
//   },
//   {
//     city: "MUMBAI",
//     address:
//       "Pathik Guest House, Acharya Donde Marg, behind Tata Memorial Center, Mumbai - 400012",
//     phone: "+91-9800808595",
//     mapLink:
//       "https://www.google.com/maps/place/SAVE+MEDHA+FOUNDATION/@18.9364496,72.8061688,14z/data=!4m6!3m5!1s0x3be7d19f1391824d:0x37b77663608d6140!8m2!3d18.9364508!4d72.8364176!16s%2Fg%2F11wx5p4z0s?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D",
//     lat: 18.9365,
//     lng: 72.8364,
//   },
// ];

// export default function LocateUs({ onNavigate }) {
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearestLocation, setNearestLocation] = useState(null);
//   const [detecting, setDetecting] = useState(false);
//   const cardRefs = useRef([]);

//   const [formData, setFormData] = useState({
//     phone: "",
//   });

//   console.log("formData",formData);

//   const [otp, setOtp] = useState("");
//   const [confirmationResult, setConfirmationResult] = useState(null);
//   const [step, setStep] = useState(1);


  
// useEffect(() => {
//   // Create reCAPTCHA exactly once when component mounts
//   createRecaptcha().catch(console.error);

//   // Cleanup on unmount
//   return () => {
//     clearRecaptcha();
//   };
// }, []); // ← Empty array = run only once


// //   useEffect(() => {
// //   // Create reCAPTCHA once when component mounts
// //   getRecaptchaVerifier();

// //   // Cleanup when component unmounts
// //   return () => {
// //     clearRecaptcha();
// //   };
// // }, []); // Empty array = run only once



//   // Inside your component, add this useEffect
// // useEffect(() => {
// //   // Setup Recaptcha ONLY ONCE when component mounts
// //   setUpRecaptcha();

// //   // Cleanup on unmount (very important!)
// //   return () => {
// //     if (window.recaptchaVerifier) {
// //       window.recaptchaVerifier.clear();
// //       window.recaptchaVerifier = undefined;
// //     }
// //   };
// // }, []);



//   const handleChange = (e) => {
//     //  setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

// //  const sendOtp = async () => {
// //   if (!formData.phone || formData.phone.length !== 10) {
// //     alert("Enter valid 10-digit mobile number");
// //     return;
// //   }
// //   setUpRecaptcha();

// //   const phoneNumber = "+91" + formData.phone;

// //   try {
// //     const appVerifier = window.recaptchaVerifier;
// //     const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
// //     setConfirmationResult(result);
// //     setStep(2);
// //     alert("OTP Sent!");
// //   } catch (error) {
// //     console.log(error);
// //     alert("Failed to send OTP");
// //   }
// // };

// // const sendOtp = async () => {
// //   if (!formData.phone || formData.phone.length !== 10) {
// //     alert("Please enter a valid 10-digit mobile number");
// //     return;
// //   }

// //   const phoneNumber = "+91" + formData.phone;

// //   try {
// //     const appVerifier = window.recaptchaVerifier;
// //     if (!appVerifier) {
// //       alert("Recaptcha not initialized");
// //       return;
// //     }

// //     const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
// //     setConfirmationResult(confirmationResult);
// //     setStep(2);
// //     alert("OTP sent successfully!");
// //   } catch (error) {
// //     console.error("OTP Error:", error.code, error.message);

// //     // Common user-friendly messages
// //     let message = "Failed to send OTP. ";
// //     if (error.code === "auth/too-many-requests") {
// //       message += "Too many attempts. Try again later.";
// //     } else if (error.code === "auth/invalid-phone-number") {
// //       message += "Invalid phone number.";
// //     } else if (error.code === "auth/missing-client-identifier") {
// //       message += "Recaptcha issue. Reload page and try again.";
// //     } else {
// //       message += "Please try again.";
// //     }

// //     alert(message);

// //     // Reset recaptcha on error
// //     if (window.recaptchaVerifier) {
// //       window.recaptchaVerifier.render().catch(() => {
// //         window.recaptchaVerifier = undefined;
// //         setupRecaptcha();
// //       });
// //     }
// //   }
// // };


// const sendOtp = async () => {
//   if (!formData.phone || formData.phone.length !== 10) {
//     alert("Please enter a valid 10-digit mobile number");
//     return;
//   }

//   const phoneNumber = "+91" + formData.phone.trim();

//   try {
//     const appVerifier = window.recaptchaVerifier;

//     if (!appVerifier) {
//       alert("reCAPTCHA not loaded. Please refresh the page.");
//       return;
//     }

//     // This will trigger invisible reCAPTCHA automatically
//     const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);

//     setConfirmationResult(confirmationResult);
//     setStep(2);
//     alert("OTP sent successfully!");
//   } catch (error) {
//     console.error("Firebase OTP Error:", error.code, error.message);

//     // Reset reCAPTCHA on error (very important!)
//     if (window.recaptchaVerifier) {
//       window.recaptchaVerifier.clear();
//       window.recaptchaVerifier = undefined;
//       // getRecaptchaVerifier(); // Recreate for next try
//     }

//     let msg = "Failed to send OTP. ";
//     if (error.code === "auth/too-many-requests") {
//       msg += "Too many attempts. Try again later.";
//     } else if (error.code === "auth/invalid-phone-number") {
//       msg += "Invalid phone number.";
//     } else if (error.code === "auth/captcha-check-failed") {
//       msg += "Security check failed. Try again.";
//     } else {
//       msg += "Please try again.";
//     }
//     alert(msg);
//   }
// };


//  const verifyOtp = async () => {
//   if (!otp) {
//     alert("Enter OTP");
//     return;
//   }

//   try {
//     await confirmationResult.confirm(otp);
//     setStep(3);
//     alert("Phone Verified Successfully!");
//   } catch (error) {
//     console.log(error);
//     alert("Invalid OTP");
//   }
// };


//   const openMap = (link) => {
//     if (link) {
//       window.open(link, "_blank", "noopener,noreferrer");
//     } else {
//       // Fallback for Rongpur - direct search
//       window.open(
//         `https://www.google.com/maps/search/Save+Medha+Foundation+Rongpur+Bangladesh`,
//         "_blank",
//         "noopener,noreferrer"
//       );
//     }
//   };

//   const detectLocation = () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported by your browser");
//       return;
//     }

//     setDetecting(true);
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation({ lat: latitude, lng: longitude });

//         // Find nearest location
//         let minDist = Infinity;
//         let nearest = null;

//         LOCATIONS.forEach((loc) => {
//           const dist = getDistance(latitude, longitude, loc.lat, loc.lng);
//           if (dist < minDist) {
//             minDist = dist;
//             nearest = loc;
//           }
//         });

//         setNearestLocation(nearest);
//         setDetecting(false);

//         // Scroll to nearest card
//         setTimeout(() => {
//           const index = LOCATIONS.indexOf(nearest);
//           if (cardRefs.current[index]) {
//             cardRefs.current[index].scrollIntoView({
//               behavior: "smooth",
//               block: "center",
//             });
//           }
//         }, 300);
//       },
//       (error) => {
//         setDetecting(false);
//         alert(
//           "Unable to retrieve your location. Please allow location access."
//         );
//         console.error(error);
//       },
//       { timeout: 10000 }
//     );
//   };

//   useEffect(() => {
//     // Optional: Auto-detect on page load (uncomment if you want)
//     // detectLocation();
//   }, []);

//   return (
//     <>
//       <Navbar currentPage="locateus" onNavigate={onNavigate} />
//       <img
//         src={contactusBanner}
//         alt="Locate Us Banner"
//         className="w-full h-[400px] object-cover"
//       />

//       <div className="min-h-screen bg-gray-50 py-12 px-4">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12 relative">
//             <div className="flex justify-center items-center gap-2">
//               <span>Address</span>
//               <span>
//                 <ImLocation className="text-[#003399] size-9" />
//               </span>
//             </div>
//             <div className="absolute bottom-[-10px] left-[41%] w-20 h-1 bg-[#74C425]"></div>
//           </h1>

//           {/* Detect Location Button */}
//           <div className="text-center mb-10">
//             <button
//               onClick={detectLocation}
//               disabled={detecting}
//               className={`inline-flex items-center gap-2 px-5 py-4 rounded-md text-[14px] text-white font-bold text-lg shadow-lg transition-all ${
//                 detecting
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-[#003399] hover:bg-[#002266] hover:scale-100"
//               }`}
//             >
//               <MdMyLocation
//                 className={detecting ? "animate-pulse" : ""}
//                 size={20}
//               />
//               {detecting ? "Detecting your location..." : "Find Nearest Center"}
//             </button>
//             {userLocation && nearestLocation && (
//               <p className="mt-4 text-green-700 font-semibold text-lg">
//                 Nearest Center Highlighted !
//                 {/* ({getDistance(userLocation.lat, userLocation.lng, nearestLocation.lat, nearestLocation.lng).toFixed(1)} km away) */}
//               </p>
//             )}
//           </div>

//           {/* Address Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
//             {LOCATIONS.map((loc, index) => {
//               const isNearest = nearestLocation === loc;

//               return (
//                 <div
//                   key={index}
//                   ref={(el) => (cardRefs.current[index] = el)}
//                   className={`relative bg-white rounded-lg shadow-lg p-6 border-2 transition-all duration-500 ${
//                     isNearest
//                       ? "border-[#003399] ring-4 ring-[#003399] ring-opacity-30 scale-105 shadow-2xl"
//                       : "border-gray-200 hover:shadow-xl"
//                   }`}
//                 >
//                   {isNearest && (
//                     <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#003399] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
//                       Nearest to You !
//                     </div>
//                   )}

//                   <h3 className="text-xl font-bold text-green-700 mb-3">
//                     {loc.city}
//                   </h3>
//                   <p className="text-gray-700 text-sm leading-relaxed mb-4 min-h-[60px] max-h-[60px]">
//                     {loc.address}
//                   </p>
//                   <div className="flex items-center gap-2 text-gray-800 mb-4">
//                     <MdPhone className="text-green-600" />
//                     <span className="text-sm font-medium">{loc.phone}</span>
//                   </div>
//                   <button
//                     onClick={() => openMap(loc.mapLink)}
//                     className="w-full flex items-center justify-center gap-2 bg-[#74C425] hover:bg-[#003399] text-white font-semibold py-2 px-4 rounded transition rounded"
//                   >
//                     Location
//                     <GoPin
//                       className="text-lg font-bold"
//                       color="#E7581F"
//                       size={20}
//                     />
//                   </button>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Query Form Section */}
//           <div
//             className="bg-cover rounded-2xl shadow-2xl p-8 md:p-12 max-w-8xl mx-auto bg-cover bg-center relative"
//           >
//             <div className="absolute rounded-2xl"></div>
//             <div className="relative z-10 max-w-7xl mx-auto">
//               <h2 className="text-[48px] font-normal  leading-[100%] tracking-[0] md:text-4xl font-thick text-center text-[#57A30B] mb-2">
//                 #have questions?
//               </h2>
//               <h2 className="text-center text-[#020202] text-[60px] font-mormal leading-[100%] tracking-[0] mb-5">
//                 Fill this Form
//               </h2>

//               <div className="grid md:grid-cols-[2fr_1fr] gap-8 items-start">
//                 {/* Left: Contact Form */}
//                 <form className="space-y-6 bg-[#fbf5fc] py-8 px-30 rounded-2xl">
//                   <div className="grid grid-cols-2 gap-4">
//                     <input
//                       type="text"
//                       placeholder="First Name"
//                       className="border-2 border-gray-300 focus:border-green-600 px-2 py-3 outline-none text-gray-700 rounded"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Last Name"
//                       className="border-2 border-gray-300 focus:border-green-600 px-2 py-3 outline-none text-gray-700 rounded"
//                     />
//                   </div>

//                   {/* Mobile Section */}
//                   {/* <div>
//                   <label className="block text-sm font-medium text-gray-600 mb-1">
//                     Mobile *
//                   </label>
//                   <div className="flex">
//                     <span className="inline-flex items-center px-4 bg-gray-100 border border-r-0 border-gray-300 rounded-l">
//                       India +91
//                     </span>
//                     <input
//                       type="tel"
//                       required
//                       className="flex-1 border border-gray-300 rounded-r px-4 py-3 outline-none focus:border-green-600"
//                     />
//                   </div>
//                   {step === 1 && <button
//                     type="button"
//                     className="mt-3 bg-gradient-to-r from-[#59961C] to-[#74C425] hover:shadow-xl text-white font-semibold py-2 px-6 rounded transition transform hover:scale-105"
//                   >
//                     Verify Mobile
//                   </button>
// }

//                 </div> */}
//                   {/* Mobile Section */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-600 mb-1">
//                       Mobile *
//                     </label>

//                     <div className="flex">
//                       <span className="inline-flex items-center px-4 bg-gray-100 border border-r-0 border-gray-300 rounded-l">
//                         +91
//                       </span>

//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         maxLength={10}
//                         required
//                         className="flex-1 border border-gray-300 rounded-r px-4 py-3 outline-none focus:border-green-600"
//                         placeholder="Enter mobile number"
//                       />
//                     </div>

//                     {/* OTP Button (Step 1) */}
//                     {step === 1 && (
//                       <button
//                         type="button"
//                         onClick={sendOtp}
//                         className="mt-3 bg-gradient-to-r from-[#59961C] to-[#74C425] hover:shadow-xl text-white font-semibold py-2 px-6 rounded transition transform hover:scale-105"
//                       >
//                         Send OTP
//                       </button>
//                     )}

//                     {/* Enter OTP (Step 2) */}
//                     {step === 2 && (
//                       <div className="mt-3">
//                         <input
//                           type="text"
//                           value={otp}
//                           onChange={(e) => setOtp(e.target.value)}
//                           className="border border-gray-300 rounded px-4 py-3 w-full outline-none"
//                           placeholder="Enter OTP"
//                         />

//                         <button
//                           type="button"
//                           onClick={verifyOtp}
//                           className="mt-3 bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700"
//                         >
//                           Verify OTP
//                         </button>
//                       </div>
//                     )}

//                     {/* Success Message */}
//                     {step === 3 && (
//                       <p className="mt-2 text-green-600 font-semibold">
//                         Phone Verified ✔
//                       </p>
//                     )}

//                     {/* hidden div for recaptcha */}
//                     <div id="recaptcha-container"></div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-600 mb-1">
//                       Email *
//                     </label>
//                     <input
//                       type="email"
//                       required
//                       placeholder="Enter your email"
//                       className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:border-green-600"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-600 mb-1">
//                       Comment or Message
//                     </label>
//                     <textarea
//                       rows={5}
//                       className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:border-green-600 resize-none"
//                       placeholder="Write your message here..."
//                     />
//                   </div>

//                   <div className="text-left">
//                     <button
//                       type="submit"
//                       className="bg-gradient-to-r from-[#59961C] to-[#74C425] hover:shadow-xl text-white font-bold text-lg py-4 px-12 rounded shadow-lg transition transform hover:scale-105"
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </form>

//                 {/* Right */}
//                 <div className="bg-gradient-to-b from-[#74C425] to-[#385E12] text-white rounded-2xl p-10 text-center space-y-8 shadow-xl h-full pt-10 relative">
//                   <img
//                     src={contactcall}
//                     alt="Contact"
//                     className="absolute h-[180px] w-[200px] top-[-150px] right-[70px]"
//                   ></img>
//                   <div className="flex flex-col items-center gap-2">
//                     <div className="text-4xl">
//                       <MdEmail />
//                     </div>
//                     <p className="text-xl font-semibold">Let’s Call or Email</p>
//                     <p className="text-lg font-normal">+91 9800808595</p>
//                     <p className="text-lg font-normal">
//                       savemedhafoundation@gmail.com
//                     </p>
//                   </div>

//                   <hr className="border-white/30" />

//                   <div className="flex flex-col items-center gap-2">
//                     <div className="text-4xl">
//                       <MdPeopleAlt />
//                     </div>
//                     <p className="text-xl font-semibold">
//                       Be Our Creative Team
//                     </p>
//                     <p className="text-lg font-normal">+91 9800808595</p>
//                     <p className="text-lg font-normal">
//                       savemedhafoundation@gmail.com
//                     </p>
//                   </div>

//                   <hr className="border-white/30" />

//                   <div className="flex flex-col items-center gap-2">
//                     <div className="bg-white text-green-700 rounded-full p-3 text-2xl">
//                       <FaLinkedin />
//                     </div>
//                     <p className="text-xl font-semibold">Let’s Talk To Us</p>
//                     <p className="text-lg font-normal">Save Medha Foundation</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }
