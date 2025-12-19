import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import TreatmentPage from "./pages/TreatmentPage";
import Treatmentquestion from "./pages/Treatmentquestion";

import Blogs from "./pages/Blogs";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";
import { navigate } from "./store";
import LocateUs from "./pages/LocateUs";
import BlogsDetails from "./pages/BlogsDetails";
// demo commit

function App() {
  const dispatch = useDispatch();
  const navigateRouter = useNavigate();

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
        case "contact":
          targetPath = "/locate-us";
          break;
        case "treatment-questions":
          targetPath = "/treatment-questions";
          break;
        case "locateus":
          targetPath = "/locate-us";
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
          path="/contact"
          element={<Contact onNavigate={handleNavigate} />}
        />
        <Route
          path="/locate-us"
          element={<LocateUs onNavigate={handleNavigate} />}
        />
        <Route path="*" element={<Home onNavigate={handleNavigate} />} />
      </Routes>
    </div>
  );
}

export default App;
