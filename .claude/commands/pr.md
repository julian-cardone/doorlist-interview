# /pr

Open a pull request for the current branch.

## Pre-flight

1. Extract `<id>` from the branch name (`issue-<id>-<slug>`). If the branch name does not match
   this format, stop immediately and report the error. Do not create an issue.
2. Run `gh issue view <id>` — confirm it exists and capture: title, assignees. If the issue is not
   found, stop immediately and report the error.
3. Run `git status` — if there are uncommitted changes, run
   `git add -A && git commit -m "<brief description>"`.
4. Run `git push`.

## Title

Plain descriptive sentence summarizing the change. Use sentence case. No prefixes.

## Create

```bash
gh pr create \
  --title "<title>" \
  --assignee "<assignee from issue, or @me if unassigned>" \
  --project "doorlist-interview-project" \
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
