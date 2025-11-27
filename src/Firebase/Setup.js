
// import { initializeApp } from "firebase/app";
// import { getAuth, RecaptchaVerifier } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDrC8G1XHMaOAAAiuRoIqmCBFOlbee646M",
//   authDomain: "save-medha.firebaseapp.com",
//   projectId: "save-medha",
//   storageBucket: "save-medha.firebasestorage.app",
//   messagingSenderId: "915723757008",
//   appId: "1:915723757008:web:3248007be9a1d7ee1085d5"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

// // Initialize captcha
// export const setupRecaptcha = () => {
//   if (!window.recaptchaVerifier) {
//     window.recaptchaVerifier = new RecaptchaVerifier(
//       auth,
//       "recaptcha-container",
//       {
//         size: "invisible",
//         callback: () => {
//           // Optional: OTP sent successfully
//         },
//         "expired-callback": () => {
//           // Optional
//         },
//       }
//     );
//     window.recaptchaVerifier.render(); // Important!
//   }
//   return window.recaptchaVerifier;
// };


//2nd copy
// Firebase/Setup.js
// import { initializeApp } from "firebase/app";
// import { getAuth, RecaptchaVerifier } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDrC8G1XHMaOAAAiuRoIqmCBFOlbee646M",
//   authDomain: "save-medha.firebaseapp.com",
//   projectId: "save-medha",
//   storageBucket: "save-medha.firebasestorage.app",
//   messagingSenderId: "915723757008",
//   appId: "1:915723757008:web:3248007be9a1d7ee1085d5"
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

// window.recaptchaVerifier = null;
// window.recaptchaWidgetId = null;

// // Create reCAPTCHA only once and reuse it
// export const getRecaptchaVerifier = () => {
//   if (!window.recaptchaVerifier) {
//     window.recaptchaVerifier = new RecaptchaVerifier(
//       auth,
//       "recaptcha-container",
//       {
//         size: "invisible",
//         callback: () => {
//           // Optional: OTP sent
//         },
//         "expired-callback": () => {
//           // Optional
//         },
//       }
//     );
//     // Important: render it once
//     window.recaptchaVerifier.render();
//   }
//   return window.recaptchaVerifier;
// };

// // Optional: clear on page unload (prevents leaks)
// export const clearRecaptcha = () => {
//   if (window.recaptchaVerifier) {
//     window.recaptchaVerifier.clear();
//     window.recaptchaVerifier = undefined;
//   }
// };

// Firebase/Setup.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrC8G1XHMaOAAAiuRoIqmCBFOlbee646M",
  authDomain: "save-medha.firebaseapp.com",
  projectId: "save-medha",
  storageBucket: "save-medha.firebasestorage.app",
  messagingSenderId: "915723757008",
  appId: "1:915723757008:web:3248007be9a1d7ee1085d5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Global singleton — created ONLY ONCE
window.recaptchaVerifier = null;
window.recaptchaWidgetId = null;

export const createRecaptcha = () => {
  // Destroy previous one if exists
  if (window.recaptchaVerifier) {
    window.recaptchaVerifier.clear();
    window.recaptchaVerifier = null;
  }

  window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {
      size: "invisible",
      callback: () => {
        // OTP sent
      },
      "expired-callback": () => {
        // Reset if expired
      },
    }
  );

  // This is the key: render() returns a promise with widget ID
  return window.recaptchaVerifier.render().then((widgetId) => {
    window.recaptchaWidgetId = widgetId;
  });
};

export const getRecaptchaVerifier = () => window.recaptchaVerifier;

export const clearRecaptcha = () => {
  if (window.recaptchaVerifier) {
    window.recaptchaVerifier.clear();
    window.recaptchaVerifier = null;
    window.recaptchaWidgetId = null;
  }
};