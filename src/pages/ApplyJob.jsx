import { useState } from "react";

export default function ApplyJob() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    experience: "",
    message: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: connect API / backend
    console.log("Job Application Submitted:", formData);

    alert("Application submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-[#3c6513] mb-2">
          Join Save Medha Foundation
        </h1>
        <p className="text-gray-600 mb-8">
          Be part of a mission-driven healthcare movement focused on Natural
          Immunotherapy and patient-first care.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#3c6513] outline-none"
              placeholder="Your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#3c6513] outline-none"
              placeholder="you@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#3c6513] outline-none"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Applying For
            </label>
            <select
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 bg-white focus:ring-2 focus:ring-[#3c6513] outline-none"
            >
              <option value="">Select a role</option>
              <option value="Medical Consultant">Medical Consultant</option>
              <option value="Nutritionist">Nutritionist</option>
              <option value="Research Assistant">Research Assistant</option>
              <option value="Patient Coordinator">Patient Coordinator</option>
              <option value="Content & SEO Executive">
                Content &amp; SEO Executive
              </option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Years of Experience
            </label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#3c6513] outline-none"
              placeholder="e.g. 2 years"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Why do you want to work with us?
            </label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#3c6513] outline-none"
              placeholder="Share your motivation..."
            ></textarea>
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Resume (PDF/DOC)
            </label>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#3c6513] hover:bg-[#2f5010] text-white py-3 rounded-xl font-semibold transition-all"
          >
            Submit Application
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-6 text-center">
          Save Medha Foundation is an equal opportunity organization.
        </p>
      </div>
    </div>
  );
}
