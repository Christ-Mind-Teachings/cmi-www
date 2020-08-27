import Driver from "driver.js";

export function runFeatureIntro(stepArray, options) {
  //filter out array elements that are not visible on the page
  let validSteps = stepArray.filter((i) => {
    //don't filter elements that start with "!"
    if (i.element[0] === "!") {
      i.element = i.element.substring(1);
      return true;
    }
    let element = i.element.substring(1);
    let el = document.getElementById(element);
    let result = el ? el.offsetParent !== null : false;
    //if (!result) console.log(`${i.element} filtered from stepArray`);
    return result;
  });

  if (validSteps.length === 0) {
    //console.log("no steps in requested feature introduction");
    return;
  }

  if (!options) {
    options = {
      allowClose: false,
      opacity: 0.5
    };
  }

  const driver = new Driver(options);
  driver.defineSteps(validSteps);
  driver.start();
}

/**
 * Generic feature tour for CMI pages
 */
export function pageNavigationDriver(sourceTitle) {
  let steps = [
    {
      element: "#masthead-title",
      popover: {
        title: "Navigation and Features",
        description: "On every page you can click here to display the Library's main page to see all available teachings.",
        position: "bottom"
      }
    },
    {
      element: "#page-menu",
      popover: {
        title: "The Menu",
        description: "This is the page menu, it will stick to the top when the page is scrolled (when the tour is over) so it is always available. The menu on other pages is similar but may contain additional features.",
        position: "bottom"
      }
    },
    {
      element: "#bookmark-dropdown-menu",
      popover: {
        title: "List Bookmarks",
        description: "Display a list of bookmarks you have created and optionally filter by topic. You can quickly jump to any bookmark. Learn more about bookmarks <a href='/acq/bookmark/'>in the documentation.</a>",
        position: "bottom"
      }
    },
    {
      element: "#search-modal-open",
      popover: {
        title: "Search Through All Books",
        description: `Find topics of interest by searching through all <em>${sourceTitle}</em> books. Follow a search match to use the Search Navigator to visit the results directly in the transcript.`,
        position: "bottom"
      }
    },
    {
      element: "#quick-links-dropdown-menu",
      popover: {
        title: "Navigate to Another Teaching",
        description: "Quickly jump to one of the other teachings in the Library.",
        position: "bottom"
      }
    },
    {
      element: "#help-menu",
      popover: {
        title: "Get Help and Learn About",
        description: "Learn about the teaching and using the features of the site.",
        position: "bottom"
      }
    },
    {
      element: "#login-guest-menu-option",
      popover: {
        title: "Create an Account or Sign In",
        description: "Create an account and sign in to the site. It's free and allows you to create bookmarks that you can share via Facebook and keep synchronized between devices.",
        position: "left"
      }
    },
    {
      element: "#login-account-menu-option",
      popover: {
        title: "Sign Out and Access Profile",
        description: "A dropdown menu that allows you to sign out and to access account holder features.",
        position: "left"
      }
    }
  ];

  runFeatureIntro(steps);
}

/**
 * Generic tour for transcript pages
 */
export function transcriptDriver(sourceTitle) {

  let steps = [];

  steps.push({
    element: "#masthead-title",
    popover: {
      title: "Library of Christ Mind Teachings",
      description: `Click this link to navigate away from <em>${sourceTitle}</em> to the Library's Home page.`,
      position: "bottom"
    }
  });
  steps.push({
    element: "#transcript-header",
    popover: {
      title: "Page Title",
      description: "This title identifies the teaching and transcript found on the page.",
      position: "bottom"
    }
  });

  steps.push({
    element: "#src-title",
    popover: {
      title: `${sourceTitle}`,
      description: `This page is part of <em>${sourceTitle}</em>. Click this link to navigate to ${sourceTitle} Home page.`,
      position: "bottom"
    }
  });

  steps.push({
    element: "#book-title",
    popover: {
      title: "Book Title",
      description: "This identifies the book and chapter of the content on this page.",
      position: "bottom"
    }
  });

  steps.push({
    element: "#bookmark-dropdown-menu",
    popover: {
      title: "Bookmarks",
      description: `You can create a bookmark from highlighted text and associate the bookmark with
      one or more topics. Bookmark creation is disabled when the icon looks like this
      <i class="icons"> <i class="bookmark green icon"></i><i class="corner close icon"></i></i>
      . Learn more about bookmarks <a href='/acq/bookmarks/'>in the documentation.</a>`,
      position: "right"
    }
  });

  steps.push({
    element: "#search-modal-open",
    popover: {
      title: "Search Through All Books",
      description: `Find topics of interest by searching through all ${sourceTitle} books.`,
      position: "bottom"
    }
  });

  steps.push({
    element: "#audio-player-menu-option",
    popover: {
      title: "Listen to the Audio",
      description: "Click the speaker icon to display the audio player and listen along as you read. Hide the player by clicking the icon again.",
      position: "bottom"
    }
  });

  steps.push({
    element: "#pnum-toggle-menu-option",
    popover: {
      title: "Show/Hide Paragraph Markers",
      description: `Show or hide the markers that preceed each paragraph. Markers are hidden when the icon looks
      like this: <i class="icons"><i class="paragraph icon"></i><i class="corner close icon"></i></i>`,
      position: "bottom"
    }
  });

  steps.push({
    element: "#jump-to-top-menu-option",
    popover: {
      title: "Go To Top of Page",
      description: "Quickly jump to the top of the page.",
      position: "bottom"
    }
  });

  steps.push({
    element: "#contents-modal-open",
    popover: {
      title: "Table of Contents",
      description: "View the table of contents and quickly jump to another transcript in the book.",
      position: "bottom"
    }
  });

  steps.push({
    element: "#toc-previous-page",
    popover: {
      title: "Previous Page",
      description: "Go to the previous page. This is disabled when the first page is displayed.",
      position: "bottom"
    }
  });

  steps.push({
    element: "#toc-next-page",
    popover: {
      title: "Next Page",
      description: "Go to the next page. This is disabled when the last page is displayed.",
      position: "bottom"
    }
  });

  steps.push({
      element: "#quick-links-dropdown-menu",
      popover: {
        title: "Navigate to Another Teaching",
        description: "Quickly jump to one of the other teachings in the Library.",
        position: "bottom"
      }
    });

  steps.push({
    element: "#about-dropdown-menu",
    popover: {
      title: "Get Help",
      description: "Learn how to use features of the Library.",
      position: "bottom"
    }
  });

  steps.push({
    element: "#login-guest-menu-option",
    popover: {
      title: "Create an Account or Sign In",
      description: "Create an account and sign in to the site. It's free and allows you to create bookmarks that you can share via Facebook and keep synchronized between devices.",
      position: "left"
    }
  });

  steps.push({
    element: "#login-account-menu-option",
    popover: {
      title: "Sign Out and Access Profile",
      description: "A dropdown menu that allows you to sign out and to access account holder features.",
      position: "left"
    }
  });

  steps.push({
    element: "#transcript-menu",
    popover: {
      title: "Contact Me",
      description: "If you have ideas, encounter errors or difficulty using this site, please let me know by <a href='/acq/contact'>using the Contact Form.</a> Thanks!",
      position: "bottom-center"
    }
  });

  runFeatureIntro(steps);
}
