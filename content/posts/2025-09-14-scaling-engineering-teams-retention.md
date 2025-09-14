---
title: "How I Scaled Engineering Teams 1,770% While Maintaining 96% Retention"
date: 2025-09-14
draft: false
categories: ["leadership", "engineering"]
tags: ["scaling", "leadership", "cto", "vp-engineering"]
---

Your best engineers are leaving. Not just yours - everyone's.

The tech industry bleeds talent at 68% annual turnover. For every three engineers you hire, two will be gone by year-end. In blockchain infrastructure, this gets worse. Teams disintegrate under the weight of their own success.

I learned this the hard way at Blockdaemon during our unicorn run to $3.25B valuation. We needed to grow from 10 to 187 engineers across 14 countries while handling 200 million daily API calls. Most startups would accept the carnage - hire fast, burn through people, hope enough stick around.

We took a different path. We maintained 96% retention while scaling 1,770%. Here's why that matters, and how we did it - including the painful mistakes that taught us what actually works.

## Why I Nearly Lost My Best Engineer

Picture this: It's 2 AM. Our Ethereum nodes are down. $50M in daily transaction volume is stuck in limbo. My lead infrastructure engineer, Richard, has been debugging for six straight hours while I field increasingly panicked calls from customers whose DeFi protocols depend on our uptime.

Richard fixes it. Again. Like he's fixed dozens of critical issues before.

Two weeks later, he tells me he's considering leaving.

"Why?" I asked, genuinely confused. We were paying Silicon Valley rates globally so we weren't geographically restricted. He had equity. He was clearly valued.

"Lloyd, I'm tired of being the only person who can fix these problems. Every night, every weekend. I want to build something bigger than firefighting."

That conversation changed everything about how we scaled.

## The Node Reliability Crisis That Taught Me About Retention

In our early days, we thought retention meant keeping people happy. Free lunch, flexible hours, competitive pay. Standard startup playbook.

We were wrong.

When crypto hit mainstream in 2021, our API calls went from 200,000 to 2 million daily in eight months. Our Ethereum nodes couldn't handle the load. We had three engineers who understood our custom node orchestration system. When one of them got COVID and another went on paternity leave, the third person - Richard - became a single point of failure.

He was working 80-hour weeks. Not because we asked his to, but because millions of dollars in transactions depended on our infrastructure being up.

This is when I learned that retention isn't about perks. It's about sustainable paths to bigger impact.

## Three Failure Stories That Built Our Success

### Failure #1: The Promotion That Wasn't

Our first attempt at scaling involved hiring senior engineers from FAANG companies. We thought experience would translate directly. It didn't.

One senior engineer from a FAANG company joined to lead our consensus mechanism optimization. Great on paper. In practice, he struggled with the ambiguity of blockchain infrastructure work. Where his previous company had well-defined problems and established solutions, we were figuring out how to make Byzantine fault tolerance work across 50+ blockchain networks simultaneously.

Six months in, we had to move him to a more defined role. The lesson: blockchain infrastructure expertise can't be bought - it has to be grown internally.

Instead of hiring more senior people, I started promoting from within aggressively. Richard became our first Staff Engineer on the individual contributor track. He didn't want to manage people - he wanted to solve complex technical problems. Not because he had the traditional qualifications, but because he understood our systems better than anyone.

### Failure #2: The Remote Knowledge Transfer Crisis

We were always a remote-first company - which is why I was so focused on documentation and over-communication from day one. But even with our remote culture, rapid scaling exposed knowledge transfer gaps.

As we grew from 10 to 50+ engineers across multiple time zones, our debugging sessions became increasingly fragmented. Engineers would troubleshoot Byzantine consensus failures in isolation, without the benefit of collaborative problem-solving that had worked when we were smaller.

We lost two engineers in Q2 2020 - not to other companies, but to burnout. They felt isolated trying to solve complex distributed systems problems without the institutional knowledge sharing we'd had at smaller scale.

The fix: I created "debugging pods" - small groups of 3-4 engineers who worked similar hours and could jump on video calls instantly when issues arose. We also instituted "shadow debugging" where junior engineers would watch senior engineers work through complex problems, even if they weren't directly contributing.

Remote work could scale. But knowledge transfer at blockchain infrastructure complexity required deliberate structure and obsessive documentation.

### Failure #3: The Cryptocurrency Volatility Compensation Problem

In 2021, as crypto prices soared, our engineers started getting offers from other blockchain companies offering 50-100% salary bumps plus massive equity packages.

Our first reaction was panic. We matched a few offers, but couldn't compete with everyone. Three engineers left in one month.

Then crypto crahed in late 2021. Those same companies that had poached our talent started doing layoffs. The engineers who left came back asking for their jobs.

This taught us that compensation consistency matters more than peak compensation. I establihed salary bands based on infrastructure complexity and impact, not market volatility. Engineers knew exactly what they could earn as they grew, regardless of cryptocurrency prices.

## What Actually Worked: The Retention Model I Built at Blockdaemon

### 1. Technical Career Ladders Built for Infrastructure Expertise

Traditional tech companies have engineering levels based on general software development skills. In blockchain infrastructure, the critical skills are different.

I created career paths based on infrastructure expertise:

- **Node Operations Specialist:** Deep expertise in validator operations, slashing conditions, and consensus mechanisms
- **Protocol Integration Engineer:** Expert in adding new blockchain networks to our platform
- **Infrastructure Architect:** Designs systems that handle multi-chain transaction processing at scale

Each level had specific, blockchain-focused requirements. To become a Senior Node Operations Specialist, you needed to demonstrate you could maintain 99.9% uptime across at least five proof-of-stake networks during a major network upgrade.

