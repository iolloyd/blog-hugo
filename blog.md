---
layout: page
title: Blog
permalink: /blog/
description: "Technical leadership insights, engineering best practices, and thoughts on scaling teams and platforms from Lloyd Moore."
---

## Blog Posts

<ul>
  {% for post in site.posts %}
    <li>
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p>{{ post.excerpt }}</p>
      <p><small>Published on {{ post.date | date: "%B %d, %Y" }}</small></p>
    </li>
  {% endfor %}
</ul> 