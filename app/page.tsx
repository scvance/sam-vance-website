"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { Typewriter } from "./components/Typewriter";
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <div>
      <Hero />
      <Body />
    </div>
  );
}

const initialDelay = 4.4; // seconds before first slide appears

const slides: Slide[] = [
  { src: "/flying-robot.png", alt: "", initialDelay: initialDelay },
  { src: "/legs.png", alt: "", initialDelay: initialDelay + 0.15 },
  {
    src: "/light-painting-robot.png",
    alt: "",
    initialDelay: initialDelay + 0.3,
  },
  { src: "/piano-game.png", alt: "", initialDelay: initialDelay + 0.45 },
  { src: "/plane.png", alt: "", initialDelay: initialDelay + 0.6 },
  { src: "/sam-plays-flute.png", alt: "", initialDelay: initialDelay + 0.75 },
  { src: "/legs-sprint.png", alt: "", initialDelay: initialDelay + 0.9 },
];

const phrases = [
  "robotics engineer",
  "software engineer",
  "mathematician",
  "innovator",
];

function Hero() {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3300); // duration before switching (ms)
    return () => clearInterval(interval);
  }, [phrases.length]);

  // if (playIntro === null) return null;

  return (
    <section className="relative h-[100vh] font-sans font-medium pt-20 pb-0 md:pb-14">
      <div className="flex flex-col px-[5%] mt-[3vh] md:mt-[10vh] w-full">
        <div className="flex md:flex-row flex-col justify-center gap-14 w-full">
          <div className="flex flex-col justify-center items-center pb-3 pt-4 text-center">
            <motion.div
              initial={{ opacity: 0, x: 140 }} // Start slightly above and invisible
              transition={{ delay: 0, duration: 0.7 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.4 }}
            >
              <span
                className={`text-6xl md:text-9xl text-center whitespace-nowrap`}
              >
                <Typewriter text="sam vance" />
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              whileInView={{ opacity: 1 }}
            >
              <AnimatePresence mode="wait">
                <motion.h2
                  key={phrases[index]}
                  className={`mt-4 text-2xl md:text-4xl text-center tracking-wider`}
                  initial={{ opacity: 0, y: 0, x: 0 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, y: 0 }}
                  transition={{
                    opacity: { duration: 0.8, ease: "easeInOut" },
                    y: { duration: 0.8, ease: "easeInOut" },
                  }}
                >
                  {phrases[index]}
                </motion.h2>
              </AnimatePresence>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -140 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0, duration: 0.75, ease: "easeOut" }}
            className=""
            viewport={{ once: false, amount: 0 }}
          >
            <Image
              src="/sam-vance2.png"
              alt="example"
              width={300}
              height={300}
              className="mx-auto hover:scale-105 transition-transform duration-500 md:min-w-100 md:mb-0 mb-10"
            />
          </motion.div>
        </div>
        <div className="flex flex-col">
          <motion.div
            className="mt-[8%] text-center"
            initial={{ opacity: 0, y: -10 }}
            transition={{ delay: 0, duration: 0.75, ease: "easeOut" }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <button
              className={`cursor-pointer text-2xl md:mb-0 mb-4 md:text-3xl font-light rounded-4xl hover:border-gray-300 py-2 px-4 border border-white/10 transition-all hover:font-medium shadow-[#faf8ed]/30 shadow-[0_0_6px_rgba(255,255,255,0.25)] 
          hover:bg-[#faf8ed] hover:text-black hover:scale-105 duration-400 tracking-tighter
            hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]`}
              onClick={() => router.push("/projects")}
            >
              check out my projects
            </button>
          </motion.div>
          <div className="relative z-10 mx-auto md:mt-14 max-w-5xl px-6">
            <ProductCarousel slides={slides} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Body() {
  return (
    <section>
      <motion.section
        className="mt-0 md:mt-40"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.6 }} // only triggers once when ~30% visible
      >
        <div className="flex gap-2 md:gap-5 mx-[5%] md:mx-[15%] py-20 text-[2.75rem] my-14 md:my-30 mb-30">
          <div
            className={` text-gray-600 text-8xl md:text-[200px] md:-mt-20 mr-1 md:mr-5`}
          >
            &ldquo;
          </div>
          <div
            className={`text-xl md:text-4xl flex flex-col leading-relaxed gap-8 md:gap-14`}
          >
            <span>
              There is no chance, no destiny, no fate, that can circumvent, or
              hinder, or control the firm resolve of a determined soul.
              <span className="relative inline-block h-[0.9em] overflow-hidden align-baseline leading-none">
                <span
                  className={`block text-gray-600 text-[200px] leading-none -translate-y-[0.24em]`}
                >
                  &rdquo;
                </span>
              </span>
            </span>

            <span>— Ella Wheeler Wilcox</span>
          </div>
        </div>
      </motion.section>
      <div className="mx-[10%] py-20">
        <OverlapSection />
        <OverlapSection2 />
        {/* <div className="">Right here there are some good things to say</div>
        <Image src="/sam-vance-forest.jpg" alt="" width={600} height={600} /> */}
      </div>
    </section>
  );
}

