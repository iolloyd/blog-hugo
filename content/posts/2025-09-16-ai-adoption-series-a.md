---
title: "AI Adoption for Series A Companies: Why Most Don't Need It Yet (And How to Know if You're the Exception)"
date: 2025-09-16
draft: false
categories: ["technology", "leadership"]
tags: ["ai", "series-a", "engineering", "strategy"]
---

I keep having the same conversation with founders. They want to discuss AI adoption strategy. I ask them why they think they need AI.

The silence that follows tells me everything.

Most Series A companies don't need AI. They think they do because investors are asking about it, because competitors are claiming AI features, because it feels like falling behind not to have an AI strategy.

But need and want are different things. And premature AI adoption is expensive in ways that aren't obvious until the damage is done.

## The forced adoption problem

Some companies are mandating AI tools for their engineering teams. Everyone must use Copilot or similar. The reasoning sounds sensible: these tools boost productivity, we should standardise on them, let's get ahead of the curve.

This is a mistake.

AI coding tools help people who already know what good code looks like. They help senior engineers move faster by generating boilerplate, suggesting implementations, handling repetitive patterns.

They hurt junior engineers by short-circuiting the learning process.

When a junior uses AI to generate code they don't understand, several things happen:

**They don't learn the underlying patterns.** Programming isn't just syntax. It's understanding why you structure code a certain way, what makes code maintainable, how to debug when things break. AI-generated code looks like it works. Until it doesn't, and the junior has no idea why.

**Code review becomes remedial teaching.** Seniors spend time explaining why the AI-generated code is wrong, unmaintainable, or violates team standards. That's more expensive than just letting juniors write it themselves and learn through feedback.

**Technical debt accumulates invisibly.** Code that works but nobody understands is technical debt. When the junior who copy-pasted it moves on, you're left with code nobody can maintain.

**Productivity drops, not increases.** Juniors feel productive because they're shipping code fast. But if that code needs rewriting or creates bugs downstream, you've made negative progress.

Forcing AI tools on junior engineers is prioritising short-term velocity over long-term capability. That's a bad trade.

## Where AI actually helps

I use AI tools myself. Perplexity for research. Claude for coding assistance. They're useful. But I know what I'm looking for and I can evaluate what they produce.

That's the key difference.

**For senior engineers and solution architects,** AI tools are genuinely valuable. They can:

- Generate boilerplate code that follows known patterns
- Suggest implementations for well-understood problems  
- Handle repetitive tasks that don't require creativity
- Act as a sounding board for architectural decisions
- Speed up documentation writing

What makes this work: seniors can evaluate the output. They know when AI gets it wrong. They can spot the subtle bugs, the performance issues, the maintainability problems.

AI turns seniors into something closer to technical product managers. They delegate implementation details while maintaining oversight of quality and architecture. That's often a good use of expensive senior time.

**For documentation and code review,** AI can be helpful even with less mature teams. Not as a replacement for human review, but as a first pass that catches obvious issues.

Documentation that would take hours to write manually can be drafted by AI and refined by humans. Code review can be augmented with AI tools that spot common patterns and suggest improvements.

The key word: augmented. Not replaced.

## Where companies go wrong

I've seen several patterns of premature AI adoption:

**Shoehorning AI into platform engineering.** Someone decides the platform needs AI capabilities. They spend engineering time building AI features into internal tooling. Nobody uses them because there wasn't actually a problem that needed solving.

Platform engineering should solve real developer pain points. Adding AI because it sounds impressive wastes time.

**Building AI features before finding product-market fit.** Pre-PMF companies adding AI to their product because investors want to see it. This is backwards. Find PMF first. Add AI later if it actually improves the core value proposition.

AI features are expensive to build and maintain. Building them before you know your product works is burning money on the wrong problem.

**Treating AI and ML as the same thing.** They're not. Machine learning has been solving real problems for years. AI in the current ChatGPT sense is something different.

