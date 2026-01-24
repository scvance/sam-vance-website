"use client";

import { AnimatePresence, Variants, motion } from "framer-motion";
import { ReactNode, useState } from "react";

import { ExpandArrowRight } from "@/public/icons/ExpandArrowRight";

export default function MobileGallery({ items, mediaHeightPx, mediaWidthPx, id }: { items: ReactNode[]; mediaHeightPx: number; mediaWidthPx: number; id?: string }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 = left, 1 = right

  const gap = 20; // gap between cards in px
  const slot = mediaWidthPx + gap;

  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % items.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + items.length) % items.length);
  };

  const variants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      position: "absolute" as const,
    }),
    center: {
      x: "0%",
      opacity: 1,
      position: "relative" as const,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      position: "absolute" as const,
    }),
  };

  return (
    <>
      <div id={id} className="relative w-full min-w-full mx-auto flex flex-col items-center">

        {/* ===== GALLERY WINDOW ===== */}
        <div className="relative flex items-center justify-center h-[500px] overflow-hidden w-full">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="w-full h-full flex items-center justify-center"
            >
              {items[index]}
            </motion.div>
          </AnimatePresence>
        </div>


        {/* ===== DOT INDICATORS ===== */}
        <div className="absolute bottom-[-40px] md:bottom-[-80px]">
          <div className="flex gap-2 mt-6">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer
                  ${i === index
                    ? "bg-white scale-110"
                    : "bg-white/30 hover:bg-white/50"}`}
              />
            ))}
          </div>
        </div>
        {/* ===== LEFT arrow (outside gallery) ===== */}
        <button
          onClick={prev}
          className="absolute left-[-50px] bottom-2/5 -translate-y-1/2 z-10 
                   cursor-pointer"
        >
          <ExpandArrowRight className="rotate-180 w-10 h-10 text-zinc-600 hover:text-zinc-500" />
        </button>
        {/* ===== RIGHT arrow (outside gallery) ===== */}
        <button
          onClick={next}
          className="absolute right-[-50px] bottom-2/5 -translate-y-1/2 z-10 
                cursor-pointer"
        >
          <ExpandArrowRight className="w-10 h-10 text-zinc-600 hover:text-zinc-500" />
        </button>

      </div>
    </>
  );
}