# 🚨 Blink Motion Alerts

Automated pipeline: **Blink Camera → IFTTT → GitHub → Telegram + Google Calendar**

## Architecture

```
Blink Camera (CT Summer Home)
        ↓ motion detected
    IFTTT (free tier)
        ↓ webhook POST
  GitHub repository_dispatch
        ↓ triggers action
  GitHub Actions (free)
      ↓           ↓
  Telegram    Google Calendar
  (instant)   (20-min event)
```

## Setup

1. **IFTTT**: Blink motion trigger → Webhooks "Make a web request" action
2. **GitHub Secrets**: `TG_BOT_TOKEN`, `TG_CHAT_ID`, `APPS_SCRIPT_URL`
3. **Google Apps Script**: Deployed web app that creates calendar events

## Camera

- **System**: Reimerdes Hill
- **Camera**: Outdoor 4 - D1QG
- **Location**: 14 Carmen Hill Road, Brookfield, CT 06804

## Testing

```bash
# Trigger a test event
curl -X POST https://api.github.com/repos/SkaTeMasTer/blink-alerts/dispatches \
  -H "Authorization: token YOUR_GH_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -d '{"event_type": "blink-motion", "client_payload": {"camera_name": "Outdoor 4 - D1QG", "created_at": "2026-03-16T20:00:00"}}'
```
