---
title: About Bookmarks
fb:
  desc: "Learn how to use bookmarks and annotations in the CMI Library"
  image: "cmi/bookmark_modal.png"
search: false
---

## Bookmarks and Annotations
{: .disable-paragraph-marker}

Bookmarks are paragraph markers that may contain highlighted text, annotations, and topic classifications.

<div class="ui info ignored icon message">
  <i class="info letter icon"></i>
  <div class="content">
    <div class="header">Sign In First</div>
    <p>Signing in is not required but it offers these features...</p>
    <ul class="list">
      <li>Bookmarks created when you're signed in are accessible from all your devices</li>
      <li>and they can be shared to Facebook and via email.</li>
      <li>See <a href="https://www.christmind.info/acq/accounts/">CMI User Accounts</a> for details.</li>
    </ul>
  </div>
</div>

Click the menu bookmark icon to open the Bookmark Dialog window and view a listing of bookmarks within the current teaching. The bookmark icon behaves a little differently on landing and document pages as shown below.

### Landing Pages

On landing pages just click the bookmark icon to display the bookmark dialog.

<div class="ui container" markdown="1">
  ![Landing Page Bookmarks](/public/img/cmi/bookmark-landing-menu.jpg)
</div>

### Document Pages

On documentpages, the bookmark icon shows a dropdown menu, choose "Show Bookmarks" to display the bookmark dialog.

<div class="ui container" markdown="1">
  ![Landing Page Bookmarks](/public/img/cmi/bookmark-document-menu.jpg)
</div>

## No Bookmarks

When you open the dialog before bookmarks have been created you'll see this message. The "See the Bookmark documentation..." link at the bottom links to you this page.

<div class="ui container" markdown="1">
  ![Landing Page Bookmarks](/public/img/cmi/bookmark-none.jpg)
</div>

## Creating Bookmarks

There are two ways to create bookmarks. 

### Selecting Text

The first method is by selecting text within a paragraph. This maybe a sentance that you want to highlight within the document. 

Note that selecting text is limited to one paragraph and making a selection that includes text from multiple paragraphs is not supported. 

See the <a href="#selection-details">Text Selection</a> section below for details on selecting text for bookmarks.

### Click Paragraph Number

You can create bookmarks without selecting text by clicking the *paragraph id* at found at the start of each paragraph. This is the paragraph number and looks like this: (p10).

In both cases, selecting text and clicking the paragraph number a Bookmark Create dialog will appear.

<div class="ui container" markdown="1">
  ![Bookmark Creation](/public/img/cmi/bookmark-create.jpg)
</div>

<div class="ui relaxed list">
  <div class="item">
    <i class="sun icon"></i>
    <div class="content">
      <div class="header">Ending Paragraph</div>
      <div class="description">
        <p>
        A bookmark can span several paragraphs. The default value in the field is the starting paragraph number and you can change it to include later paragraphs. For example, when the bookmark begins on p11 and the Ending Paragraph field is set to p12 the bookmark will include both p11 and p12. A value less than the starting number is ignored.
        </p>
        <p>
        This is helpful when the content you want to capture in a bookmark spans several paragraphs. See the <a href="#sharing-bookmarks">Sharing Bookmarks</a> section for an example.
        </p>
      </div>
    </div>
  </div>
  <div class="item">
    <i class="sun icon"></i>
    <div class="content">
      <div class="header">Topic List</div>
      <div class="description">
        <p>
        You can associate one or more topics to a bookmark as a way to place it in a category as an orgainzational aid. When you have many bookmarks it can be difficult to go back and find what you're looking for and topics are intended to simplify that problem.
        </p>
        <p>
        The topic list is a dropdown list of all topics defined for bookmarks in the current teaching. Initially the list will be empty because no topics have been defined. Topics are defined using the *New Topics* field just below.
        </p>
        <p>
        Selecting topics is optional and you can associate one or more with your bookmark. Just select topics from the list. If you want to use a topic that is not in the list enter it into the *New Topics* field.
        </p>
        <p>
        You filter bookmarks by topic on a document page and in the bookmark list dialog. See below for details.
        </p>
      </div>
    </div>
  </div>
  <div class="item">
    <i class="sun icon"></i>
    <div class="content">
      <div class="header">Comment</div>
      <div class="description">
        Use the *Comment* field to optionally add your commentary or to annotate the paragraph or highlighted text.
      </div>
    </div>
  </div>
  <div class="item">
    <i class="sun icon"></i>
    <div class="content">
      <div class="header">New Topics</div>
      <div class="description">
        <p>
          When you want to categorize the bookmark with a topic that has not been used before enter it in this field. Separate multiple topics by a comma. Topics can contain multiple words and will be formatted so that each word is capitalized.
        </p>

        <p>
          For example, if you enter: "holy spirit, awakening", two topics will be created "Holy Spirit" and "Awakening". They will be associated with the current bookmark and added to the topic list for use in future bookmarks.
        </p>
      </div>
    </div>
  </div>
