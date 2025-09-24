import React from "react";
import Footer from "./Footer";
import FreeRouteNavbar from "./FreeRouteNavbar";
import Gallery from "./Gallery";
import HeroSection from "./HeroSection";
import VisionMission from "./VisionMission";

// New component for the anthem
function YouthAnthem() {
  return (
    <div className="bg-white text-[#05061c] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">National Youth Anthem</h2>
        <pre className="text-lg leading-relaxed whitespace-pre-wrap">
          {`Ambassadors Arise!
The youth arise and serve
Defend holiness and righteousness
Press on towards the mark

Ambassadors Arise!
The youth arise and build
By the power of the Holy Ghost
Press on towards the mark

Ambassadors Arise!
Defend the church and Christ
Arise and preach the word of God
Break camp and advance

Ambassadors Arise!
Let heaven be thy goal
There shall be joy to thy labour
Press on towards the mark

Hallelujah Amen!
Hallelujah Amen!
Hallelujah Amen!
Hallelujah Amen!`}
        </pre>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-[#05061c] text-white font-[Inter]">
      <FreeRouteNavbar />
      <HeroSection />
      <VisionMission />
      <YouthAnthem /> {/* Insert the new component here */}
      <Gallery />
      <Footer />
    </div>
  );
}
