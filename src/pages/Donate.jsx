import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomePageBanner from "../components/HomePageBanner";
import charityImage from "../assets/Photo/Jar.png";
import handHoldingHeartImage from "../assets/Photo/image1.png";
import peopleImage from "../assets/Photo/kid.png";

import supportCauseImage from "../assets/Photo/main.png";
import naturalBg from "../assets/Photo/natural-bg.png.png";

const loadRazorpayCheckout = () =>
  new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve(true);

    const existing = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => reject(new Error("Failed to load Razorpay")));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Failed to load Razorpay"));
    document.body.appendChild(script);
  });

export default function Donate({ onNavigate }) {
  const location = useLocation();
  const donateBanners = [
  "https://res.cloudinary.com/savemedha/image/upload/v1769677466/Donatebanner1_ipkbl2.png",
  "https://res.cloudinary.com/savemedha/image/upload/v1769677466/DonateBanner2_rogvhy.png",
  "https://res.cloudinary.com/savemedha/image/upload/v1769677466/DonateBanner3_o49uan.png",
  "https://res.cloudinary.com/savemedha/image/upload/v1769677468/DonateBanner4_eaop9l.png",
];


  const [currency, setCurrency] = useState("INR");
  const [selectedAmount, setSelectedAmount] = useState(200);
  const [customAmount, setCustomAmount] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [donor, setDonor] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const presetAmounts = [100, 200, 300, 400, 500, 1000];
  const donationAmount = useMemo(() => {
    const normalized = customAmount.trim();
    if (!normalized) return selectedAmount;
    const parsed = Number.parseInt(normalized.replace(/[^\d]/g, ""), 10);
    return Number.isFinite(parsed) ? parsed : 0;
  }, [customAmount, selectedAmount]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const stateTarget =
      location?.state && typeof location.state === "object"
        ? location.state.scrollTo
        : null;
    const hashTarget = location?.hash ? location.hash.replace(/^#/, "") : null;
    const targetId = stateTarget || hashTarget;

    if (!targetId) return;

    const el = document.getElementById(targetId);
    if (!el) return;

    const yOffset = -110;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  }, [location.key, location.hash]);

  const startRazorpay = async () => {
    setPaymentMessage("");

    if (!donationAmount || donationAmount <= 0) {
      setPaymentMessage("Please select a valid donation amount.");
      return;
    }

    setIsPaying(true);
    try {
      await loadRazorpayCheckout();

      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: donationAmount,
          currency,
          notes: {
            firstName: donor.firstName || undefined,
            lastName: donor.lastName || undefined,
            phone: donor.phone || undefined,
            email: donor.email || undefined,
          },
        }),
      });

      const orderData = await orderRes.json().catch(() => ({}));
      if (!orderRes.ok) {
        throw new Error(orderData?.error || "Unable to create donation order.");
      }

      const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || orderData?.keyId;
      if (!keyId) {
        throw new Error(
          "Missing Razorpay key id (set VITE_RAZORPAY_KEY_ID or RAZORPAY_KEY_ID)."
        );
      }

      const donorName = [donor.firstName, donor.lastName].filter(Boolean).join(" ");

      const options = {
        key: keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Save Medha Foundation",
        description: "Donation",
        order_id: orderData.orderId,
        prefill: {
          name: donorName || undefined,
          email: donor.email || undefined,
          contact: donor.phone || undefined,
        },
        theme: { color: "#74C425" },
        modal: {
          ondismiss: () => setIsPaying(false),
        },
        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json().catch(() => ({}));
            if (!verifyRes.ok || !verifyData?.ok) {
              throw new Error("Payment verification failed.");
            }

            setPaymentMessage("Thank you! Your donation was successful.");
          } catch (error) {
            setPaymentMessage(error?.message || "Payment completed, but verification failed.");
          } finally {
            setIsPaying(false);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        setPaymentMessage("Payment failed. Please try again.");
        setIsPaying(false);
      });
      rzp.open();
    } catch (error) {
      setPaymentMessage(error?.message || "Unable to start Razorpay checkout.");
      setIsPaying(false);
    }
  };
  const donateBannerImageMap = useMemo(
    () => ({
      fit: "cover",
      areasByIndex: [
        [
          {
            href: "#donate-form",
            alt: "Donate now",
            title: "Donate now",
            rect: [0.57, 0.54, 0.83, 0.67],
          },
        ],
        [
          {
            href: "#donate-form",
            alt: "Donate now",
            title: "Donate now",
            rect: [0.06, 0.6, 0.3, 0.75],
          },
        ],
        [
          {
            href: "#donate-form",
            alt: "Donate now",
            title: "Donate now",
            rect: [0.44, 0.46, 0.72, 0.6],
          },
        ],
        [
          {
            href: "#donate-form",
            alt: "Donate now",
            title: "Donate now",
            rect: [0.05, 0.1, 0.22, 0.32],
          },
        ],
      ],
    }),
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f9fb] to-white text-slate-900">
      <Navbar currentPage="donate" onNavigate={onNavigate} />
      <HomePageBanner
        backgroundImages={donateBanners}
        imageAlt="Donate banner"
        showDefaultContent={false}
        showArrows={false}
        autoAdvanceMs={5000}
        className="min-h-[140px] sm:min-h-[220px] md:min-h-[260px] lg:min-h-[620px]"
        imageMap={donateBannerImageMap}
      />

      <main className="flex flex-col items-center px-4 py-12">
        {/* Section under banner (placeholders) */}
        <section className="w-full">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-[#7dc553] font-extrabold text-3xl sm:text-4xl font-poppins [-webkit-text-stroke:1px_#ffffff] sm:[-webkit-text-stroke:2px_#ffffff]">
              Saving Lives Naturally!
            </h2>
          </div>
          <div
            className="mt-3 w-full px-5 py-2 text-white text-sm sm:text-base font-semibold text-center font-sen"
            style={{
              background:
                "linear-gradient(90deg, #FFFFFF 0%, #E7581F 17.79%, #E7581F 81.73%, #FFFFFF 100%)",
            }}
          >
            Supporting Cancer Recovery with Nutrition &amp; Care.
          </div>

          <div className="mx-auto mt-8 max-w-5xl">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <img
                  src={peopleImage}
                  alt="People supporting each other"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
                <p className="text-sm sm:text-base leading-relaxed text-slate-700 font-sen">
                  Join us in donating for a good cause. Your contribution can make a world of
                  difference. In someone&apos;s life, every donation, no matter how small, helps
                  support critical medical treatments, emergency responses, and community health
                  initiatives. Together, let&apos;s make a positive impact and spread hope and healing
                  to those in need. Donate now and be a part of something truly meaningful!
                </p>

               
                {paymentMessage ? (
                  <div className="mt-4 text-sm font-semibold font-sen text-slate-800">
                    {paymentMessage}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
              <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-poppins">
                  Donate For a Good Cause <span className="text-red-600">♥</span>
                </h3>
                <p className="mt-2 text-sm sm:text-base text-slate-700 font-sen">
                  Your help fuels nutrition support and compassionate care for recovery journeys.
                </p>
                <button
                  type="button"
                  onClick={startRazorpay}
                  disabled={isPaying}
                  className="mt-5 inline-flex items-center justify-center rounded-md bg-[#2563eb] px-6 py-3 text-white font-semibold font-poppins hover:bg-[#1d4ed8] transition-colors"
                >
                  {isPaying ? "Opening..." : "Donate Now"}
                </button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <img
                    src={handHoldingHeartImage}
                    alt="Support cancer care"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <img
                    src={charityImage}
                    alt="Charity donation"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
              <div className="px-6 py-10 sm:px-10">
                <h3 className="text-center text-2xl sm:text-3xl font-extrabold text-slate-900 font-poppins">
                  Support Our Cause
                </h3>
                <p className="mt-2 text-center text-sm sm:text-base text-slate-600 font-sen">
                  Help our organization by donating today! Donations go to making a difference for
                  our cause.
                </p>
                </div>

            {/* Support our cause + donation form */}
            <div className="mt-14 overflow-hidden  border border-slate-200 bg-[#fff6f3]">
            

                <div className=" overflow-hidden  border border-slate-200 bg-white">
                  <div className="relative">
	                    <img
	                      src={supportCauseImage}
	                      alt="Support our cause"
	                      className="h-[240px] w-full object-cover sm:h-[560px]"
	                      loading="lazy"
	                    />
                    
                  </div>
                

                <div className="mt-10">
                  <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 font-poppins">
                    Impact So Far
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm sm:text-base text-slate-700 font-sen list-disc pl-5">
                    <li>
                      Supported individuals through nutrition-based immune support programs and
                      holistic care guidance.
                    </li>
                    <li>
                      Provided community awareness initiatives to improve early recognition and
                      timely support.
                    </li>
                    <li>
                      Raised resources and hope for families navigating long-term treatment and
                      recovery.
                    </li>
                  </ul>
                </div>

                <div
                  id="donate-form"
                  className="mt-10 overflow-hidden  border border-slate-200 bg-white"
                >
                  <div className="relative">
                    <img
                      src={naturalBg}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover opacity-25"
                      loading="lazy"
                    />
                    <div className="relative px-6 py-8 sm:px-10">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="text-base sm:text-lg font-extrabold text-slate-900 font-poppins">
                          Donation Amount <span className="text-red-600">*</span>
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm text-slate-600 font-sen">
                            Currency
                          </span>
                          <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800"
                          >
                            <option value="INR">INR ₹</option>
                            <option value="USD">USD $</option>
                            <option value="EUR">EUR €</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-3 gap-3 sm:gap-4">
                        {presetAmounts.map((amount) => {
                          const isSelected =
                            customAmount.trim() === "" && selectedAmount === amount;
                          return (
                            <button
                              key={amount}
                              type="button"
                              onClick={() => {
                                setSelectedAmount(amount);
                                setCustomAmount("");
                              }}
                              className={`rounded-md border px-4 py-3 text-sm sm:text-base font-bold font-poppins transition-colors ${
                                isSelected
                                  ? "border-[#74c425] bg-[#e9f7d5] text-slate-900"
                                  : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
                              }`}
                            >
                              {amount}
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-5">
                        <label className="block text-xs sm:text-sm text-slate-600 font-sen">
                          Enter custom amount
                        </label>
                        <input
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          inputMode="numeric"
                          placeholder="Enter custom amount"
                          className="mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm sm:text-base text-slate-900"
                        />
                      </div>

                      <div className="mt-8">
                        <h4 className="text-base sm:text-lg font-extrabold text-slate-900 font-poppins">
                          Who&apos;s Giving Today?
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm text-slate-600 font-sen">
                          This is confidential; we won&apos;t share it.
                        </p>

                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                          <input
                            value={donor.firstName}
                            onChange={(e) =>
                              setDonor((d) => ({ ...d, firstName: e.target.value }))
                            }
                            placeholder="First name *"
                            className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm sm:text-base"
                          />
                          <input
                            value={donor.lastName}
                            onChange={(e) =>
                              setDonor((d) => ({ ...d, lastName: e.target.value }))
                            }
                            placeholder="Last name"
                            className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm sm:text-base"
                          />
                          <input
                            value={donor.phone}
                            onChange={(e) => setDonor((d) => ({ ...d, phone: e.target.value }))}
                            placeholder="Phone number"
                            className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm sm:text-base"
                          />
                          <input
                            value={donor.email}
                            onChange={(e) => setDonor((d) => ({ ...d, email: e.target.value }))}
                            placeholder="Email address *"
                            className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm sm:text-base"
                          />
                        </div>
                      </div>

                      <div className="mt-8" id="payment-details">
                        <h4 className="text-base sm:text-lg font-extrabold text-slate-900 font-poppins">
                          Payment Details
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm text-slate-600 font-sen">
                          How would you like to pay for your donation?
                        </p>

                        <div className="mt-4 rounded-xl border border-slate-200 bg-[#e9f7d5] p-5">
                          <h5 className="text-sm sm:text-base font-extrabold text-slate-900 font-poppins">
                            Donation Summary
                          </h5>
                          <div className="mt-3 space-y-2 text-sm text-slate-800 font-sen">
                            <div className="flex items-center justify-between gap-4">
                              <span>Donation Amount</span>
                              <span className="font-bold font-poppins">
                                {currency} {donationAmount || 0}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span>Giving Frequency</span>
                              <span className="font-bold font-poppins">One-time</span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span>Donation Total</span>
                              <span className="font-bold font-poppins">
                                {currency} {donationAmount || 0}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={startRazorpay}
                          disabled={isPaying}
                          className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-[#1118A6] px-6 py-2 sm:py-3 text-white font-extrabold tracking-wide font-poppins hover:bg-[#0b128a] transition-colors disabled:opacity-70"
                        >
                          {isPaying ? "OPENING..." : "DONATE NOW"}
                        </button>
                        {paymentMessage ? (
                          <div className="mt-4 text-sm font-semibold font-sen text-slate-800">
                            {paymentMessage}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Get in touch */}
      <section className="w-full bg-[#e7581f] py-14">
        <div className="mx-auto max-w-5xl px-4 text-center text-white">
          <div className="text-sm sm:text-base font-semibold tracking-wide font-shippori">
            Get in Touch
          </div>
          <div className="mt-2 text-3xl sm:text-5xl font-extrabold font-poppins">
            We&apos;d Love to Hear from You
          </div>
          <p className="mx-auto mt-4 max-w-3xl text-sm sm:text-base text-white/90 font-shippori">
            Whether you have questions, want to volunteer, or would like to support our mission,
            we&apos;re here to help. Reach out and we&apos;ll get back to you.
          </p>
          <button
            type="button"
            onClick={() => onNavigate?.("locateus")}
            className="mt-7 inline-flex items-center justify-center rounded-md bg-white px-7 py-3 text-slate-900 font-extrabold tracking-wide font-poppins hover:bg-slate-100 transition-colors"
          >
            CONTACT WITH US
          </button>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
