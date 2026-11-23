# Polar AccessLink v3 capabilities

Polar Tracker uses the official AccessLink v3 API at `https://www.polaraccesslink.com/v3`.

| Data | Endpoint | Units / notes |
|---|---|---|
| OAuth authorization | `https://flow.polar.com/oauth2/authorization` | Authorization code; redirect and state validation required |
| Token exchange | `https://polarremote.com/v2/oauth2/token` | HTTP Basic client credentials, returns access token and expiry |
| Mandatory registration | `POST /v3/users` | Register immediately after the first token grant |
| Nightly Recharge | `GET /v3/users/nightly-recharge` | Heart rate, RMSSD/HRV samples, ANS charge, and sleep score |
| Sleep | `GET /v3/users/sleep` | Bed/wake timestamps and light, deep, REM, and interruption stages |
| Continuous HR | `GET /v3/users/continuous-heart-rate/{date}` | Optical 5-minute or continuous samples by date |
| Exercises | `GET /v3/exercises` | Session list with Polar exercise IDs |
| Exercise samples | `GET /v3/exercises/{id}/samples` | Sport-specific samples and timestamps |
| Heart-rate zones | `GET /v3/exercises/{id}/heart-rate-zones` | Zone 1–5 distribution |

## Retention and device limitations

AccessLink availability and historical retention are controlled by Polar account permissions and API responses. The application never assumes a value is zero when no sample is returned. Missing values display as “Insufficient History” or “Not Recorded.”

Ignite 3 / INW3N_V2 exposes optical continuous heart rate and Nightly Recharge, Sleep Plus Stages, ANS charge, and sleep scoring. Raw ECG RR-interval records are not generally available from the Ignite 3; they are primarily available for sessions recorded through Polar H10 exports. Climbing and strength sessions require manual sRPE because heart-rate strain may underrepresent mechanical fatigue.

## Webhooks and polling

The `/api/polar/webhook` route acknowledges Polar notifications. `/api/polar/sync` provides a manual fallback. Live ingestion should poll or webhook-trigger nightly recharge, sleep, and exercise resources.
