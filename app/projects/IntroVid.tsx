"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({ subsets: ["latin"] });

export default function IntroVid() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const elementRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ["start 75%", "end 25%"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "180%"]);

  return (
    <section ref={elementRef} className={`${josefin.className} flex flex-col gap-4 justify-end relative max-w-7xl mt-32 md:mt-60 isolate md:mx-44 mx-5`}>
      <motion.h2
        initial={{ opacity: 0, x: -120 }}
        whileInView={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -120 }}
        transition={{ duration: .8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.5, margin: "50px 0px -200px 0px" }}
        style={{ y: textY }}
        className="relative z-10 text-start text-xl md:text-3xl"
      >
        Highlights from years of building, tinkering, and creating.
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, x: 180 }}
        whileInView={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 180 }}
        transition={{ duration: .8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3, margin: "50px 0px -200px 0px" }}
        style={{ y: imageY }}
        className="relative z-0"
      >
        <video
          className="w-full aspect-video object-cover mt-20 md:mt-22"
          ref={videoRef}
          rel="preload"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://cdn.briannavance.com/sam-vance-website/sam-inventions-short.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
    </section>
  );
}