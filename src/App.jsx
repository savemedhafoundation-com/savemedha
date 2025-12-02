import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
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
import { TREATMENTS } from "./data/treatments";
import { navigate } from "./store";
// import LocateUs from "./pages/LocateUs";
import BlogsDetails from "./pages/BlogsDetails";

const resolveTreatmentFromId = (id) => {
  if (!id) return null;
  return TREATMENTS.find((item) => item.key === id || item.id === id) ?? null;
};
// demo commit

function App() {
  const dispatch = useDispatch();
  const navigateRouter = useNavigate();
  const location = useLocation();
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

      let targetPath = "/";

      switch (pageKey) {
        case "about":
          targetPath = "/about-us";
          break;
        case "treatment":
          targetPath = "/treatment";
          break;
        case "treatment-detail": {
          const treatmentId =
            options?.treatment?.key ||
            options?.treatment?.id ||
            options?.id ||
            selectedTreatment?.key;
          targetPath = `/treatment/${treatmentId || "overview"}`;
          break;
        }
        case "blogs":
          targetPath = "/blogs";
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
          targetPath = "/contact";
          break;
        case "locateus":
          targetPath = "/locate-us";
          break;

        case "cancer-detail": {
          const cancerKey = options?.cancerKey || selectedCancer?.key;
          const search = cancerKey
            ? `?key=${encodeURIComponent(cancerKey)}`
            : "";
          targetPath = `/cancer-learn-more${search}`;
          break;
        }
        case "kidney-detail": {
          const kidneyKey = options?.kidneyKey || selectedKidney?.key;
          const search = kidneyKey
            ? `?key=${encodeURIComponent(kidneyKey)}`
            : "";
          targetPath = `/kidney-learn-more${search}`;
          break;
        }
        case "heart-detail": {
          const heartKey = options?.heartKey || selectedHeart?.key;
          const search = heartKey ? `?key=${encodeURIComponent(heartKey)}` : "";
          targetPath = `/heart-learn-more${search}`;
          break;
        }
        case "nerve-detail": {
          const nerveKey = options?.nerveKey || selectedNerve?.key;
          const search = nerveKey ? `?key=${encodeURIComponent(nerveKey)}` : "";
          targetPath = `/nerve-learn-more${search}`;
          break;
        }
        case "sma-detail": {
          const smaKey = options?.smaKey || selectedSMA?.key;
          const search = smaKey ? `?key=${encodeURIComponent(smaKey)}` : "";
          targetPath = `/sma-learn-more${search}`;
          break;
        }
        case "other-detail": {
          const otherKey = options?.otherKey || selectedOther?.key;
          const search = otherKey ? `?key=${encodeURIComponent(otherKey)}` : "";
          targetPath = `/other-learn-more${search}`;
          break;
        }

        case "home":
        default:
          targetPath = "/";
      }

      navigateRouter(targetPath, { state: options, replace: options?.replace });
    },
    [
      dispatch,
      navigateRouter,
      selectedCancer?.key,
      selectedHeart?.key,
      selectedKidney?.key,
      selectedNerve?.key,
      selectedOther?.key,
      selectedSMA?.key,
      selectedTreatment?.key,
    ]
  );

  const TreatmentDetailRoute = () => {
    const { id } = useParams();
    const treatment =
      resolveTreatmentFromId(id) || selectedTreatment || TREATMENTS[0];

    return (
      <TreatmentDetail treatment={treatment} onNavigate={handleNavigate} />
    );
  };

  const CancerRoute = () => {
    const [searchParams] = useSearchParams();
    const cancerKey =
      searchParams.get("key") ||
      location.state?.cancerKey ||
      selectedCancer?.key;
    const fallbackTitle =
      location.state?.title || selectedCancer?.title || "Cancer";

    return (
      <CancerLearnMore
        cancerKey={cancerKey}
        fallbackTitle={fallbackTitle}
        onNavigate={handleNavigate}
      />
    );
  };

  const KidneyRoute = () => {
    const [searchParams] = useSearchParams();
    const kidneyKey =
      searchParams.get("key") ||
      location.state?.kidneyKey ||
      selectedKidney?.key;
    const fallbackTitle =
      location.state?.title || selectedKidney?.title || "Kidney";

    return (
      <KidneyLearnMore
        kidneyKey={kidneyKey}
        fallbackTitle={fallbackTitle}
        onNavigate={handleNavigate}
      />
    );
  };

  const HeartRoute = () => {
    const [searchParams] = useSearchParams();
    const heartKey =
      searchParams.get("key") || location.state?.heartKey || selectedHeart?.key;
    const fallbackTitle =
      location.state?.title || selectedHeart?.title || "Heart";

    return (
      <HeartLearnMore
        heartKey={heartKey}
        fallbackTitle={fallbackTitle}
        onNavigate={handleNavigate}
      />
    );
  };

  const NerveRoute = () => {
    const [searchParams] = useSearchParams();
    const nerveKey =
      searchParams.get("key") || location.state?.nerveKey || selectedNerve?.key;
    const fallbackTitle =
      location.state?.title || selectedNerve?.title || "Nerve";

    return (
      <NerveLearnMore
        nerveKey={nerveKey}
        fallbackTitle={fallbackTitle}
        onNavigate={handleNavigate}
      />
    );
  };

  const SMARoute = () => {
    const [searchParams] = useSearchParams();
    const smaKey =
      searchParams.get("key") || location.state?.smaKey || selectedSMA?.key;
    const fallbackTitle = location.state?.title || selectedSMA?.title || "SMA";

    return (
      <SMALearnMore
        smaKey={smaKey}
        fallbackTitle={fallbackTitle}
        onNavigate={handleNavigate}
      />
    );
  };

  const OtherRoute = () => {
    const [searchParams] = useSearchParams();
    const otherKey =
      searchParams.get("key") || location.state?.otherKey || selectedOther?.key;
    const fallbackTitle =
      location.state?.title || selectedOther?.title || "Other";

    return (
      <OtherLearnMore
        otherKey={otherKey}
        fallbackTitle={fallbackTitle}
        onNavigate={handleNavigate}
      />
    );
  };

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
          element={<Treatment onNavigate={handleNavigate} />}
        />
        <Route path="/treatment/:id" element={<TreatmentDetailRoute />} />
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
        <Route path="/cancer-learn-more" element={<CancerRoute />} />
        <Route path="/kidney-learn-more" element={<KidneyRoute />} />
        <Route path="/heart-learn-more" element={<HeartRoute />} />
        <Route path="/nerve-learn-more" element={<NerveRoute />} />
        <Route path="/sma-learn-more" element={<SMARoute />} />
        <Route path="/other-learn-more" element={<OtherRoute />} />
        <Route path="*" element={<Home onNavigate={handleNavigate} />} />
        {/* <Route
          path="/locate-us"
          element={<LocateUs onNavigate={handleNavigate} />}
        /> */}
      </Routes>
    </div>
  );
}

export default App;
