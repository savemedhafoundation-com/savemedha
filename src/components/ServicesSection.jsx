import React from 'react';
import imageCancerCare from '../assets/Photo/3.jpg'; 
import imageHeartHealth from '../assets/Photo/5.jpg'; 
import imageKidneyRevival from '../assets/Photo/5.jpg'; 
import imageOtherHealth from '../assets/Photo/6.jpg'; 

export default function ServicesSection() {
  const services = [
    {
      title: "CANCER CARE",
      description:
        "We focus on managing abnormal cells—classified as high-protein and high-toxin cells—through dietary control and detox therapies. By regulating protein intake and cleansing the body naturally, we help restore balance and combat the growth of these cells effectively.",
      image: imageCancerCare, 
    },
    {
      title: "HEART HEALTH",
      description:
        "Our heart health services focus on improving cardiovascular wellness through lifestyle changes, stress management, and targeted therapies to support optimal heart function.",
      image: imageHeartHealth, 
    },
    {
      title: "KIDNEY REVIVAL",
      description:
        "We provide holistic approaches to support kidney function, including detoxification, dietary adjustments, and natural therapies to promote kidney health and recovery.",
      image: imageKidneyRevival, 
    },
    {
      title: "OTHER HEALTH CARE",
      description:
        "Our comprehensive health care services address various conditions with personalized, natural, and integrative approaches to improve overall well-being.",
      image: imageOtherHealth, 
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            OUR <span className="text-green-500">SERVICES</span>
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="service-card bg-gray-50 p-4 rounded-lg text-center">
              <img
                src={service.image} // Use the image from the service object
                alt={service.title}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              {service.description && (
                <div className="bg-red-50 p-3 mb-4 rounded">
                  <p className="text-sm">{service.description}</p>
                </div>
              )}
              <h3
                className={`font-bold ${
                  service.title === "CANCER CARE" ? "text-red-600" : "text-black"
                }`}
              >
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}