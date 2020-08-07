---
title: "Topic Management"
search: false
manageTopics: true
---

## Manage Topics
{: .ui.header.manage-topic-list.profile-page}

<table id="sourceTable" class="ui celled table">
  <thead>
    <tr>
      <th></th>
      <th>Source</th>
      <th>Books</th>
      <th>Annotations</th>
    </tr>
  </thead>
  <tbody>
  {% for item in site.data.source %}
    <tr id="{{item.sid}}">
      <td>
        <button data-sid="{{item.sid}}" class="collapse source-select ui green button">Focus</button>
      </td>
      <td>{{item.title}}</td>
      <td>
        <select name="book" id="book-list{{item.sid}}" class="search ui dropdown">
        {% for book in item.books %}
          <option value="{{book.value}}">{{book.name}}</option>
        {% endfor %}
        </select>
      </td>
      <td id="load-button-{{item.sid}}">
        <button data-sid="{{item.sid}}" class="bookmarks source-select ui primary button">Fetch</button>
      </td>
    </tr>
  {% endfor %}
  </tbody>
</table>

<div id="action-manager" class="hide ui form">
  <div class="fields">
    <div class="field">
      <button id="manageTopicsButton" disabled class="ui negative button"> Manage Topics </button>
    </div>
    <div class="field">
      <button id="displayBookmarksButtonNew" disabled class="ui green button"> Display Annotations </button>
    </div>
    <div class="field">
      <div id="topicSelectNew" class="ui multiple selection search dropdown">
        <input name="topicListNew" type="hidden">
        <i class="dropdown icon"></i>
        <div class="default text">Select Topics(s)</div>
        <div id="topic-list-new" class="menu"> </div>
      </div>
    </div>
    <div class="field">
      <button id="applyChangesButtonNew" disabled class="ui blue button"> Apply Changes </button>
    </div>
  </div>
</div>

<table id="topicTable" class="hide ui celled table">
  <thead>
    <tr>
      <th>Edit</th>
      <th>Delete</th>
      <th>Topic</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

Modify or delete topics and view related bookmarks.

<div id="topic-manager" class="ui form">
  <div class="fields">
    <div class="field">
      <label>Select Source</label>
      <div id="source-list" class="ui dropdown">
        <input type="hidden" name="source">
        <i class="dropdown icon"></i>
        <div class="default text">Select Source</div>
        <div class="menu">
          <div class="item" data-value="15">ACIM Original Edition</div>
          <div class="item" data-value="14">A Course Of Love</div>
          <div class="item" data-value="10">The Way of Mastery</div>
          <div class="item" data-value="16">Droga Mistrzostwa</div>
          <div class="item" data-value="13">The Raj Material</div>
          <div class="item" data-value="12">ACIM Sparkly Edition</div>
          <div class="item" data-value="11">The Impersonal Life</div>
        </div>
      </div>
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
      <div id="topicSelect" class="ui multiple selection search dropdown">
        <input name="topicList" type="hidden">
        <i class="dropdown icon"></i>
        <div class="default text">Select Topics(s)</div>
        <div id="topic-list" class="menu"> </div>
      </div>
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
      <label>Find Friends</label>
      <button id="findFriendsButton" disabled class="ui purple button"> Friends </button>
    </div>
    <div class="field">
      <label>Display Bookmarks</label>
      <button id="displayBookmarksButton" disabled class="ui green button"> Display </button>
    </div>
    <div class="field">
      <label>Apply Changes</label>
      <button id="applyChangesButton" disabled class="ui blue button"> Apply </button>
    </div>
  </div>
</div>

<hr/>

<div id="activity-report" class="ui text container"></div>

<div id="confirmDelete" class="ui mini modal">
  <div class="header">Delete Topic(s)?</div>
  <div class="content">
    <p>Selected topic(s) will be deleted from Topic list and all bookmarks.</p>
    <p id="topicsToDelete"></p>
  </div>
  <div class="actions">
    <div class="ui green approve button">Approve</div>
    <div class="ui red cancel button">Cancel</div>
  </div>
</div>
