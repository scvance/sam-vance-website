"use client";

import { Media, ProcessBox } from "../components/ProcessBox";

import Gallery from "../components/Gallery";
import MobileGallery from "./MobileGallery";

export type GalleryTemplateProps = {
  partOneProps: {
    title: string;
    cards: {
      media: Media;
      title: string;
      description: string;
    }[];
  };
  partTwoProps: {
    title: string;
    cards: {
      media: Media;
      title: string;
      description: string;
    }[];
  };
  partThreeProps: {
    title: string;
    cards: {
      media: Media;
      title: string;
      description: string;
    }[];
  };
}

export const MobileGalleryTemplate = ({ partOneProps, partTwoProps, partThreeProps }: GalleryTemplateProps) => {
  const mediaHeightPx = 500; // in pixels
  const mediaWidthPx = mediaHeightPx * (365 / 600);

  return (
    <div className="md:hidden flex flex-col gap-48 mt-40">
      <div className="flex flex-col gap-12">
        <h2 id="initial-concept" className="text-4xl md:text-7xl font-semibold text-zinc-500">{partOneProps.title}</h2>
        <MobileGallery mediaHeightPx={mediaHeightPx} mediaWidthPx={mediaWidthPx} items={partOneProps.cards.map((card, index) => (
          <ProcessBox
            key={index}
            media={card.media}
            title={card.title}
            description={card.description}
          />
        ))} />
      </div>
      <div className="flex flex-col gap-12">
        <h2 id="process" className="text-4xl md:text-7xl font-semibold text-zinc-500">{partTwoProps.title}</h2>
        <MobileGallery mediaHeightPx={mediaHeightPx} mediaWidthPx={mediaWidthPx} items={partTwoProps.cards.map((card, index) => (
          <ProcessBox
            key={index}
            media={card.media}
            title={card.title}
            description={card.description}
          />
        ))} />
      </div>
      <div className="flex flex-col gap-12 mb-30">
        <h2 id="results" className="text-4xl md:text-7xl font-semibold text-zinc-500">{partThreeProps.title}</h2>
        <MobileGallery mediaHeightPx={mediaHeightPx} mediaWidthPx={mediaWidthPx} items={partThreeProps.cards.map((card, index) => (
          <ProcessBox
            key={index}
            media={card.media}
            title={card.title}
            description={card.description}
          />
        ))} />
      </div>
    </div>
  );
}