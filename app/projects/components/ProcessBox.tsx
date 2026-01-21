import { ReactNode, useEffect, useState } from "react";

import Image from "next/image";
import { KeyboardArrowDown } from "@/public/icons/KeyboardArrowDown";

type MediaImage = {
  type: "image";
  src: string;
  alt: string;
};

type MediaVideo = {
  type: "video";
  src: string;
};

export type Media = MediaImage | MediaVideo;

export const ProcessBox = ({
  media,
  title,
  description,
}: {
  media: Media;
  title: string;
  description: ReactNode;
}) => {
  const [descOpen, setDescOpen] = useState(false);

  return (
    <>
      <div className="hidden md:flex md:flex-row flex-col gap-4 md:max-w-6xl h-full w-full md:min-w-4xl overflow-visible">
        {/* MEDIA CONTAINER */}
        <div className="flex items-center justify-center h-full bg-black rounded-sm shrink-0">
          {media.type === "image" ? (
            <Image
              src={media.src}
              alt={media.alt}
              width={800} // dummy, required by Next (ignored because of class)
              height={800}
              className="max-h-full w-auto object-contain rounded-sm"
            />
          ) : (
            <video
              src={media.src}
              className="max-h-full w-auto object-contain rounded-sm"
              autoPlay
              loop
              muted
              playsInline
            />
          )}
        </div>

        {/* TEXT BOX */}
        <div className="flex-1 flex flex-col gap-1 items-start text-start bg-zinc-800 rounded-sm p-1 md:p-5 overflow-visible">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="whitespace-pre-line">{description}</p>
        </div>
      </div>
      <div className="md:hidden relative flex items-center justify-center h-full bg-black rounded-sm shrink-0 overflow-hidden">
        {media.type === "image" ? (
          <Image
            src={media.src}
            alt={media.alt}
            width={800}
            height={800}
            className="max-h-full w-auto object-contain rounded-sm"
          />
        ) : (
          <video
            src={media.src}
            className="max-h-full w-auto object-contain rounded-sm"
            autoPlay
            loop
            muted
            playsInline
          />
        )}

        {/* MOBILE OVERLAY (bottom 3/4) */}
        <div
          className={[
            "md:hidden absolute inset-x-0 bottom-0 h-7/8",
            "transition-transform duration-300 ease-in-out",
            descOpen ? "translate-y-0" : "translate-y-[calc(100%-3rem)]",
          ].join(" ")}
        >
          {/* Handle row (always visible) */}
          <button
            type="button"
            onClick={() => setDescOpen((v) => !v)}
            aria-expanded={descOpen}
            className="w-full h-12 px-4 flex items-center justify-between
                 bg-black/80 backdrop-blur-sm text-white"
          >
            <span className="font-semibold">Details</span>
            <span
              className={`transition-transform duration-300 ${descOpen ? "" : "rotate-180"}`}
            >
              <KeyboardArrowDown className="w-6 h-6" />
            </span>
          </button>

          {/* Panel content */}
          <div className="h-[calc(100%-3rem)] bg-black/70 backdrop-blur-sm text-white px-4 py-3 overflow-y-auto">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
