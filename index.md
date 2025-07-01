---
layout: apple-home
title: "Lloyd Moore"
description: "Engineering executive transforming organizations through military-precision leadership and Silicon Valley innovation."
---

<section class="apple-hero">
  <div class="apple-hero-container">
    <p class="apple-hero-eyebrow">Engineering Leadership</p>
    <h1 class="apple-hero-title">Think different.<br>Build exceptional.</h1>
    <h2 class="apple-hero-subtitle">From Royal Marines to Silicon Valley</h2>
    <p class="apple-hero-description">
      I transform engineering organizations by combining military precision with Silicon Valley innovation. 
      Building world-class teams that deliver exceptional results in hyper-growth environments.
    </p>
    <div class="apple-hero-cta">
      <a href="/cv" class="apple-btn apple-btn-primary">View experience</a>
      <a href="#connect" class="apple-btn apple-btn-text">Connect with me <span class="apple-btn-icon">→</span></a>
    </div>
  </div>
</section>

<section class="apple-metrics">
  <div class="apple-container">
    <div class="apple-feature-grid">
      <div class="apple-feature-card">
        <div class="apple-feature-number">187</div>
        <h3 class="apple-feature-title">Engineers</h3>
        <p class="apple-feature-description">Scaled from 10 in just 18 months</p>
      </div>
      <div class="apple-feature-card">
        <div class="apple-feature-number">$3.25B</div>
        <h3 class="apple-feature-title">Valuation</h3>
        <p class="apple-feature-description">Engineering-driven growth</p>
      </div>
      <div class="apple-feature-card">
        <div class="apple-feature-number">70%</div>
        <h3 class="apple-feature-title">Cost reduction</h3>
        <p class="apple-feature-description">While improving performance</p>
      </div>
      <div class="apple-feature-card">
        <div class="apple-feature-number">4%</div>
        <h3 class="apple-feature-title">Attrition</h3>
        <p class="apple-feature-description">Industry-leading retention</p>
      </div>
    </div>
  </div>
</section>

<section class="apple-philosophy">
  <div class="apple-container">
    <h2 class="apple-section-title">Leadership philosophy</h2>
    <p class="apple-section-lead">
      Great engineering isn't just about code. It's about building teams that can achieve the impossible.
    </p>
    <div class="apple-philosophy-grid">
      <div class="apple-philosophy-item">
        <h3>Scale with intention</h3>
        <p>Growing from 10 to 187 engineers isn't just about hiring. It's about maintaining culture, velocity, and excellence at every step.</p>
      </div>
      <div class="apple-philosophy-item">
        <h3>Optimize relentlessly</h3>
        <p>70% cost reduction while improving performance isn't magic. It's the result of systematic analysis and fearless decision-making.</p>
      </div>
      <div class="apple-philosophy-item">
        <h3>Lead by example</h3>
        <p>Military leadership principles applied to tech: clear mission, empowered teams, and unwavering standards.</p>
      </div>
    </div>
  </div>
</section>

<section class="apple-recent-posts">
  <div class="apple-container">
    <h2 class="apple-section-title">Recent thoughts</h2>
    <div class="apple-blog-preview">
      {% for post in site.posts limit:2 %}
      <article class="apple-blog-preview-item">
        <time class="apple-blog-preview-date">{{ post.date | date: "%B %d, %Y" }}</time>
        <h3 class="apple-blog-preview-title">
          <a href="{{ post.url }}">{{ post.title }}</a>
        </h3>
        <p class="apple-blog-preview-excerpt">{{ post.description }}</p>
        <a href="{{ post.url }}" class="apple-btn apple-btn-text">Read more <span class="apple-btn-icon">→</span></a>
      </article>
      {% endfor %}
    </div>
    <div class="apple-section-cta">
      <a href="/blog" class="apple-btn apple-btn-secondary">View all articles</a>
    </div>
  </div>
</section>

<section id="connect" class="apple-connect">
  <div class="apple-container">
    <h2 class="apple-section-title">Let's connect</h2>
    <p class="apple-section-lead">
      Whether you're scaling a team, optimizing infrastructure, or navigating hyper-growth, 
      I'd love to explore how we can work together.
    </p>
    <div class="apple-connect-options">
      <a href="mailto:lloyd@lloydmoore.com" class="apple-btn apple-btn-primary">Email me</a>
      <a href="https://www.linkedin.com/in/moorelloyd" class="apple-btn apple-btn-secondary">LinkedIn</a>
    </div>
  </div>
</section>