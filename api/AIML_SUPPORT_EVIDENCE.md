# AIML Support Ticket - Video API Billing/Access Inconsistency

## Subject

`/v2/video/generations` returns insufficient credits for some models while balance is positive and other models work

## Account / Key

- API key fingerprint (masked): `3bec...6c2d`
- Date: `2026-04-14`

## Impact

- Estate video generation workflow in production-like testing is unreliable.
- Some models fail at create time with `err_insufficent_credits`.
- Other video models are accepted, but status polling sometimes returns `524` / `Inference not found`.

## What We Need From AIML

1. Confirm the effective billing/entitlement state for key `3bec...6c2d`.
2. Confirm whether video model families use separate credit pools/permissions.
3. Explain why this key can generate images and some videos, but fails with `insufficient credits` for other video models.
4. Confirm if there is any incident or known issue causing `524` / `Inference not found` on `GET /v2/video/generations`.

## Repro Evidence

### A) Billing shows positive balance

Request:

```bash
curl -s -H "Authorization: Bearer 3bec...6c2d" -H "Content-Type: application/json" "https://api.aimlapi.com/v2/billing"
```

Response:

```json
{ "current_balance": 10.07, "currency": "USD" }
```

### B) Image endpoint works on same key

Request:

```bash
curl -s -X POST "https://api.aimlapi.com/v1/images/generations" -H "Authorization: Bearer 3bec...6c2d" -H "Content-Type: application/json" -d "{\"model\":\"google/imagen-4.0-fast-generate-001\",\"prompt\":\"A simple house exterior photo, daytime\",\"size\":\"1024x1024\"}"
```

Response:

```json
{
  "data": [
    {
      "mime_type": "image/png",
      "b64_json": null,
      "url": "https://cdn.aimlapi.com/generations/openai-image-generation/1776159998113-43be2481-f503-4df3-bbea-3ce80a7ba82d.png"
    }
  ],
  "meta": { "usage": { "credits_used": 52000, "usd_spent": 0.026 } }
}
```

### C) Video endpoint fails for Seedance with insufficient credits

Request:

```bash
curl -s -X POST "https://api.aimlapi.com/v2/video/generations" -H "Authorization: Bearer 3bec...6c2d" -H "Content-Type: application/json" -d "{\"model\":\"bytedance/seedance-1-0-lite-t2v\",\"prompt\":\"A static shot of a modern living room\",\"duration\":5,\"resolution\":\"720p\",\"aspect_ratio\":\"16:9\"}"
```

Response:

```json
{
  "title": "Forbidden",
  "status": 403,
  "message": "You've run out of credits. Please top up your balance or update your payment method to continue: https://aimlapi.com/app/billing/",
  "instance": "/v2/video/generations?",
  "timestamp": "2026-04-14T09:46:33.609Z",
  "error": {
    "name": "ForbiddenException",
    "message": "You've run out of credits. Please top up your balance or update your payment method to continue: https://aimlapi.com/app/billing/",
    "data": { "kind": "err_insufficent_credits" }
  }
}
```

### D) Video endpoint works for Google Veo Fast on same key

Request:

```bash
curl -s -X POST "https://api.aimlapi.com/v2/video/generations" -H "Authorization: Bearer 3bec...6c2d" -H "Content-Type: application/json" -d "{\"model\":\"google/veo-3.0-fast\",\"prompt\":\"A short clip of a modern living room in daylight\",\"duration\":4,\"aspect_ratio\":\"16:9\",\"resolution\":\"720P\",\"generate_audio\":false,\"enhance_prompt\":true}"
```

Response:

```json
{
  "id": "XXLhM-WwM1UXTVnR5w9EV",
  "status": "queued",
  "meta": { "usage": { "credits_used": 1040000, "usd_spent": 0.52 } }
}
```

## Requested Resolution

- Confirm exact model access and credit applicability for this key.
- Fix/clarify billing enforcement for Seedance video models on this account.
- Share recommended polling settings for `/v2/video/generations` to avoid transport and lookup inconsistencies.
