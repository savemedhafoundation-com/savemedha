import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroImage from "../assets/Photo/Rectangle 750.png";
import experienceBanner from "../assets/Photo/Frame 9456.png";

const CASE_STUDIES = [
  {
    id: "1",
    title: "Case Studies 1",
    patient: "Jaydeb Mondal",
    summary: "Cure from unknown symptoms",
  },
  {
    id: "2",
    title: "Case Studies 2",
    patient: "Jayanta Mondal",
    summary: "Cure from unknown symptoms",
  },
  {
    id: "3",
    title: "Case Studies 3",
    patient: "Jayantika Mondal",
    summary: "Cure from unknown symptoms",
  },
  {
    id: "4",
    title: "Case Studies 1",
    patient: "Jaydeb Mondal",
    summary: "Cure from unknown symptoms",
  },
  {
    id: "5",
    title: "Case Studies 2",
    patient: "Jayanta Mondal",
    summary: "Cure from unknown symptoms",
  },
  {
    id: "6",
    title: "Case Studies 3",
    patient: "Jayantika Mondal",
    summary: "Cure from unknown symptoms",
  },
];

export default function CaseStudies({ onNavigate }) {
  const handleReadMore = () => {
    onNavigate?.("blogs");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-slate-900">
      <Navbar currentPage="case-studies" onNavigate={onNavigate} />

      <main>
        <section className="relative overflow-hidden">
         
          <div className="relative min-h-[420px] md:min-h-[520px] lg:min-h-[640px]">
            <img
              src={heroImage}
              alt="Real success stories"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="relative z-10 mx-auto flex min-h-[420px] max-w-4xl flex-col items-center justify-end px-6 pb-10 text-center md:min-h-[520px] lg:min-h-[640px] lg:pb-14">
              <h1 className="text-3xl font-extrabold text-white md:text-5xl">
                Real Success Stories
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/90 md:text-2xl">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard dummy
                text ever since the 1500s.
              </p>
              <button
                type="button"
                onClick={handleReadMore}
                className="mt-6 rounded-xl bg-[#74C425] px-7 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-[#5ca81d]"
              >
                Read Our Case Studies
              </button>
            </div>
          </div>
        </section>

        <section className="bg-[#f5f5f5] py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-[#74C425] md:text-6xl">
              Case Studies
            </h2>
            <p className="mt-2 text-3xl font-semibold text-slate-900 md:text-5xl">
              Results That Speak for Themselves
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {CASE_STUDIES.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-lg border border-[#d8e6c3] bg-[#eaf5d9] shadow-sm"
                >
                  <div className="relative h-36 bg-gradient-to-b from-[#92dd40] to-[#6dbd1f] p-5">
                    <span className="absolute left-6 top-5 h-2 w-2 rounded-full bg-white/70" />
                    <span className="absolute left-12 top-3 h-3 w-3 rounded-full bg-white/60" />
                    <span className="absolute right-12 top-6 h-2 w-2 rounded-full bg-white/70" />
                    <span className="absolute right-7 top-4 h-5 w-5 rounded-full bg-white/50" />
                    <div className="absolute -top-10 left-1/2 h-24 w-[135%] -translate-x-1/2 rounded-[50%] bg-white/35" />
                    <h3 className="relative z-10 mt-4 text-2xl font-extrabold text-white">
                      {item.title}
                    </h3>
                    <span className="absolute -bottom-6 right-6 h-12 w-12 rounded-full bg-[#5aa716]" />
                  </div>

                  <div className="px-4 pb-5 pt-4">
                    <p className="text-sm text-slate-700">{item.patient}</p>
                    <h4 className="mt-2 text-lg font-bold text-slate-900">
                      {item.summary}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the
                      industry&apos;s standard.
                    </p>
                    <button
                      type="button"
                      onClick={handleReadMore}
                      className="mt-4 rounded-md bg-[#74C425] px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-[#5ca81d]"
                    >
                      Read More
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={handleReadMore}
                className="rounded-2xl bg-[#74C425] px-8 py-3 text-2xl font-semibold text-white shadow-md transition hover:bg-[#5ca81d]"
              >
                View More
              </button>
            </div>
          </div>
        </section>

        <section className="bg-[#2f8200] -translate-y-40">
          <img
            src={experienceBanner}
            alt="Experience a better life"
            className="w-full object-cover"
            loading="lazy"
          />
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
