# /pr

Open a pull request for the current branch.

## Pre-flight

1. Extract `<id>` from the branch name (`issue-<id>-<slug>`). If the branch name does not match this
   format, stop immediately and report the error. Do not create an issue.
2. Run `gh issue view <id>` — confirm it exists and capture: title, assignees. If the issue is not
   found, stop immediately and report the error.
3. Run `git status` — if there are uncommitted changes, run
   `git add -A && git commit -m "<brief description>"`.
4. Run `git log main..HEAD --oneline` — if this returns no output and there were no uncommitted
   changes in step 3, stop and report that there is nothing to open a PR for.
5. Read the full diff with `git diff main..HEAD` to understand all changes before writing the PR
   title and body. Do not guess — derive the description from the actual diff.
6. Run `git push -u origin <branch>` (use `-u` if the remote branch does not yet exist).

## Title

Plain descriptive sentence summarizing the change. Use sentence case. No prefixes.

## Create

```bash
gh pr create \
  --title "<title>" \
  --assignee "<assignee from issue, or @me if unassigned>" \
  --body "<body>"
```

Use the body template below. Do not self-approve. Do not merge.

## Body template

```markdown
## Summary

## Changes

## Related

Closes #<id>
```
