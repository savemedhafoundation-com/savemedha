import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Award,
  BadgeCheck,
  BookOpenCheck,
  CalendarCheck,
  Copy,
  Download,
  Eye,
  FileCheck2,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Plus,
  QrCode,
  Search,
  Settings,
  ShieldAlert,
  Users,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Seo } from "../components/Seo";
import api from "../utils/api";

const DISCLAIMER =
  "This is a social work and community awareness program. Students are not allowed to provide medical advice, diagnosis, treatment suggestions, or medicine recommendations.";

const CERTIFICATE_DISCLAIMER =
  "This certificate confirms completion of social work and community health awareness hours under Save Medha Foundation. It does not authorize medical diagnosis, treatment, or clinical practice.";

const WORK_AREAS = [
  "Health Awareness Campaign",
  "Thalassemia Awareness Support",
  "Cancer Awareness Support",
  "Nutrition & Hygiene Awareness",
  "Field Survey & Data Collection",
  "Patient Support Desk Assistance",
  "School/College Awareness Campaign",
  "Social Media Awareness & Documentation",
  "Campaign Report Writing",
];

const BENEFITS = [
  "NGO Certificate",
  "Real Field Experience",
  "Social Work Hours Completion",
  "Community Health Awareness Training",
  "Internship Experience",
  "Leadership Opportunity",
  "Project Report Support",
  "Future Volunteer/Coordinator Opportunity",
  "Recommendation Letter for Best Performers",
];

const STRUCTURE_30 = [
  ["Orientation: Save Medha Foundation & Social Work Basics", "2 hours"],
  ["Community Health Awareness Training", "4 hours"],
  ["Field Survey / Awareness Campaign", "12 hours"],
  ["Social Media / Documentation Work", "4 hours"],
  ["Patient Support / Center Visit", "4 hours"],
  ["Report Writing & Presentation", "4 hours"],
];

const STRUCTURE_50 = [
  ["Orientation & Ethics in Social Work", "3 hours"],
  ["Health, Nutrition & Awareness Training", "7 hours"],
  ["Field Survey & Data Collection", "15 hours"],
  ["Awareness Campaign Participation", "10 hours"],
  ["Patient Support / NGO Center Work", "5 hours"],
  ["Digital Awareness / Social Media Work", "4 hours"],
  ["Report Writing, Viva & Certificate Evaluation", "6 hours"],
];

const ADMIN_TABS = [
  ["overview", "Dashboard", LayoutDashboard],
  ["applications", "Applications", FileText],
  ["students", "Students", Users],
  ["batches", "Batches", CalendarCheck],
  ["attendance", "Attendance", BookOpenCheck],
  ["reports", "Reports", FileCheck2],
  ["certificates", "Certificates", Award],
  ["settings", "Settings", Settings],
];

const initialApplicationForm = {
  salutation: "",
  fullName: "",
  dob: "",
  age: "",
  gender: "",
  collegeName: "",
  courseDepartment: "",
  semesterYear: "",
  mobile: "",
  whatsapp: "",
  email: "",
  address: "",
  guardianName: "",
  guardianContact: "",
  emergencyContact: "",
  preferredDuration: "30",
  preferredWorkArea: WORK_AREAS[0],
  availability: "Flexible",
  consentAccepted: false,
  guardianConsentAccepted: false,
};

const formatDate = (value) => (value ? new Date(value).toLocaleDateString("en-IN") : "-");
const adminTabFromPath = (pathname) => {
  const tail = pathname.split("/").filter(Boolean).pop();
  return tail && tail !== "social-work" && ADMIN_TABS.some(([key]) => key === tail) ? tail : "overview";
};
const normalizeArray = (value) => (Array.isArray(value) ? value : []);
const mobilePattern = /^[6-9]\d{9}$/;

function Shell({ children, onNavigate, title, description, path }) {
  return (
    <div className="min-h-screen bg-white">
      <Seo title={title} description={description} path={path} />
      <Navbar currentPage="student-social-work" onNavigate={onNavigate} />
      {children}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

function DisclaimerBox({ className = "" }) {
  return (
    <div className={`rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold leading-relaxed text-amber-900 ${className}`}>
      {DISCLAIMER}
    </div>
  );
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="text-sm font-black uppercase tracking-[0.16em] text-[#168f00]">{eyebrow}</p> : null}
      <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-base leading-7 text-slate-600">{subtitle}</p> : null}
    </div>
  );
}

