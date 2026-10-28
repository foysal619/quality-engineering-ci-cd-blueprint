<div align="center">

# Quality Engineering CI/CD Blueprint

**A working GitHub Actions reference for evidence-driven quality gates, container builds, and explicit release decisions.**

[![Quality gate](https://github.com/foysal619/quality-engineering-ci-cd-blueprint/actions/workflows/quality-gate.yml/badge.svg)](https://github.com/foysal619/quality-engineering-ci-cd-blueprint/actions/workflows/quality-gate.yml)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-BuildKit-2496ED?logo=docker&logoColor=white)](https://docs.docker.com/build/buildkit/)

</div>

## What this demonstrates

This repository pairs a tiny, tested HTTP service with a modern GitHub Actions pipeline. The goal is not the service itself; it is the delivery design: fast code evidence first, a reproducible container build second, and a final decision job that refuses to report success unless every required signal exists.

```text
commit / pull request
        ↓
syntax + unit + contract evidence
        ↓
BuildKit container build with cache
        ↓
explicit release-decision gate
```

## Pipeline features

- Least-privilege workflow permissions
- Concurrency cancellation for superseded commits
- Deterministic Node.js version and dependency caching
- Static syntax checks and built-in Node test runner
- GitHub Step Summary as a readable evidence record
- Multi-stage decision flow using job dependencies
- Docker Buildx cache without publishing an image
- Reusable `workflow_call` quality gate for other repositories
- Timeouts on substantive jobs to avoid stuck pipelines

## Run the service

```bash
npm install
npm run check
npm test
npm start
```

Then inspect:

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/version
```

Or build the same container CI verifies:

```bash
docker build -t quality-blueprint:local .
docker run --rm -p 3000:3000 quality-blueprint:local
```

## Reuse the quality gate

After publishing this repository, another project can call the reusable workflow:

```yaml
jobs:
  quality:
    uses: foysal619/quality-engineering-ci-cd-blueprint/.github/workflows/reusable-node-quality.yml@main
    with:
      node-version: "22"
      test-command: npm test
```

Pin a commit SHA for high-trust production usage. Add environment protection and an approval-gated deploy job only after the organization’s release ownership, rollback, and credential model are explicit.

## Quality philosophy

A pipeline is not “CI/CD” because it contains many steps. It is useful when every gate produces evidence tied to a known risk, failures are diagnosable, permissions are minimal, and deployment decisions are explicit. This blueprint keeps that chain visible.

## Suggested extensions

- Add SAST, dependency review, and secret scanning required by your threat model.
- Generate an SBOM and signed provenance for published images.
- Add ephemeral-environment API and Playwright checks.
- Protect production with GitHub Environments and a tested rollback path.
- Publish test evidence into a release-readiness dashboard.

## Author

Built by [Musfiqur Rahman Foysal](https://github.com/foysal619), Software QA Engineer focused on quality signals across the delivery lifecycle.
