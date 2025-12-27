import React from "react";
import { AtSign, Mail, Phone } from "lucide-react";
import HeroBanner from "./HomePageBanner";
import contactBackdrop from "../assets/Photo/contactUsBanner.png";

export default function ContactUsBanner() {
  return (
    <HeroBanner
      backgroundImages={[contactBackdrop]}
      imageAlt="Contact banner"
      showDefaultContent={false}
      showArrows={false}
      containerClassName="min-h-[260px] scale-x-105 sm:min-h-[320px] md:min-h-[380px]"
      overlayStyle={{
        background:
          "linear-gradient(0deg, #74C226 0.14%, rgba(56, 94, 18, 0) 99.86%)",
      }}
    />
  );
}