function Stat({ label, value, icon: Icon }) {
  return (
    <div className="rounded-lg border border-emerald-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-black text-slate-900">{value ?? 0}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}

function Field({ label, children, error, className = "" }) {
  return (
    <label className={`block text-sm font-bold text-slate-700 ${className}`}>
      {label}
      <div className="mt-2">{children}</div>
      {error ? <p className="mt-1 text-xs font-bold text-red-700">{error}</p> : null}
    </label>
  );
}

function inputClass(hasError) {
  return `h-11 w-full rounded-lg border px-3 outline-none transition focus:border-[#189500] ${
    hasError ? "border-red-300 bg-red-50" : "border-slate-300 bg-white"
  }`;
}

function textareaClass(hasError) {
  return `min-h-24 w-full rounded-lg border px-3 py-2 outline-none transition focus:border-[#189500] ${
    hasError ? "border-red-300 bg-red-50" : "border-slate-300 bg-white"
  }`;
}

function Pill({ children }) {
  return <span className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-900">{children}</span>;
}

function CourseStructure({ title, rows }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-xl font-black text-slate-950">{title}</h3>
      <div className="mt-4 divide-y divide-slate-100">
        {rows.map(([item, hours]) => (
          <div key={item} className="flex items-start justify-between gap-4 py-3 text-sm">
            <p className="font-semibold text-slate-700">{item}</p>
            <p className="shrink-0 font-black text-[#168f00]">{hours}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StudentSocialWorkLanding({ onNavigate }) {
  const faqs = [
    ["Is this a medical training course?", "No. This is only a social work and community health awareness program."],
    ["Can students advise patients?", "No. Students cannot give medical advice, diagnosis, treatment suggestions, or medicine recommendations."],
    ["When is a certificate issued?", "After verified hours, at least 80% attendance, approved report, satisfactory conduct, and admin approval."],
    ["Can I verify a certificate publicly?", "Yes. Use the certificate ID or QR verification page."],
  ];

  return (
    <Shell
      onNavigate={onNavigate}
      title="Student Social Work"
      description="Save Medha Foundation Student Social Work Certificate Program."
      path="/student-social-work"
    >
      <main className="bg-[#f8fbf6]">
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(26,149,0,0.10),transparent_52%,rgba(0,51,153,0.08))]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#168f00]">Student Social Work</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
                Save Medha Foundation Student Social Work Certificate Program
              </h1>
              <p className="mt-5 max-w-2xl text-xl font-semibold text-slate-700">
                30/50 Hours Community Health Awareness & Social Work Course
              </p>
              <p className="mt-5 max-w-2xl text-lg font-black text-[#003399]">
                Learn Social Work, Serve Society, Build Your Future.
              </p>
              <p className="mt-2 max-w-2xl text-base font-bold text-slate-700">
                সমাজসেবা শিখুন, মানুষের পাশে দাঁড়ান, নিজের ভবিষ্যৎ গড়ুন।
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/student-social-work/apply" className="inline-flex items-center justify-center rounded-lg bg-[#189500] px-6 py-3 text-sm font-black text-white shadow-sm transition hover:bg-[#137800]">
                  Apply for Certificate Program
                </Link>
                <Link to="/student-social-work/verify" className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-black text-slate-900 transition hover:border-[#189500]">
                  Verify Certificate
                </Link>
              </div>
              <DisclaimerBox className="mt-7 max-w-2xl" />
            </div>

            <div className="rounded-lg border border-emerald-100 bg-white p-5 shadow-xl shadow-emerald-900/10">
              <div className="grid gap-4 sm:grid-cols-2">
                <Stat label="Course Options" value="30/50 hrs" icon={GraduationCap} />
                <Stat label="Attendance Rule" value="80%" icon={CalendarCheck} />
                <Stat label="Final Report" value="Required" icon={FileCheck2} />
                <Stat label="QR Verify" value="Public" icon={QrCode} />
              </div>
              <div className="mt-5 rounded-lg bg-[#003399] p-5 text-white">
                <h2 className="text-lg font-black">Program overview</h2>
                <p className="mt-3 text-sm font-semibold leading-6 text-white/90">
                  Students join guided awareness, survey, documentation, patient-support-desk, and report-writing activities under Save Medha Foundation supervision.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <SectionTitle title="30-hour and 50-hour options" subtitle="Choose the structure that fits your college requirement, availability, and learning goals." />
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <CourseStructure title="30-hour program" rows={STRUCTURE_30} />
            <CourseStructure title="50-hour program" rows={STRUCTURE_50} />
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <SectionTitle title="Who can apply" subtitle="Students who want structured community service exposure, field learning, and documented social work hours." />
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {["College students", "Public health learners", "NSS / social work volunteers", "Students needing NGO hours", "Media/documentation volunteers", "Responsible community learners"].map((item) => (
                  <Pill key={item}>{item}</Pill>
                ))}
              </div>
            </div>
            <div>
              <SectionTitle title="Work areas" />
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {WORK_AREAS.map((area) => <Pill key={area}>{area}</Pill>)}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionTitle title="Student benefits" subtitle="A practical, ethical way to learn social responsibility and community health awareness." />
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {BENEFITS.map((benefit) => <Pill key={benefit}>{benefit}</Pill>)}
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-xl font-black text-slate-950">Registration process</h3>
              <ol className="mt-4 grid gap-3 text-sm font-semibold text-slate-700">
                {["Submit application", "Foundation reviews documents and availability", "Admin approves eligible students", "Batch and work area assignment", "Complete verified social work hours", "Submit report", "Certificate eligibility review"].map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#189500] text-xs font-black text-white">{index + 1}</span>
                    <span className="pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
            <div className="lg:col-span-2">
              <SectionTitle title="Certificate rules" />
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {["Completed verified hours must meet selected duration", "Attendance percentage must be at least 80%", "Final report must be approved", "Conduct must be satisfactory", "Admin/administrator must approve certificate issue", "Public verification hides private documents and notes"].map((rule) => (
                  <div key={rule} className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-700">{rule}</div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-xl font-black text-slate-950">Fee information</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                Program fees, if applicable, are confirmed by Save Medha Foundation after application review. The admin panel includes fee visibility settings for 30-hour and 50-hour programs.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <SectionTitle title="FAQ" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {faqs.map(([question, answer]) => (
              <div key={question} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-black text-slate-950">{question}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{answer}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/student-social-work/apply" className="inline-flex rounded-lg bg-[#189500] px-6 py-3 text-sm font-black text-white">
              Apply Now
            </Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}

export function StudentSocialWorkApply({ onNavigate }) {
  const [form, setForm] = useState(initialApplicationForm);
  const [files, setFiles] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const derivedAge = useMemo(() => {
    if (!form.dob) return "";
    const birthDate = new Date(form.dob);
    if (Number.isNaN(birthDate.getTime())) return "";
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDelta = today.getMonth() - birthDate.getMonth();
    if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < birthDate.getDate())) age -= 1;
    return age;
  }, [form.dob]);

  useEffect(() => {
    if (derivedAge !== "") setForm((current) => ({ ...current, age: String(derivedAge) }));
  }, [derivedAge]);

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const validate = () => {
    const next = {};
    ["fullName", "dob", "gender", "collegeName", "courseDepartment", "semesterYear", "mobile", "email", "address", "emergencyContact", "preferredWorkArea", "availability"].forEach((field) => {
      if (!form[field]) next[field] = "Required";
    });
    if (form.mobile && !mobilePattern.test(form.mobile)) next.mobile = "Enter a valid Indian 10-digit number";
    if (form.whatsapp && !mobilePattern.test(form.whatsapp)) next.whatsapp = "Enter a valid Indian 10-digit number";
    if (form.guardianContact && !mobilePattern.test(form.guardianContact)) next.guardianContact = "Enter a valid Indian 10-digit number";
    if (form.emergencyContact && !mobilePattern.test(form.emergencyContact)) next.emergencyContact = "Enter a valid Indian 10-digit number";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.consentAccepted) next.consentAccepted = "Consent is required";
    if (Number(form.age) < 18 && !form.guardianConsentAccepted) next.guardianConsentAccepted = "Guardian consent is required below 18";
    ["idProofFile", "collegeIdFile"].forEach((field) => {
      const file = files[field];
      if (!file) return;
      const allowed = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowed.includes(file.type)) next[field] = "Only PDF, JPG, JPEG, or PNG allowed";
      if (file.size > 5 * 1024 * 1024) next[field] = "Maximum file size is 5MB";
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (event) => {
    event.preventDefault();
    setStatus(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
      const body = new FormData();
      Object.entries(form).forEach(([key, value]) => body.append(key, value));
      if (files.idProofFile) body.append("idProofFile", files.idProofFile);
      if (files.collegeIdFile) body.append("collegeIdFile", files.collegeIdFile);
      const { data } = await api.post("/social-work/applications", body);
      setStatus({
        type: "success",
        message: `Thank you for applying. Your application has been submitted successfully. Save Medha Foundation will review your application and contact you soon. Application ID: ${data.applicationId}`,
      });
      setForm(initialApplicationForm);
      setFiles({});
    } catch (error) {
      setStatus({ type: "error", message: error.response?.data?.message || "Application submission failed." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Shell onNavigate={onNavigate} title="Apply for Student Social Work" description="Apply for the Save Medha Foundation Student Social Work Certificate Program." path="/student-social-work/apply">
      <main className="bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <form onSubmit={submit} className="mx-auto max-w-5xl rounded-lg bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-6">
            <p className="text-sm font-black uppercase tracking-wide text-[#189500]">Application Form</p>
            <h1 className="mt-2 text-3xl font-black text-slate-950">Student Social Work Certificate Program</h1>
            <p className="mt-2 text-slate-600">30/50 Hours Community Health Awareness & Social Work Course</p>
          </div>
          <DisclaimerBox />

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Field label="Salutation">
              <select value={form.salutation} onChange={(e) => update("salutation", e.target.value)} className={inputClass()}>
                <option value="">Select</option>
                <option>Mr.</option>
                <option>Ms.</option>
                <option>Mrs.</option>
                <option>Dr.</option>
              </select>
            </Field>
            <Field label="Full Name" error={errors.fullName}>
              <input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className={inputClass(errors.fullName)} />
            </Field>
            <Field label="Date of Birth" error={errors.dob}>
              <input type="date" value={form.dob} onChange={(e) => update("dob", e.target.value)} className={inputClass(errors.dob)} />
            </Field>
            <Field label="Age">
              <input value={form.age} readOnly className={`${inputClass()} bg-slate-50`} />
            </Field>
            <Field label="Gender" error={errors.gender}>
              <select value={form.gender} onChange={(e) => update("gender", e.target.value)} className={inputClass(errors.gender)}>
                <option value="">Select</option>
                <option>Female</option>
                <option>Male</option>
                <option>Non-binary</option>
                <option>Prefer not to say</option>
              </select>
            </Field>
            <Field label="College/University Name" error={errors.collegeName}>
              <input value={form.collegeName} onChange={(e) => update("collegeName", e.target.value)} className={inputClass(errors.collegeName)} />
            </Field>
            <Field label="Course/Department" error={errors.courseDepartment}>
              <input value={form.courseDepartment} onChange={(e) => update("courseDepartment", e.target.value)} className={inputClass(errors.courseDepartment)} />
            </Field>
            <Field label="Semester/Year" error={errors.semesterYear}>
              <input value={form.semesterYear} onChange={(e) => update("semesterYear", e.target.value)} className={inputClass(errors.semesterYear)} />
            </Field>
            <Field label="Mobile Number" error={errors.mobile}>
              <input value={form.mobile} onChange={(e) => update("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))} className={inputClass(errors.mobile)} />
            </Field>
            <Field label="WhatsApp Number" error={errors.whatsapp}>
              <input value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value.replace(/\D/g, "").slice(0, 10))} className={inputClass(errors.whatsapp)} />
            </Field>
            <Field label="Email ID" error={errors.email}>
              <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass(errors.email)} />
            </Field>
            <Field label="Guardian Name">
              <input value={form.guardianName} onChange={(e) => update("guardianName", e.target.value)} className={inputClass()} />
            </Field>
            <Field label="Guardian Contact Number" error={errors.guardianContact}>
              <input value={form.guardianContact} onChange={(e) => update("guardianContact", e.target.value.replace(/\D/g, "").slice(0, 10))} className={inputClass(errors.guardianContact)} />
            </Field>
            <Field label="Emergency Contact Number" error={errors.emergencyContact}>
              <input value={form.emergencyContact} onChange={(e) => update("emergencyContact", e.target.value.replace(/\D/g, "").slice(0, 10))} className={inputClass(errors.emergencyContact)} />
            </Field>
            <Field label="Preferred Course">
              <select value={form.preferredDuration} onChange={(e) => update("preferredDuration", e.target.value)} className={inputClass()}>
                <option value="30">30 Hours</option>
                <option value="50">50 Hours</option>
              </select>
            </Field>
            <Field label="Preferred Work Area" error={errors.preferredWorkArea}>
              <select value={form.preferredWorkArea} onChange={(e) => update("preferredWorkArea", e.target.value)} className={inputClass(errors.preferredWorkArea)}>
                {WORK_AREAS.map((area) => <option key={area}>{area}</option>)}
              </select>
            </Field>
            <Field label="Availability" error={errors.availability}>
              <select value={form.availability} onChange={(e) => update("availability", e.target.value)} className={inputClass(errors.availability)}>
                {["Sunday", "Weekday", "Vacation", "Flexible"].map((item) => <option key={item}>{item}</option>)}
              </select>
            </Field>
            <Field label="ID Proof Upload" error={errors.idProofFile}>
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setFiles((current) => ({ ...current, idProofFile: e.target.files?.[0] }))} className="w-full rounded-lg border border-slate-300 px-3 py-2" />
            </Field>
            <Field label="College ID Upload" error={errors.collegeIdFile}>
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setFiles((current) => ({ ...current, collegeIdFile: e.target.files?.[0] }))} className="w-full rounded-lg border border-slate-300 px-3 py-2" />
            </Field>
            <Field label="Address" error={errors.address} className="md:col-span-2">
              <textarea value={form.address} onChange={(e) => update("address", e.target.value)} className={textareaClass(errors.address)} />
            </Field>
          </div>

          <div className="mt-6 grid gap-3">
            <label className="flex items-start gap-3 text-sm font-semibold text-slate-700">
              <input type="checkbox" checked={form.consentAccepted} onChange={(e) => update("consentAccepted", e.target.checked)} className="mt-1" />
              <span>I consent to participate in this social work and community awareness program. {DISCLAIMER}</span>
            </label>
            {errors.consentAccepted ? <p className="text-xs font-bold text-red-700">{errors.consentAccepted}</p> : null}
            {Number(form.age) < 18 ? (
              <>
                <label className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                  <input type="checkbox" checked={form.guardianConsentAccepted} onChange={(e) => update("guardianConsentAccepted", e.target.checked)} className="mt-1" />
                  <span>Guardian consent accepted for applicant below 18.</span>
                </label>
                {errors.guardianConsentAccepted ? <p className="text-xs font-bold text-red-700">{errors.guardianConsentAccepted}</p> : null}
              </>
            ) : null}
          </div>

          {status ? (
            <p className={`mt-5 rounded-lg px-4 py-3 text-sm font-bold ${status.type === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}`}>
              {status.message}
            </p>
          ) : null}
          <button type="submit" disabled={submitting} className="mt-6 rounded-lg bg-[#189500] px-6 py-3 text-sm font-black text-white disabled:opacity-60">
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </main>
    </Shell>
  );
}

export function StudentSocialWorkVerify({ onNavigate }) {
  const params = useParams();
  const navigate = useNavigate();
  const [certificateId, setCertificateId] = useState(params.certificateId || "");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const verify = async (id = certificateId) => {
    const cleanId = id.trim();
    if (!cleanId) return;
    setLoading(true);
    setResult(null);
    try {
      const { data } = await api.get(`/social-work/certificates/verify/${encodeURIComponent(cleanId)}`);
      setResult(data);
    } catch {
      setResult({ verified: false });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.certificateId) verify(params.certificateId);
  }, [params.certificateId]);

  const submit = (event) => {
    event.preventDefault();
    if (certificateId.trim()) navigate(`/student-social-work/verify/${certificateId.trim()}`);
  };

  return (
    <Shell onNavigate={onNavigate} title="Verify Student Social Work Certificate" description="Public certificate verification for Save Medha Foundation." path="/student-social-work/verify">
      <main className="min-h-[60vh] bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-black text-slate-950">Certificate Verification</h1>
          <p className="mt-2 text-slate-600">Enter the certificate ID printed on the certificate or scan its QR code.</p>
          <form onSubmit={submit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input value={certificateId} onChange={(e) => setCertificateId(e.target.value)} placeholder="SMF-SSW-YYYY-0001" className="h-12 flex-1 rounded-lg border border-slate-300 px-4 outline-none focus:border-[#189500]" />
            <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#189500] px-5 py-3 font-black text-white"><Search size={18} /> Verify</button>
          </form>
          {loading ? <p className="mt-6 font-semibold text-slate-600">Checking certificate...</p> : null}
          {result ? (
            <div className={`mt-6 rounded-lg border p-5 ${result.verified ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}`}>
              <div className="flex items-center gap-2">
                <BadgeCheck className={result.verified ? "text-emerald-700" : "text-red-700"} />
                <p className={`text-xl font-black ${result.verified ? "text-emerald-800" : "text-red-800"}`}>{result.verified ? "Verified" : "Not Verified"}</p>
              </div>
              {result.verified ? (
                <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                  {[
                    ["Student Name", result.studentName],
                    ["Certificate ID", result.certificateId],
                    ["Program Name", result.programName],
                    ["Duration", result.duration],
                    ["Batch Code", result.batchCode],
                    ["Issue Date", formatDate(result.issueDate)],
                    ["Organization", result.organization || "Save Medha Foundation"],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="font-bold text-slate-500">{label}</dt>
                      <dd className="mt-1 font-black text-slate-900">{value || "-"}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>
          ) : null}
        </section>
      </main>
    </Shell>
  );
}

function AdminCard({ title, children, action }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <h2 className="text-lg font-black text-slate-900">{title}</h2>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function useAdminData(activeTab) {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const endpoints = {
        overview: "/social-work/admin/dashboard",
        applications: "/social-work/applications",
        students: "/social-work/students",
        batches: "/social-work/batches",
        attendance: "/social-work/attendance",
        reports: "/social-work/reports",
        certificates: "/social-work/certificates",
      };
      if (!endpoints[activeTab]) {
        setData({});
        return;
      }
      const { data: response } = await api.get(endpoints[activeTab]);
      setData(response);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load data. Please check admin login token.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [activeTab]);

  return { data, error, loading, reload: load };
}

function AdminShell({ activeTab, token, setToken, saveToken, children }) {
  const navigate = useNavigate();
  const tabHref = (key) => (key === "overview" ? "/admin/social-work" : `/admin/social-work/${key}`);
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 rounded-lg bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-black text-slate-950">Social Work Program</h1>
          <p className="mt-1 text-sm text-slate-600">Admin screens use the existing Save Medha bearer token stored in localStorage.</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input value={token} onChange={(e) => setToken(e.target.value)} placeholder="Paste admin token" className="h-11 flex-1 rounded-lg border border-slate-300 px-3" />
            <button onClick={saveToken} className="rounded-lg bg-slate-950 px-5 py-2 text-sm font-black text-white">Save Token</button>
          </div>
        </div>
        <div className="mb-5 flex gap-2 overflow-x-auto">
          {ADMIN_TABS.map(([key, label, Icon]) => (
            <button key={key} onClick={() => navigate(tabHref(key))} className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-black ${activeTab === key ? "bg-[#189500] text-white" : "bg-white text-slate-700"}`}>
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>
        {children}
      </div>
    </main>
  );
}

export function StudentSocialWorkAdmin() {
  const location = useLocation();
  const activeTab = adminTabFromPath(location.pathname);
  const { data, error, loading, reload } = useAdminData(activeTab);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [batchForm, setBatchForm] = useState({ batchCode: "", batchName: "", durationHours: "30", startDate: "", endDate: "", mode: "offline", venue: "", coordinatorName: "", coordinatorContact: "", maxStudents: "", status: "upcoming" });
  const [assignForm, setAssignForm] = useState({ batchId: "", studentIds: "" });
  const [attendanceForm, setAttendanceForm] = useState({ student: "", batch: "", activityDate: "", activityType: "Field Survey", activityTitle: "", location: "", hoursCompleted: "", supervisorName: "", verificationStatus: "verified" });
  const [attendanceFile, setAttendanceFile] = useState(null);
  const [reviewNotes, setReviewNotes] = useState({});
  const [settingsForm, setSettingsForm] = useState(() => {
    const fallback = { programTitle: "Save Medha Foundation Student Social Work Certificate Program", adminEmail: "", fee30Hours: "", fee50Hours: "", showFee: false, registrationOpen: true, certificateSignatureName: "", certificateSignatureDesignation: "", certificateFooterText: "" };
    if (typeof window === "undefined") return fallback;
    try {
      return { ...fallback, ...JSON.parse(localStorage.getItem("socialWorkSettingsDraft") || "{}") };
    } catch {
      return fallback;
    }
  });

  const saveToken = () => {
    localStorage.setItem("token", token.trim());
    window.dispatchEvent(new Event("auth-change"));
    reload();
  };

  const adminAction = async (callback, success = "Action completed.") => {
    setMessage("");
    try {
      await callback();
      setMessage(success);
      reload();
    } catch (err) {
      setMessage(err.response?.data?.message || "Action failed.");
    }
  };

  const downloadCsv = async (endpoint, filename) => {
    try {
      const { data: csv } = await api.get(endpoint, { responseType: "blob" });
      const url = URL.createObjectURL(csv);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setMessage(err.response?.data?.message || "CSV export failed.");
    }
  };

  const rows = Array.isArray(data) ? data : [];
  const applications = activeTab === "applications" ? rows.filter((item) => [item.fullName, item.collegeName, item.email, item.status].join(" ").toLowerCase().includes(search.toLowerCase())) : [];
  const students = activeTab === "students" ? rows.filter((item) => [item.studentCode, item.fullName, item.collegeName, item.status].join(" ").toLowerCase().includes(search.toLowerCase())) : [];

  return (
    <AdminShell activeTab={activeTab} token={token} setToken={setToken} saveToken={saveToken}>
      {error ? <p className="mb-5 rounded-lg bg-red-50 p-3 font-bold text-red-800">{error}</p> : null}
      {message ? <p className="mb-5 rounded-lg bg-emerald-50 p-3 font-bold text-emerald-800">{message}</p> : null}
      {loading ? <p className="rounded-lg bg-white p-5 font-semibold">Loading...</p> : null}

      {activeTab === "overview" && !loading ? (
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          <Stat label="Total Applications" value={data.applications || 0} icon={FileText} />
          <Stat label="Pending Applications" value={data.underReviewApplications || 0} icon={ShieldAlert} />
          <Stat label="Approved Students" value={data.students || 0} icon={Users} />
          <Stat label="Active Batches" value={data.batches || 0} icon={CalendarCheck} />
          <Stat label="Completed Students" value={data.completedStudents || 0} icon={GraduationCap} />
          <Stat label="Certificates Issued" value={data.issuedCertificates || 0} icon={Award} />
        </div>
      ) : null}

      {activeTab === "applications" ? (
        <AdminCard
          title="Applications"
          action={<button onClick={() => downloadCsv("/social-work/export/applications", "social-work-applications.csv")} className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-black text-white"><Download size={16} /> Export</button>}
        >
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search applications" className="mb-4 h-10 w-full rounded-lg border border-slate-300 px-3 md:max-w-sm" />
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>{["Name", "College", "Duration", "Work Area", "Status", "Date", "Actions"].map((head) => <th key={head} className="px-3 py-2">{head}</th>)}</tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app._id} className="border-t">
                    <td className="px-3 py-3 font-bold">{app.fullName}</td>
                    <td className="px-3 py-3">{app.collegeName}</td>
                    <td className="px-3 py-3">{app.preferredDuration} Hours</td>
                    <td className="px-3 py-3">{app.preferredWorkArea}</td>
                    <td className="px-3 py-3">{app.status}</td>
                    <td className="px-3 py-3">{formatDate(app.createdAt)}</td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => { setSelectedApplication(app); setAdminNotes(app.adminNotes || ""); }} className="rounded bg-slate-100 px-3 py-1 font-bold"><Eye size={14} /></button>
                        <button onClick={() => adminAction(() => api.post(`/social-work/students/approve/${app._id}`), "Student approved.")} className="rounded bg-emerald-600 px-3 py-1 font-bold text-white">Approve</button>
                        <button onClick={() => adminAction(() => api.patch(`/social-work/applications/${app._id}/status`, { status: "rejected" }), "Application rejected.")} className="rounded bg-red-50 px-3 py-1 font-bold text-red-700">Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {selectedApplication ? (
            <div className="fixed inset-0 z-[80] bg-black/40 p-4" onClick={() => setSelectedApplication(null)}>
              <div className="mx-auto max-h-[90vh] max-w-3xl overflow-y-auto rounded-lg bg-white p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-black">{selectedApplication.fullName}</h3>
                  <button onClick={() => setSelectedApplication(null)} className="font-black">Close</button>
                </div>
                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  {[
                    ["Application ID", selectedApplication.applicationId],
                    ["Email", selectedApplication.email],
                    ["Mobile", selectedApplication.mobile],
                    ["College", selectedApplication.collegeName],
                    ["Course", selectedApplication.courseDepartment],
                    ["Duration", `${selectedApplication.preferredDuration} Hours`],
                    ["Work Area", selectedApplication.preferredWorkArea],
                    ["Availability", selectedApplication.availability],
                    ["Guardian", selectedApplication.guardianName],
                    ["Emergency", selectedApplication.emergencyContact],
                  ].map(([label, value]) => (
                    <div key={label}><dt className="font-bold text-slate-500">{label}</dt><dd className="font-black text-slate-900">{value || "-"}</dd></div>
                  ))}
                </dl>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedApplication.idProofFile?.url ? <a href={selectedApplication.idProofFile.url} target="_blank" rel="noreferrer" className="rounded bg-slate-100 px-3 py-2 text-sm font-bold">ID proof</a> : null}
                  {selectedApplication.collegeIdFile?.url ? <a href={selectedApplication.collegeIdFile.url} target="_blank" rel="noreferrer" className="rounded bg-slate-100 px-3 py-2 text-sm font-bold">College ID</a> : null}
                </div>
                <textarea value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} placeholder="Admin notes" className="mt-4 min-h-24 w-full rounded border px-3 py-2" />
                <div className="mt-4 flex flex-wrap gap-2">
                  <button onClick={() => adminAction(() => api.patch(`/social-work/applications/${selectedApplication._id}/status`, { status: "under_review", adminNotes }), "Notes saved.")} className="rounded bg-slate-950 px-4 py-2 font-bold text-white">Save Notes</button>
                  <button onClick={() => adminAction(() => api.post(`/social-work/students/approve/${selectedApplication._id}`), "Student approved.")} className="rounded bg-emerald-600 px-4 py-2 font-bold text-white">Approve</button>
                  <button onClick={() => adminAction(() => api.patch(`/social-work/applications/${selectedApplication._id}/status`, { status: "rejected", adminNotes }), "Application rejected.")} className="rounded bg-red-600 px-4 py-2 font-bold text-white">Reject</button>
                </div>
              </div>
            </div>
          ) : null}
        </AdminCard>
      ) : null}

      {activeTab === "students" ? (
        <AdminCard title="Students" action={<button onClick={() => downloadCsv("/social-work/export/students", "social-work-students.csv")} className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-black text-white"><Download size={16} /> Export</button>}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students" className="mb-4 h-10 w-full rounded-lg border border-slate-300 px-3 md:max-w-sm" />
          <div className="grid gap-3">
            {students.map((student) => (
              <div key={student._id} className="rounded-lg border border-slate-200 p-4">
                <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                  <div>
                    <p className="font-black">{student.studentCode} - {student.fullName}</p>
                    <p className="text-sm text-slate-600">{student.collegeName} | {student.durationHours} Hours | {student.assignedBatch?.batchCode || "No batch"}</p>
                    <p className="text-sm text-slate-600">Hours: {student.totalVerifiedHours || 0} | Status: {student.status} | Conduct: {student.conductStatus}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => adminAction(() => api.patch(`/social-work/students/${student._id}`, { conductStatus: "satisfactory" }), "Conduct marked satisfactory.")} className="rounded bg-slate-100 px-3 py-2 text-sm font-bold">Satisfactory</button>
                    <button onClick={() => adminAction(() => api.post(`/social-work/certificates/issue/${student._id}`), "Certificate issued.")} className="rounded bg-[#189500] px-3 py-2 text-sm font-bold text-white">Issue Certificate</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
      ) : null}

      {activeTab === "batches" ? (
        <div className="grid gap-5">
          <AdminCard title="Create batch">
            <form onSubmit={(e) => { e.preventDefault(); adminAction(() => api.post("/social-work/batches", batchForm), "Batch created."); }} className="grid gap-3 md:grid-cols-3">
              {[
                ["batchCode", "Batch code"],
                ["batchName", "Batch name"],
                ["startDate", "Start date"],
                ["endDate", "End date"],
                ["venue", "Venue"],
                ["coordinatorName", "Coordinator"],
                ["coordinatorContact", "Coordinator contact"],
                ["maxStudents", "Max students"],
              ].map(([field, placeholder]) => (
                <input key={field} type={field.includes("Date") ? "date" : "text"} placeholder={placeholder} value={batchForm[field]} onChange={(e) => setBatchForm({ ...batchForm, [field]: e.target.value })} className="h-10 rounded border px-3" required={["batchCode", "batchName", "startDate"].includes(field)} />
              ))}
              <select value={batchForm.durationHours} onChange={(e) => setBatchForm({ ...batchForm, durationHours: e.target.value })} className="h-10 rounded border px-3"><option value="30">30 Hours</option><option value="50">50 Hours</option></select>
              <select value={batchForm.mode} onChange={(e) => setBatchForm({ ...batchForm, mode: e.target.value })} className="h-10 rounded border px-3"><option>offline</option><option>online</option><option>hybrid</option></select>
              <select value={batchForm.status} onChange={(e) => setBatchForm({ ...batchForm, status: e.target.value })} className="h-10 rounded border px-3"><option>upcoming</option><option>active</option><option>completed</option><option>cancelled</option></select>
              <button className="inline-flex items-center justify-center gap-2 rounded bg-[#189500] px-4 py-2 font-black text-white"><Plus size={16} /> Create</button>
            </form>
          </AdminCard>
          <AdminCard title="Assign students">
            <form onSubmit={(e) => { e.preventDefault(); adminAction(() => api.post(`/social-work/batches/${assignForm.batchId}/assign-students`, { studentIds: assignForm.studentIds.split(",").map((id) => id.trim()).filter(Boolean) }), "Students assigned."); }} className="grid gap-3 md:grid-cols-[1fr_2fr_auto]">
              <input placeholder="Batch Mongo ID" value={assignForm.batchId} onChange={(e) => setAssignForm({ ...assignForm, batchId: e.target.value })} className="h-10 rounded border px-3" required />
              <input placeholder="Student Mongo IDs, comma separated" value={assignForm.studentIds} onChange={(e) => setAssignForm({ ...assignForm, studentIds: e.target.value })} className="h-10 rounded border px-3" required />
              <button className="rounded bg-slate-950 px-4 py-2 font-black text-white">Assign</button>
            </form>
          </AdminCard>
          <AdminCard title="Batches">
            <div className="grid gap-3 md:grid-cols-2">
              {rows.map((batch) => (
                <div key={batch._id} className="rounded-lg border p-4">
                  <p className="font-black">{batch.batchCode} - {batch.batchName}</p>
                  <p className="text-sm text-slate-600">{batch.durationHours} Hours | {batch.mode} | {batch.status}</p>
                  <p className="text-sm text-slate-600">{formatDate(batch.startDate)} to {formatDate(batch.endDate)} | Students: {batch.students?.length || 0}</p>
                  <button onClick={() => adminAction(() => api.delete(`/social-work/batches/${batch._id}`), "Batch deleted.")} className="mt-3 rounded bg-red-50 px-3 py-1 text-sm font-bold text-red-700">Delete</button>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>
      ) : null}

      {activeTab === "attendance" ? (
        <AdminCard title="Attendance / Hour Tracking">
          <form onSubmit={(e) => { e.preventDefault(); const body = new FormData(); Object.entries(attendanceForm).forEach(([key, value]) => body.append(key, value)); if (attendanceFile) body.append("proofFile", attendanceFile); adminAction(() => api.post("/social-work/attendance", body), "Attendance added."); }} className="grid gap-3 md:grid-cols-2">
            {[
              ["student", "Student Mongo ID"],
              ["batch", "Batch Mongo ID"],
              ["activityDate", "Activity date"],
              ["activityType", "Activity type"],
              ["activityTitle", "Activity title"],
              ["location", "Location"],
              ["hoursCompleted", "Hours completed"],
              ["supervisorName", "Supervisor"],
            ].map(([field, placeholder]) => (
              <input key={field} type={field === "activityDate" ? "date" : field === "hoursCompleted" ? "number" : "text"} min={field === "hoursCompleted" ? "0" : undefined} max={field === "hoursCompleted" ? "12" : undefined} placeholder={placeholder} value={attendanceForm[field]} onChange={(e) => setAttendanceForm({ ...attendanceForm, [field]: e.target.value })} className="h-10 rounded border px-3" required={["student", "activityDate", "activityType", "activityTitle", "hoursCompleted"].includes(field)} />
            ))}
            <select value={attendanceForm.verificationStatus} onChange={(e) => setAttendanceForm({ ...attendanceForm, verificationStatus: e.target.value })} className="h-10 rounded border px-3"><option>pending</option><option>verified</option><option>rejected</option></select>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setAttendanceFile(e.target.files?.[0])} className="rounded border px-3 py-2" />
            <button className="rounded bg-[#189500] px-4 py-2 font-black text-white">Add Hours</button>
          </form>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500"><tr>{["Student", "Activity", "Hours", "Status", "Date", "Action"].map((h) => <th key={h} className="px-3 py-2">{h}</th>)}</tr></thead>
              <tbody>{rows.map((item) => <tr key={item._id} className="border-t"><td className="px-3 py-3">{item.student?.fullName}</td><td className="px-3 py-3">{item.activityTitle}</td><td className="px-3 py-3">{item.hoursCompleted}</td><td className="px-3 py-3">{item.verificationStatus}</td><td className="px-3 py-3">{formatDate(item.activityDate)}</td><td className="px-3 py-3"><button onClick={() => adminAction(() => api.patch(`/social-work/attendance/${item._id}/verify`, { verificationStatus: "verified" }), "Attendance verified.")} className="rounded bg-emerald-600 px-3 py-1 font-bold text-white">Verify</button></td></tr>)}</tbody>
            </table>
          </div>
        </AdminCard>
      ) : null}

      {activeTab === "reports" ? (
        <AdminCard title="Reports">
          <div className="grid gap-3">
            {rows.map((report) => (
              <div key={report._id} className="rounded-lg border p-4">
                <p className="font-black">{report.reportTitle}</p>
                <p className="text-sm text-slate-600">{report.student?.fullName} | {report.reviewStatus} | {formatDate(report.submittedAt)}</p>
                <textarea value={reviewNotes[report._id] || ""} onChange={(e) => setReviewNotes({ ...reviewNotes, [report._id]: e.target.value })} placeholder="Review notes" className="mt-3 min-h-20 w-full rounded border px-3 py-2" />
                <div className="mt-3 flex flex-wrap gap-2">
                  {report.reportFile?.url ? <a href={report.reportFile.url} target="_blank" rel="noreferrer" className="rounded bg-slate-100 px-3 py-1 font-bold">Open Report</a> : null}
                  <button onClick={() => adminAction(() => api.patch(`/social-work/reports/${report._id}/review`, { reviewStatus: "approved", reviewNotes: reviewNotes[report._id] }), "Report approved.")} className="rounded bg-emerald-600 px-3 py-1 font-bold text-white">Approve</button>
                  <button onClick={() => adminAction(() => api.patch(`/social-work/reports/${report._id}/review`, { reviewStatus: "rejected", reviewNotes: reviewNotes[report._id] }), "Report rejected.")} className="rounded bg-red-50 px-3 py-1 font-bold text-red-700">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
      ) : null}

      {activeTab === "certificates" ? (
        <AdminCard title="Certificates" action={<button onClick={() => downloadCsv("/social-work/export/certificates", "social-work-certificates.csv")} className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-black text-white"><Download size={16} /> Export</button>}>
          <p className="mb-4 text-sm font-semibold text-slate-600">Issue certificates from the Students page. The backend blocks issue until eligibility is true.</p>
          <div className="grid gap-3">
            {rows.map((certificate) => {
              const verifyLink = `${window.location.origin}/student-social-work/verify/${certificate.certificateId}`;
              return (
                <div key={certificate._id} className="flex flex-col justify-between gap-3 rounded-lg border p-4 sm:flex-row">
                  <div>
                    <p className="font-black">{certificate.certificateId}</p>
                    <p className="text-sm text-slate-600">{certificate.student?.fullName} | {certificate.durationHours} Hours | {certificate.certificateStatus}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link to={`/student-social-work/certificate/${certificate.certificateId}`} className="rounded bg-[#003399] px-3 py-2 text-sm font-bold text-white">View</Link>
                    <button onClick={() => navigator.clipboard?.writeText(verifyLink)} className="inline-flex items-center gap-1 rounded bg-slate-100 px-3 py-2 text-sm font-bold"><Copy size={14} /> Copy</button>
                    <button onClick={() => adminAction(() => api.patch(`/social-work/certificates/${certificate._id}/revoke`, { revokeReason: "Revoked by admin" }), "Certificate revoked.")} className="rounded bg-red-50 px-3 py-2 text-sm font-bold text-red-700">Revoke</button>
                  </div>
                </div>
              );
            })}
          </div>
        </AdminCard>
      ) : null}

      {activeTab === "settings" ? (
        <AdminCard
          title="Settings"
          action={<button onClick={() => { localStorage.setItem("socialWorkSettingsDraft", JSON.stringify(settingsForm)); setMessage("Settings draft saved locally."); }} className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-black text-white">Save Draft</button>}
        >
          <p className="mb-4 rounded-lg bg-amber-50 p-3 text-sm font-bold text-amber-900">Settings fields are available here. This draft is stored locally until backend settings endpoints are added.</p>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              ["programTitle", "Program title"],
              ["adminEmail", "Admin email"],
              ["fee30Hours", "30-hour fee"],
              ["fee50Hours", "50-hour fee"],
              ["certificateSignatureName", "Certificate signature name"],
              ["certificateSignatureDesignation", "Certificate signature designation"],
              ["certificateFooterText", "Certificate footer text"],
            ].map(([field, label]) => (
              <label key={field} className="text-sm font-bold text-slate-700">{label}<input value={settingsForm[field]} onChange={(e) => setSettingsForm({ ...settingsForm, [field]: e.target.value })} className="mt-2 h-10 w-full rounded border px-3" /></label>
            ))}
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700"><input type="checkbox" checked={settingsForm.showFee} onChange={(e) => setSettingsForm({ ...settingsForm, showFee: e.target.checked })} /> Show fee</label>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700"><input type="checkbox" checked={settingsForm.registrationOpen} onChange={(e) => setSettingsForm({ ...settingsForm, registrationOpen: e.target.checked })} /> Registration open</label>
          </div>
        </AdminCard>
      ) : null}
    </AdminShell>
  );
}

export function StudentSocialWorkDashboard() {
  const [data, setData] = useState(null);
  const [report, setReport] = useState({ reportTitle: "" });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const load = async () => {
    try {
      const { data: response } = await api.get("/social-work/student/me");
      setData(response);
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to load dashboard.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submitReport = async (event) => {
    event.preventDefault();
    const body = new FormData();
    body.append("reportTitle", report.reportTitle);
    if (file) body.append("reportFile", file);
    try {
      await api.post("/social-work/reports", body);
      setMessage("Report submitted.");
      setReport({ reportTitle: "" });
      setFile(null);
      load();
    } catch (error) {
      setMessage(error.response?.data?.message || "Report submission failed.");
    }
  };

  const student = data?.student;
  const eligibility = data?.eligibility;
  const progress = student ? Math.min(100, Math.round(((student.totalVerifiedHours || 0) / student.durationHours) * 100)) : 0;
  const latestReport = data?.reports?.[0];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-black text-slate-950">Student Social Work Dashboard</h1>
        <p className="mt-2 text-slate-600">Track verified hours, attendance, reports, and certificate eligibility.</p>
        <DisclaimerBox className="mt-5" />
        {message ? <p className="mt-5 rounded-lg bg-amber-50 p-3 font-bold text-amber-900">{message}</p> : null}
        {student ? (
          <>
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              <Stat label="Course Duration" value={`${student.durationHours} hrs`} icon={GraduationCap} />
              <Stat label="Verified Hours" value={student.totalVerifiedHours || 0} icon={BookOpenCheck} />
              <Stat label="Attendance" value={`${student.attendancePercentage || 0}%`} icon={CalendarCheck} />
              <Stat label="Eligible" value={eligibility?.eligible ? "Yes" : "No"} icon={Award} />
            </div>
            <div className="mt-6 rounded-lg bg-white p-5 shadow-sm">
              <div className="grid gap-4 md:grid-cols-2">
                <div><p className="text-xs font-bold text-slate-500">Application / student status</p><p className="font-black">{student.status}</p></div>
                <div><p className="text-xs font-bold text-slate-500">Assigned batch</p><p className="font-black">{student.assignedBatch?.batchCode || "Not assigned"}</p></div>
                <div><p className="text-xs font-bold text-slate-500">Assigned work area</p><p className="font-black">{student.workArea || "-"}</p></div>
                <div><p className="text-xs font-bold text-slate-500">Upcoming activity</p><p className="font-black">To be announced by coordinator</p></div>
                <div><p className="text-xs font-bold text-slate-500">Report status</p><p className="font-black">{latestReport?.reviewStatus || "Not submitted"}</p></div>
                <div><p className="text-xs font-bold text-slate-500">Certificate eligibility</p><p className="font-black">{eligibility?.eligible ? "Eligible" : eligibility?.reasons?.join(", ") || "Pending"}</p></div>
              </div>
              <div className="mt-5 h-3 rounded-full bg-slate-100"><div className="h-3 rounded-full bg-[#189500]" style={{ width: `${progress}%` }} /></div>
            </div>
            <form onSubmit={submitReport} className="mt-6 rounded-lg bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black">Submit Final Report</h2>
              <div className="mt-4 grid gap-3">
                <input value={report.reportTitle} onChange={(e) => setReport({ reportTitle: e.target.value })} placeholder="Report title" className="h-11 rounded border px-3" required />
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setFile(e.target.files?.[0])} className="rounded border px-3 py-2" />
                <button className="w-fit rounded bg-[#189500] px-5 py-2 font-black text-white">Submit Report</button>
              </div>
            </form>
            {data.certificate ? (
              <Link to={`/student-social-work/certificate/${data.certificate.certificateId}`} className="mt-6 inline-flex rounded-lg bg-[#003399] px-5 py-3 font-black text-white">View / Download Certificate</Link>
            ) : null}
          </>
        ) : null}
      </div>
    </main>
  );
}

export function StudentSocialWorkCertificatePrint() {
  const { certificateId } = useParams();
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/social-work/certificates/verify/${certificateId}`);
        setCertificate(data);
      } catch {
        setCertificate({ verified: false });
      }
    };
    load();
  }, [certificateId]);

  if (!certificate) return <main className="p-8">Loading certificate...</main>;
  if (!certificate.verified) return <main className="p-8">Certificate not verified.</main>;

  const verificationUrl = `${window.location.origin}/student-social-work/verify/${certificate.certificateId}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(verificationUrl)}`;

  return (
    <main className="min-h-screen bg-slate-100 p-6 print:bg-white">
      <div className="mx-auto max-w-4xl rounded-lg border-8 border-[#189500] bg-white p-10 text-center shadow-xl print:shadow-none">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-[#003399]">Save Medha Foundation</p>
        <h1 className="mt-5 text-4xl font-black text-slate-950">Certificate of Completion</h1>
        <p className="mt-4 text-lg text-slate-600">This certifies that</p>
        <p className="mt-3 text-3xl font-black text-[#189500]">{certificate.studentName}</p>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-700">
          Successfully completed {certificate.duration} of Social Work & Community Health Awareness Program under Save Medha Foundation.
        </p>
        <div className="mt-8 grid gap-4 text-left sm:grid-cols-3">
          <div className="rounded-lg bg-slate-50 p-4"><p className="text-xs font-bold text-slate-500">Certificate ID</p><p className="font-black">{certificate.certificateId}</p></div>
          <div className="rounded-lg bg-slate-50 p-4"><p className="text-xs font-bold text-slate-500">Batch Code</p><p className="font-black">{certificate.batchCode || "-"}</p></div>
          <div className="rounded-lg bg-slate-50 p-4"><p className="text-xs font-bold text-slate-500">Issue Date</p><p className="font-black">{formatDate(certificate.issueDate)}</p></div>
        </div>
        <img src={qrCodeUrl} alt="Certificate verification QR code" className="mx-auto mt-8 h-32 w-32" />
        <p className="mt-4 text-xs font-semibold text-slate-500">{CERTIFICATE_DISCLAIMER}</p>
        <button onClick={() => window.print()} className="mt-8 rounded-lg bg-slate-950 px-6 py-3 text-sm font-black text-white print:hidden">Print Certificate</button>
      </div>
    </main>
  );
}
