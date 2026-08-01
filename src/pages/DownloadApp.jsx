import { Download, HeartPulse, ShieldCheck, Smartphone, WifiOff } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Seo } from "../components/Seo";
import appPreviewImage from "../assets/Photo/mobilebanner.png";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.savemedhafoundation.medhaclinic&pli=1";

const benefits = [
  {
    title: "Care On Your Phone",
    description: "Keep Save Medha Foundation support close whenever you need guidance.",
    icon: Smartphone,
  },
  {
    title: "Official Play Store Access",
    description: "Install the Android app directly from our official Google Play listing.",
    icon: ShieldCheck,
  },
  {
    title: "Stay Connected",
    description: "Access updates, care information, and foundation resources more easily.",
    icon: HeartPulse,
  },
];

export default function DownloadApp({ onNavigate }) {
  return (
    <div className="min-h-screen bg-[#f5faf6] text-gray-900">
      <Seo
        title="Download App"
        description="Download the Save Medha Foundation Android mobile app."
        path="/download-app"
      />
      <Navbar currentPage="download-app" onNavigate={onNavigate} />

      <main className="font-sen">
        <section className="relative overflow-hidden bg-[#173b1b] text-white">
          <div className="absolute inset-0">
            <img
              src={appPreviewImage}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover opacity-25"
              fetchpriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d2b13] via-[#173b1b]/92 to-[#2f641a]/88" />
          </div>

          <div className="relative mx-auto grid min-h-[420px] max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
            <div className="max-w-2xl">
              <p className="font-poppins text-xs font-semibold uppercase tracking-[0.35em] text-[#dff4d5]">
                Save Medha Foundation
              </p>
              <h1 className="mt-4 font-poppins text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                Download Our Mobile App
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#edf7e8] sm:text-lg">
                Get easier access to Save Medha Foundation services, updates, and patient support
                resources from your Android phone.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#74C425] px-7 py-3.5 font-poppins text-base font-extrabold text-white shadow-lg shadow-black/20 transition hover:bg-[#5a9c27]"
                >
                  <Download className="h-5 w-5" />
                  Get It On Google Play
                </a>
                <button
                  type="button"
                  onClick={() => onNavigate?.("locateus")}
                  className="inline-flex items-center justify-center rounded-md border-2 border-white/80 bg-white/10 px-7 py-3.5 font-poppins text-base font-extrabold text-white transition hover:bg-white hover:text-[#173b1b]"
                >
                  Contact Support
                </button>
              </div>
            </div>

            <div className="mx-auto w-full max-w-sm">
              <div className="rounded-[30px] border border-white/25 bg-white/10 p-4 shadow-2xl backdrop-blur-sm">
                <div className="overflow-hidden rounded-[24px] bg-white">
                  <img
                    src={appPreviewImage}
                    alt="Save Medha Foundation mobile app"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-5 md:grid-cols-3">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <article
                    key={benefit.title}
                    className="rounded-lg border border-[#e1eddb] bg-white p-6 shadow-[0_12px_38px_rgba(0,0,0,0.06)]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#e9f7d5] text-[#5b9c21]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="mt-5 font-poppins text-xl font-black text-gray-900">
                      {benefit.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      {benefit.description}
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="mt-10 grid gap-8 rounded-lg border border-[#e1eddb] bg-white p-6 shadow-[0_18px_55px_rgba(0,0,0,0.07)] md:grid-cols-[1fr_0.8fr] md:p-8">
              <div>
                <p className="font-poppins text-sm font-extrabold uppercase tracking-[0.25em] text-[#E7581F]">
                  Google Play
                </p>
                <h2 className="mt-3 font-poppins text-2xl font-black text-gray-900 sm:text-3xl">
                  Install Save Medha Clinic from the Play Store.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-700">
                  Tap the button below to open our official Google Play listing, then install the
                  app on your Android device using the standard Play Store flow.
                </p>
              </div>

              <div className="flex flex-col justify-center gap-4 rounded-md bg-[#f7faf6] p-5">
                <div className="flex items-start gap-3">
                  <WifiOff className="mt-1 h-5 w-5 flex-shrink-0 text-[#E7581F]" />
                  <p className="text-sm leading-relaxed text-gray-700">
                    If Google Play does not open automatically, copy the link into your browser or
                    search for `Medha Clinic` on the Play Store.
                  </p>
                </div>
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#1118A6] px-6 py-3 font-poppins text-sm font-extrabold text-white transition hover:bg-[#0b128a]"
                >
                  <Download className="h-5 w-5" />
                  Open In Google Play
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