If you have a genuine ML use case - prediction, classification, recommendation - that's worth exploring. But don't confuse that with needing to add ChatGPT integration to your product.

**Using AI as a substitute for proper architecture.** Some companies think AI can paper over architectural problems. It can't. If your system is slow, unreliable, or hard to maintain, AI won't fix that. Proper engineering will.

## The question that exposes the gap

When founders tell me they need AI adoption strategy, I ask: why do you think you need AI?

The answers usually fall into categories:

"Our competitors are doing it" - That's not a reason. Your competitors might be making the same mistake.

"Investors are asking about it" - Investors ask about lots of things. Your job is to build a sustainable business, not check boxes.

"It'll make us more productive" - Maybe. Or maybe it'll create technical debt and hurt junior development. Have you measured this, or are you assuming?

"Our product needs AI features" - Why? What problem does AI solve that traditional engineering doesn't? Can you prove customers want this?

Most companies are far away from genuine AI adoption. They're responding to hype, not solving real problems.

## When AI actually makes sense

AI adoption makes sense when:

**You have senior engineers who can use it effectively** and you're trying to leverage their time better. If they're spending hours on boilerplate code, AI might help.

**You have specific, well-defined use cases** where AI genuinely solves a problem better than traditional approaches. Not "we should add AI," but "we need to classify customer support tickets and AI does that well."

**You've found product-market fit** and you're looking for ways to improve the core product. Not before PMF. After.

**You understand the difference between AI and ML** and you've identified a genuine ML problem worth solving. Not because ML sounds impressive, but because it's the right tool for the job.

**You have the infrastructure and talent** to maintain AI systems properly. AI isn't fire-and-forget. It requires ongoing maintenance, evaluation, and improvement.

For most Series A companies, none of these conditions are true yet.

## What to focus on instead

If you're Series A and you're not sure whether you need AI, here's what to focus on instead:

**Finding or proving product-market fit.** Nothing else matters until you have this. AI won't save a product customers don't want.

**Building a team that can execute.** Senior engineers who can use AI effectively are valuable. But they're valuable because they're senior engineers, not because they use AI.

**Solving architectural problems properly.** If your system doesn't scale, fix the architecture. Don't hide it behind AI features.

**Creating sustainable development practices.** Code review, testing, documentation, deployment. These fundamentals matter more than AI tools.

**Protecting junior engineers' learning.** Let them write code themselves. Let them make mistakes and learn from them. Don't short-circuit their development with AI tools they can't evaluate.

The companies that will succeed with AI are the ones that build strong engineering fundamentals first. AI amplifies what you already have. If you have strong engineering practices, AI makes them stronger. If you have weak practices, AI makes the problems worse.

## My recommendation for Series A companies

Here's what I tell companies:

**Don't force AI tools on anyone.** Make them available for senior engineers who want to experiment. Let juniors learn without them.

**Don't build AI features into your product** until you've proven PMF and you have evidence customers want AI-powered capabilities.

**Don't shoehorn AI into your platform or infrastructure** unless you have a specific problem that AI solves better than traditional engineering.

**Do use AI for documentation and research** where appropriate. It's genuinely helpful for these use cases.

**Do let senior engineers experiment** with AI tools to improve their productivity. But measure the results. Don't assume it's working.

**Do understand the difference between AI and ML.** If you have a genuine ML use case, explore it. But don't confuse that with needing to add ChatGPT to everything.

Most importantly: be honest about why you're considering AI adoption. If it's because everyone else is doing it, that's not a good reason. If it's because you have a specific problem that AI solves better than alternatives, explore it.

But for most Series A companies, the honest answer is: you don't need AI yet. You need to focus on finding PMF, building a capable team, and solving your customers' problems with good engineering.

AI can come later, when you have the fundamentals in place and you've identified genuine use cases. Not before.

The companies rushing to add AI features are often the ones that haven't figured out their core product yet. Don't be one of them.
