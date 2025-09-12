---
layout: tactical-briefing
title: "When 'Boring' Technology is the Best Choice"
date: 2025-01-30
categories: [architecture, leadership, devops]
description: "Why choosing 'boring' technology like HashiCorp Nomad over popular options like Kubernetes can be the most innovative decision for your business."
metrics:
  - "50% reduction in operational complexity"
  - "3-month deployment timeline vs 9+ months for K8s"
  - "Zero specialized hiring required"
  - "Multi-cloud deployment across GCP, AWS, bare metal"
---

> "Nobody ever got fired for buying IBM."

Replace IBM with Kubernetes in 2025. The saying still holds true.

I've scaled engineering teams from 10 to 187 people. Here's what I learned: **the best technology solves your problem with the least fuss. Popular doesn't mean right.**

## The Messy Reality of Multi-Cloud Architecture

We faced a classic challenge recently. We needed to deploy one application across Google Cloud Platform, AWS, and bare-metal racks. The overlay network had to stretch across all three environments.

The whiteboard diagram looked clean. Reality was messier.

Our first instinct was Kubernetes. It's the default choice. Everyone hires for it. Then we ran the numbers.

### The Hidden Costs of the "Popular" Choice

Kubernetes would cost us dearly:

**Too much configuration**: We'd drown in YAML files. Connecting different cloud providers would create endless complexity.

**Network headaches**: Container networking (CNIs) and load balancing (ingress controllers) are difficult. Managing them across multiple environments seemed impossible.

**Maintenance burden**: Our small reliability team would spend all their time keeping Kubernetes running. Upgrades and custom resources would eat everything.

We'd spend time maintaining the tool instead of building products. That's backwards.

## The "Boring" Alternative: HashiCorp Nomad

Nomad doesn't headline conference keynotes. It lacks Kubernetes' buzz and marketing budget. But boring can be the smart choice.

### Why Nomad Won

We had three main reasons:

**Multi-Cloud Made Simple**
We needed to connect clusters across different cloud providers. Nomad solved this with one command. Clusters join and work. No complex controllers needed. No authentication headaches.

**Lightweight Setup**
Nomad is just one file you download and run. Installation works the same everywhere - cloud servers or physical hardware. It uses far less resources than Kubernetes.

**Everything Works Together**
Service networking (Consul) comes built-in. Secret management (Vault) integrates natively. You don't add layers of complexity.

### The Results That Matter

We shipped our unified network in weeks, not months. The resilient system spanned three distinct environments.

More importantly:
- Operational toil dropped dramatically
- Engineers built features instead of fighting infrastructure
- Our small SRE team could take vacations

## A Decision Framework for Technical Leaders

Would I recommend Nomad for everyone? No. If you're scaling headcount rapidly, choose Kubernetes. You'll find k8s engineers more easily than Nomad experts.

Here's my framework for these decisions:

### 1. What Problem Are You Actually Solving?

Start with your business need, not the technology. List your actual requirements. Ignore features you think you might need someday.

### 2. How Big and Experienced Is Your Team Today?

Five people can't run infrastructure built for fifty. Look at your team's current skills. Consider how much new technology they can learn.

### 3. What Will Hiring Look Like in 18 Months?

Planning to grow your team ten times larger? Choose technology with common skills. Staying small? Choose simple operations.

## The Innovation in "Boring"

The 'boring' choice can be your smartest move. Innovation isn't about using trendy technology. It's about delivering business value quickly and reliably.

Choosing Nomad over Kubernetes gave us:
- Shipped faster to customers
- Less time spent on maintenance
- Engineers focused on building products
- A system that worked without constant firefighting

Real innovation solves the right problems with minimal complexity.

---

*What's your experience with choosing "boring" technology? Have you gone against popular choices and found success? I'd love to hear your stories.*

*Originally shared on [LinkedIn](https://linkedin.com/in/moorelloyd)*