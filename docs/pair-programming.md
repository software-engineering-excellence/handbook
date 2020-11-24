---
id: pair-programming
title: Pair Programming
---

:::info What is pair programming?
Pair programming is a collaborative and effective way to learn, strategize, plan and co-develop code among two or more Software Engineers.

This chapter provides a deep-dive into five pair programming techniques; their typical use-cases, effectiveness and how to practice these techniques remotely.Lastly, we discuss some effective resources to enhance pair programming collaboration.
:::

<div class="text--center">
  <img src="/img/pair-programming/undraw-pair-programming2.png" alt="Two developers pair programming" width="500px" />
</div>
<br />

## What is pair programming

**Pair Programming puts two developers together at one workstation, enabling an active communication while developing the code base.**

#### Typical roles in a pair

A pair usually contains a driver, who is the developer operating the keyboard and a navigator who live reviews the code and suggests the way forward. In some techniques (e.g. Tour Guide), a group of people can also be working together, perhaps even switching between the roles.

#### Why use pair programming?

Pair programming can be an effective method to speed up the feedback cycle, increase code ownership, improve software quality, reduce risk and provide a mechanism for knowledge sharing.

#### When to avoid pair programming?

Be mindful to not blindly mandate pair programming in your teams as it is not a one-size-fits-all solution, instead empower each team member to choose what works best for them and the problem at hand.

---

## Pair Programming Techniques

### 1. Driver Navigator

<div class="text--center">
  <img src="/img/pair-programming/undraw-driver-navigator.png" alt="Driver Navigator" width="400px" />
</div>
<br />

One person plays the driver whose hands are “on the wheel” (keyboard), the other person acts as the navigator. The motivation is to have two different perspectives on the code, while the driver focuses on tactical details, the navigator looks at the higher-level direction without giving much tactical advice.

#### Typical use case

- Useful in a one-on-one session to help navigate a team member through new code

#### Making it effective

- Navigator should focus on strategic direction rather than implementation details
- Switch keyboard, roles and take pit stops regularly to refuel and charge your batteries
- The driver and navigator should agree on the objectives and duration beforehand

#### Remote working

- Can be adapted for remote working by collaboration tools that allow for screen sharing
- Ensure that both parties over-communicate

---

### 2. Backseat Navigator

<div class="text--center">
  <img src="/img/pair-programming/undraw-backseat-navigator.png" alt="Backset Navigator" width="400px" />
</div>
<br />

Similar to the Driver Navigator technique, a novice developer sits at the keyboard, however, a more experienced team member sits in the “backseat” and provides very detailed tactical guidance on how code, e.g. when to implement a method.

#### Typical use case

- Onboarding new team members or up-skilling novice software engineers through the help of a more experienced navigator

#### Making it effective

- Navigator should not get too lost in the details to avoid discouraging the novice engineer
- Navigator needs to ensure solution aligns with the overall architecture, code quality and project structure
- Navigator needs to know when it is good to let the driver try out his/her ideas over pushing for the right solution immediately

#### Remote working

- Suitable for a remote setting using screen sharing collaboration tools

---

### 3. Ping Pong

<div class="text--center">
  <img src="/img/pair-programming/undraw-ping-pong.png" alt="Ping Pong" width="400px" />
</div>
<br />

A practice adopted from [Extreme Programming](http://www.extremeprogramming.org/) that heavily leverages [test-driven development (TDD)](https://www.agilealliance.org/glossary/tdd/). In this technique both parties constantly switch between active coder and observer.

1. Developer A writes a test that fails (ping)
2. Developer B makes all tests pass (pong)
3. ... and so on

#### Typical use case

- Clearly defined task and a project that already has a well-established testing approach
- Effective technique when used in a project that embraces TDD or [BDD](https://www.agilealliance.org/glossary/bdd/)

#### Making it effective

- Ensure that both members are proficient in the testing framework used

#### Remote working

- Is more difficult to achieve well in a remote setting as the technique requires pairs to continuously switch keyboards. However, tools like VS Code Live Share or Cloud9 can be beneficial.

---

### 4. Tour Guide

<div class="text--center">
  <img src="/img/pair-programming/undraw-tour-guide.png" alt="Tour Guide" width="400px" />
</div>
<br />

In this approach, the tour guide does the strategic and tactical thinking along with the programming. The tour guide shows the tourist(s) around the code, explains concepts and rationales behind decisions, while the latter takes on a more passive role.

#### Typical use case

- Onboarding or knowledge sharing with new or existing team members

#### Making it effective

- Effective when tour guide over-communicates to the tourist and explains rationales behind decisions taken
- Similar to a normal vacation, the tourist might like to take photos (or notes) to remember important code pieces that can serve as a reference later
- As the tourist is not actively coding, he/she needs to listen carefully as to not lose focus

#### Remote working

- As the other person is usually more passive, this technique works well via normal screen sharing applications

---

### 5. Distributed Pairing

<div class="text--center">
  <img src="/img/pair-programming/undraw-distributed-pairing.png" alt="Distributed Pairing" width="400px" />
</div>
<br />

While face-to-face pairing is arguably most effective, real-time code editors or screen and video sharing platforms also make remote pair programming possible.

#### Typical use case

- Most suitable for teams having geographically distributed members

#### Making it effective

- Stable collaboration platform, conducive surroundings (no background noise) and matching work schedule required
- Try using the [Pomodoro technique](https://philippe.bourgau.net/7-remote-pair-programming-best-practices-q-and-a-part-1/) to ensure both parties take breaks and remain focused
- Invest in an ergonomic work environment, comfortable headphones and webcam
- Agree on the objective, duration and proposed way of working for the session upfront

#### Remote working

- Most of the conventional pair-programming techniques can be executed in a distributed setting

---

## Further Reading Material

- [Remote pair programming: Tips, tools, and how to measure](https://raygun.com/blog/remote-pair-programming/)<br />
  Provides tips for effective remote pair programming and measuring the performance of the setup.

- [Articles on pair programming on MartinFowler.com](https://martinfowler.com/articles/on-pair-programming.html)<br />
  Provides comprehensive information about pair programming.

- [GitHub – Awesome Pair Programming](https://github.com/kkemple/awesome-pair-programming)<br />
  This repository contains a collection of popular resources.

- [Remote Pairing – Collaborative Tools for Distributed Development](https://pragprog.com/titles/jkrp/)<br />
  Very comprehensive book by Joe Kutner.

- [Extreme Programming Explained: Embrace Change](https://www.oreilly.com/library/view/extreme-programming-explained/0321278658/)<br />
  By Kent Beck and Cynthia Andres.

- [Why I still say “no” to pair programming… and a possible alternative](https://medium.com/@iancackett/why-i-still-say-no-to-pair-programming-and-a-possible-alternative-b73acaf7c05f)<br />
  Medium article by Ian Cackett.
