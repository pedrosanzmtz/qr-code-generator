# GitHub Workflow Enhancement Guide

This document provides instructions for enhancing the GitHub Actions workflow to enforce PR requirements and enable additional Claude capabilities.

## Overview

This repository now has a PR template that requires all pull requests to reference an issue. To enforce this requirement automatically, you can add a validation step to your GitHub Actions workflow.

## 1. PR Validation Workflow (Enforce Issue References)

### Option A: Add to Existing Workflow

Add this step to `.github/workflows/claude.yml` or create a separate workflow file:

```yaml
name: PR Validation

on:
  pull_request:
    types: [opened, edited, synchronize]

jobs:
  validate-pr:
    runs-on: ubuntu-latest
    steps:
      - name: Check PR references an issue
        uses: actions/github-script@v7
        with:
          script: |
            const prBody = context.payload.pull_request.body || '';
            const issuePattern = /(close[sd]?|fix(e[sd])?|resolve[sd]?)\s+#\d+/i;

            if (!issuePattern.test(prBody)) {
              core.setFailed('PR must reference an issue using "Closes #X", "Fixes #X", or "Resolves #X"');
            } else {
              core.info('✓ PR correctly references an issue');
            }
```

### Option B: Use Branch Protection Rules

Instead of a workflow, you can use GitHub's built-in branch protection:

1. Go to repository Settings → Branches
2. Add a branch protection rule for `main`
3. Enable "Require pull request reviews before merging"
4. Enable "Require status checks to pass before merging"
5. GitHub will automatically detect issue links in PRs

## 2. Claude Issue Creation Capability

The current workflow already has the necessary permissions for Claude to create issues:

```yaml
permissions:
  contents: write
  pull-requests: write
  issues: write  # This permission allows issue creation
  id-token: write
  actions: read
```

### How Claude Creates Issues

Claude can create issues through the GitHub CLI (`gh`) when invoked with appropriate commands:

```bash
gh issue create --title "Issue Title" --body "Issue description"
```

### Example Workflow Integration

If you want to allow Claude to create issues via a specific trigger, you can add a custom comment command:

```yaml
# In .github/workflows/claude.yml
# Claude already has access to gh CLI and can create issues when needed
# No additional configuration required
```

## 3. Automated PR-Issue Linking

Your current workflow already automatically creates PRs with issue references:

```yaml
PR_BODY="Closes #${ISSUE_NUMBER}"$'\n\n'"This PR was automatically created by Claude Code."
```

This is working correctly and needs no changes.

## 4. Recommended Implementation Steps

1. **Add PR Validation** (Choose one):
   - Add the PR validation workflow above as `.github/workflows/pr-validation.yml`
   - OR enable branch protection rules in repository settings

2. **Test the Setup**:
   - Create a test PR without an issue reference → should fail validation
   - Create a test PR with "Closes #X" → should pass validation

3. **Update Team Documentation**:
   - Inform contributors about the new requirements
   - The PR template will guide them automatically

## 5. Additional Enhancements (Optional)

### Auto-Label PRs by Type

```yaml
name: Auto Label PR

on:
  pull_request:
    types: [opened, edited]

jobs:
  label:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/github-script@v7
        with:
          script: |
            const prBody = context.payload.pull_request.body || '';
            const labels = [];

            if (prBody.includes('[x] Bug fix')) labels.push('bug');
            if (prBody.includes('[x] New feature')) labels.push('enhancement');
            if (prBody.includes('[x] Documentation')) labels.push('documentation');

            if (labels.length > 0) {
              await github.rest.issues.addLabels({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: context.payload.pull_request.number,
                labels: labels
              });
            }
```

### PR Size Labeling

```yaml
name: PR Size Labeling

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  size-label:
    runs-on: ubuntu-latest
    steps:
      - uses: codelytv/pr-size-labeler@v1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          xs_label: 'size/xs'
          xs_max_size: '10'
          s_label: 'size/s'
          s_max_size: '100'
          m_label: 'size/m'
          m_max_size: '500'
          l_label: 'size/l'
          l_max_size: '1000'
          xl_label: 'size/xl'
```

## Questions?

If you need help implementing these enhancements, please refer to:
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- Create an issue in this repository for specific questions

---

**Note**: These enhancements are optional but recommended for maintaining code quality and traceability between issues and pull requests.
