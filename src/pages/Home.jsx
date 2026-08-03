import { Suspense, lazy } from "react";
import Footer from "../components/Footer";
import HomePage from "../components/HeroSection";
import { Seo } from "../components/Seo";
import { Schema } from "../components/Schema";
import Navbar from "../components/Navbar";
import RenderOnView from "../components/RenderOnView";
import SkeletonBox from "../components/SkeletonBox";

const TestimonialsSection = lazy(() => import("../components/TestimonialsSection"));
const VolunteerAndSupportSection = lazy(() =>
  import("../components/VolunteerAndSupportSection")
);

export default function Home({ onNavigate }) {
  return (
    <div className="home-figma-hero-shell min-h-screen bg-white">
      <Seo path="/" />
      <Schema type="organization" />
      <Schema type="website" />
      <Navbar currentPage="home" onNavigate={onNavigate} />
      <main className="w-full px-4 sm:px-6 md:px-20 home-main">
        <HomePage onNavigate={onNavigate} />
        <RenderOnView
          rootMargin="250px 0px"
          fallback={
            <SkeletonBox
              className="min-h-[280px] w-full"
              roundedClassName="rounded-[28px]"
            />
          }
        >
          <Suspense
            fallback={
              <SkeletonBox
                className="min-h-[280px] w-full"
                roundedClassName="rounded-[28px]"
              />
            }
          >
            <VolunteerAndSupportSection onNavigate={onNavigate} />
          </Suspense>
        </RenderOnView>
        <RenderOnView
          rootMargin="300px 0px"
          fallback={
            <SkeletonBox
              className="min-h-[260px] w-full"
              roundedClassName="rounded-[28px]"
            />
          }
        >
          <div>
            <Suspense
              fallback={
                <SkeletonBox
                  className="min-h-[260px] w-full"
                  roundedClassName="rounded-[28px]"
                />
              }
            >
              <TestimonialsSection />
            </Suspense>
          </div>
        </RenderOnView>
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
