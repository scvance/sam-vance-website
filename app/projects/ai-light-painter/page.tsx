"use client";

import {
  GalleryTemplate,
  GalleryTemplateProps,
} from "../components/GalleryTemplate";
import { HeroProps, HeroTemplate } from "../components/HeroTemplate";

// THIS IS THE EDITABLE PART - edit heroProps and galleryTemplateProps to change content

// FIRST - the project title and the three summary sections with their titles and descriptions
const heroProps: HeroProps = {
  projectTitle: "ai light painting",
  partOneTitle: "initial concept",
  partOneDescription:
    "I saw an instagram video of someone light painting and I thought that while I couldn't really do that myself, I could probably make a robot that would do the same thing. ",
  partTwoTitle: "process",
  partTwoDescription:
    "The development process involved 3 main steps: Robot Design, AI Integration, and Click-To-Draw. The robot design experience was the most challenging, as we had almost zero tools and built everything from scratch. ",
  partThreeTitle: "results",
  partThreeDescription:
    "The final AI light painting system demonstrated impressive capabilities, generating stunning visuals with high fidelity reconstruction. The project showcased the potential of combining artificial intelligence with creative expression, paving the way for future advancements in interactive art and design. ",
};

// SECOND - the gallery sections with their titles, media, and descriptions
const galleryTemplateProps: GalleryTemplateProps = {
  partOneProps: {
    title: "initial concept",
    cards: [
      {
        media: {
          type: "image",
          src: "https://cdn.briannavance.com/sam-vance-website/light-painting-initial-drawing.jpeg",
          alt: "Drawing of the AI Light Painter robot version 0",
        },
        title: "Initial Concept",
        description:
          "I initially threw together a super rough sketch for the light painting robot. It was going to be an arm with a light that could move up and down the length of the arm while the arm itself rotated around a central axis. This idea barely survived the lego prototype phase.",
      },
      {
        media: {
          type: "video",
          src: "https://cdn.briannavance.com/sam-vance-website/lego-light-painting1.mp4",
        },
        title: "Initial Concept",
        description: `This is a short video of the lego prototype based on the previous sketch.

          After building this prototype, I realized that the arm design was too unstable and wobbly to create high quality light paintings. Furthermore, the design made it difficult to draw shapes that require precise horizontal movements as the arm moved in an arc rather than a straight line. While doable, I decided to go back to the drawing board and come up with a more stable design that could also achieve straight line movements.`,
      },
      {
        media: { type: "video", src: "/projects/humanoid-legs/IMG_0640.mp4" },
        title: "Initial Concept",
        description:
          "Here is a small description of the results that were achieved for this project.",
      },
    ],
  },
  partTwoProps: {
    title: "process",
    cards: [
      {
        media: {
          type: "video",
          src: "https://cdn.briannavance.com/sam-vance-website/light-painter-bad-build-1.mp4",
        },
        title: "Initial Build",
        description: `I only had access to a hammer and a butter knife to build the first version of the robot. This made it very difficult to get precise cuts, and the overall build was incredibly unstable. As you can see in the video, it falls apart almost immediately.
          
          I procured the rails from home depot, and the wood from scrap pieces I found on facebook marketplace. The motor carriage I built using lego pieces and tape.`,
      },
      {
        media: {
          type: "video",
          src: "https://cdn.briannavance.com/sam-vance-website/light-painter-drill.mp4",
        },
        title: "Drilling the Wood",
        description: `Thus, I recruited a friend who had a little more wood, and a few more tools.
          
          With a drill we were able to make slightly more precise holes for the rails. However, since we basically just eyeballed the placement of the holes, we still had significant stability issues. To solve this, we used a hammer and pounded coins into the holes to make them tighter.`,
      },
      {
        media: {
          type: "video",
          src: "https://cdn.briannavance.com/sam-vance-website/light-painter-finished-build.mp4",
        },
        title: "Assembly",
        description: `After a couple of hours, we got the assembly almost entirely finished.
          
          It was still missing the carriage to hold the light, but I was able to test the vertical movement of the carriage along the rails. I used dental floss both for the string that moves the carriage up and down, as well as for the belt that moves the carriage along the rails.
          
          As you can see in the video, the movement is a bit jerky, but overall it could move fairly quickly along the rails.`,
      },
    ],
  },
  partThreeProps: {
    title: "results",
    cards: [
      {
        media: {
          type: "video",
          src: "/projects/humanoid-legs/concept.mp4",
        },
        title: "Initial Results",
        description:
          "Here is a small description of how the initial concept was developed.",
      },
      {
        media: {
          type: "image",
          src: "/projects/humanoid-legs/process.jpg",
          alt: "Process",
        },
        title: "Results",
        description:
          "Here is a small description of the process that was conducted for this project.",
      },
      {
        media: {
          type: "image",
          src: "/projects/humanoid-legs/results.jpg",
          alt: "Results",
        },
        title: "Results",
        description:
          "Here is a small description of the results that were achieved for this project.",
      },
    ],
  },
};

export default function HumanoidLegs() {
  return (
    <div className="text-center">
      <div className="flex flex-col relative items-center mb-20 mt-40 min-h-screen">
        <HeroTemplate {...heroProps} />
        <GalleryTemplate {...galleryTemplateProps} />
      </div>
    </div>
  );
}
