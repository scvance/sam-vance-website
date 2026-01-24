"use client";

import { useEffect, useId, useMemo, useState } from "react";

import { KeyboardDoubleArrowDown } from "@/public/icons/KeyboardDoubleArrowDown";
import { Media } from "./ProcessBox";
import { motion } from "framer-motion";

export type SlidingMediaProps = {
  media: Media;
  title: string;
  description: string;
  isCenter?: boolean;
  className?: string;
};

export default function SlidingMedia({
  media,
  title,
  description,
  isCenter = false,
  className = "",
}: SlidingMediaProps) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!isCenter && open) {
      setOpen(false);
    }
  }, [isCenter, open]);

  const descId = useId();
  const mediaHeightPx = 600; // in pixels

  const mediaWidthPx = mediaHeightPx * (365 / 600); // maintain 365:600 aspect ratio
  const mediaShiftPx = mediaWidthPx * 0.6; // how much to shift media when expanded
  const descriptionWidthPx = 800 - mediaWidthPx; // total width is 1000px
  const descriptionShiftPx = descriptionWidthPx * 0.4; // how much to shift description when expanded

  const ariaLabel = useMemo(() => {
    const kind = media.type === "image" ? "Image" : "Video";
    return `${open ? "Collapse" : "Expand"}: ${kind} step "${title}"`;
  }, [open, media.type, title]);

  const toggle = () => {
    // Only allow expansion when centered
    if (isCenter) {
      setOpen((v) => !v);
    }
  };

  return (
    <motion.div
      className={[
        "relative rounded-2xl border border-black/10 shadow-sm",
        className,
      ].join(" ")}
    >
      <button
        type="button"
        onClick={(e) => {
          if (!isCenter) {
            // Let the Gallery handle the click to navigate
            return;
          }
          e.stopPropagation(); // Prevent Gallery from getting the event
          toggle();
        }}
        aria-expanded={open}
        aria-controls={descId}
        aria-label={ariaLabel}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`block w-full text-left `}
      >
        <div className="relative flex items-stretch justify-center">
          <motion.div
            className="relative z-10"
            animate={{ x: open ? -mediaShiftPx : 0 }}
            transition={{ type: "spring", stiffness: 360, damping: 34 }}
          >
            {/* EXPAND HINT */}
            {isCenter && (
              <motion.div
                className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 z-0 h-full"
                initial={false}
                animate={{
                  x: !open && isCenter && hovered ? 32 : 0,
                  opacity: !open ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
              >
                <div className="flex items-center gap-2 h-full text-xs bg-zinc-800 rounded-lg text-white/90 shadow-lg backdrop-blur">
                  <KeyboardDoubleArrowDown className="w-6 h-6 ml-6 rotate-270" />
                </div>
              </motion.div>
            )}
            {/* This box is fixed-height; media keeps its natural aspect ratio (no cropping). */}
            <div
              className={`relative flex items-center justify-center h-full w-full ${open ? "" : isCenter ? "hover:cursor-pointer hover:scale-105 transition-transform duration-200" : ""
                }`}
              style={{ height: mediaHeightPx, width: mediaWidthPx }}
            >
              {media.type === "image" ? (
                <img
                  className="rounded-lg h-full w-full object-cover"
                  src={media.src}
                  alt={media.alt}
                  draggable={false}
                  style={{ pointerEvents: "none" }} // no interaction on media
                />
              ) : (
                <video
                  className="rounded-lg h-full w-full object-cover"
                  src={media.src}
                  style={{ pointerEvents: "none" }} // no interaction on media
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
              )}
            </div>
          </motion.div>

          {/* DESCRIPTION PANEL */}
          <motion.div
            id={descId}
            className={`absolute left-[45%] top-0 h-full w-[${descriptionWidthPx}] pointer-events-none`}
            style={{
              width: descriptionWidthPx,
              height: mediaHeightPx,
            }}
            initial={false}
            animate={{
              clipPath: open ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)",
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <motion.div
              className="relative flex h-full flex-col justify-center gap-2 bg-zinc-800 p-5 rounded-lg"
              initial={false}
              animate={{ x: open ? 0 : -25 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="text-large font-semibold text-white/80">
                {title}
              </div>
              <p className="text-base leading-6 text-white/70">{description}</p>
            </motion.div>
          </motion.div>
        </div>
      </button>
    </motion.div>
  );
}
