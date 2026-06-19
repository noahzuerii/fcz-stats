# FCZ Matchday Dashboard

Ein Live-Dashboard für den FC Zürich: nächstes Spiel mit Countdown, Form der letzten 5 Spiele, letzte Resultate und die aktuelle Tabelle der Super League.

Komplett **statisch** — eine `index.html`, kein Build-Step, kein Backend. Die Daten kommen direkt im Browser von der kostenlosen [TheSportsDB](https://www.thesportsdb.com) API.

## Wie es funktioniert

1. Beim Laden sucht das Script per `searchteams.php` automatisch nach "FC Zurich" und merkt sich die `idTeam` und `idLeague` — keine IDs sind hardcoded.
2. Mit der Team-ID werden `eventsnext.php` (nächstes Spiel) und `eventslast.php` (letzte 5 Spiele) abgefragt.
3. Mit der Liga-ID wird `lookuptable.php` für die aktuelle Saison abgefragt (Saison wird automatisch aus dem heutigen Datum berechnet: Juli–Mai-Logik der Super League).
4. Der Countdown läuft client-seitig per `setInterval`, basierend auf dem Timestamp des nächsten Spiels.

Die API nutzt den öffentlichen Test-Key `123`. Der hat ein Rate-Limit und manche Endpoints (z.B. die Tabelle für nicht-"featured" Ligen) können gelegentlich leer zurückkommen — dafür gibt's überall einen Empty-State statt einem Absturz.

## Lokal testen

Einfach `index.html` per Doppelklick öffnen funktioniert meist, aber manche Browser blockieren `fetch()` auf `file://`. Sicherer ist ein kleiner lokaler Server:

```bash
python3 -m http.server 8000
# dann im Browser: http://localhost:8000
```

## Hosten auf GitHub Pages

1. Neues Repo erstellen (z.B. `fcz-dashboard`) und `index.html` hochladen/pushen.
2. Im Repo: **Settings → Pages**.
3. Unter "Build and deployment" → Source: **Deploy from a branch**.
4. Branch: `main`, Ordner: `/ (root)` → **Save**.
5. Nach ein bis zwei Minuten ist die Seite live unter:
   `https://<dein-github-username>.github.io/fcz-dashboard/`

Kein GitHub Actions Workflow nötig — für eine einzelne statische HTML-Datei reicht die Standard-Pages-Deployment komplett.

## Mögliche nächste Schritte

- **PWA**: Manifest + Service Worker, damit man die Seite "installieren" kann
- **Cup-Spiele**: zusätzlich Schweizer Cup neben der Liga anzeigen
- **Dark/Light Toggle**: aktuell fix dunkel im Stadion-Look
- **Auto-Refresh**: alle 5 Minuten automatisch neu laden statt nur per Knopf
- **Spielerstatistiken**: Topscorer der Liga via `lookup_all_players.php`

## Lizenz / Daten

Spieldaten via [TheSportsDB](https://www.thesportsdb.com) — crowd-sourced, kann gelegentlich Lücken haben. Für produktive/intensivere Nutzung lohnt sich ein Premium-Key (9 €/Monat) für höhere Limits.
