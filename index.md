---
layout: home
title: "Home"
description: "Lloyd Moore - Engineering executive specializing in scaling teams, platforms and revenue. CTO & VP Engineering with expertise in cloud architecture and digital transformation."
---

<section class="hero-section">
  <div class="container">
    <div class="hero-content">
      <h1 class="hero-title">From Royal Marines to Silicon Valley</h1>
    <h2 class="hero-subtitle">Engineering Leadership at Scale</h2>
    
    <div class="value-props-container">
      <div class="value-prop-slider">
        <span class="value-prop">Scaled Teams 10→187 Engineers</span>
        <span class="value-prop">Drove $3.25B Valuation</span>
        <span class="value-prop">Cut Cloud Costs by 70%</span>
        <span class="value-prop">Achieved 99.98% Uptime</span>
      </div>
    </div>
    
    <p class="hero-description">
      Engineering executive who transforms organizations through military-precision leadership 
      and Silicon Valley innovation. I build world-class teams that deliver exceptional results 
      in hyper-growth environments.
    </p>
    
    <div class="hero-cta">
      <a href="/cv" class="btn btn-primary">View My Experience</a>
      <a href="#contact" class="btn btn-secondary">Let's Connect</a>
    </div>
  </div>
  
  <div class="hero-image">
    <!-- Professional cartoon avatar -->
    <div class="cartoon-avatar">
      <div class="avatar-head">
        <div class="avatar-hair"></div>
        <div class="avatar-face">
          <div class="avatar-eyes">
            <div class="avatar-eye left"></div>
            <div class="avatar-eye right"></div>
          </div>
          <div class="avatar-nose"></div>
          <div class="avatar-mouth"></div>
        </div>
      </div>
      <div class="avatar-body">
        <div class="avatar-shirt">
          <div class="avatar-tie"></div>
        </div>
      </div>
    </div>
    </div>
  </div>
</section>

<section class="impact-metrics">
  <div class="container">
    <h2>Proven Impact at Scale</h2>
    <div class="metrics-grid">
    <div class="metric-card">
      <div class="metric-number">187</div>
      <div class="metric-label">Engineers Managed</div>
      <div class="metric-detail">Scaled from 10 in 18 months</div>
    </div>
    <div class="metric-card">
      <div class="metric-number">$3.25B</div>
      <div class="metric-label">Company Valuation</div>
      <div class="metric-detail">Engineering underpinned growth</div>
    </div>
    <div class="metric-card">
      <div class="metric-number">70%</div>
      <div class="metric-label">Cost Reduction</div>
      <div class="metric-detail">While improving performance</div>
    </div>
    <div class="metric-card">
      <div class="metric-number">4%</div>
      <div class="metric-label">Team Attrition</div>
      <div class="metric-detail">Industry-leading retention</div>
    </div>
    </div>
  </div>
</section>

<section class="expertise-areas">
  <div class="container">
    <h2>Areas of Expertise</h2>
    <div class="expertise-grid">
    <div class="expertise-card">
      <h3>Hyper-Growth Leadership</h3>
      <p>Proven track record scaling engineering organizations from startup to enterprise, 
      maintaining culture and velocity while growing 10x+.</p>
    </div>
    <div class="expertise-card">
      <h3>Platform Architecture</h3>
      <p>Deep expertise in multi-cloud infrastructure, microservices, and building platforms 
      that handle billions in transaction volume.</p>
    </div>
    <div class="expertise-card">
      <h3>Cost Optimization</h3>
      <p>Unique ability to drive dramatic cost reductions while improving system performance 
      and reliability.</p>
    </div>
    <div class="expertise-card">
      <h3>Team Development</h3>
      <p>Military leadership principles applied to tech: 40% internal promotion rate, 
      world-class engineering culture.</p>
    </div>
    </div>
  </div>
</section>

<section class="companies-section">
  <div class="container">
    <h2>Trusted By Industry Leaders</h2>
    <div class="companies-grid">
    <div class="company-logo">
      <img src="/assets/images/blockdaemon-logo.svg" alt="Blockdaemon" />
    </div>
    <!-- Add more company logos as needed -->
    </div>
  </div>
</section>

<section class="recent-thoughts">
  <div class="container">
    <h2>Recent Thoughts on Engineering Leadership</h2>
    <div class="blog-preview">
    {% for post in site.posts limit:3 %}
    <article class="blog-card">
      <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
      <p class="post-meta">{{ post.date | date: "%B %d, %Y" }}</p>
      <p>{{ post.description }}</p>
      <a href="{{ post.url }}" class="read-more">Read more →</a>
    </article>
    {% endfor %}
    </div>
    <div class="blog-cta">
      <a href="/blog" class="btn btn-outline">View All Articles</a>
    </div>
  </div>
</section>

<section id="contact" class="contact-section">
  <div class="container">
    <h2>Let's Build Something Great Together</h2>
    <p>Whether you're scaling a team, optimizing infrastructure, or navigating hyper-growth, 
    I'd love to explore how we can work together.</p>
    <div class="contact-options">
      <a href="mailto:lloyd@lloydmoore.com" class="btn btn-primary">Email Me</a>
      <a href="https://www.linkedin.com/in/lloydmoore" class="btn btn-secondary">Connect on LinkedIn</a>
    </div>
  </div>
</section>