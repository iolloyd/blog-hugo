---
layout: minimal-default
title: "Essays"
description: "Thoughts on engineering leadership, scaling teams, and building exceptional technology organizations."
---

<h1>Essays</h1>

<ul class="minimal-post-list">
  {% for post in site.posts %}
  <li>
    <span class="minimal-post-date">{{ post.date | date: "%b %d, %Y" }}</span>
    <a href="{{ post.url }}" class="minimal-post-title">{{ post.title }}</a>
  </li>
  {% endfor %}
</ul>