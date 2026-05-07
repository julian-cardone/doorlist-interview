# CLAUDE.md

Documentation-first repo. No application code yet. All governance lives in `docs/`.

## Rules

- Never push to `main`, approve, or merge PRs.
- Never edit an accepted ADR — create a superseding one instead.
- After changes to CI, tooling config, workflows, or architecture: verify related docs don't need
  updating in the same PR.
- Load reference docs on demand — do not read all of `docs/` upfront.

## Reference

Load only when the task requires it.

| Task                                                          | Read                                 |
| ------------------------------------------------------------- | ------------------------------------ |
| What agents are permitted to do                               | `docs/agents/capabilities.md`        |
| What agents must not do                                       | `docs/agents/constraints.md`         |
| Who owns what and what that means for review                  | `docs/process/ownership.md`          |
| Creating issues, project board states                         | `docs/process/project-management.md` |
| Branch naming, merge strategy, enforcement                    | `docs/process/git-workflow.md`       |
| Metadata format, writing tone, formatting rules               | `docs/standards/documentation.md`    |
| When to create, update, or delete docs; lifecycle transitions | `docs/process/doc-governance.md`     |
| Writing or superseding an ADR                                 | `docs/adrs/_template.md`             |
| PR title format, body template, issue linking                 | `docs/process/pr-format.md`          |
| Merge criteria and reviewer checklist                         | `docs/process/done-criteria.md`      |
| Workflow definitions and what each CI job checks              | `docs/process/ci-pipeline.md`        |
| Approved tools, their purpose, and rationale                  | `docs/technologies/stack.md`         |
| Why decisions were made and what they constrain               | `docs/adrs/` in numerical order      |
