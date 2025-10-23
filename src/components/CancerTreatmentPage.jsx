import React, { useState } from 'react';
import { Star, Play, Phone } from 'lucide-react';
import DoctorImg from '../assets/Photo/doc.png';
import Leaf from '../assets/Photo/leaf.png';
import Virus from '../assets/Photo/virus.png';
import Dot from '../assets/Photo/dot.png';
// 👇 Import your triangle image (update path if needed)
import Triangle from '../assets/Photo/triangle.png'; // ← ADD THIS

export default function CancerTreatmentPage() {
  const [activeVideo, setActiveVideo] = useState(null);

  const patientStories = [
    { id: 1, duration: '8:24', label: 'FEEDBACK 1', color: 'blue' },
    { id: 2, duration: '19:52', label: 'FEEDBACK 2', color: 'green' },
    { id: 3, duration: '6:04', label: 'FEEDBACK 3', color: 'green' },
    { id: 4, duration: '7:45', label: 'FEEDBACK 4', color: 'green' },
    { id: 5, duration: '45:24', label: 'FEEDBACK 5', color: 'green' }
  ];

  const healthVideos = [
    { title: 'Breast Cancer Treatment by Natural Immunotherapy – A New Hope', views: '47', time: '4 months ago', duration: '2:22' },
    { title: 'What is Natural Immunotherapy? The Future of Healing', views: '75', time: '4 months ago', duration: '3:18' },
    { title: 'Hope Beyond Blood – Natural Immunotherapy for Thalassemia', views: '25', time: '4 months ago', duration: '4:21' },
    { title: 'How Toxins Turn a Healthy Cell into a Cancer Cell', views: '8', time: '4 months ago', duration: '1:45' }
  ];

  const testimonials = [
    {
      name: 'Bidhan Kumar Halder',
      rating: 5,
      text: 'I am from Bangladesh, I came here and I am fine now.',
      image: 'https://placehold.co/80x80'
    },
    {
      name: 'Soumitra Gayen',
      rating: 5,
      text: 'I am a rectal cancer patient and I am fine now. Best treatment here.',
      image: 'https://placehold.co/80x80'
    },
    {
      name: 'Anowarul Hossain',
      rating: 5,
      text: 'Save Medha Foundation is a new horizon in medical science. It is a real example of easy access to cure for all complex diseases including cancer, thalassemia, and other terminal diseases for the people of West Bengal, Orissa, Assam, Nepal, India and Bangladesh. May Save Medha move forward quickly, best wishes.',
      image: 'https://placehold.co/80x80'
    },
    {
      name: 'Sadekul SK',
      rating: 5,
      text: 'Best and affordable treatment for lower middle class family.',
      image: 'https://placehold.co/80x80'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left: Logo + Virus */}
            <div className="flex items-center gap-4">
              <div className="w-40 h-40 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                <div className="w-40 h-40 bg-white rounded-full overflow-hidden">
                  <img src={Leaf} alt="Logo" className="w-full h-full object-cover" />
                </div>
              </div>
              <img src={Virus} alt="Cancer cells" className="h-40" />
            </div>

            {/* Center: Text + Button */}
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                "OUR GOAL" - CANCER FREE WORLD
              </h1>
              <p className="text-gray-600 mt-1">Subhankar Sarkar</p>
              <button className="mt-3 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors">
                <Phone size={20} />
                CONTACT US
              </button>
            </div>

            {/* Right: Combined Doctor Card */}
            <div className="relative w-90 h-60 bg-white rounded-lg overflow-hidden">
      {/* Circular Doctor Photo with Light Green Background */}
      <div className="absolute left-0 top-0 w-40 h-40 rounded-full overflow-hidden border-4 border-gray-200">
        <div className="w-full h-full bg-green-100 flex items-center justify-center">
          <img
            src={DoctorImg}
            alt="Doctor"
            className="w-full h-full object-cover grayscale"
          />
        </div>
      </div>

      {/* Dot Grid Pattern (Top-Right Corner) */}
      <div className="absolute top-1 right-0 w-40 h-22">
        <img
          src={Dot}
          alt="Dot Pattern"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Green Triangle (Bottom-Right Corner) */}
      <div className="absolute bottom-10 right-0 w-16 h-16  origin-bottom-right">
        <img
          src={Triangle}
          alt="Green Triangle"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
          </div>
        </div>
      </header>

      {/* Patient Success Stories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-4xl font-bold text-center mb-8">
          PATIENT <span className="text-green-500">SUCCESS STORY</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {patientStories.map((story) => (
            <div key={story.id} className="flex flex-col">
              <div className="relative bg-gray-200 rounded-lg overflow-hidden aspect-video group cursor-pointer">
                <img src="https://placehold.co/300x200" alt={`Patient ${story.id}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-all">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <Play fill="white" className="text-white ml-1" size={28} />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {story.duration}
                </div>
              </div>
              <div className={`mt-2 ${story.color === 'blue' ? 'bg-blue-700' : 'bg-green-500'} text-white text-center py-2 rounded font-semibold text-sm`}>
                {story.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Healthcare Videos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <img src="https://placehold.co/60x60" alt="Healthcare icon" className="w-12 h-12" />
            <h2 className="text-3xl font-bold">Browse our latest Videos on</h2>
          </div>
          <h3 className="text-3xl font-bold text-green-500">Healthcare & Wellness</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {healthVideos.map((video, idx) => (
            <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="relative">
                <img src="https://placehold.co/400x225" alt={video.title} className="w-full aspect-video object-cover" />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-sm line-clamp-2 mb-2">{video.title}</h4>
                <p className="text-xs text-gray-600">{video.views} views • {video.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold inline-flex items-center gap-3 transition-colors">
            WATCH NOW
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <Play fill="green" className="text-green-500" size={20} />
            </div>
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-b from-green-50 to-green-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">
              TESTI<span className="text-green-500">MONIALS</span>
            </h2>
            <p className="text-gray-600 mt-2">Turning Vision into Reality</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow relative">
                <div className="absolute -top-8 left-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg bg-green-100">
                    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="mt-10">
                  <h4 className="font-bold text-lg mb-1">{testimonial.name}</h4>
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#FCD34D" className="text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{testimonial.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}