function OverlapSection() {
  const ref = useRef(null);

  // Track scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // when top hits bottom, when bottom hits top
  });

  // Parallax transform — image moves slower
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-center relative">
        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: -120 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.4 }}
          style={{ y: textY }}
          className="relative z-10 md:w-3/4 text-center -mt-30"
        >
          <p className="text-xl md:text-[1.75rem] font-bold leading-tight text-gray-300">
            I love to mess around with technology and build new things. Whether
            it's a robot that paints with light, a flying machine, or a game
            that teaches the piano, I dive in headfirst. I try to document my
            projects through videos, so hopefully you can get a sense of my
            process and what I'm passionate about.
          </p>
        </motion.div>

        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, x: 180 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.4 }}
          style={{ y: imageY }}
          className="relative md:-ml-40 w-3/4 z-0 mt-26 md:mt-0"
        >
          <Image
            src="/sam-forest2.png"
            alt="Profile"
            width={800}
            height={600}
            className="rounded-lg object-cover"
          />
          <div className="absolute inset-0 bg-black/20 rounded-lg" />
        </motion.div>
      </div>
    </section>
  );
}

function OverlapSection2() {
  const ref = useRef(null);

  // Track scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // when top hits bottom, when bottom hits top
  });

  // Parallax transform — image moves slower
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center overflow-visible mb-10 md:mb-40 py-26 md:py-32"
    >
      <div className="flex flex-col md:flex-row items-center justify-center relative">
        <motion.div
          initial={{ opacity: 0, x: -120 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.4 }}
          style={{ y: textY }}
          className="hidden md:block relative z-0 w-3/4 text-center"
        >
          <Image
            src="/sam-meadows.png"
            alt="Profile"
            width={800}
            height={600}
            className="rounded-lg object-cover"
          />
          <div className="absolute inset-0 bg-black/20 rounded-lg" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 180 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.4 }}
          style={{ y: textY }}
          className="relative md:-ml-40 w-full md:w-3/4 z-10 -mt-20"
        >
          <p className="text-xl md:text-[1.75rem] font-bold leading-tight text-gray-300 text-center">
            When I'm not building robots or coding, you can usually find me
            outdoors. I love hiking, climbing, and exploring nature. I am also
            an occasional pickleball player, and enjoy playing the piano and
            ukulele.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

type Slide = { src: string; alt: string; initialDelay: number };

function ProductCarousel({ slides }: { slides: Slide[] }) {
  function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < breakpoint);
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }, [breakpoint]);

    return isMobile;
  }
  const isMobile = useIsMobile(768);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const DURATION = 6000; // ms per slide
  const CARDS_TO_SHOW = 5;
  const CARD_WIDTH = isMobile ? 144 : 176; // w-44 = 176px
  const GAP = 24; // gap-6 = 26px

  // Advance automatically using a re-arming timeout (avoids drift of setInterval)
  useEffect(() => {
    if (slides.length <= CARDS_TO_SHOW || paused) return;
    const id = setTimeout(
      () => setIndex((i) => (i + 1) % slides.length),
      DURATION
    );
    return () => clearTimeout(id);
  }, [index, paused, slides.length]);

  // Pause when tab isn't visible
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Calculate the transform offset for smooth sliding
  const offset = -(index * (CARD_WIDTH + GAP));

  return (
    <div className="relative pb-0 md:pb-35">
      <div className="flex justify-center">
        {/* 5 cards * 176px + 4 gaps * 24px = 976px */}
        {/* 2 cards * 144px + 1 gaps * 24px = 312px */}
        <div className="relative w-[312px] md:w-[976px] overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: offset }}
            transition={{
              delay: 0,
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            aria-live="polite"
          >
            {/* Render extra cards for smooth infinite scrolling */}
            {[...slides, ...slides.slice(0, CARDS_TO_SHOW)].map((card, i) => (
              <motion.div
                key={i}
                className="relative aspect-[5/3] w-36 md:w-44 flex-shrink-0"
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: card.initialDelay - 4.4,
                  duration: 0.4,
                  ease: [0.2, 0.8, 0.2, 1.0],
                }}
              >
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  sizes="(min-width: 1024px) 200px, 256px"
                  className="object-cover shadow-lg"
                  priority={i < CARDS_TO_SHOW}
                />
                {/* <div className="absolute inset-0 bg-[#aba79e]/30"></div> */}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      {/* </motion.div> */}
    </div>
  );
}
