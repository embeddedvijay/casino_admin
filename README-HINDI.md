# GOLD365 Admin Mobile

Standalone React + Vite + Capacitor admin application. यह casino FastAPI backend की APIs से connect होता है; databases से direct connection नहीं करता।

## Pages

Login, Dashboard, Users, User Details, Balance Update, Transactions/Bets, Matka Markets, Matka Control, Database Connections, Game Settings, Audit Logs और More/Settings।

## Setup

```bash
cp .env.example .env
nano .env
npm install
npm run build
```

`.env` में backend IP:

```env
VITE_API_BASE_URL=http://192.168.0.3:8005
VITE_CLIENT_ID=demo
```

Android project पहली बार:

```bash
npx cap add android
npm run android:sync
cd android
./gradlew installDebug
```

## Existing backend APIs used

- `POST /admin/login`
- `GET /admin/me`
- `GET /api/admin/operations/summary`
- `GET /auth/users?client_id=...`
- `PUT /auth/users/{id}?client_id=...`
- `GET /api/admin/bets`
- `GET/PUT /api/admin/games/matka/markets`
- `GET /api/admin/games`
- `GET/PUT /api/admin/casino-settings`

## Backend endpoints still required for full operation

- `POST /api/admin/games/matka/results` — reviewed manual result publish
- `GET /api/admin/database/health` — primary/secondary DB health and sync
- audited balance-adjustment endpoint (current app can use existing user update API)
- audit-log listing endpoint

इन missing operations पर app fake success नहीं दिखाता।
