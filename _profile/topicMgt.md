---
title: "Topic Management"
search: false
manageTopics: true
---

## Manage Topics
{: .ui.header.manage-topic-list.profile-page}

<div class="field">
  <button id="applyChangesButtonNew" title="Save changes" disabled class="ui blue button"> Apply Changes </button>
</div>

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
    <div class="three wide field">
      <button id="manageTopicsButton" title="Edit and delete topics" disabled class="ui blue button"> Manage Topics </button>
    </div>
    <div class="three wide field">
      <button id="displayBookmarksButtonNew" title="Display annotations optionally filtered by book and topic" disabled class="ui green button"> Display Annotations </button>
    </div>
    <div class="seven wide field">
      <div id="topicSelectNew" class="ui multiple selection search dropdown">
        <input name="topicListNew" type="hidden">
        <i class="dropdown icon"></i>
        <div class="default text">Select Topics(s)</div>
        <div id="topic-list-new" class="menu"> </div>
      </div>
    </div>
    <div class="three wide field">
      <div id="condition-toggle" class="ui toggle checkbox">
        <input type="checkbox" name="condition">
        <label>OR</label>
      </div> 
    </div>
  </div>
  <div class="hide annotation-actions">
    <div class="fields">
      <div class="three wide field">
        <button class="hide-headers ui primary button">Hide Headers</button>
      </div>
      <div class="three wide field">
        <button class="hide-quotes ui green button">Hide Quotes</button>
      </div>
      <div id="annotation-filter" class="inline fields">
        <label for="annotationFilter">Filter Results?</label>
        <div class="field">
          <div class="cmi-filter ui radio checkbox">
            <input type="radio" checked="" value="none" name="annotationFilter" tabindex="0" class="hidden">
            <label>None</label>
          </div>
        </div>
        <div class="field">
          <div class="cmi-filter ui radio checkbox">
            <input type="radio" value="note" name="annotationFilter" tabindex="0" class="hidden">
            <label>Note</label>
          </div>
        </div>
        <div class="field">
          <div class="cmi-filter ui radio checkbox">
            <input type="radio" value="selected" name="annotationFilter" tabindex="0" class="hidden">
            <label>Selected</label>
          </div>
        </div>
      </div>
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

<hr/>

<div id="activity-report" class="ui text container"></div>

<div id="confirmDelete" class="ui mini modal">
  <div class="header">Delete Topic?</div>
  <div class="content">
    <p>Selected topic will be deleted from Topic list and all bookmarks.</p>
    <p id="topicsToDelete"></p>
  </div>
  <div class="actions">
    <div class="delete-approve ui green approve button">Approve</div>
    <div class="ui red cancel button">Cancel</div>
  </div>
</div>
