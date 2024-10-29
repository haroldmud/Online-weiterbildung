"use client";
import Globe from "react-globe.gl";
import data from "./data";
import { useRef, useState, useLayoutEffect } from "react";

export default function GlobeComp({ selected }) {
  const globeEl = useRef();
  const store = data[selected];
  const [scrollCount, setScrollCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useLayoutEffect(() => {
    const globe = globeEl.current;

    if (globe) {
      const rotateGlobe = () => {
        requestAnimationFrame(rotateGlobe);
      };
      rotateGlobe();

      const handleScroll = (event) => {
        if (isTransitioning) return;

        const scrollThreshold = 100;
        const direction = Math.sign(event.deltaY);

        // Ignore upward scroll events
        if (direction < 0) return;

        if (Math.abs(event.deltaY) >= scrollThreshold) {
          setScrollCount((prevCount) => {
            const newCount = Math.min(prevCount + direction, 3);
            setIsTransitioning(true);

            if (newCount === 1) {
              globe.pointOfView(
                { lat: 51.1657, lng: 10.4515, altitude: 1.5 },
                2000
              );
            } else if (newCount === 2) {
              globe.pointOfView(
                { lat: -1.9403, lng: 29.8739, altitude: 1 },
                2000
              );
            } else if (newCount === 3) {
              globe.pointOfView(
                { lat: -1.9403, lng: 29.8739, altitude: 0.1 },
                2000
              );
              setTimeout(() => {
                setVisible(false);
              }, 2500);
            }

            setTimeout(() => {
              setIsTransitioning(false);
            }, 2000);

            return newCount;
          });
        }
      };

      window.addEventListener("wheel", handleScroll);

      return () => {
        window.removeEventListener("wheel", handleScroll);
      };
    }
  }, [isTransitioning, scrollCount]);

  if (!visible) return null;

  return (
    <div className="relative z-0 h-screen">
      <div className="absolute top-0 left-0 w-full flex flex-col items-center justify-center z-10 p-8">
        <h1 className="text-6xl font-bold text-green-500 mb-4">OJEMBA</h1>
        <p className="text-white text-2xl mb-8">
          Bridging the gap between Europe and Africa with powerful web
          development and innovative coding solutions.
        </p>
        <div className="flex space-x-4">
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
            Contact Us
          </button>
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
            Our Services
          </button>
        </div>
      </div>

      <Globe
        ref={globeEl}
        onGlobeReady={() => console.log("globe ready")}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        arcsData={store["arcs"]}
        arcDashLength={(d) => d.stroke - 0.1 + 0.3}
        arcDashGap={(d) => 0.1 + (1 - (d.stroke - 0.1))}
        arcDashAnimateTime={(d) => (1.1 - d.stroke) * 500 + 1000}
        arcStroke={"stroke"}
        labelsData={store["loc"]}
        labelLat={(d) => d.lat}
        labelLng={(d) => d.lng}
        labelText={(d) => d.name}
        labelSize={(d) => 0.9 + d.size}
        labelDotRadius={(d) => 0.5 + d.size}
        labelResolution={2}
        enablePointerInteraction={false}
      />
    </div>
  );
}
