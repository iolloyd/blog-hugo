---
layout: apple-default
title: "Blog"
description: "Thoughts on engineering leadership, scaling teams, and building exceptional technology organizations."
---

<section class="apple-blog-header">
  <div class="apple-container">
    <h1 class="apple-page-title">Engineering Leadership Insights</h1>
    <p class="apple-page-lead">
      Real-world experiences from scaling teams, optimizing infrastructure, and navigating hyper-growth. 
      No fluff, just practical insights from the trenches.
    </p>
  </div>
</section>

<section class="apple-blog-list">
  {% for post in site.posts %}
  <article class="apple-blog-item">
    <time class="apple-blog-item-date">{{ post.date | date: "%B %d, %Y" }}</time>
    <h2 class="apple-blog-item-title">
      <a href="{{ post.url }}">{{ post.title }}</a>
    </h2>
    <p class="apple-blog-item-excerpt">{{ post.description }}</p>
    <a href="{{ post.url }}" class="apple-btn apple-btn-text">Continue reading <span class="apple-btn-icon">→</span></a>
  </article>
  {% endfor %}
</section>

<section class="apple-blog-subscribe">
  <div class="apple-container">
    <div class="apple-subscribe-card">
      <h2>Stay connected</h2>
      <p>Get notified when I publish new insights on engineering leadership and team scaling.</p>
      <div class="apple-subscribe-options">
        <a href="https://linkedin.com/in/moorelloyd" class="apple-btn apple-btn-primary">Follow on LinkedIn</a>
        <a href="mailto:lloyd@lloydmoore.com" class="apple-btn apple-btn-secondary">Email me</a>
      </div>
    </div>
  </div>
</section>

<style>
  /* Blog header */
  .apple-blog-header {
    padding: calc(52px + var(--space-5xl)) 0 var(--space-3xl);
    text-align: center;
  }
  
  .apple-blog-header .apple-container {
    padding: 0 var(--fluid-space-lg);
  }
  
  .apple-page-title {
    font-size: var(--fluid-text-5xl);
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: var(--space-lg);
  }
  
  .apple-page-lead {
    font-size: var(--text-xl);
    color: var(--apple-gray-dark);
    line-height: var(--leading-relaxed);
    max-width: var(--container-md);
    margin: 0 auto;
  }
  
  /* Subscribe section */
  .apple-blog-subscribe {
    padding: var(--space-5xl) 0;
    background: var(--apple-gray-lighter);
  }
  
  .apple-subscribe-card {
    max-width: var(--container-sm);
    margin: 0 auto;
    text-align: center;
    padding: var(--space-3xl);
    background: var(--apple-white);
    border-radius: 24px;
  }
  
  .apple-subscribe-card h2 {
    font-size: var(--text-3xl);
    margin-bottom: var(--space-md);
  }
  
  .apple-subscribe-card p {
    font-size: var(--text-lg);
    color: var(--apple-gray-dark);
    margin-bottom: var(--space-xl);
  }
  
  .apple-subscribe-options {
    display: flex;
    gap: var(--space-md);
    justify-content: center;
    flex-wrap: wrap;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .apple-blog-header .apple-container {
      padding: 0 var(--fluid-space-sm);
    }
    
    .apple-page-title {
      font-size: var(--fluid-text-4xl);
      line-height: 1.1;
      word-wrap: break-word;
      overflow-wrap: break-word;
      hyphens: auto;
    }
    
    .apple-subscribe-options {
      flex-direction: column;
      width: 100%;
    }
    
    .apple-subscribe-options .apple-btn {
      width: 100%;
    }
  }
  
  /* Extra small screens */
  @media (max-width: 375px) {
    .apple-page-title {
      font-size: var(--fluid-text-3xl);
      letter-spacing: -0.01em;
    }
  }
</style>