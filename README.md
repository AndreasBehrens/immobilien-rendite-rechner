# Immobilien Rendite Rechner

Eine moderne Next.js Anwendung zur Berechnung der Rendite von Immobilieninvestitionen mit Benutzerauthentifizierung und Admin-Dashboard.

## Features

- 📊 **Rendite-Berechnung**: Umfassende Berechnung der Immobilienrendite
- 👤 **Benutzerauthentifizierung**: Sichere Anmeldung und Registrierung
- 🔐 **Admin-Dashboard**: Verwaltung von Benutzern und Berechnungen
- 📱 **Responsive Design**: Optimiert für Desktop und Mobile
- 🎨 **Moderne UI**: Gebaut mit Tailwind CSS und shadcn/ui

## Tech Stack

- **Framework**: Next.js 14 mit App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentifizierung**: NextAuth.js
- **Datenbank**: Prisma ORM
- **Charts**: Recharts
- **TypeScript**: Vollständige Typisierung

## Installation

1. Repository klonen:
```bash
git clone https://github.com/AndreasBehrens/immobilien-rendite-rechner.git
cd immobilien-rendite-rechner
```

2. Dependencies installieren:
```bash
npm install
```

3. Umgebungsvariablen konfigurieren:
```bash
cp .env.example .env.local
```

4. Datenbank einrichten:
```bash
npx prisma generate
npx prisma db push
```

5. Seed-Daten laden (optional):
```bash
npm run seed
```

6. Entwicklungsserver starten:
```bash
npm run dev
```

## Umgebungsvariablen

Erstellen Sie eine `.env.local` Datei mit folgenden Variablen:

```env
DATABASE_URL="your_database_url"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
```

## Seed-Daten

Das Projekt enthält Seed-Daten mit Test-Benutzern:
- Admin: admin@example.com (Passwort: ABBerlin2025)
- Test-User: john.doe@example.com (Passwort: johndoe123)

## Deployment

Die Anwendung kann auf verschiedenen Plattformen deployed werden:
- Vercel
- Netlify
- Docker

## Lizenz

MIT License

## Autor

Andreas Behrens