</div>

When you finish with the form click "Submit" to create the bookmark and "Cancel" to cancel. Notice that "Delete" is disabled for new bookmarks.

Here is an example of a filled out form for a new bookmark. Notice that the "Ending Paragraph" field was changed from p6 to p9 so the bookmark refrences 4 paragraphs, from p6 to p9. Notice also that two new topics will be created "Practice" and "Honesty" and that the "Topic List" already contains previously defined topics.

<div class="ui container" markdown="1">
  ![Bookmark Creation](/public/img/cmi/bookmark-new.jpg)
</div>

Note: The paragraph id of paragraphs containing bookmarks are displayed in red. When no selected text is associated with the bookmark the paragraph id is preceded by a red asterisk.

## Viewing Bookmarks

Now when you click the *Show Bookmarks* menu option you see the bookmark dialog showing the bookmark we just created. Initially, the list contains an entry for each component of the teaching that has bookmarks defined with the name of the component and number of bookmarks displayed.

<div class="ui container" markdown="1">
  ![Bookmark Listing Closed](/public/img/cmi/bookmark-listing1.jpg)
</div>

The details of each bookmark can be seen by clicking the green "Open" button.

<div class="ui container" markdown="1">
  ![Bookmark Listing Open](/public/img/cmi/bookmark-listing-open1.jpg)
</div>

Here, you can see there is one bookmark for the ACIM Study Group, 2009 taken from the Jan 17, 2009 session with Raj. The bookmark is from paragraph 6 with topics "Practice", and "Honesty" with a comment of "A daily awakening practice."

When you click on the link "Paragraph: p6" the Jan 17, 2009 document will be displayed and scrolled to paragraph 6.

## Bookmark Navigator

