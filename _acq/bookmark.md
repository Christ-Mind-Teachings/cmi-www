---
title: About Bookmarks
fb:
  desc: "Learn how to use bookmarks and annotations in the CMI Library"
  image: "cmi/bookmark_modal.png"
search: false
---

## Bookmarks and Annotations
{: .disable-paragraph-marker}

Bookmarks are paragraph markers that may contain highlighted text, annotations,
and topic classifications.

<div class="ui info ignored icon message">
  <i class="info letter icon"></i>
  <div class="content">
    <div class="header">Sign In First</div>
    <p>You must be signed in to use the Bookmark feature.</p>
    <ul class="list">
      <li>Bookmarks and quotes can be shared to Facebook and by email.</li>
      <li>See <a href="/acq/accounts/">CMI User Accounts</a> for details.</li>
    </ul>
  </div>
</div>

Click the menu bookmark icon to open the Bookmark Dialog window and view a
listing of bookmarks within the current teaching. The bookmark icon behaves a
little differently on landing and document pages as shown below.

### Landing Pages

On landing pages just click the bookmark icon to display the bookmark dialog.

<div class="ui container" markdown="1">
  ![Landing Page Bookmarks](/public/img/cmi/bookmark-landing-menu.jpg)
</div>

### Document Pages

On document pages, the bookmark icon shows a dropdown menu, choose "Show
Bookmarks" to display the bookmark dialog.

<div class="ui container" markdown="1">
  ![Landing Page Bookmarks](/public/img/cmi/bookmark-document-menu.jpg)
</div>

As described below, one way to create bookmarks is by selecting text. One of
the side effects of this is that you are unable to select text to paste in
another document because each time you select text the bookmark creation dialog
is displayed effectively preventing you from copying the text.

You can disable bookmark creation so that copy/paste functions normally. Once
disabled, the bookmark feature will remain unavailable until you enable it. 

The disabled state is indicated by a small 'x' in the lower right hand side of
the bookmark icon.

## No Bookmarks

When you open the dialog before bookmarks have been created you'll see this
message. The "See the Bookmark documentation..." link at the bottom links
you to this page.

<div class="ui container" markdown="1">
  ![Landing Page Bookmarks](/public/img/cmi/bookmark-none.jpg)
</div>

## Creating Bookmarks

There are two ways to create bookmarks. 

### Selecting Text, Selected Text Style Bookmark

The first method is by selecting text within a paragraph. This may be a sentance
that you want to highlight within the document. 

Note that selecting text is limited to one paragraph and making a selection
that includes text from multiple paragraphs is not supported. 

Selected text bookmarks can be used to create quotes that are displayed on the teaching
home page and can be shared to Facebook and by email.

