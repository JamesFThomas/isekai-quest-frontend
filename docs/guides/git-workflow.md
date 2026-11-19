# Git Workflow (Isekai Quest)

## Branch Strategy

`main` is the only long lived branch. It is production: every merge into it
deploys to Vercel.

`main` is protected. You cannot push to it directly. Changes arrive only
through a pull request that passes CI.

Everything else is a short lived branch cut from `main`, merged back into
`main`, and deleted immediately.

There is no staging branch. Vercel builds a preview deployment for every
pull request, so each change gets its own live URL to validate against. A
shared staging branch would add a queue without adding safety.

---

## Branch Naming Convention

```
type/short-description
```

### Examples

```
feat/auth-session-refresh
fix/quest-refresh-session-data
testing/component-testing-suites
docs/vercel-deployment-guide
refactor/persistence-layer
```

### Branch Prefix Usage

| Prefix | Usage |
|--------|-------|
| `feat/` | New functionality |
| `fix/` | Bug fixes |
| `testing/` | Testing work |
| `docs/` | Documentation updates |
| `refactor/` | Restructuring without feature changes |
| `chore/` | Tooling, config and maintenance |

> The `testing/` prefix originally existed because `test/` collided with a
> branch named `test`. That branch is gone, so the collision no longer
> exists, but `testing/` stays the convention so the history reads
> consistently.

---

## Workflow

1. Checkout `main` and pull
2. Cut a branch using the naming convention above
3. Do the work locally
4. Run `npm run test:ci` and `npm run build` before pushing
5. Open a pull request into `main`
6. CI runs the test suite and a production build
7. Vercel posts a preview deployment URL on the pull request
8. Validate against the preview URL, not just locally
9. Squash and merge
10. Delete the branch, remote and local

```bash
git checkout main
git pull
git checkout -b type/short-description
```

After the merge:

```bash
git checkout main
git pull
git branch -D type/short-description
```

### Why branches are deleted immediately

Merges into `main` are squashed, which creates a new commit with no link
back to the branch's own history. Git therefore never recognizes a squash
merged branch as merged, and two long lived branches that exchange work
this way drift apart permanently. Every file either side touches then
conflicts on the next merge, forever.

This repository lived through exactly that with the old `test` branch. The
deployment workflow files conflicted on merge after merge, and the cause
looked like a YAML problem for months. It was not. It was two long lived
branches and squash merging.

Squash merging is the right choice here. It only becomes a trap when the
branch outlives its pull request, so do not let it.

---

## Commit Message Convention

Angular style conventional commits.

### Format

```
type(scope): subject
```

### Examples

```
feat(auth): add session refresh persistence
fix(quest): restore accepted quest after session refresh
testing(battle-screen): add redux interaction coverage
docs(architecture): add vercel deployment workflow
refactor(persistence): centralize session rehydration logic
```

### Commit Guidelines

- Use lowercase type and scope
- Keep the subject concise and action oriented
- No trailing punctuation
- Scope should reference a feature area, component or system

---

## Preferred Expanded Commit Format

```
type(scope): short summary

- Main completed task
- Supporting implementation details
- Validation and testing notes
```

### Example

```
fix(quest): restore accepted quest after session refresh

- Replaced the hardcoded null acceptedQuestId in the login session write
- Restored quest state from the character snapshot in RefreshDataProvider
- Added a regression test covering restore when top level fields are null
- Confirmed the new test fails against the previous provider behavior
```

---

## CI Gate

`.github/workflows/ci.yml` runs on pull requests into `main`:

- `npm ci`
- `npm run test:ci`
- `npm run build`

Branch protection on `main` requires the `verify` check to pass before the
merge button unlocks. The build step is not redundant with the tests: lint
and type errors have blocked production builds on this project while the
unit tests stayed green.

Vercel deploys independently of this workflow, so the gate is what stops a
red build reaching production.

---

## Release Strategy

- Merging into `main` is the release. There is no separate promotion step.
- Keep releases small and frequent, one branch at a time.
- Do not bundle unrelated features into a single merge.
- Testing, documentation and refactoring branches are valid releases on
  their own.

---

## Related

- `docs/guides/vercel-deployment.md` for hosting, the Node version pin and
  deployment settings
