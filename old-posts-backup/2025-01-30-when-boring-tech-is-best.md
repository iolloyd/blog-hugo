---
title: "Nobody Got Fired for Buying Kubernetes"
date: 2025-01-30
---

Nobody ever got fired for buying IBM.

Replace IBM with Kubernetes. The saying still holds.

Your team needs to deploy across multiple clouds. The answer is obvious: Kubernetes. It's what everyone uses. It's what everyone hires for. It's safe.

Except when it isn't.

## The Problem with Safe Choices

A team I was working with had a simple problem. Deploy a platform across GCP, AWS, and some bare metal servers. Network everything together.

The team's first instinct? Kubernetes, obviously.

I ran the numbers. Kubernetes would take us nine months to deploy properly. We'd need new hires. We'd drown in YAML files. Our three-person ops team would spend their lives keeping the thing running instead of building products.

That is not innovation. We picked HashiCorp Nomad instead.

Nobody writes Medium articles about Nomad. It doesn't have Kubernetes' marketing budget. It won't impress your friends at conferences.

But it worked.

One binary. Download and run. Same everywhere - cloud or bare metal. Clusters connect with one command. No CNI headaches. No ingress controllers. No wondering why your pods won't schedule.

We deployed in two weeks, not three months.

## When Boring Wins

The best technology solves your problem with minimum fuss.

Nomad gave us:
- Multi-cloud networking that actually worked
- Zero new hires needed
- Engineers building features, not debugging infrastructure
- Ops team that could take weekends off

That's real innovation. Not using the latest shiny thing, but shipping products faster.

Would I recommend Nomad for everyone? No.

If you're scaling to hundreds of engineers, use Kubernetes. You'll find the talent. If you need every feature under the sun, use Kubernetes.

But ask yourself:
- What problem are you actually solving?
- How big is your team today?
- What can they realistically operate?

Sometimes the boring choice is the smart choice.

The goal isn't to use cool technology. It's to build products that work.


Most engineering decisions aren't about technology. They're about people, time, and what you can actually execute.

Choose accordingly.