No generic "demonstrates leadership" criteria. Concrete technical achievements that our customers depend on.

Result: 78% of our engineering promotions came from internal candidates. People stayed because they could see exactly how to build careers that didn't exist anywhere else.

### 2. The Incident Response Rotation That Saved Our Sanity

Richard's burnout forced us to rethink how we handled our 24/7 uptime requirements.

I created a formal incident response rotation across three geographical regions: US East, Europe, and Asia Pacific. Every engineer spent one week per month as the primary on-call, with clear escalation procedures and comprehensive runbooks.

But here's the crucial part: I also created "incident shadowing" where junior engineers would pair with senior engineers during critical issues. Not to help debug, but to learn how our systems failed and how to think through complex distributed systems problems.

After six months, we had twelve engineers who could handle major outages instead of three. Richard started taking actual vacations.

### 3. The Ethereum Merge Promotion Strategy

In 2022, Ethereum's transition from proof-of-work to proof-of-stake was the biggest infrastructure challenge our industry had ever faced. Every validator had to upgrade simultaneously, or lose staking rewards.

Instead of hiring expensive consultants, I made the Merge preparation a growth opportunity for our entire team.

Every engineer chose a specific aspect of the transition to become our internal expert on: consensus layer changes, execution layer compatibility, validator key management, or withdrawal mechanisms.

They spent six months building deep expertise, working directly with the Ethereum Foundation, and preparing our infrastructure. When the Merge happened successfully, we promoted seven engineers based on their demonstrated expertise during the transition.

This became our model: major industry changes became internal growth opportunities rather than external hiring needs.

### 4. Blockdaemon University: How We Hired Fast Without Killing Productivity

Hise's the hiring problem every scaling company faces: you need more engineers, but new hires slow down your existing team for months. They ask questions, need mentoring, make mistakes that create technical debt.

Most companies accept this trade-off. We refused to.

Instead, I built Blockdaemon University - a structured 4-week rotating program that turned new hires into productive contributors without burning out our senior engineers.

Hise's what made it brilliant: if you joined during week 3, you'd complete week 3, then 4, then circle back to weeks 1 and 2. This meant we could onboard engineers continuously without waiting for cohort start dates.

Every new engineer, regardless of seniority, went through BU's four-week cycle:
- **Week 1**: Infrastructure fundamentals - how blockchains actually work, not just the theory
- **Week 2**: Our specific systems architecture and why we built it that way  
- **Week 3**: Shadowing every team to understand how code connects to customer problems
- **Week 4**: Hands-on project work with mentorship from the team they'd join

But here's what made it work: we recorded everything. Every architecture decision, every debugging session, every customer escalation became a learning module. New engineers could learn our systems at 2x speed without pulling senior engineers away from critical work.

The breakthrough came when we realized our documentation wasn't just for new hires - it was knowledge insurance. When Richard finally took that vacation, three other engineers could handle his responsibilities because they'd learned his expertise through BU modules.

The rotating system meant we always had engineers at different stages of learning, creating natural peer mentoring. Someone in week 4 would help someone in week 1 understand the fundamentals they'd just mastered.

Result: Our time-to-productivity dropped from 6 months to 4 weeks. More importantly, our senior engineers stopped seeing new hires as productivity drains and started seeing them as force multipliers.

## The Numbers That Actually Matter

After three years of iteration, our retention metrics stabilized:

- **96% annual retention** (vs. industry average of 32% for high-growth startups)
- **34% internal promotion rate** over 18 months
- **127% engineer referral rate** (engineers referring friends faster than we could hire them)
- **Average tenure of departing engineers: 2.3 years** (vs. industry average of 1.1 years)

But the business impact mattered more:

- **Node uptime improved from 99.2% to 99.97%** as institutional knowledge deepened
- **Customer escalations decreased 73%** as engineers understood our systems holistically
- **New blockchain integration time dropped from 6 months to 3 weeks** as our team expertise compounded

## The Authenticity Test: What We Still Get Wrong

We weren't perfect. Our retention dropped when cryptocurrency markets heated up and everyone got recruiting calls offering 2x salaries. We learned to weather these cycles, but we still lost people.

Our geographic distribution created knowledge silos. Engineers in our Singapore office knew different things than our New York team. We were still figuring out how to share expertise across time zones effectively.

And honestly, some engineers left because they wanted to work on consumer products instead of infrastructure. We couldn't compete with the immediate user feedback you get from building apps. Infrastructure work requires patience with problems that take months to solve properly.

## Your First Steps (From Someone Who Made These Mistakes)

If you're scaling an engineering team in a technical domain, start with brutal honesty about your single points of failure.

**Week 1:** List every system that breaks if one specific person leaves. That's your retention risk map.

**Week 2:** Ask your engineers directly: "What would you need to learn to take a job at our biggest competitor?" Their answers tell you what expertise you need to build internally.

**Week 3:** Identify your next major technical challenge (network upgrade, architecture change, compliance requirement). Turn it into a growth opportunity instead of a hiring need.

The conventional wisdom says rapid scaling requires accepting high turnover. In blockchain infrastructure, that's suicide. The technical complexity is too high and the stakes too significant to constantly lose institutional knowledge.

Your retention strategy isn't an HR initiative. It's how you build technical expertise that competitors can't replicate.

---

What's your experience with retention in technical domains? The patterns I've seen suggest most engineering leaders underestimate how long it takes to build deep infrastructure expertise. Share your thoughts - I'd love to hear how other CTOs handle knowledge retention during rapid scaling.

*I write about scaling engineering teams in complex technical domains. Follow me for more insights on building expertise that lasts.*