When you open a bookmark from the bookmark dialog the *Bookmark Navigator* becomes active. Like the [Search Navigator](/acq/search/#search-navigator), the bookmark navigator allows you to navigate between bookmarks on the page and between components of a teaching.

<div class="ui container" markdown="1">
  ![Bookmark Navigator](/public/img/cmi/bookmark-navigator.jpg)
</div>

In this example there is only one bookmark defined so the previous and next links of the navigator are disabled.

## Editing Bookmarks

When viewing any page with bookmarks the bookmarks are automatically highlighted when the page is loaded. Different colors are used when there are multiple bookmarks defined for a given paragraph. 

You can take a quick peek at the bookmark by hovering the mouse over highlighted text. 

<div class="ui container" markdown="1">
  ![Bookmark Hover](/public/img/cmi/bookmark-hover.jpg)
</div>

In this example, you can see the bookmark ranges from p6/p9, that the topics "Practice" and "Honesty" are associated with it and the comment: "A daily awakening practice."

You can modify a bookmark by clicking on the highligt or the paragraph id when not highlight is associated.

<div class="ui container" markdown="1">
  ![Bookmark Edit](/public/img/cmi/bookmark-edit.jpg)
</div>

You change the range, topics, comment and even add new topics. Press "Submit" to save the changes and "Cancel" to abort. You can also press "Delete" to delete the bookmark entirely.

## Sharing Bookmarks
{: #sharing-bookmarks}

When shared a link, containing the bookmark text, is sent to the recipient(s). They can click the link to see the bookmark directly in the source from which it came. In this way the content is not taken out of context and be easily discovered.

Bookmarks can be shared to Facebook and by email. When you find something in a teaching you find inspirational and want to share it, create a bookmark and follow these steps.

First, navigate to the bookmark by opening the Bookmark List Dialog as disucssed earlier. The page will load and the bookmark navigator will be active.

<div class="ui container" markdown="1">
  ![Bookmark Sharing](/public/img/cmi/bookmark-navigator2.jpg)
</div>

Click the comment to share the bookmark. The display will change to show you how it will look when a recepient follows the link that was shared.

<div class="ui container" markdown="1">
  ![Bookmark Sharing](/public/img/cmi/bookmark-share.jpg)
</div>

Remember you can edit the bookmark comment before you share it if necessary.

If it looks good, press the <i class="facebook icon"></i> icon to share to Facebook or <i class="envelope outline icon"></i> icon to share by email. Note: sharing by email is not ready yet.

Here's what it looks like when you share to Facebook.

<div class="ui container" markdown="1">
  ![Bookmark FB Post](/public/img/cmi/bookmark-fb-post.jpg)
</div>

On Facebook, when the link shared in your post is clicked, the page will be opened and scrolled to the bookmark location. The display will look like this. The bookmark is emphasized in place using the bookmark comment as a title. The emphasis is removed when the "X" is clicked.

<div class="ui container" markdown="1">
  ![Bookmark FB Post](/public/img/cmi/bookmark-follow-shared-link.jpg)
</div>

## Controlling Bookmark Display

If you've defined a lot of bookmarks the page may look like your favorite spiritual text - all marked up. Bookmark highlight can be turned off, either selectively or for all bookmarks on the page.

To turn off the highlight for all bookmarks select the "Hide Highlighted Text" option from the Bookmark menu. To turn the highlight on again go back to the Bookmark menu and choose the "Show Highlighted Text" option.

### Selective Bookmark Display

You can limit display of highlighted bookmark text to bookmarks containing a specific topic. Pick the topic from the "Page Topic List" option of the Bookmark menu. This is a list of all topics used in all the bookmarks on the page. Text will remain highlighted only for those bookmarks contains the selected topic.

The "Topic Filter" header in the Bookmark menu will show, in red, the topic selected.

To clear the filter select the "Clear Filter" selection of the "Page Topic List".`

<div class="ui container" markdown="1">
  ![Bookmark Filter](/public/img/cmi/bookmark-filter.jpg)
</div>

## Filtering in Bookmark List Dialog and Navigator

When you have a lot of bookmarks and want to search through only those containing selected topics start with the Bookmark List Dialog. A Filter option allows you to filter bookmarks by one or more topics and the filter will be honored by the Bookmark Navigator.

Select one or more topics from the Filter Topic List in the Bookmark List Dialog and click the "Filter" button.

<div class="ui container" markdown="1">
  ![Bookmark List Filter](/public/img/cmi/bookmark-list-filter.jpg)
</div>

Little changes after filtering but the results have been filtered and can be seen in the bookmark count to the right of the component names in the list.

<div class="ui container" markdown="1">
  ![Bookmark List Filter Result](/public/img/cmi/bookmark-dialog-filter-result.jpg)
</div>

Here, only bookmarks containing the topics "Masculine" and/or "Practice" remain in the list. The "ACIM Study Group, 2009 (1/3)" component has three bookmarks and all but one have been filtered.

<div class="ui container" markdown="1">
  ![Bookmark List Filter Result](/public/img/cmi/bookmark-dialog-filter-open.jpg)
</div>

Now, when you follow a bookmark link from the filtered list, the Bookmark Navigator that opens on the page will ignore all filtered bookmarks. Clear the filter by clicking the Reset button on the Bookmark List dialog.

## Text Selection
{: #selection-details}

Text selection for bookmarks is restricted to a single paragraph. That means you cannot create a bookmark from a selection that spans paragraphs. A message will be displayed when you try to do that.

It is possible to get a message that your selection spanned paragraphs when you clearly did not. This usually happens when the first part of the text selected is different from the ending. For example, the selection below causes the selection to be rejected and an incorrect message to be displayed.

<div class="ui container" markdown="1">
  ![Bookmark Text Selection Error](/public/img/cmi/bookmark-selection-error.jpg)
</div>

This is because the beginning of the selected text is different from the end. The beginning is normal whereas the ending is italizised. The solution is to include the period after *you* in the selection because it is displayed in a normal font. In the case of a period you can't actually tell it's in a normal fount. The solution is to have the beginning and ending text of the selection displayed in the same format.
