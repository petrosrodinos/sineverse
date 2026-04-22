# Session Handoff (2026-04-22)

## Goal Achieved
- Refactored credits usage billing away from missing AIML `meta.usage` data.
- Implemented deterministic billing using model-configured USD costs.
- Ensured usage ledger values are populated and numeric (no string decimals in API output).

## Core Problem Found
- AIML video status responses for completed jobs usually return:
  - `id`, `status`, `video.url`
  - but **no** `meta.usage.credits_used` or `usd_spent`
- This caused null or fallback-derived values in ledger rows.

## Final Billing Strategy
- Use static model cost config from `api/src/shared/config/credits/aiml-video-cost.json`.
- Map these into `MODEL_PROVIDER_COST_DOLLARS` (per-second costs) in `credits constants`.
- Apply default duration multiplier:
  - `DEFAULT_VIDEO_DURATION_SECONDS = 4`
  - `provider_charge_usd = model_cost_per_second * 4`
- Convert USD cost to token economics:
  - `providerCredits = round(provider_charge_usd / DOLLARS_PER_TOKEN)`
  - `feeTokens = round(providerCredits * appFeeMultiplier)`
  - `grossTokens = providerCredits + feeTokens`
- EUR amounts use FX snapshot from currency service:
  - provider EUR from USD * FX
  - fee/gross EUR from token amounts * `DOLLARS_PER_TOKEN` * FX

## Important Constants
- `DOLLARS_PER_TOKEN = 0.00983`
- `DEFAULT_VIDEO_DURATION_SECONDS = 4`
- Estate multiplier comes from:
  - `CreditsConfig.projectTypeMultipliers[ProjectType.ESTATE]` (currently `4`)

## Key Files Updated
- `api/src/shared/config/credits/credits.constants.ts`
  - Added `MODEL_PROVIDER_COST_DOLLARS`
  - Added `DEFAULT_VIDEO_DURATION_SECONDS`
- `api/src/modules/project-assets/jobs/video-generation.processor.ts`
  - Reads model from metadata/fallback
  - Resolves per-second model USD cost
  - Multiplies by default duration (4s)
  - Passes `provider_charge_usd` to credits service
  - Added useful completion logs for model/cost/meta
- `api/src/modules/credits/utils/hybrid-billing.ts`
  - Refactored token billing to derive credits/tokens from USD
- `api/src/modules/credits/credits.service.ts`
  - `recordUsageDeduction` now uses `provider_charge_usd`
  - Derives provider credits/tokens/fees internally
  - Stores computed financials consistently
- `api/src/modules/admin/dto/admin-test-usage-ledger.dto.ts`
  - Test DTO now uses `provider_charge_usd`
- `api/src/modules/admin/admin.service.ts`
  - Updated test endpoint handling/logging for `provider_charge_usd`

## Database / Schema Direction Taken
- Usage ledger now persists:
  - `provider_credits_used`
  - `fee_tokens`
  - `gross_tokens`
  - monetary fields with 4-decimal precision in schema/migration path used this session

## Logging Added For Debugging
- AIML adapter logs raw status payloads.
- Video processor logs completed status with:
  - `meta`
  - model
  - per-second USD cost
  - duration used
  - total USD cost

## Validation Status
- Lint checks run on edited files after each refactor step.
- No linter errors remained at completion checkpoints.

## Suggested Next-Session Checklist
1. Run one real generation per major model (Kling, Veo, Runway) and verify ledger row values.
2. Confirm `MODEL_PROVIDER_COST_DOLLARS` numbers align with latest AIML pricing source.
3. Decide if duration should be model-specific instead of global default `4`.
4. Add automated tests for processor -> credits flow with model cost lookup and duration multiplier.
5. If needed, expose the effective billing inputs in admin usage UI for auditability.

## Known Assumptions
- `aiml-video-cost.json` values are treated as **per-second** model costs.
- Default billed video duration is currently fixed at `4` seconds unless changed later.
