<img src="../logo with text.svg">

[![License: MIT](https://img.shields.io/badge/License-MIT-4000ff.svg?style=flat-square)](https://github.com/pfmcodes/askiimon/LICENSE)
[![Downloads](https://img.shields.io/npm/dw/askiimon?style=flat-square)](https://npmjs.com/askiimon)
[![Version](https://img.shields.io/npm/v/askiimon?style=flat-square)](https://npmjs.com/askiimon)
[![Documentation](https://raw.githubusercontent.com/PFMCODES/askiimon/refs/heads/main/docs.svg)](https://pfmcodes.onrender.com/askiimon/docs/)

A tiny terminal personality that reacts, talks, and lives inside your app.

ASKIIMON is a lightweight JavaScript library that gives your CLI or app a living ASCII companion. It shows emotions, reacts to events, and displays messages in real-time.

---

## Features

* Dynamic moods
  Switch between different ASCII emotions like happy, angry, sad, and more.

* Reactive messaging
  Make ASKIIMON “talk” with custom messages rendered in your terminal.

* Real-time updates
  Mood and messages update instantly without cluttering the terminal.

* Extensible emotions
  Teach ASKIIMON new moods with your own ASCII expressions.

* Terminal-first design
  Built specifically for CLI tools, dev environments, and interactive scripts.

* Lightweight and simple
  Minimal setup, no heavy dependencies, plug-and-play.

* Helpful errors
  Clean, styled error and warning system with quick access to help resources.

---

## Example

```javascript
import askiimon from "askiimon";

const goblin = askiimon.birth("happy", "hello");

goblin.setMood("angry");
goblin.setMessage("why did you do that?");
```

---

## Concept

ASKIIMON is designed to feel like a small creature living inside your terminal.
It reacts to user actions, shows emotion, and adds personality to otherwise plain output.

---

## Use Cases

* CLI tools with personality
* Developer utilities
* Debugging assistants
* Interactive scripts
* Terminal experiments

---

## Note

ASKIIMON is meant to be expressive and customizable.
You control how it behaves and how it communicates.

---

## Philosophy

Most tools just print text.
ASKIIMON reacts.

---

## Status

Actively being developed. Expect improvements and new features over time.

---

## Preview

```bash
^_^ [ hello ]
>:( [ something broke ]
:D [ fixed it! ]
```

---

## Installation

```bash
npm install askiimon
```