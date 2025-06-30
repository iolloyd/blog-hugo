---
layout: page
title: Blog
permalink: /blog/
description: "Technical leadership insights, engineering best practices, and thoughts on scaling teams and platforms from Lloyd Moore."
---

<div class="blog-header">
  <h1>Engineering Leadership Insights</h1>
  <p class="blog-intro">Thoughts on scaling teams, building platforms, and navigating the intersection of technology and business strategy.</p>
</div>

<div class="blog-posts-container">
  {% for post in site.posts %}
    <article class="blog-post-item">
      <h2 class="blog-post-title">
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </h2>
      <div class="blog-post-meta">
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
        {% if post.categories %}
          <span class="categories">
            {% for category in post.categories %}
              <span class="category">{{ category }}</span>
            {% endfor %}
          </span>
        {% endif %}
      </div>
      <div class="blog-post-excerpt">
        {{ post.description | default: post.excerpt | strip_html | truncate: 250 }}
      </div>
      <a href="{{ post.url | relative_url }}" class="read-more-link">Read full article →</a>
    </article>
  {% endfor %}
</div>

<section class="blog-cta-section">
  <div class="blog-cta-container">
    <h2>Let's Connect</h2>
    <p>I enjoy discussing engineering leadership challenges and opportunities. Feel free to reach out if you'd like to explore ideas or potential collaboration.</p>
    <div class="blog-cta-buttons">
      <a href="mailto:lloyd@lloydmoore.com" class="btn btn-primary">Get in Touch</a>
      <a href="https://www.linkedin.com/in/lloydmoore" class="btn btn-secondary">Follow on LinkedIn</a>
    </div>
  </div>
</section>