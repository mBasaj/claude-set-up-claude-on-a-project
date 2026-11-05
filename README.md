## Set up Claude Code on a real project

> This is the first project of the Claude Code course. Finish **Units 1 and 2** before you start.

You'll take everything from Units 1 and 2 and put it to work on a real codebase: install and sign in to Claude Code, then give this project a `CLAUDE.md` and permission rules that make Claude genuinely useful from the very first session.

This is also the repository you'll keep building on as the course continues — each level's project adds to it, all the way to a shareable plugin at the end.

### What you'll deliver

On your branch of this repo:

- a working `CLAUDE.md` at the project root
- a `.claude/settings.json` with your permission rules
- a short `NOTES.md` explaining your choices

...plus Claude Code installed, signed in, and confirmed to load your `CLAUDE.md`.

You are **not** changing the app code. The Express API below is here so you have a real project to set Claude up on.

### What's already in the repo

- `package.json` — scripts for `dev`, `test`, and `lint`
- `server.js` — the entry point; starts the API
- `routes/` — `users.js`, `health.js` and `docs.js`, one file per resource (`GET /docs` lists every endpoint and its verb; `GET /docs/json` returns the same list as JSON)
- `db/store.js` — a tiny in-memory data helper
- `tests/users.test.js` — a sample test
- `.env.example` — sample config; real secrets would live in `.env` (which is git-ignored)
- `.gitignore` — already ignores `node_modules`, `.env`, and `.claude/settings.local.json`

Run it once to see it work:

```
npm install
npm run dev      # starts the API on http://localhost:3000
npm test         # runs the sample tests
npm run lint     # checks code style
```

### Before you start

1. Finish Units 1 and 2.
2. Have Claude Code installed and signed in. Check with:
   ```
   claude --version
   ```
3. Get this repo onto your machine and open a terminal in the project folder. **Opening a terminal** (the app where you type commands):
    -   **Mac** - press `Cmd + Space`, type "Terminal", press Enter.
    -   **Windows** - open "Terminal" or "PowerShell" from the Start menu.
    -   **Linux** - open your "Terminal" app (often `Ctrl + Alt + T`).**Getting into the project folder** - copy the repo to your machine, then move into it:

```
   git clone <your-repo-url>
   cd <repo-folder>
```

`cd` means "change directory". To check you're in the right place, run `ls` (Mac/Linux) or `dir` (Windows) - you should see `server.js`, `package.json`, and the `routes`, `db`, and `tests` folders.

### Tasks

#### 1. Get Claude running in the repo

Start Claude in the project folder:

```
claude
```

Confirm you're signed in and Claude can see the project — ask "What's in this project?" and check the answer matches the files above.

#### 2. Generate a first CLAUDE.md

Run:

```
/init
```

Let Claude read the codebase and draft a `CLAUDE.md`. (No `/init`? Ask: "Create a CLAUDE.md for this project.")

#### 3. Shape your CLAUDE.md

Edit the file so it has these four parts, each lean and specific:

- a one-line description of what the project does
- **Commands** — at least two you run often (here: `npm run dev`, `npm test`, `npm run lint`)
- **Conventions** — at least two real rules ("use X, not Y"), written so Claude can follow them without asking a question
- **Architecture** — a few lines on how the project is organised (the `server.js` entry point, one route file per resource in `routes/`, data access through `db/store.js`)

Then trim it: cut anything obvious from the code, any one-off notes, and anything sensitive. Shorter is stronger.

#### 4. Add permission rules

Create `.claude/settings.json` (or run `/permissions` and add rules there) with at least:

- one **allow** rule for a safe command you run often (the test command is a good choice)
- one **deny** rule for something sensitive or destructive (reading `.env`, or a force-push)
- optionally, one **ask** rule for something you want to confirm each time (`git push`)

Example shape:

```json
{
  "permissions": {
    "allow": ["Bash(npm test:*)"],
    "ask": ["Bash(git push:*)"],
    "deny": ["Read(./.env)", "Bash(git push --force:*)"]
  }
}
```

Commit `.claude/settings.json` so the rules are shared. The repo's `.gitignore` already keeps `.claude/settings.local.json` out — that one is personal and stays on your machine.

#### 5. Verify it works

- Start a fresh session and run `/memory` — confirm your `CLAUDE.md` shows as loaded.
- Run `/permissions` — confirm your allow / deny / ask rules are there.
- Ask Claude something that relies on the file, such as "How do I run the tests here?", and check it answers from your `CLAUDE.md` without you explaining.

#### 6. Write your NOTES.md

In a short `NOTES.md`, answer in a few sentences each:

- What did you put in your `CLAUDE.md`, and what did you deliberately leave out, and why?
- Which permission rules did you add, and what could go wrong without your deny rule?

### Definition of done

- [ ] `claude --version` runs (installed and signed in)
- [ ] `CLAUDE.md` committed at the project root with a description, 2+ commands, 2+ conventions, and an architecture note
- [ ] No secrets, no pasted long documents, and no one-off tasks in the `CLAUDE.md`
- [ ] `.claude/settings.json` committed with at least one allow rule and one deny rule
- [ ] `/memory` shows the `CLAUDE.md` loaded and `/permissions` shows your rules (mention this in `NOTES.md`)
- [ ] `NOTES.md` committed with your reasoning

### Submit

1. Create a branch:
   ```
   git checkout -b set-up-claude
   ```
2. Stage and commit your work:
   ```
   git add CLAUDE.md .claude/settings.json NOTES.md
   git commit -m "Set up Claude Code: CLAUDE.md and permissions"
   ```
3. Push your branch:
   ```
   git push -u origin set-up-claude
   ```
4. Open a Pull Request against the main repository, not your fork, and submit it through the platform, which copies your branch for review.

Before you submit, make sure that:

- [ ] only the intended files are in the PR — no secrets, and no `.claude/settings.local.json`
- [ ] every line in your `CLAUDE.md` earns its place
- [ ] your `NOTES.md` explains your choices

---

**How this is checked:** a reviewer opens your branch and works down the Definition of Done. The aim isn't a perfect file — it's a `CLAUDE.md` and permission set that would genuinely save time on this project, with clear reasoning behind what you kept and what you cut.
