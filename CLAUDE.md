# North Western Clinic website: project rules

Astro static site, English + Turkish, WhatsApp-only conversion, doctor-first design. Spec: `docs/specs/2026-11-26-nwc-website-design.md`. Plans: `docs/plans/`.

Hard rules from the owner (Batuğ):
- No prices anywhere. No forms. The only action is WhatsApp.
- Languages: English and Turkish only. No Swedish.
- Credential shown: Turkish board certification only.
- No dental, hair transplant or obesity pages.
- Health-advertising and legal copy is draft: mark it "pending professional review".
- Never push to a live site or change the domain without asking Batuğ first. Open a PR only when it is ready for review.

# Superpowers Orchestration & Token Optimization Protocol

## 1. Strict Model Routing Policy
When using `obra/superpowers` skills or dispatching subagents via the `Agent` / `Task` tool, you MUST strictly enforce model selection based on the task phase to minimize token consumption:

- **Main Orchestrator & Architect (`Opus`):**
  - Use **Opus** ONLY for `superpowers:brainstorming`, `superpowers:writing-plans`, and high-level architectural decisions.
  - Keep Opus outputs concise. Avoid verbose explanations; output structured, actionable specifications only.
  - Once a plan is written to `docs/plans/`, prompt the user to run `/clear` and switch the active session model to **Sonnet** before starting execution.

- **Implementation & Review Subagents (`Sonnet`):**
  - Every subagent spawned during `superpowers:subagent-driven-development`, `superpowers:executing-plans`, or `superpowers:dispatching-parallel-agents` MUST explicitly set `model: "sonnet"`.
  - Never allow a coding, test-writing, or code-review subagent to inherit `opus`.

- **Utility & Exploration Subagents (`Haiku`):**
  - Read-only file searches (`Explore`), codebase mapping, syntax/lint checks, and boilerplate formatting MUST explicitly set `model: "haiku"`.

## 2. Token-Saving Workflow Overrides
Override default Superpowers verbosity and review loops with these rules:

- **Batched Code Reviews:** Do NOT spawn separate spec-compliance and code-quality review subagents after every single micro-task. Execute all implementation tasks in the plan sequentially with Sonnet, and run a **single consolidated code review** (`model: "sonnet"`) at the end of the phase unless a task explicitly touches critical security/auth logic.
- **Minimal Subagent Context:** When dispatching a subagent, pass ONLY the exact file paths, relevant function signatures, and the specific task block from `docs/plans/`. Never paste the entire plan or full conversation history into subagent prompts.
- **Concise TDD Output:** Write minimal, high-signal unit tests covering core behavior and edge cases. Suppress verbose test-runner logs unless a test fails.
- **No Unsolicited Summaries:** Skip post-task recap paragraphs. Report status in 1–2 bullet points (files modified + test pass/fail status).
