---
title: "Searching through a git repository"
date: "2021-03-19T11:17:45Z"
author: "José Devezas"
authorTwitter: "jldevezas"
tags: ["git", "workflows", "search"]
keywords: ["git", "string", "search", "workflow"]
description: |
  - Finding commits by log messages or file contents.
  - Comparing commits based on words rather than lines.
showFullContent: false
---

# Log search

Finding a log with a certain string in the commit message: 

```bash
git log --grep=query
```

# Content search

Finding a commit where a given string was introduced in the code:

```bash
git log -Squery
```

Same as the previous, but using a regex instead of string matching: 

```bash
git log -Gquery
```

# Word difference comparison

Running a diff based on words rather than lines (useful when managing a blog, documentation, or scientific writing in LaTeX):

```bash
git diff --word-diff HEAD~1
```