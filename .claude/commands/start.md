# /start

Set up a new unit of work: issue, branch, and project board state.

## 1 — Derive title

Argument may be a short phrase or a long description of intent. Derive:

- A concise issue title (Title Case, under ~8 words)

## 2 — Create the issue

```bash
gh issue create \
  --title "<title>" \
  --body ""
```

Note the issue number from the output URL.

## 3 — Create the branch

Ensure main is up to date before branching:

```bash
git checkout main
git pull origin main
```

If `git pull` reports conflicts or exits with a non-zero status, stop immediately and report the
error. Do not proceed until main is clean.

Slug: lowercase title, hyphens only, no special characters, drop filler words, ~5 words max.

Format: `issue-<number>-<slug>`

```bash
git checkout -b issue-<number>-<slug> main
```

## 4 — Add to project board and set "In progress"

```bash
gh project item-add 1 --owner @me --url <issue-url>
sleep 3
```

Query the project to get IDs. Extract:

- `projectId` — the project node ID
- `itemId` — the item where `content.number` matches the issue number
- `statusFieldId` — the `id` of the field named "Status"
- `inProgressOptionId` — the `id` of the option named "In progress"

```bash
gh api graphql -f query='
{
  viewer {
    projectV2(number: 1) {
      id
      items(first: 50) {
        nodes {
          id
          content { ... on Issue { number } }
        }
      }
      fields(first: 20) {
        nodes {
          ... on ProjectV2SingleSelectField {
            id name
            options { id name }
          }
        }
      }
    }
  }
}'
```

Verify the item is present before proceeding. If the issue number is not found in the items list,
wait 3 seconds and re-query. Retry up to 3 times before stopping with an error.

Then update status:

```bash
gh api graphql -f query='
mutation {
  updateProjectV2ItemFieldValue(input: {
    projectId: "<projectId>"
    itemId: "<itemId>"
    fieldId: "<statusFieldId>"
    value: { singleSelectOptionId: "<inProgressOptionId>" }
  }) {
    projectV2Item { id }
  }
}'
```

If the mutation returns errors, print them and stop.

## 5 — Print summary

- Issue number and URL
- Branch name
- Project board status
- Next step: `claude --session issue-<number>-<slug>`
