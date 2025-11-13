import { useState } from "react";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Treatment from "./pages/Treatment";
import TreatmentDetail from "./pages/TreatmentDetail";
import Blogs from "./pages/Blogs";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedTreatment, setSelectedTreatment] = useState(null);

  const handleNavigate = (pageKey, options = {}) => {
    if (!pageKey) return;

    if (pageKey === "treatment-detail") {
      if (options?.treatment) {
        setSelectedTreatment(options.treatment);
      }
    } else if (selectedTreatment) {
      setSelectedTreatment(null);
    }

    if (pageKey !== currentPage) {
      setCurrentPage(pageKey);
    }

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "about":
        return <AboutUs onNavigate={handleNavigate} />;
      case "treatment":
        return <Treatment onNavigate={handleNavigate} />;
      case "blogs":
        return <Blogs onNavigate={handleNavigate} />;
      case "treatment-detail":
        if (!selectedTreatment) {
          return <Treatment onNavigate={handleNavigate} />;
        }
        return (
          <TreatmentDetail
            treatment={selectedTreatment}
            onNavigate={handleNavigate}
          />
        );
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return <div className="app-scale-wrapper">{renderCurrentPage()}</div>;
}

export default App;
