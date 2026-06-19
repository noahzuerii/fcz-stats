<div align="center">

# ⚽ FCZ Matchday Dashboard

**Live-Dashboard für den FC Zürich** — nächstes Spiel mit Countdown, Form, Resultate und Super-League-Tabelle.

[![Live](https://img.shields.io/badge/Live-noahzuerii.github.io%2Ffcz--stats-6cace4?style=for-the-badge)](https://noahzuerii.github.io/fcz-stats/)
[![Deploy](https://github.com/noahzuerii/fcz-stats/actions/workflows/deploy.yml/badge.svg)](https://github.com/noahzuerii/fcz-stats/actions/workflows/deploy.yml)
[![No build step](https://img.shields.io/badge/build-static%20single--file-5fae6b?style=flat-square)](#-deployment)

### → **[noahzuerii.github.io/fcz-stats](https://noahzuerii.github.io/fcz-stats/)** ←

</div>

---

## ✨ Features

| | |
|---|---|
| 🗓️ **Nächstes Spiel** | Heim/Auswärts-Matchup mit Ort und Anstosszeit |
| ⏱️ **Live-Countdown** | Tage / Std / Min / Sek bis zum Anpfiff, läuft im Browser |
| 🔵 **Form** | Die letzten 5 Spiele als W/U/N-Pills mit Resultat im Tooltip |
| 📋 **Resultate** | Liste der jüngsten Spiele mit Endstand |
| 🏆 **Tabelle** | Aktuelle Super-League-Tabelle, FCZ-Zeile hervorgehoben |
| 🛡️ **Wappen** | FCZ-Badge wird live aus der API geladen |

Alles in **einer einzigen `index.html`** — kein Backend, kein Build, kein Framework.

## 🛠️ Tech

- **Vanilla HTML/CSS/JS** in einer Datei, ~540 Zeilen
- Daten live im Browser von der kostenlosen [TheSportsDB](https://www.thesportsdb.com) API (öffentlicher Test-Key `123`)
- Fonts: Big Shoulders Display · Inter · Space Mono (Google Fonts)
- Respektiert `prefers-reduced-motion`; robuste Empty-States statt Crashes

## ⚙️ Wie es funktioniert

1. Beim Laden sucht das Script per `searchteams.php` automatisch nach „FC Zurich" und merkt sich `idTeam` + `idLeague` — **keine IDs sind hardcoded**.
2. Mit der Team-ID: `eventsnext.php` (nächstes Spiel) und `eventslast.php` (letzte 5 Spiele).
3. Mit der Liga-ID: `lookuptable.php` für die aktuelle Saison (automatisch aus dem Datum berechnet, Juli–Mai-Logik der Super League).
4. Der Countdown läuft client-seitig per `setInterval` auf Basis des Match-Timestamps.

> Der Test-Key `123` hat ein Rate-Limit, und manche Endpoints (z. B. Tabellen nicht-„featured" Ligen) können mal leer zurückkommen — dafür gibt es überall einen Empty-State.

## 🚀 Deployment

Die Seite läuft **ausschliesslich über GitHub Pages** und wird **automatisch via GitHub Actions** deployt:

```
Push auf main  →  .github/workflows/deploy.yml  →  GitHub Pages  →  Live
```

Bei jedem Push auf `main` lädt der Workflow ([`deploy.yml`](.github/workflows/deploy.yml)) die Repo-Root als Pages-Artefakt hoch und veröffentlicht sie. Einen echten Build-Step gibt es nicht — eine statische `index.html` braucht keinen.

### Einmalige Einrichtung

1. Im Repo: **Settings → Pages**.
2. Unter „Build and deployment" → Source: **GitHub Actions** auswählen.
3. Fertig. Ab dem nächsten Push (oder via *Actions → Deploy → Run workflow*) geht die Seite live unter:
   **https://noahzuerii.github.io/fcz-stats/**

> **Hinweis:** Lokales Öffnen per `file://` wird von vielen Browsern für `fetch()` blockiert. Die Seite läuft bewusst nur über die Live-URL.

## 🧭 Mögliche nächste Schritte

- **PWA** — Manifest + Service Worker zum „Installieren"
- **Cup-Spiele** — Schweizer Cup neben der Liga
- **Auto-Refresh** — alle paar Minuten automatisch neu laden
- **Spielerstatistiken** — Topscorer via `lookup_all_players.php`

## 📄 Lizenz / Daten

Spieldaten via [TheSportsDB](https://www.thesportsdb.com) — crowd-sourced, kann Lücken haben. Für intensivere Nutzung lohnt sich ein Premium-Key für höhere Limits.

<div align="center"><sub>gebaut von Noah · Daten von TheSportsDB</sub></div>
