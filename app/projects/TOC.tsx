"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({ subsets: ["latin"] });

const projects = [
  {
    title: "Humanoid Legs",
    src: "/projects/humanoid-legs",
    left: "https://cdn.briannavance.com/sam-vance-website/inverse_kinematics.mp4",
    right: "https://cdn.briannavance.com/sam-vance-website/walking_legs_v1.mp4",
  },
  {
    title: "Self-Playing Flute",
    src: "/projects/self-playing-flute",
    left: "https://cdn.briannavance.com/sam-vance-website/trimmed-flute.mp4",
    right: "https://cdn.briannavance.com/sam-vance-website/flute-playing.mp4",
  },
  {
    title: "AI Light-Painter",
    src: "/projects/ai-light-painter",
    left: "https://cdn.briannavance.com/sam-vance-website/light.mp4",
    right: "https://cdn.briannavance.com/sam-vance-website/light-painter-trimmed.mp4",
  },
];

export default function TOC() {
  const [hovered, setHovered] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});

  const current = hovered !== null ? projects[hovered] : null;

  // Preload videos after a delay to let other components load first
  useEffect(() => {
    // Wait for page to be fully loaded, then add extra delay
    const loadVideos = () => {
      // Give Hero and IntroVid videos priority - delay TOC videos by 2 seconds
      setTimeout(() => {
        Object.values(videoRefs.current).forEach((video) => {
          if (video) {
            video.load();
          }
        });
      }, 2000);
    };

    if (document.readyState === 'complete') {
      loadVideos();
    } else {
      window.addEventListener('load', loadVideos);
      return () => window.removeEventListener('load', loadVideos);
    }
  }, []);

  return (
    <div id="projects-toc" className="relative">
      <motion.section
        ref={sectionRef}
        className={`mx-auto max-w-7xl mt-34 md:mt-80 px-10 py-10 mb-40 md:mb-80 ${josefin.className} text-center`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.25, ease: "easeOut" }}
      >
        <h1 className="text-3xl md:text-5xl font-bold tracking-wide mb-20">
          Featured Projects
        </h1>

        {/* Project titles */}
        <div className="flex flex-col gap-14 text-xl md:text-3xl w-fit mx-auto">
          {projects.map((p, i) => (
            <span
              key={p.title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`transition-colors duration-300 cursor-pointer ${hovered === i ? "text-gray-200 scale-105" : "text-white/80"
                }`}
            >
              <a href={p.src}>{p.title}</a>
            </span>
          ))}
        </div>
      </motion.section>

      {/* Hidden preload videos */}
      <div className="hidden">
        {projects.map((p, i) => (
          <div key={`preload-${i}`}>
            {p.left.endsWith(".mp4") && (
              <video
                ref={(el) => {
                  if (el) videoRefs.current[`left-${i}`] = el;
                }}
                src={p.left}
                preload="none"
                muted
                playsInline
              />
            )}
            {(p.right.endsWith(".mp4") || p.right.endsWith(".MP4")) && (
              <video
                ref={(el) => {
                  if (el) videoRefs.current[`right-${i}`] = el;
                }}
                src={p.right}
                preload="none"
                muted
                playsInline
              />
            )}
          </div>
        ))}
      </div>

      {/* Left preview */}
      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key="left-preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute top-1/2 left-[8vw] -translate-y-1/2 h-[33vw] overflow-hidden"
          >
            {current.left.endsWith(".mp4") ? (
              <video
                src={current.left}
                className="w-full h-full"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img
                src={current.left}
                alt="Preview left"
                className="object-cover w-full h-full"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right preview */}
      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key="right-preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute top-1/2 right-[8vw] -translate-y-1/2 h-[33vw] overflow-hidden shadow-lg"
          >
            {(current.right.endsWith(".mp4") || current.right.endsWith(".MP4")) ? (
              <video
                src={current.right}
                className="object-cover w-full h-full"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img
                src={current.right}
                alt="Preview right"
                className="object-cover w-full h-full"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}