import { Suspense, lazy } from "react";
import Footer from "../components/Footer";
import HomePage from "../components/HeroSection";
import Navbar from "../components/Navbar";
import RenderOnView from "../components/RenderOnView";

const TestimonialsSection = lazy(() => import("../components/TestimonialsSection"));
const VolunteerAndSupportSection = lazy(() =>
  import("../components/VolunteerAndSupportSection")
);

export default function Home({ onNavigate }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar currentPage="home" onNavigate={onNavigate} />
      <main className="w-full px-4 sm:px-6 md:px-20 home-main">
        <HomePage onNavigate={onNavigate} />
        <RenderOnView
          rootMargin="250px 0px"
          fallback={<div className="min-h-[280px]" aria-hidden="true" />}
        >
          <Suspense fallback={<div className="min-h-[280px]" aria-hidden="true" />}>
            <VolunteerAndSupportSection onNavigate={onNavigate} />
          </Suspense>
        </RenderOnView>
        <RenderOnView
          rootMargin="300px 0px"
          fallback={<div className="mt-2 sm:mt-16 min-h-[260px]" aria-hidden="true" />}
        >
          <div className="mt-2 sm:mt-16">
            <Suspense fallback={<div className="min-h-[260px]" aria-hidden="true" />}>
              <TestimonialsSection />
            </Suspense>
          </div>
        </RenderOnView>
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
