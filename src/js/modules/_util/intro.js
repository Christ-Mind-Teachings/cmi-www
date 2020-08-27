import {runFeatureIntro} from "./driver";

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

const acol = {
  element: "#acol-christmind-info",
  popover: {
    title: "A Course Of Love",
    description: "A very personal expression of living as Christ from Jesus to you.",
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
  element: "#bookmark-dropdown-menu",
  popover: {
    title: "List Bookmarks",
    description: "Display a list of bookmarks you have created and optionally filter by topic. You can quickly jump to any bookmark. Learn more about bookmarks in the documentation.",
    position: "bottom"
  }
};

const pageMenuSearchItem = {
  element: "#search-modal-open",
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

const pageMenuGuestLoginItem = {
  element: "#login-guest-menu-option",
  popover: {
    title: "Sign In/Sign Out",
    description: "Create an account and sign in to the site. It's free and allows you to create bookmarks that you can share via Facebook and keep synchronized between devices.",
    position: "left"
  }
};

const pageMenuAccountLoginItem = {
  element: "#login-account-menu-option",
  popover: {
    title: "Sign In/Sign Out",
    description: "Create an account and sign in to the site. It's free and allows you to create bookmarks that you can share via Facebook and keep synchronized between devices.",
    position: "left"
  }
};

const pageMenuContents = {
  element: "[data-book='acq']",
  popover: {
    title: "Display Table of Contents",
    description: "Click on any image to display the table of contents or navigate directly to the teaching.",
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
  element: "#search-modal-open",
  popover: {
    title: "Search Through All Books",
    description: "Find topics of interest by searching through all ACIM books.",
    position: "bottom"
  }
};

const transcriptMenuAudioItem = {
  element: "#audio-player-menu-option",
  popover: {
    title: "Listen to the Audio",
    description: "Click the speaker icon to display the audio player and listen along as you read.",
    position: "bottom"
  }
};

const transcriptMenuParagraphMarkerItem = {
  element: "#pnum-toggle-menu-option",
  popover: {
    title: "Show/Hide Paragraph Markers",
    description: "Show or hide the markers that preceed each paragraph.",
    position: "bottom"
  }
};

const transcriptMenuPageTopItem = {
  element: "#jump-to-top-menu-option",
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
  element: "#toc-previous-page",
  popover: {
    title: "Previous Page",
    description: "Go to the previous page. This will be disabled when the first page is displayed.",
    position: "bottom"
  }
};

const transcriptMenuNextPageItem = {
  element: "#toc-next-page",
  popover: {
    title: "Next Page",
    description: "Go to the next page. This will be disabled when the last page is displayed.",
    position: "bottom"
  }
};

const transcriptMenuQuickLink = {
  element: "#quick-links-dropdown-menu",
  popover: {
    title: "Quick Links",
    description: "Quickly navigate to other teachings in the Library.",
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

const transcriptMenuGuestLoginItem = {
  element: "#login-guest-menu-option",
  popover: {
    title: "Sign In/Sign Out",
    description: "Create an account and sign in or sign out. When you sign in, bookmarks you create will be available on all devices you use to access the library.",
    position: "bottom"
  }
};

const transcriptMenuAccountLoginItem = {
  element: "#login-account-menu-option",
  popover: {
    title: "Sign In/Sign Out",
    description: "Create an account and sign in or sign out. When you sign in, bookmarks you create will be available on all devices you use to access the library.",
    position: "bottom"
  }
};

/*
 * Arg: prod boolean
 *
 * true = we're running production
 * false = we're running development
 */
export function pageDriver(prod) {
  let steps = [
    cmiPageTitle,
    originalEdition,
    getAcquainted,
    acim,
    raj,
    wom,
    acol,
    jsb
  ];

  runFeatureIntro(steps);
}

export function pageNavigationDriver() {
  let steps = [
    cmiPageBanner,
    pageMenu,
    pageMenuBookmarkItem,
    pageMenuHelpItem,
    pageMenuSearchItem,
    pageMenuGuestLoginItem,
    pageMenuAccountLoginItem,
    pageMenuContents
  ];

  runFeatureIntro(steps);
}

export function transcriptDriver() {
  let transcriptDriverSteps = [];

  transcriptDriverSteps.push(cmiTranscriptBanner);
  transcriptDriverSteps.push(cmiTranscriptSourceTitle);
  transcriptDriverSteps.push(cmiTranscriptBookTitle);
  transcriptDriverSteps.push(transcriptMenuBookmarkItem);
  transcriptDriverSteps.push(transcriptMenuSearchItem);
  transcriptDriverSteps.push(transcriptMenuAudioItem);
  transcriptDriverSteps.push(transcriptMenuParagraphMarkerItem);
  transcriptDriverSteps.push(transcriptMenuPageTopItem);
  transcriptDriverSteps.push(transcriptMenuContentsItem);
  transcriptDriverSteps.push(transcriptMenuPreviousPageItem);
  transcriptDriverSteps.push(transcriptMenuNextPageItem);
  transcriptDriverSteps.push(transcriptMenuQuickLink);
  transcriptDriverSteps.push(transcriptMenuHelpItem);
  transcriptDriverSteps.push(transcriptMenuGuestLoginItem);
  transcriptDriverSteps.push(transcriptMenuAccountLoginItem);

  runFeatureIntro(transcriptDriverSteps);
}