See the [Text Selection](#selection-details) section below for details on selecting text for bookmarks.

### Click Paragraph Number, Note Style Bookmark

You can create bookmarks without selecting text by clicking the *paragraph id*
found at the start of each paragraph. This is the paragraph number and looks
like this: (p10).

If the paragraph number is not displayed, it is hidden by the paragraph number toggle in the
menu bar. Just click the paragraph icon to show it.

In both cases, selecting text and clicking the paragraph number a Bookmark
Create dialog will appear.

<div class="ui container" markdown="1">
  <img class="ui image massive" src="/public/img/cmi/bm-create.jpg">
  <!-- ![Bookmark Creation](/public/img/cmi/bm-create.jpg) -->
</div>

<div class="ui relaxed list">
  <div class="item">
    <i class="sun icon"></i>
    <div class="content">
      <div class="header">Ending Paragraph</div>
      <div class="description">
        <p>
        Note style bookmarks can span several paragraphs. The default value in the field
        is the starting paragraph number and you can change it to include later
        paragraphs. For example, when the bookmark begins on p11 and the Ending
        Paragraph field is set to p12 the bookmark will include both p11 and
        p12. A value less than the starting number is ignored.
        </p>
        <p>
        This is helpful when the content you want to capture in a bookmark
        spans several paragraphs. See the <a href="#sharing-bookmarks">Sharing
        Bookmarks</a> section for an example.
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
        You can associate one or more topics to a bookmark as a way to place it
        in a category as an orgainzational aid. When you have many bookmarks it
        can be difficult to go back and find what you're looking for and topics
        are intended to simplify that problem.
        </p>
        <p>
        The topic list is a dropdown list of all topics defined for bookmarks
        in the current teaching. Initially the list will be empty because no
        topics have been defined. Topics are defined using the *New Topics*
        field just below.
        </p>
        <p>
        Selecting topics is optional and you can associate one or more with
        your bookmark. Just select topics from the list. If you want to use a
        topic that is not in the list enter it into the <em>New Topics</em> field.
        </p>
        <p>
        You filter bookmarks by topic on a document page and in the bookmark
        list dialog. See below for details.
        </p>
      </div>
    </div>
  </div>
  <div class="item">
    <i class="sun icon"></i>
    <div class="content">
      <div class="header">Comment</div>
      <div class="description">
        Use the <em>Comment</em> field to optionally add your commentary or to
        annotate the paragraph or highlighted text.
      </div>
    </div>
  </div>
  <div class="item">
    <i class="sun icon"></i>
    <div class="content">
      <div class="header">New Topics</div>
      <div class="description">
        <p>
          When you want to categorize the bookmark with a topic that has not
          been used before enter it in this field. Separate multiple topics by
          a comma. Topics can contain multiple words and will be formatted so
          that each word is capitalized.
        </p>
        <p>
          For example, if you enter: "holy spirit, awakening", two topics will
          be created "Holy Spirit" and "Awakening". They will be associated
          with the current bookmark and added to the topic list for use in
          future bookmarks.
        </p>
      </div>
    </div>
  </div>
  <div class="item">
    <i class="sun icon"></i>
    <div class="content">
      <div class="header">Additional Information</div>
      <div class="description">
        <p>
          The <em>Additional Information</em> field is used for extra notes you
          want to add to the bookmark.
        </p>
      </div>
    </div>
  </div>
  <div class="item">
    <i class="sun icon"></i>
    <div class="content">
      <div class="header">Share Button</div>
      <div class="description">
        <p>
        There are two ways to share bookmarks and clicking the Share button is one of them. The
        button is disabled when you first create a bookmark but is available when you edit it. See
        the <b>Sharing Bookmarks</b> section below for further details.
        </p>
      </div>
    </div>
  </div>
  <div class="item">
    <i class="sun icon"></i>
    <div class="content">
      <div class="header">Links</div>
      <div class="description">
        <p>
        Links allow you to create one or more links from one bookmark to others. This
        could be useful to connect a group of related bookmarks together and allows you
        to jump from one to the next. And you can link to bookmarks in different teachings.
        </p>
        <p>
        See the <em>Linking Bookmarks</em> section below for more information.
        </p>
      </div>
    </div>
  </div>
</div>

When you finish with the form, click "Submit" to create the bookmark or
"Cancel" to cancel. Notice that "Delete" and "Share" are disabled for new bookmarks.

Here is an example of a filled out form for a new bookmark. Notice that the
"Ending Paragraph" field was changed from p6 to p9 so the bookmark refrences 4
paragraphs, from p6 to p9. Notice also that two new topics will be created
"Practice" and "Honesty" and that the "Topic List" already contains previously
defined topics.

<div class="ui container" markdown="1">
  ![Bookmark Creation](/public/img/cmi/bookmark-new.jpg)
</div>

Note: The paragraph id of paragraphs containing selected text bookmarks is displayed in red.
For Note sytle bookmarks, the paragraph id is preceded by a red asterisk.

## Viewing Bookmarks

Now when you click the *Show Bookmarks* menu option you see the bookmark dialog
showing the bookmark we just created. Initially, the list contains an entry for
each component of the teaching that has bookmarks defined with the name of the
component and number of bookmarks displayed.

<div class="ui container" markdown="1">
  ![Bookmark Listing Closed](/public/img/cmi/bookmark-listing1.jpg)
</div>

The details of each bookmark can be seen by clicking the green "Open" button.

<div class="ui container" markdown="1">
  ![Bookmark Listing Open](/public/img/cmi/bookmark-listing-open1.jpg)
</div>

Here, you can see there is one bookmark for the ACIM Study Group, 2009 taken
from the Jan 17, 2009 session with Raj. The bookmark is from paragraph 6 with
topics "Practice", and "Honesty" with a comment of "A daily awakening
practice."

When you click on the link "Paragraph: p6" the Jan 17, 2009 document will be
displayed and scrolled to paragraph 6.

## Bookmark Navigator

When you open a bookmark from the bookmark dialog the *Bookmark Navigator*
becomes active. Like the [Search Navigator](/acq/search/#search-navigator), the
bookmark navigator allows you to navigate between bookmarks on the page and
between pages of a teaching.

<div class="ui container" markdown="1">
  ![Bookmark Navigator](/public/img/cmi/bookmark-navigator.jpg)
</div>

In this example there is only one bookmark defined so the previous and next
links of the navigator are disabled.

## Editing Bookmarks

When viewing any page with bookmarks the bookmarks are automatically
highlighted when the page is loaded. Different colors are used when there are
multiple selected text style bookmarks defined for a given paragraph. 

You can take a quick peek at the bookmark by hovering the mouse over
highlighted text. 

<div class="ui container" markdown="1">
  <img class="massive ui image" src="/public/img/cmi/bm-hover.jpg">
  <!--
  ![Bookmark Hover](/public/img/cmi/bm-hover.jpg)
  -->
</div>

In this example there are both Note and Selected Text style bookmarks and that's
where the paragraph id is red and preceded by an asterisk. 

The popup show an overview of the Selected Text bookmark highlighted in yellow. It
has the topics *Communication*, *Reality*, and *You*, starts and ends in
paragraph p3 and contains the comment "You create mediums of communication."

The *Copy Link Reference* button is used when creating bookmark links. See the *Linking 
Bookmarks* section for details.

<div class="ui container" markdown="1">
  ![Bookmark Edit](/public/img/cmi/bookmark-edit.jpg)
</div>

You change the range, topics, comment and even add new topics. Press "Submit"
to save the changes, "Cancel" to discard changes, and "Share" to share the
bookmark by Facebook or email. You can also press "Delete" to delete the
bookmark entirely.

## Sharing Bookmarks
{: #sharing-bookmarks}

When shared, the bookmark text and a link to the page and paragraph, is sent to the recipient(s).
They can click the link to see the bookmark directly in the source from which
it came. In this way the content is not taken out of context and can be easily
discovered.

Bookmarks can be shared to Facebook and by email. When you find something in a
teaching you find inspirational and want to share it, create a bookmark and
follow these steps.

First, navigate to the bookmark. There are two ways to do this; using the
*Show Bookmarks* Dialog or when editing a bookmark.

### Share starting from the Show Bookmark Dialog

Open the Bookmark List Dialog as discussed earlier. The page will load and the
bookmark navigator will be active.

<div class="ui container" markdown="1">
  <img class="massive ui image" src="/public/img/cmi/bm-share.jpg">
</div>

Click the comment in the bookmark navigator to share the bookmark. The display will change to show you
how it will look when a recipient follows the link that was shared.

### Share When Editing

Click the highlighted text of a bookmark on a document page or, for Note style bookmarks
click the paragraph identifier. This displays the bookmark
edit dialog. Next to the Submit and Cancel buttons is the Share button. This is
disabled when the bookmark is first being defined and has not yet been saved.

Clicking "Share" will close the edit form and change the display to look
similar to the way it will look when a recipient follows the link that is
shared.

Remember you can edit the bookmark comment before you share it if necessary.

If it looks good, press the <i class="facebook icon"></i> icon to share to
Facebook or <i class="envelope outline icon"></i> icon to share by email.

### Sharing to Facebook

Here's what it looks like when you share to Facebook.

<div class="ui container" markdown="1">
  ![Bookmark FB Post](/public/img/cmi/bookmark-fb-post.jpg)
</div>

On Facebook, when someone clicks on the link in your post, the page containing
the bookmark will be opened and scrolled to the bookmark location. The display
will look like this.  The bookmark is emphasized in place using the bookmark
comment as a title. The emphasis is removed when the "X" is clicked.

<div class="ui container" markdown="1">
  ![Bookmark FB Post](/public/img/cmi/bookmark-follow-shared-link.jpg)
</div>

### Sharing via Email

When you share by email you are prompted to enter the email addresses of those
you want to share with. You can select names from a predefined maillist that
you create and/or enter one or more addresses separated by a comma. An email
will be sent to each address.

You can also add a message to the recipients if you like and optionally include html
as shown in the example.

Learn about creating a maillist in the [User Profile](/acq/profile/) section.

<div class="ui container">
  <img class="massive ui image" src="/public/img/cmi/bm-maillist.jpg">
</div>

When you press "Submit" the email will be sent. It will take a few moments to receive confirmation that
the messages were successfully delivered.

The recipient will receive a message with the subject: *\[Your Name\] shared a
quote from the Library of Christ Mind Teachings*.

Here's what the email looks like.

<div class="ui container">
  <img class="massive ui image" src="/public/img/cmi/bm-email.jpg">
</div>

When sharing bookmarks via email check with the recipient to see if they
received the email. It is possible that it gets delivered to the junk folder;
we don't want that, it's not junk!

When the "To The Source" button is clicked in the email the browser is opened and the
page with the bookmark is loaded and the bookmark is displayed. This is how the
page will be presented.

<div class="ui container">
  <img class="massive ui image" src="/public/img/cmi/bm-link-followed.jpg">
</div>

### Using Placeholders in Email Messages

When you share a quote using a mail list that you created and you select multiple
addresses from the list, you can personalize your message by adding a
placeholder.

In the example below the first name of each recipient will replace the placeholder
*%recipient.first%*. There are two placeholders available, %recipient.first% and
%recipient.last%.

<div class="ui container">
  <img class="massive ui image" src="/public/img/cmi/bm-email-placeholder.jpg">
</div>

This is very nice when sharing quotes with groups.

## Controlling Bookmark Display

If you've defined a lot of bookmarks the page may look like your favorite
spiritual text - all marked up. Bookmark highlights for Selected Text bookmarks
can be turned off, either selectively or for all bookmarks on the page.

To turn off the highlight for all bookmarks select the "Hide Highlighted Text"
option from the Bookmark menu. To turn the highlight on again go back to the
Bookmark menu and choose the "Show Highlighted Text" option.

### Selective Bookmark Display

You can limit display of Selected Text bookmarks to those containing a
specific topic. Pick the topic from the "Filter Bookmarks" option of the
Bookmark menu. This is a list of all topics used in all the bookmarks on the
page. Text will remain highlighted only for those bookmarks containing the
selected topic.

<div class="ui container">
  <img class="massive ui image" src="/public/img/cmi/bm-page-filter.jpg">
</div>

The "Topic Filter" header in the Bookmark menu will show, in red, the topic
selected when a filter is active.

To clear the filter select the "Clear Filter" selection of the "Page Topic
List".

<div class="ui container">
  <img class="massive ui image" src="/public/img/cmi/bm-current-filter.jpg">
</div>

## Filtering in Bookmark List Dialog and Navigator

When you have a lot of bookmarks and want to search through only those
containing selected topics start with the Bookmark List Dialog. A Filter option
allows you to filter bookmarks by one or more topics and the filter will be
honored by the Bookmark Navigator as you move to different pages.

Select one or more topics from the Filter Topic List in the Bookmark List
Dialog and click the "Filter" button.

<div class="ui container" markdown="1">
  ![Bookmark List Filter](/public/img/cmi/bookmark-list-filter.jpg)
</div>

Little changes after filtering but the results have been filtered and can be
seen in the bookmark count to the right of the component names in the list.

<div class="ui container" markdown="1">
  ![Bookmark List Filter Result](/public/img/cmi/bookmark-dialog-filter-result.jpg)
</div>

Here, only bookmarks containing the topics "Masculine" and/or "Practice" remain
in the list. The "ACIM Study Group, 2009 (1/3)" component has three bookmarks
and all but one have been filtered.

<div class="ui container" markdown="1">
  ![Bookmark List Filter Result](/public/img/cmi/bookmark-dialog-filter-open.jpg)
</div>

Now, when you follow a bookmark link from the filtered list, the Bookmark
Navigator that opens on the page will ignore all filtered bookmarks. Clear the
filter by clicking the Reset button on the Bookmark List dialog.

## Linking Bookmarks

Linking allows you to link a bookmark with one or more other bookmarks so that you and quickly
to the linked bookmarks. You can link to bookmarks in the current of in different teachings. Linking
allows you to create your own navigation to related topics throughout the Library.

Below is an example of a Note Style bookmark that has a link defined. The link is indicated by the
<i class="linkify icon"></i> icon. Clicking on the icon will show all the links that have been
defined, in this case there is just one.

The link has a short description and a reference to the where the link points to, in square brackets. Clicking
the link will take you directly to that location.

<div class="ui container">
  <img class="massive ui image" src="/public/img/cmi/bm-link.jpg">
</div>

### Creating Links

When creating links you must first get a reference to the bookmark that you want to link to. This is
done by clicking the green <em>Copy Link Reference</em> button in the bookmark summary popup. The
popup is displayed whenever you hover the mouse over hightlighted text in a Selected Text bookmark or
over the paragraph id for a Note Style bookmark.

<div class="ui container">
  <img class="massive ui image" src="/public/img/cmi/bm-link-reference.jpg">
</div>

This link will be used to create a in the bookmark that this bookmarks points to back to this
bookmark.

Edit the linked bookmark and click the <em>Link</em> button to open the Linking dialog.

<div class="ui container">
  <img class="massive ui image" src="/public/img/cmi/bm-link-dialog.jpg">
</div>

In the Link dialog, copy the Link Reference into the Link field. You must use a reference that came from
clicking the green button as described above or it will be rejected. You also cannot enter a link that
references itself.

Add a description of the link and press "Submit" to create the link. You can also add another link by
pressing the green "+" button before pressing "Submit". Click the yellow "-" button if no longer want
the link.

Here's the new link just created. Click on that and go directly to the bookmark that links to this one.

<div class="ui container">
  <img class="massive ui image" src="/public/img/cmi/bm-new-link.jpg">
</div>




