import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import TreatmentPage from "./pages/TreatmentPage";
import Treatmentquestion from "./pages/Treatmentquestion";

import Blogs from "./pages/Blogs";
import Donate from "./pages/Donate";
import ApplyJob from "./pages/ApplyJob";
import { navigate } from "./store";
import LocateUs from "./pages/LocateUs";
import BlogsDetails from "./pages/BlogsDetails";
import EbookPage from "./pages/EbookPage";
import EbookRead from "./pages/EbookRead";
import CareersPage from "./pages/CareersPage";
// demo commit

function App() {
  const dispatch = useDispatch();
  const navigateRouter = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const SCRIPT_ID = "google-translate-script";
    const STASH_ID = "google_translate_stash";
    const ELEMENT_ID = "google_translate_element";

    const ensureTranslateContainers = () => {
      let stash = document.getElementById(STASH_ID);

      if (!stash) {
        stash = document.createElement("div");
        stash.id = STASH_ID;
        stash.setAttribute("aria-hidden", "true");
        stash.className = "notranslate";
        stash.style.position = "absolute";
        stash.style.left = "-9999px";
        stash.style.top = "0";
        stash.style.width = "0";
        stash.style.height = "0";
        stash.style.overflow = "hidden";
        document.body.appendChild(stash);
      }

      if (!document.getElementById(ELEMENT_ID)) {
        const element = document.createElement("div");
        element.id = ELEMENT_ID;
        stash.appendChild(element);
      }
    };

    const initializeGoogleTranslate = () => {
      if (window.__googleTranslateInitialized) return;
      if (!window.google?.translate?.TranslateElement) return;
      if (!document.getElementById(ELEMENT_ID)) return;

      window.__googleTranslateInitialized = true;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,bn,ar",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        ELEMENT_ID
      );
    };

    ensureTranslateContainers();
    window.googleTranslateElementInit = initializeGoogleTranslate;
    initializeGoogleTranslate();

    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(
      'input, textarea, select, option, [contenteditable="true"], [contenteditable=""]'
    );

    elements.forEach((element) => {
      if (element.closest("#google_translate_element")) return;
      if (element.getAttribute("data-gt-no-translate") === "true") return;
      element.setAttribute("translate", "no");
      element.classList.add("notranslate");
      element.setAttribute("data-gt-no-translate", "true");
    });
  }, [location.pathname]);

  useEffect(() => {
    const SELECTOR =
      'input, textarea, select, option, [contenteditable="true"], [contenteditable=""]';

    const markElement = (element) => {
      if (element.closest("#google_translate_element")) return;
      if (element.getAttribute("data-gt-no-translate") === "true") return;
      element.setAttribute("translate", "no");
      element.classList.add("notranslate");
      element.setAttribute("data-gt-no-translate", "true");
    };

    const markTree = (root) => {
      if (!root) return;

      if (root.matches?.(SELECTOR)) {
        markElement(root);
      }

      root.querySelectorAll?.(SELECTOR).forEach(markElement);
    };

    markTree(document.documentElement);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          markTree(node);
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  const handleNavigate = useCallback(
    (pageKey, options = {}) => {
      dispatch(navigate(pageKey, options));

      let targetPath = "/";

      switch (pageKey) {
        case "about":
          targetPath = "/about-us";
          break;
        case "treatment":
          targetPath = "/treatment";
          break;
        case "blogs":
          targetPath = options?.query
            ? `/blogs?q=${encodeURIComponent(options.query)}`
            : "/blogs";
          break;

        //           case "blogs-detail": {
        //   const blogId = options?.id;
        //   console.log("id", blogId);
        //   if (!blogId) {
        //     console.warn("blog-detail navigation requires id");
        //     return;
        //   }
        //   targetPath = `/blogs/${blogId}`;
        //   break;
        // }
        case "blogs-detail": {
          const blogId = options?.id;
          if (!blogId) {
            console.warn("blogs-detail navigation requires id");
            return;
          }
          targetPath = `/blogs/${blogId}`;
          break;
        }
        case "donate":
          targetPath = "/donate";
          break;
        case "ebook":
          targetPath = "/ebook";
          break;
        case "careers":
          targetPath = "/careers";
          break;
        case "contact":
          targetPath = "/contact-us";
          break;
        case "apply":
          targetPath = "/apply";
          break;
        case "treatment-questions":
          targetPath = "/treatment-questions";
          break;
        case "locateus":
          targetPath = "/contact-us";
          break;
        case "cancer-detail":
        case "kidney-detail":
        case "heart-detail":
        case "nerve-detail":
        case "sma-detail":
          targetPath = "/treatment";
          break;

        case "home":
        default:
          targetPath = "/";
      }

      navigateRouter(targetPath, { state: options, replace: options?.replace });
    },
    [
      dispatch,
      navigateRouter
    ]
  );

  return (
    <div className="app-scale-wrapper">
      <Routes>
        <Route path="/" element={<Home onNavigate={handleNavigate} />} />
        <Route
          path="/about-us"
          element={<AboutUs onNavigate={handleNavigate} />}
        />
        <Route
          path="/treatment"
          element={<TreatmentPage onNavigate={handleNavigate} />}
        />
        <Route
          path="/treatment-questions"
          element={<Treatmentquestion onNavigate={handleNavigate} />}
        />
        <Route path="/blogs" element={<Blogs onNavigate={handleNavigate} />} />
        <Route
          path="/blogs/:id"
          element={<BlogsDetails onNavigate={handleNavigate}/>}
        />
        <Route
          path="/donate"
          element={<Donate onNavigate={handleNavigate} />}
        />
        <Route
          path="/ebook"
          element={<EbookPage onNavigate={handleNavigate} />}
        />
        <Route
          path="/ebook/read/:slug"
          element={<EbookRead onNavigate={handleNavigate} />}
        />
        <Route
          path="/careers"
          element={<CareersPage onNavigate={handleNavigate} />}
        />
        <Route
          path="/apply"
          element={<ApplyJob onNavigate={handleNavigate} />}
        />
        <Route
          path="/contact"
          element={<Navigate to="/contact-us" replace />}
        />
        <Route
          path="/contact-us"
          element={<LocateUs onNavigate={handleNavigate} />}
        />
        <Route path="/locate-us" element={<Navigate to="/contact-us" replace />} />
        <Route path="*" element={<Home onNavigate={handleNavigate} />} />
      </Routes>
    </div>
  );
}

export default App;
