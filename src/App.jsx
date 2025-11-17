import { useState } from "react";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Treatment from "./pages/Treatment";
import TreatmentDetail from "./pages/TreatmentDetail";
import Blogs from "./pages/Blogs";
import CancerLearnMore from "./pages/CancerLearnMore";
import KidneyLearnMore from "./pages/KidneyLearnMore";
import HeartLearnMore from "./pages/HeartLearnMore";
import NerveLearnMore from "./pages/NerveLearnMore";
import SMALearnMore from "./pages/SMALearnMore";
import OtherLearnMore from "./pages/OtherLearnMore";
import Donate from "./pages/Donate";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [selectedCancer, setSelectedCancer] = useState(null);
  const [selectedKidney, setSelectedKidney] = useState(null);
  const [selectedHeart, setSelectedHeart] = useState(null);
  const [selectedNerve, setSelectedNerve] = useState(null);
  const [selectedSMA, setSelectedSMA] = useState(null);
  const [selectedOther, setSelectedOther] = useState(null);

  const handleNavigate = (pageKey, options = {}) => {
    if (!pageKey) return;

    if (pageKey === "treatment-detail") {
      if (options?.treatment) {
        setSelectedTreatment(options.treatment);
      }
    } else if (pageKey !== "cancer-detail" && selectedTreatment) {
      setSelectedTreatment(null);
    }

    if (pageKey === "cancer-detail") {
      if (options?.cancerKey) {
        setSelectedCancer({
          key: options.cancerKey,
          title: options?.title,
        });
      }
    } else if (selectedCancer) {
      setSelectedCancer(null);
    }

    if (pageKey === "kidney-detail") {
      if (options?.kidneyKey) {
        setSelectedKidney({
          key: options.kidneyKey,
          title: options?.title,
        });
      }
    } else if (selectedKidney) {
      setSelectedKidney(null);
    }

    if (pageKey === "heart-detail") {
      if (options?.heartKey) {
        setSelectedHeart({
          key: options.heartKey,
          title: options?.title,
        });
      }
    } else if (selectedHeart) {
      setSelectedHeart(null);
    }

    if (pageKey === "nerve-detail") {
      if (options?.nerveKey) {
        setSelectedNerve({
          key: options.nerveKey,
          title: options?.title,
        });
      }
    } else if (selectedNerve) {
      setSelectedNerve(null);
    }

    if (pageKey === "sma-detail") {
      if (options?.smaKey) {
        setSelectedSMA({
          key: options.smaKey,
          title: options?.title,
        });
      }
    } else if (selectedSMA) {
      setSelectedSMA(null);
    }

    if (pageKey === "other-detail") {
      if (options?.otherKey) {
        setSelectedOther({
          key: options.otherKey,
          title: options?.title,
        });
      }
    } else if (selectedOther) {
      setSelectedOther(null);
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
      case "donate":
        return <Donate onNavigate={handleNavigate} />;
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
      case "cancer-detail":
        if (!selectedCancer) {
          return <Treatment onNavigate={handleNavigate} />;
        }
        return (
          <CancerLearnMore
            cancerKey={selectedCancer.key}
            fallbackTitle={selectedCancer.title}
            onNavigate={handleNavigate}
          />
        );
      case "kidney-detail":
        if (!selectedKidney) {
          return <Treatment onNavigate={handleNavigate} />;
        }
        return (
          <KidneyLearnMore
            kidneyKey={selectedKidney.key}
            fallbackTitle={selectedKidney.title}
            onNavigate={handleNavigate}
          />
        );
      case "heart-detail":
        if (!selectedHeart) {
          return <Treatment onNavigate={handleNavigate} />;
        }
        return (
          <HeartLearnMore
            heartKey={selectedHeart.key}
            fallbackTitle={selectedHeart.title}
            onNavigate={handleNavigate}
          />
        );
      case "nerve-detail":
        if (!selectedNerve) {
          return <Treatment onNavigate={handleNavigate} />;
        }
        return (
          <NerveLearnMore
            nerveKey={selectedNerve.key}
            fallbackTitle={selectedNerve.title}
            onNavigate={handleNavigate}
          />
        );
      case "sma-detail":
        if (!selectedSMA) {
          return <Treatment onNavigate={handleNavigate} />;
        }
        return (
          <SMALearnMore
            smaKey={selectedSMA.key}
            fallbackTitle={selectedSMA.title}
            onNavigate={handleNavigate}
          />
        );
      case "other-detail":
        if (!selectedOther) {
          return <Treatment onNavigate={handleNavigate} />;
        }
        return (
          <OtherLearnMore
            otherKey={selectedOther.key}
            fallbackTitle={selectedOther.title}
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
