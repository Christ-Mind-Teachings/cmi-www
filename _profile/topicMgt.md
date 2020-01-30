---
title: "Topic Management"
search: false
---

## Manage Topics
{: .ui.header.manage-topic-list.profile-page}

Modify or delete topics and view related bookmarks.

<div id="topic-manager" class="ui form">
  <div class="fields">
    <div class="field">
      <label>Select Source</label>
      <select name="source" id="source-list" class="search ui dropdown">
        <option value="0">Select Source</option>
        <option value="14">A Course Of Love</option>
        <option value="10">The Way of Mastery</option>
        <option value="13">The Raj Material</option>
        <option value="12">A Course in Miracles</option>
        <option value="11">The Impersonal Life</option>
      </select>
    </div>
    <div class="field">
      <label id="bookmarksLabel">Bookmarks (0)</label>
      <button id="getBookmarksButton" disabled class="ui primary button"> Load Bookmarks </button>
    </div>
  </div>
  <div class="fields">
    <div class="field">
      <label>Book</label>
      <select name="book" id="book-list1" class="search ui dropdown">
        <option value="*">-- Select Source --</option>
      </select>
    </div>
    <div class="field">
      <label id="topicsLabel">Topics (0)</label>
      <select name="topicList" id="topic-list" multiple class="search ui dropdown">
        <option value="*">-- Select Source --</option>
      </select>
    </div>
  </div>
  <div class="fields">
    <div class="field">
      <label>Delete Topics</label>
      <button id="deleteTopicsButton" disabled class="ui negative button"> Delete </button>
    </div>
    <div class="field">
      <label>Rename Topic</label>
      <button id="renameTopicButton" disabled class="ui yellow button"> Rename </button>
    </div>
    <div class="field">
      <label>Display Bookmarks</label>
      <button id="displayBookmarksButton" disabled class="ui green button"> Display </button>
    </div>
  </div>
</div>

<hr/>

<div id="bookmarkedText" class="ui text container"></div>

