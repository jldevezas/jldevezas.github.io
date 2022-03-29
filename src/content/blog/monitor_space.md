---
title: "Monitoring PostgreSQL temporary directory space"
date: "2022-03-29T11:23:00Z"
author: "José Devezas"
authorTwitter: "jldevezas"
tags: ["shell", "fish", "function", "postgresql"]
keywords: ["git", "string", "search", "workflow"]
description: |
  - Monitoring directory total size changes.
  - Temporary file size requirements in PostgreSQL queries.
showFullContent: false
---

# Monitor space usage changes

While most people use bash, I like fish and I think we should not be afraid to write code for it. So here is a simple function I wrote to monitor space usage changes in a directory. It should be easy to convert it to bash or zsh if you prefer either. This is a general purpose function, not just for PostgreSQL, and I find this frequently comes handy.

```bash
function monitor_space
  set --local prev_space
  while true
    set --local space (du -h -d0 $argv[1] 2>/dev/null)
    if test "$prev_space" != "$space"
      echo $space
    end
    set prev_space "$space"
    sleep 1
  end
end
```

# Practical application: monitoring pgsql_tmp

If you're like me and you have learned to avoid premature optimizations, you are bound to eventually exhaust disk space because of a badly written SQL query. No shame in that, time is a rare commodity. Better done than perfect, right?

Personally, when a server's disk is approaching it's full state, I get e-mailed by my `disk_space_check` script, that is scheduled to run every 5 minutes in crontab.

This one's in bash, if you'd like to use it:

```bash
#!/bin/bash
MAIL=user@domain
CURRENT=$(df / | grep / | awk '{ print $5}' | sed 's/%//g')
THRESHOLD=80

if [ "$CURRENT" -gt "$THRESHOLD" ] ; then
    mail -s '[domain] Disk Space Alert' $MAIL << EOF
Your root partition remaining free space is critically low. Used: $CURRENT%
EOF
fi
```

So, let's say you just got this e-mail, and you need to figure out what the hell is causing your disk to get filled so quickly. You suspect PostgreSQL, because ran a `sudo ncdu /` that showed it was taking too much space and, in particular, the `/var/lib/postgresql/12/main/base/pgsql_tmp/` directory was getting populated with too many bytes.

So you trigger your: `monitor_space /var/lib/postgresql/12/main/base/pgsql_tmp/` command and follow your logs in order to identify the query that is creating so much temporary data.

Sure you could use some PostgreSQL extensions to do this, but `monitor_space` is simple and works for many applications.
