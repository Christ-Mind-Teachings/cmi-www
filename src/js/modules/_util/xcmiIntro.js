import {runFeatureIntro} from "./driver";

export function pageDriver() {
  let steps = [
    {
      element: "#source-homepage",
      popover: {
        title: "Library of Christ Mind Teachings",
        description: "Welcome to the Library of Christ Mind Teachings!<br>The contents of the library is shown below. Click on a book image to navigate to the home page for that teaching.",
        position: "bottom"
      }
    },
    {
      element: "#book-acq",
      popover: {
        title: "Get Acquainted",
        description: "Get Acquainted contains documentation and other useful information about the Library. Click on the image to see the table of contents.",
        position: "top"
      }
    },
    {
      element: "#acimoe-christmind-info",
      popover: {
        title: "A Course in Miracles Original Edition",
        description: "The Original Edition of ACIM from the <em>Course in Miracles Society</em>",
        position: "right"
      }
    },
    {
      element: "#wom-christmind-info",
      popover: {
        title: "The Way of Mastery",
        description: "The Way of Mastery received by Jon Marc Hammer (Jayem)",
        position: "right"
      }
    },
    {
      element: "#acol-christmind-info",
      popover: {
        title: "A Course Of Love",
        description: "A Course Of Love first received by Mari Perron",
        position: "left"
      }
    },
    {
      element: "#raj-christmind-info",
      popover: {
        title: "The Raj Material",
        description: "An indepth discussion of A Course in Miracles by Raj through Paul Tuttle",
        position: "right"
      }
    },
    {
      element: "#pwom-christmind-info",
      popover: {
        title: "Droga Mistrzostwa",
        description: "A Polish translation of The Way of Mastery"
        position: "right"
      }
    },
    {
      element: "#jsb-christmind-info",
      popover: {
        title: "The Impersonal Life",
        description: "A rediscovery of Self received by Joseph Benner, first published in 1914",
        position: "left"
      }
    },
    {
      element: "#acim-christmind-info",
      popover: {
        title: "A Course in Miracles Sparkly Edition",
        description: "A slightly different version of ACIM from the Original Edition. This edition is used by Raj.",
        position: "right"
      }
    }
  ];

  runFeatureIntro(steps,{
    allowClose: false,
    opacity: 0.3
  });
}


