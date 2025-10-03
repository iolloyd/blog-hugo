---
title: "Engineering Metrics VCs Actually Care About (From Someone Who Passed Their Due Diligence Three Times)"
date: 2025-07-22
draft: false
categories: ["leadership", "fundraising"]
tags: ["metrics", "due-diligence", "vcs", "cto", "series-a"]
---

I prepared technical due diligence materials for Blockdaemon's Series A, B, and C funding rounds. Three times I had to answer the question: how do we know your technology actually works at scale?

The answer that got us to $3.25 billion valuation wasn't the one most CTOs think matters.

VCs don't care about your velocity metrics. They don't care about story points. They barely care about your deployment frequency.

What impressed them was simple: we were running infrastructure for Meta and JP Morgan across five continents, and it worked.

That's it. Institutional clients trusted us with mission-critical infrastructure. That told VCs everything they needed to know.

But getting to that point meant tracking the right metrics internally. Here's what actually mattered.

## The hierarchy of metrics that matter

Most engineering teams track the wrong things. They measure what's easy to measure instead of what actually predicts success.

Here's how to think about metrics properly:

**Business outcomes** (what the board sees)
- Revenue per engineer
- Customer trust signals (enterprise clients, SLAs met)
- Infrastructure reliability (uptime, incident frequency)
- Cost efficiency (unit economics, cloud spend)

**Delivery velocity** (what product teams see)
- Time from commit to production
- Lead time for changes
- Deployment frequency
- Change failure rate

**Team health** (what determines whether you can sustain velocity)
- Retention rate
- Time to productivity for new hires
- Team satisfaction scores
- Knowledge distribution (no single points of failure)

**Technical quality** (what enables everything else)
- Test coverage that matters (not just %)
- Production incident trends
- Technical debt paydown rate
- Performance under load

The mistake most CTOs make: they report up from the bottom. They show VCs test coverage and deployment frequency.

VCs want to see from the top down. Business outcomes first. Then the metrics that drive those outcomes.

## What VCs actually asked during due diligence

Technical due diligence isn't a code review. VCs don't care about your tech stack unless it's actively holding you back.

They want to understand three things:

**Can your technology scale with the business?**

This is where institutional clients mattered. We weren't running infrastructure for startups. We were running it for Meta and JP Morgan. That answered the scalability question before they asked it.

For you, the question is: do you have proof points that your technology works at scale? Customer names matter. SLA uptime matters. Handling load spikes matters.

If you can't point to evidence that your technology works under pressure, that's a red flag.

**Is your team capable of building what comes next?**

VCs care about retention because knowledge loss kills scaling. Our 96% retention rate told them we weren't going to haemorrhage talent right when we needed to accelerate.

They care about hiring velocity and quality. Can you attract good people? Can you onboard them effectively? Do they stay?

For us, the Blockdaemon University system showed we'd thought about scaling the team systematically, not just throwing bodies at problems.

**What are the technical risks?**

This is where VCs dig into architecture, dependencies, technical debt, and single points of failure.

We deployed validators across five continents. That meant we'd solved for global distribution, latency, redundancy, and disaster recovery. Those aren't easy problems. Solving them meant we'd thought about resilience properly.

Your technical risks will be different, but the question is the same: what breaks when you scale? What happens if a key person leaves? What happens if a major dependency fails?

If you don't have good answers, VCs notice.

## The metrics that predict success versus the metrics that look good

Here's the gap most CTOs miss: metrics that make you look good in board meetings aren't always the metrics that predict success.

**Metrics that predict success:**

**Retention rate** - If you're losing good people, something is fundamentally wrong. We maintained 96% retention through hypergrowth. That wasn't luck. That was deliberate.

**Time to productivity** - How long until a new hire ships meaningful work? If it's three months, you can't scale hiring. If it's three weeks, you can.

**Deployment frequency and lead time** - These actually matter. Not because VCs care, but because they indicate whether your team can ship quickly. We went from 4.5 hour deployments to 2 minutes. That unlocked velocity.

**Customer trust signals** - Are enterprise customers willing to bet on you? We had institutional clients trusting us with critical infrastructure. That's a stronger signal than any internal metric.

**Unit economics** - Can you serve customers profitably as you scale? We cut cloud costs 70% while handling 2 million+ API calls daily. That showed we understood cost efficiency.

**Metrics that just look good:**

**Story points completed** - Meaningless. Every team calibrates differently. Can't compare across teams or companies.

**Code coverage percentage** - Tells you nothing about whether the right things are tested. We cared about test coverage that caught real bugs, not hitting 80% arbitrary target.

**Lines of code** - Nobody cares. Shipping working code matters. Shipping lots of code doesn't.

**Number of features shipped** - Meaningless without context. Did those features matter? Did customers use them?

The difference: metrics that predict success tell you about sustainability and capability. Metrics that look good are often theatre.

## What to have ready before due diligence

When you enter technical due diligence, you need documentation ready. VCs will ask for this, and scrambling to create it makes you look unprepared.

**Architecture overview**
- High-level system architecture
- Key technology choices and why you made them
- How you handle scale, redundancy, security
- Third-party dependencies and risks

**Team structure and capability**
- Org chart with roles and responsibilities
- Key person risks and mitigation plans
- Hiring velocity and retention data
- How you onboard and develop people

**Delivery capability**
- Development process overview
- How you ship code (CI/CD, testing, monitoring)
- Deployment frequency and reliability
- How you handle incidents and outages

**Technical roadmap**
- What you're building in the next 12-18 months
- Technical debt and how you're managing it
- Infrastructure investments needed
- How technical roadmap aligns with business goals

**Security and compliance**
- Security practices and certifications
- Data handling and privacy
- Compliance requirements for your industry
- Incident response procedures

You don't need a 100-page document. You need clear, honest answers to the questions VCs will ask.

## The question behind the questions

VCs aren't trying to catch you out. They're trying to understand risk.

The technical due diligence process is asking: what could go wrong, and have you thought about it?

Can your technology scale? Have you hired a team that can execute? Are there technical risks that could derail the business?

When we showed them Meta and JP Morgan as clients, we weren't bragging. We were demonstrating that we'd already solved the scaling problems they were worried about.

When we showed 96% retention, we were showing we could keep the team together while growing.

When we showed infrastructure deployed across five continents, we were showing we'd thought about global resilience.

That's what VCs want to see. Evidence that you've thought about the hard problems and solved them, or at least have a credible plan.

## What this means for Series A companies

If you're heading into Series A or B fundraising, technical due diligence is coming. Here's what to focus on:

**Get your retention sorted.** If you're losing people, that's a red flag VCs won't ignore. Fix it before you fundraise.

**Have clear proof points.** Customer names. Uptime data. Scale metrics. Something that demonstrates your technology works under pressure.

**Document your architecture decisions.** Not for VCs - for you. If you can't explain why you made key technical choices, that's a problem.

**Know your risks.** Single points of failure. Technical debt. Key person dependencies. VCs will find them. Better to acknowledge them with mitigation plans than look blindsided.

**Align metrics with business outcomes.** Stop reporting story points. Start reporting things that matter - retention, deployment speed, customer reliability, unit economics.

The companies that pass technical due diligence easily aren't the ones with perfect technology. They're the ones that understand their risks and have credible plans to manage them.

We passed due diligence three times not because our technology was flawless, but because we'd thought about what could go wrong and built systems to handle it.

That's what VCs are looking for. Not perfection. Competence and awareness.
