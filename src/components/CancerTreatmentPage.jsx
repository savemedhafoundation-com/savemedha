import React, { useState, useRef } from 'react';
import { Star, Play, Phone, ArrowLeft, ArrowRight } from 'lucide-react';
import DoctorImg from '../assets/Photo/doc.png';
import Leaf from '../assets/Photo/leaf.png';
import Virus from '../assets/Photo/virus.png';
import Dot from '../assets/Photo/dot.png';
// 👇 Import your triangle image (update path if needed)
import Triangle from '../assets/Photo/triangle.png'; 
import Computerimg from "../assets/Photo/Remote work and video call with colleagues.png";


export default function CancerTreatmentPage() {
  const [activeVideo, setActiveVideo] = useState(null);
  const scrollerRef = useRef(null);
  const scrollTestimonials = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = 100; // adjust for slightly smaller card
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

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
    // Original patients
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
    },
    // Demo patients
    {
      name: 'Demo Patient 1',
      rating: 5,
      text: 'I started therapy here and feel healthier and more energetic now.',
      image: 'https://placehold.co/80x80/65a30d/ffffff?text=DP1'
    },
    {
      name: 'Demo Patient 2',
      rating: 5,
      text: 'Kind team and effective care. I noticed steady improvements each week.',
      image: 'https://placehold.co/80x80/16a34a/ffffff?text=DP2'
    },
    {
      name: 'Demo Patient 3',
      rating: 5,
      text: 'The guidance and support gave me hope. I am recovering confidently.',
      image: 'https://placehold.co/80x80/22c55e/ffffff?text=DP3'
    },
    {
      name: 'Demo Patient 4',
      rating: 5,
      text: 'Affordable, compassionate, and focused on natural healing that works.',
      image: 'https://placehold.co/80x80/86efac/064e3b?text=DP4'
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
              <button className="mt-2 bg-[#74C425] hover:bg-[#1118A6] text-white px-6 py-4 rounded-lg flex items-center gap-2 mx-auto transition-colors font-sans  cursor-pointer">
                <Phone size={20} />
                CONTACT US
              </button>
            </div>

            {/* Right: Combined Doctor Card */}
            <div className="relative w-90 h-60 bg-white rounded-lg overflow-hidden">
      {/* Circular Doctor Photo with Light Green Background */}
      <div className="absolute left-0 top-0 w-60 h-60 rounded-full overflow-hidden border-4 border-gray-200">
        <div className="w-full h-full bg-green-100 flex items-center justify-center">
          <img
            src={DoctorImg}
            alt="Doctor"
            className="w-full h-full object-cover grayscale"
          />
        </div>
      </div>

      {/* Dot Grid Pattern (Top-Right Corner) */}
      <div className="absolute top-1 left-60 w-30 h-20 ">
        <img
          src={Dot}
          alt="Dot Pattern"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Green Triangle (Bottom-Right Corner) */}
      <div className="absolute bottom-0 left-60 w-16 h-16  origin-bottom-right">
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
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
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
            <img src={Computerimg} alt="Healthcare icon" className="w-20 h-20" />
            <h2 className="text-3xl font-bold">Browse our latest Videos on</h2>
          </div>
          <h3 className="text-3xl font-bold text-green-500">Healthcare & Wellness</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {healthVideos.map((video, idx) => (
            <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="relative">
                <img src="https://placehold.co/300x220" alt={video.title} className="w-full aspect-video object-cover" />
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
          <button className="bg-green-500 hover:bg-[#1118A6] text-white px-8 py-3 rounded-lg text-lg font-semibold inline-flex items-center gap-3 transition-colors cursor-pointer">
            WATCH NOW
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <Play fill="red" className="text-red-200" size={20} />
            </div>
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-b from-green-50 to-green-100 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-4 lg:px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">
              TESTI <span className="text-green-500">MONIALS</span>
            </h2>
            <p className="text-gray-600 mt-2">Turning Vision into Reality</p>
          </div>

          {/* Horizontally scrollable testimonial cards (match design) */}
          {(() => {
            return (
              <div className="relative w-full -mx-8 sm:-mx-8 lg:-mx-16">
                {/* Left/Right controls */}
                <button
                  type="button"
                  onClick={() => scrollTestimonials(-1)}
                  className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-green-500 text-green-700 items-center justify-center shadow"
                  aria-label="Scroll left"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollTestimonials(1)}
                  className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-green-500 text-green-700 items-center justify-center shadow"
                  aria-label="Scroll right"
                >
                  <ArrowRight size={18} />
                </button>

                {/* Scroll container */}
                <div
                  ref={scrollerRef}
                  className="testimonial-scroller flex gap-2.5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 px-0"
                  style={{ scrollbarWidth: 'auto' }}
                >
                  {testimonials.map((t, idx) => (
                    <div
                      key={idx}
                      className="snap-start flex-shrink-0 w-[180px] sm:w-[184px] md:w-[210px] lg:w-[214px] xl:w-[220px] bg-white border border-green-500 rounded-[20px] p-0.5 relative"
                    >
                      {/* Decorative corner dots (top-left) */}
                      <div className="absolute -top-2 -left-2 w-12 h-12 bg-green-200 rounded-full"/>
                      <div className="absolute left-6 top-3 w-4 h-4 bg-green-600 rounded-full"/>
                      {/* Bottom-right cut removed per request */}

                      {/* Content */}
                      <div className="flex items-start gap-6">
                        {/* Avatar with accent dot */}
                        <div className="relative shrink-0">
                          <div className="absolute -top-2 -left-2 w-5 h-5 bg-green-500 rounded-full opacity-70"/>
                          <img
                            src={t.image}
                            alt={t.name}
                            className="w-11 h-11 rounded-full object-cover ring-4 ring-white shadow"
                          />
                        </div>

                        <div className="flex-1">
                          <h4 className="text-base font-semibold text-gray-900 mb-1">{t.name}</h4>
                          <div className="flex items-center gap-1 text-yellow-400 mb-2">
                            {[...Array(t.rating)].map((_, i) => (
                              <Star key={i} size={16} fill="#FBBF24" className="text-yellow-400" />
                            ))}
                          </div>
                          <p className="text-gray-700 text-[13px] leading-relaxed">{t.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>
    </div>
  );
}
