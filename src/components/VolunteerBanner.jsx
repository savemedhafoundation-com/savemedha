import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { UsersRound } from "lucide-react";
import Hand1 from "../assets/Photo/hand1.png";
import Hand2 from "../assets/Photo/Hand2.png";
import People3 from "../assets/Photo/pepole3.png";

export default function VolunteerBanner() {
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [volunteerForm, setVolunteerForm] = useState({ email: "" });
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);
  const emailInputRef = useRef(null);

  useEffect(() => {
    if (!isVolunteerModalOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsVolunteerModalOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    emailInputRef.current?.focus();

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVolunteerModalOpen]);

  const closeModal = () => setIsVolunteerModalOpen(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setVolunteerForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");
    setIsError(false);

    const email = volunteerForm.email.trim();
    const isValidEmail = /^\S+@\S+\.\S+$/.test(email);

    if (!isValidEmail) {
      setIsError(true);
      setStatus("Please enter a valid email address.");
      return;
    }

    try {
      await axios.post("https://savemedhabackend.vercel.app/api/newsletter", {
        email,
      });
      setStatus("Subscribed successfully.");
      setVolunteerForm({ email: "" });
    } catch {
      setIsError(true);
      setStatus("Subscription failed. Please try again.");
    }
  };

  return (
    <section className="home-section bg-[#F8FDF6]">
      <div className="home-container grid max-w-[920px] items-center gap-8 md:grid-cols-[360px_1fr] lg:gap-10">
        <div className="mx-auto grid w-full max-w-[360px] grid-cols-[1fr_118px] gap-3 sm:grid-cols-[1fr_128px]">
          <img
            src={Hand1}
            alt="Volunteer hands"
            className="row-span-2 h-[210px] w-full rounded-[18px] border-[3px] border-[#14980f] object-cover shadow-[0_14px_28px_rgba(15,23,42,0.08)]"
            loading="lazy"
          />
          <img
            src={Hand2}
            alt="Community support"
            className="h-[98px] w-full rounded-[12px] border-[3px] border-[#14980f] object-cover shadow-[0_12px_24px_rgba(15,23,42,0.08)]"
            loading="lazy"
          />
          <img
            src={People3}
            alt="Save Medha volunteers"
            className="h-[98px] w-full rounded-[12px] border-[3px] border-[#14980f] object-cover shadow-[0_12px_24px_rgba(15,23,42,0.08)]"
            loading="lazy"
          />
        </div>

        <div className="mx-auto w-full max-w-[420px] text-center md:mx-0 md:text-left">
          <h2 className="text-[25px] font-black leading-tight tracking-tight text-[#050505] sm:text-[29px]">
            Become <span className="font-black text-[#14980f]">Our Volunteer</span>
          </h2>
          <p className="mt-3 max-w-[370px] text-[15px] font-semibold leading-[1.55] text-[#202124] md:max-w-none">
            Fighting cancer the natural way through{" "}
            <span className="font-bold text-[#2D7D20]">
              Natural Immunotherapy
            </span>{" "}
            that rebuilds your body's defense and restores lasting health.
          </p>
          <div className="mt-4 inline-flex items-center gap-3 rounded-full bg-[#eef2ff] px-4 py-2 text-[13px] font-bold text-[#2142a8]">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[#050505] shadow-sm">
              <UsersRound size={16} strokeWidth={3} />
            </span>
            <span>we are looking for the best people!</span>
          </div>

          <button
            type="button"
            onClick={() => {
              setStatus("");
              setIsVolunteerModalOpen(true);
            }}
            className="mx-auto mt-4 block rounded-[10px] bg-[#14980f] px-6 py-3 text-[15px] font-black text-white shadow-[0_10px_22px_rgba(20,152,15,0.18)] transition hover:bg-[#0f7d0b] md:mx-0"
          >
            Become our Volunteer
          </button>
        </div>
      </div>

      {isVolunteerModalOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-8"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="volunteer-modal-title"
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/10 text-slate-900 transition hover:bg-slate-900/20"
            >
              <span className="sr-only">Close</span>
              <span aria-hidden="true" className="text-2xl leading-none">
                x
              </span>
            </button>

            <div className="p-6 sm:p-8">
              <h3
                id="volunteer-modal-title"
                className="text-xl font-extrabold text-slate-900 sm:text-2xl"
              >
                Become Our Volunteer
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Share your email and our team will reach out.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="volunteer-email"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Email address
                  </label>
                  <input
                    ref={emailInputRef}
                    id="volunteer-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    value={volunteerForm.email}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C425]/30"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="pt-2 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#74C425] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2D7D20]"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>

                {status && (
                  <p
                    className={`pt-2 text-center text-sm font-medium ${
                      isError ? "text-red-600" : "text-green-700"
                    }`}
                  >
                    {status}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
