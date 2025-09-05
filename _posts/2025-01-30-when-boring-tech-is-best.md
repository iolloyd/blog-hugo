---
layout: post
title: "When 'Boring' Technology is the Best Choice"
date: 2025-01-30
categories: [architecture, leadership, devops]
description: "Why choosing 'boring' technology like HashiCorp Nomad over popular options like Kubernetes can be the most innovative decision for your business."
---

> "Nobody ever got fired for buying IBM."

Replace IBM with Kubernetes in 2025. The saying still rings true. I've scaled engineering teams from 10 to 187 people. Here's what I learned: **the best technology solves your problem with minimal friction. It's not the most popular or hyped.**

## The Messy Reality of Multi-Cloud Architecture

We faced a classic challenge recently. We needed to deploy one application across Google Cloud Platform, AWS, and bare-metal racks. The overlay network had to stretch across all three environments.

The whiteboard diagram looked clean. Reality was messier.

Our first instinct was Kubernetes. It's the default choice. Everyone hires for it. Then we ran the numbers.

### The Hidden Costs of the "Popular" Choice

Kubernetes would cost us dearly:

**Cluster Federation**: We'd drown in YAML configurations. Stitching clouds and on-premises infrastructure together meant endless complexity.

**Networking Complexity**: CNIs and ingress controllers are hard. Juggling them across environments felt impossible.

**Operational Overhead**: Our lean SRE team would spend all their time on maintenance. Cluster upgrades and CRDs would consume everything.

We'd maintain the orchestrator instead of shipping features. That's backwards.

## The "Boring" Alternative: HashiCorp Nomad

Nomad doesn't headline conference keynotes. It lacks Kubernetes' buzz and marketing budget. But boring can be the smart choice.

### Why Nomad Won

We had three main reasons:

**Multi-Cloud Federation Made Simple**
We needed seamless cluster federation across clouds. Nomad delivered with one command. Clusters join and work. No complex federation controllers. No cross-cluster authentication nightmares.

**Lightweight Footprint**
Nomad uses a single binary deployment. The installation path is identical everywhere - cloud or bare metal. Resource overhead stays minimal compared to the k8s control plane.

**Integrated Stack**
Consul comes built-in for service mesh. Vault integration handles secrets natively. You don't bolt on additional complexity.

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

A team of 5 can't operate infrastructure designed for 50 people. Consider your team's existing expertise. Factor in their learning capacity.

### 3. What Will Hiring Look Like in 18 Months?

Plan to 10x your team? Optimize for common skills. Staying lean? Optimize for operational simplicity.

## The Innovation in "Boring"

The "boring" choice can be your most innovative move. Innovation isn't about using cool technology. It's about delivering business value quickly and sustainably.

Choosing Nomad over Kubernetes gave us:
- Faster time to market
- Lower operational overhead
- Happier engineers focused on product features
- A system that worked without drama

Real innovation solves the right problems with minimal complexity.

---

*What's your experience with choosing "boring" technology? Have you gone against popular choices and found success? I'd love to hear your stories.*

*Originally shared on [LinkedIn](https://linkedin.com/in/moorelloyd)*