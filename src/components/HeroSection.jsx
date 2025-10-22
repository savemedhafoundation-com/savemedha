export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <div className="bg-green-500 text-white px-4 py-2 inline-block mb-4">NATURAL IMMUNOTHERAPY</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Empowering lives, <br />
              <span className="text-green-400">Saving futures</span>
            </h1>
            <p className="text-xl mb-8">
              Fighting to make a <span className="text-blue-600 font-bold">CANCER FREE WORLD</span>
            </p>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded font-bold">
              DISCOVER
            </button>
          </div>
          
          <div className="lg:w-1/2 relative">
            {/* Left image */}
            <div className="absolute top-0 left-0 w-full h-full">
              <img 
                src="https://via.placeholder.com/600x400?text=People+with+hands+up+in+sunset" 
                alt="People celebrating" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Right image */}
            <div className="absolute top-0 right-0 w-1/2 h-full">
              <img 
                src="https://via.placeholder.com/300x400?text=Hands+holding+earth+and+ribbon" 
                alt="Earth and ribbon" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-12 h-12 bg-green-200 opacity-50 rounded"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 bg-green-200 opacity-50 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  );
}