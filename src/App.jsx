import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import Contact from "./pages/Contact";
import { navigate } from "./store";

function App() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.navigation.currentPage);
  const {
    selectedTreatment,
    selectedCancer,
    selectedKidney,
    selectedHeart,
    selectedNerve,
    selectedSMA,
    selectedOther,
  } = useSelector((state) => state.selections);

  const handleNavigate = useCallback(
    (pageKey, options = {}) => {
      dispatch(navigate(pageKey, options));
    },
    [dispatch]
  );

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
      case "contact":
        return <Contact onNavigate={handleNavigate} />;
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
