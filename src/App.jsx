import { useState } from "react";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Treatment from "./pages/Treatment";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigate = (pageKey) => {
    if (!pageKey || pageKey === currentPage) return;
    setCurrentPage(pageKey);
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
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return <div className="app-scale-wrapper">{renderCurrentPage()}</div>;
}

export default App;
