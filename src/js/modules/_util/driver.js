import Driver from "driver.js";

const cmiPageTitle = {
  element: "#source-homepage",
  popover: {
    title: "Title",
    description: "This is the homepage and card catalog for the Christ Mind Library. Begin exploration of the library here.",
    position: "bottom"
  }
};

const cmiPageBanner = {
  element: "#masthead-title",
  popover: {
    title: "Navigation and Features",
    description: "On every page you can click on this banner to navigate to the Library's main page and see all available teachings.",
    position: "bottom"
  }
};

const originalEdition = {
  element: "#original-edition",
  popover: {
    title: "Original Website",
    description: "The original Christ Mind Teachings website.",
    position: "top"
  }
};

const getAcquainted = {
  element: "[data-book='acq']",
  popover: {
    title: "Get Acquainted",
    description: "Get help and learn about the library here.",
    position: "top"
  }
};

const acim = {
  element: "#acim-christmind-info",
  popover: {
    title: "A Course In Miracles",
    description: "The Sparkly Edition of A Course In Miracles.",
    position: "top"
  }
};

const raj = {
  element: "#raj-christmind-info",
  popover: {
    title: "The Raj Material",
    description: "The Raj Material from Paul Tuttle and the Northwest Foundation for ACIM.",
    position: "top"
  }
};

const wom = {
  element: "#wom-christmind-info",
  popover: {
    title: "The Way of Mastery",
    description: "The Way of Mastery from Jeshua and Jayem (Jon Marc Hammer)",
    position: "top"
  }
};

const jsb = {
  element: "#jsb-christmind-info",
  popover: {
    title: "Joseph S. Benner",
    description: "The Impersonal Life, published in 1914",
    position: "top"
  }
};

const pageMenu = {
  element: "#page-menu",
  popover: {
    title: "The Menu",
    description: "This is the page menu, it will stick to the top when the page is scrolled (when the tour is over) so it is always available. The menu on other pages is similar but may contain additional features.<br/><br/>A brief description of each menu option follows.",
    position: "bottom"
  }
};

const pageMenuBookmarkItem = {
  element: ".bookmark-modal-open",
  popover: {
    title: "List Bookmarks",
    description: "Display a list of bookmarks you have created and optionally filter by topic. You can quickly jump to any bookmark. Learn more about bookmarks in the documentation.",
    position: "bottom"
  }
};

const pageMenuSearchItem = {
  element: ".search-modal-open",
  popover: {
    title: "Search Through All Books",
    description: "Find topics of interest by searching through all ACIM books.",
    position: "bottom"
  }
};

const pageMenuHelpItem = {
  element: "#help-menu",
  popover: {
    title: "Get Help and Learn About",
    description: "Learn about the Library and using the features of the site.",
    position: "bottom"
  }
};

const pageMenuLoginItem = {
  element: ".login-menu-option",
  popover: {
    title: "Sign In/Sign Out",
    description: "Create an account and sign in to the site. It's free and allows you to create bookmarks that you can share via Facebook and keep synchronized between devices.",
    position: "left"
  }
};

const pageMenuTextContents = {
  element: "[data-book='text']",
  popover: {
    title: "Display Table of Contents",
    description: "Click on any image to display and navigate to the volume contents.<br/><br/>Note: The Preface does not have a table of contents.",
    position: "left"
  }
};

const cmiTranscriptBanner = {
  element: "#masthead-title",
  popover: {
    title: "Library of Christ Mind Teachings",
    description: "This banner identifies the page as being part of the Teachings of Christ Mind Library. Click this link to navigate to the Library's Home page.",
    position: "bottom"
  }
};

const cmiTranscriptSourceTitle = {
  element: "#src-title",
  popover: {
    title: "The Library",
    description: "This identifies the source or section of the library the page is a part of. Click this link to navigate to the section Home page.",
    position: "bottom"
  }
};

const cmiTranscriptBookTitle = {
  element: "#book-title",
  popover: {
    title: "Page Title",
    description: "This identifies the book and section or lesson of the content on this page.",
    position: "bottom"
  }
};

