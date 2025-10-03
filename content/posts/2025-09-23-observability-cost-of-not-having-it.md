---
title: "Observability - and the cost of not having it"
date: 2025-09-23
draft: false
categories: ["infrastructure", "engineering"]
tags: ["observability", "logging", "devops"]
---

A client called me in because their production servers kept crashing. Every few days, seemingly at random, their EC2 instances would just die. When I asked to see their logs to understand what was happening, they had to SSH into individual servers and grep through files. That's when I knew we had a bigger problem than just crashes. Their servers were running out of disk space. Not from user data or database growth, but from their own application logs. Every time their application did anything, it wrote to local disk.

Under normal load, this was fine. But when traffic spiked or errors increased, the logging increased too. The servers would fill up and crash. Their solution had been to provision larger instances, not for CPU or memory, but for disk space. They were paying three times what they needed to for compute just to store logs.

It gets worse.

When a server crashed from full disk, they'd lose all the logs that would tell them what went wrong. They had a scheduled job to delete logs older than three days to save space, so they couldn't investigate patterns over time. Engineers were spending hours every week manually cleaning up disk space and trying to piece together what happened from fragments across different servers.

This is such a common mistake. Writing logs to local disk seems obvious because it's what you do on your laptop. But in distributed cloud systems, it's asking for trouble. Your logging volume goes up precisely when your system is under stress. So just when you need your servers to focus on serving customers, they're busy writing to disk. And when you need those logs most, the server has crashed and taken them with it.

The fix wasn't complicated, but it needed doing properly.

We set up centralised logging, shipping logs off the instances immediately to CloudWatch Logs. Structured JSON instead of text dumps so you could actually query them. Correlation IDs so you could follow a request across multiple services. 
Kept for 30 days, searchable in seconds.

The immediate impact was that the random crashes stopped. But the real value showed up six weeks later during a Black Friday traffic spike.

They could see issues developing in real time across all their services in one place. What would have been a crisis of crashed servers and lost sales became a minor issue fixed in minutes. Most companies don't bring in a fractional CTO to fix logging. They call when production is on fire and they're losing money. But often the fire started because they couldn't see the smoke. 
Getting observability right from the start costs far less than fixing it during a crisis. And it definitely costs less than having your engineers debug problems blind while customers wait.

The boring infrastructure decisions are what keep you from having exciting emergencies at 3am.
