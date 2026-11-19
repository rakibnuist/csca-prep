# Project skills

Skills discovered automatically by DSH (and compatible agents) from this directory. Each lives in its
own folder with a `SKILL.md`; the harness loads the YAML frontmatter up front and the body only when
the skill is used.

| Skill | Use it for |
| --- | --- |
| `csca-official` | Facts about the real CSCA: papers, calendar, fees, rules, scoring, delivery modes, penalties — and the api-anything operations that refresh them from csca.cn |
| `csca-competitors` | Positioning, pricing, comparison pages, content gaps, outreach — the six competitor sites and the China Admissions guidebook |
| `csca-prep-project` | Any change in this repo: stack, routes, the two monolingual tracks, content pipeline, design system, SEO, exam-client conventions |

Supporting evidence lives in `research/` (see `research/README.md`): raw captures, normalized official
documents, the structured 2026–27 exam calendar, and the harvest scripts.

## Adding or editing a skill

- Frontmatter needs `name` (must equal the folder name) and `description` (one paragraph: what it is,
  and **when** to load it — that sentence is what makes the skill discoverable).
- **Do not use an unquoted `: ` inside the description.** YAML reads it as a nested mapping and the
  loader drops the skill silently — it then simply does not appear in the catalog. Rewrite the clause
  with an em dash, or quote the whole value.
- Keep the body task-shaped: rules, sources, exact commands, and the traps that have already burned us.
  Date every fact that can change, and say where the authoritative source is.
- Prefer one skill per domain over one per page. Cross-reference the others by name instead of copying
  their content — duplicated facts drift.