const transcriptMenuBookmarkItem = {
  element: "#bookmark-dropdown-menu",
  popover: {
    title: "Bookmarks",
    description: "You can create a bookmark from highlighted text and associate the bookmark with one or more categories. Learn more about bookmarks by reading the documentation.",
    position: "right"
  }
};

const transcriptMenuSearchItem = {
  element: ".search-modal-open",
  popover: {
    title: "Search Through All Books",
    description: "Find topics of interest by searching through all ACIM books.",
    position: "bottom"
  }
};

const transcriptMenuAudioItem = {
  element: ".audio-player-toggle",
  popover: {
    title: "Listen to the Audio",
    description: "Click the speaker icon to display the audio player and listen along as you read.",
    position: "bottom"
  }
};

const transcriptMenuParagraphMarkerItem = {
  element: ".toggle-paragraph-markers",
  popover: {
    title: "Show/Hide Paragraph Markers",
    description: "Show or hide the markers that preceed each paragraph.",
    position: "bottom"
  }
};

const transcriptMenuPageTopItem = {
  element: ".top-of-page",
  popover: {
    title: "Go To Top of Page",
    description: "Quickly jump to the top of the page.",
    position: "bottom"
  }
};

const transcriptMenuContentsItem = {
  element: "#contents-modal-open",
  popover: {
    title: "Table of Contents",
    description: "View the table of contents.",
    position: "bottom"
  }
};

const transcriptMenuPreviousPageItem = {
  element: "#previous-page-menu-item",
  popover: {
    title: "Previous Page",
    description: "Go to the previous page. This will be disabled when the first page is displayed.",
    position: "bottom"
  }
};

const transcriptMenuNextPageItem = {
  element: "#next-page-menu-item",
  popover: {
    title: "Next Page",
    description: "Go to the next page. This will be disabled when the last page is displayed.",
    position: "bottom"
  }
};

const transcriptMenuHelpItem = {
  element: "#about-dropdown-menu",
  popover: {
    title: "Get Help",
    description: "Learn how to use features of the Library.",
    position: "bottom"
  }
};

const transcriptMenuLoginItem = {
  element: ".login-menu-option",
  popover: {
    title: "Sign In/Sign Out",
    description: "Create an account and sign in or sign out. When you sign in, bookmarks you create will be available on all devices you use to access the library.",
    position: "bottom"
  }
};

export function pageDriver() {
  const driver = new Driver({
    allowClose: false,
    opacity: 0.5
  });

  driver.defineSteps([
    cmiPageTitle,
    originalEdition,
    getAcquainted,
    acim,
    raj,
    wom,
    jsb
  ]);

  driver.start();
}

export function pageNavigationDriver() {
  const driver = new Driver({
    allowClose: false,
    opacity: 0.5
  });

  driver.defineSteps([
    cmiPageBanner,
    pageMenu,
    pageMenuBookmarkItem,
    pageMenuSearchItem,
    pageMenuHelpItem,
    pageMenuLoginItem,
    pageMenuTextContents
  ]);

  driver.start();
}

export function transcriptDriver() {
  const driver = new Driver({
    allowClose: false,
    opacity: 0.5
  });

  let transcriptDriverSteps = [];

  transcriptDriverSteps.push(cmiTranscriptBanner);
  transcriptDriverSteps.push(cmiTranscriptSourceTitle);
  transcriptDriverSteps.push(cmiTranscriptBookTitle);
  transcriptDriverSteps.push(transcriptMenuBookmarkItem);
  transcriptDriverSteps.push(transcriptMenuSearchItem);

  if (!$(".audio-player-toggle").hasClass("hide")) {
    transcriptDriverSteps.push(transcriptMenuAudioItem);
  }

  transcriptDriverSteps.push(transcriptMenuParagraphMarkerItem);
  transcriptDriverSteps.push(transcriptMenuPageTopItem);

  if ($("#contents-modal-open").length > 0) {
    transcriptDriverSteps.push(transcriptMenuContentsItem);
    transcriptDriverSteps.push(transcriptMenuPreviousPageItem);
    transcriptDriverSteps.push(transcriptMenuNextPageItem);
  }

  transcriptDriverSteps.push(transcriptMenuHelpItem);
  transcriptDriverSteps.push(transcriptMenuLoginItem);

  driver.defineSteps(transcriptDriverSteps);
  driver.start();
}

