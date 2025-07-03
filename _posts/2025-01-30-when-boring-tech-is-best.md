---
layout: post
title: "When 'Boring' Technology is the Best Choice"
date: 2025-01-30
categories: [architecture, leadership, devops]
description: "Why choosing 'boring' technology like HashiCorp Nomad over popular options like Kubernetes can be the most innovative decision for your business."
---

> "Nobody ever got fired for buying IBM."

Swap IBM for Kubernetes in 2025, and the saying still lands. But here's the truth I've learned after scaling engineering teams from 10 to 187 people: **the best technology isn't the most popular or the most hyped—it's the one that solves your problem with the least friction and the most forward thinking.**

## The Messy Reality of Multi-Cloud Architecture

Recently, we faced a classic distributed systems challenge: deploying one application with one overlay network stretched across Google Cloud Platform, AWS, and bare-metal racks. On the whiteboard, it looked like a tidy diagram. In reality? Not so much.

Our first instinct, like most teams, was Kubernetes. It's the default choice, the safe bet, the technology everyone's hiring for. Then we ran the numbers:

### The Hidden Costs of the "Popular" Choice

- **Cluster Federation**: We'd be drowning in endless YAML configurations trying to stitch clouds and on-premises infrastructure together
- **Networking Complexity**: Juggling CNIs and ingress controllers felt like playing 4-D chess while blindfolded
- **Operational Overhead**: Our lean SRE team would spend more time babysitting cluster upgrades and wrestling with CRDs than delivering value

We were on course to spend our energy maintaining the orchestrator, not shipping features that matter to the business.

## The "Boring" Alternative: HashiCorp Nomad

Nomad rarely headlines conference keynotes. It doesn't have the buzz of Kubernetes or the marketing budget of cloud-native darlings. But sometimes, boring is the sane choice.

### Why Nomad Won

**1. Multi-Cloud Federation Made Simple**
- Our requirement: Seamless cluster federation across clouds
- Nomad's solution: One command, cluster joins, done
- No complex federation controllers or cross-cluster authentication nightmares

**2. Lightweight Footprint**
- Single binary deployment
- Same installation path everywhere (cloud or bare metal)
- Minimal resource overhead compared to k8s control plane

**3. Integrated Stack**
- Built-in Consul for service mesh
- Native Vault integration for secrets management
- No need to bolt on additional complexity

### The Results That Matter

In **weeks, not months**, we shipped a unified, resilient network across three distinct environments. More importantly:
- Operational toil dropped dramatically
- Engineers focused on building features instead of fighting infrastructure
- Our small SRE team could actually take vacations

## A Decision Framework for Technical Leaders

Would I recommend Nomad for everyone? Absolutely not. If you're scaling headcount rapidly, Kubernetes wins on talent pool alone—you'll find k8s engineers easier than Nomad experts.

Here's my simple framework for making these decisions:

### 1. What Problem Are You Actually Solving?
- Don't start with the technology; start with the business need
- List your actual requirements, not the features you think you might need

### 2. How Big and Experienced Is Your Team Today?
- A team of 5 can't operate infrastructure designed for a team of 50
- Consider your team's existing expertise and learning capacity

### 3. What Will Hiring Look Like in 18 Months?
- If you're planning to 10x your team, optimize for common skills
- If you're staying lean, optimize for operational simplicity

## The Innovation in "Boring"

Sometimes, the "boring" choice is the most innovative move you can make. It's not about using the coolest technology—it's about delivering business value quickly and sustainably.

In our case, choosing Nomad over Kubernetes meant:
- Faster time to market
- Lower operational overhead
- Happier engineers who could focus on product features
- A system that just worked, without the drama

The real innovation isn't in the technology you choose; it's in solving the right problems with the least complexity.

---

*What's your experience with choosing "boring" technology? Have you ever gone against the popular choice and found success? I'd love to hear your stories.*

*Originally shared on [LinkedIn](https://linkedin.com/in/moorelloyd)*