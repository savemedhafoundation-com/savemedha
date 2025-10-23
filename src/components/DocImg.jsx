import React from "react";
import DoctorImg from "../assets/Photo/doc.png";   // Doctor circular photo
import Dot from "../assets/Photo/dot.png";         // Green dotted pattern
import Arrow from "../assets/Photo/IMAGE WS (5) (1).png";  // Green triangle

const DoctorCard = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full py-12">
      {/* =============================
          CIRCULAR DOCTOR IMAGE
      ============================= */}
      <div className="relative w-64 h-64 rounded-full overflow-hidden bg-[#E3F2D0] shadow-md z-10">
        <img
          src={DoctorImg}
          alt="Doctor"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* =============================
          TOP-RIGHT DOTTED PATTERN
      ============================= */}
      <img
        src={Dot}
        alt="Dotted Pattern"
        className="absolute -top-4 right-12 w-32 opacity-80"
      />

      {/* =============================
          BOTTOM-RIGHT GREEN TRIANGLE
      ============================= */}
      <img
        src={Arrow}
        alt="Green Triangle"
        className="absolute bottom-0 right-16 w-20 h-20"
      />
    </div>
  );
};

export default DoctorCard;
