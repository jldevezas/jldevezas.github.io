---
title: "Jupyter Notebooks on WSL"
date: "2024-07-29T22:23:21+01:00"
author: "José Devezas"
authorTwitter: "jldevezas"
tags: ["data-science", "jupyter", "windows", "wsl", "windows-subsystem-for-linux"]
keywords: ["jupyter", "notebook", "lab", "wsl", "browser"]
description: |
  - Running `jupyter notebook` or `jupyter lab` on Windows Subsystem for Linux (WSL).
  - Fixes listening on the wrong IP and not being able to open browser automatically.
showFullContent: false
---

# The Problem

On Linux, you just `pip install jupyter` and you can run `jupyter notebook` or `jupyter lab` and it will listen on `localhost` by default and open the browser for you. This is relevant, because notebooks are useful for prototyping and quickly testing new ideas. On Windows, however, if you're using WSL or WSL2 (who isn't?), this won't happen. You'll have two main issues:

1. `localhost` on WSL won't be accessible via your Windows browser, because WSL is essentially running on a VM, and it has its own separate network.
2. Your Windows browser won't open and, instead, the default shell browser will open, which is something like `links`, a text-based browser.


# The Solution

1. The VM has a Windows-accessible IP, so we can listen on that IP instead.
2. It's possible to open the default Windows browser from WSL, using [wslu](https://wslutiliti.es/wslu/).

## Setting up Jupyter to listen on the WSL IP

Edit `~/.jupyter/jupyter_notebook_config.py` to include the following lines:

```python
import subprocess
...
c.NotebookApp.ip = subprocess.check_output(['hostname', '-I'], text=True).strip()
...
```

## Changing the default browser to the Windows default

First, install `wslu`, following the instructions [here](https://wslutiliti.es/wslu/install.html).

Then, set your `BROWSER` environment variable to `wslview`.

For bash:

```shell
echo 'export BROWSER=wslview' >> ~/.bashrc
exec bash
```

For fish:

```shell
echo 'set -x BROWSER wslview' >> ~/.config/fish/config.fish
exec fish
```

## Launching Jupyter

You can now run Jupyter Notebook as usual:

```shell
jupyter notebook
```

Same with Jupyter Lab:

```shell
jupyter lab
```

Your default Windows browser should open and display Jupyter.
