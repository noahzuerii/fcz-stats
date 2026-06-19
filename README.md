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

- **Vanilla HTML/CSS/JS** in einer Datei, kein Build, kein Framework
- Zwei kostenlose APIs, beide direkt im Browser (kein Backend, kein Key-Geheimnis):
  - **Tabelle:** [Wikipedia](https://de.wikipedia.org) (de) — komplette **und korrekte** 12er-Tabelle, ohne Key, CORS-fähig via `origin=*`
  - **Spiel / Form / Resultate:** [TheSportsDB](https://www.thesportsdb.com) (öffentlicher Test-Key `123`)
- Fonts: Big Shoulders Display · Inter · Space Mono (Google Fonts)
- Respektiert `prefers-reduced-motion`; robuste Empty-States statt Crashes

## ⚙️ Wie es funktioniert

1. Beim Laden sucht das Script per `searchteams.php` automatisch nach „FC Zurich" und merkt sich `idTeam` — **keine IDs sind hardcoded**.
2. Mit der Team-ID: `eventsnext.php` (nächstes Spiel) und `eventslast.php` (letzte Spiele) von TheSportsDB.
3. Die **Tabelle** kommt aus dem Wikipedia-Artikel „Super League JJJJ/JJ (Schweiz)" (`action=parse`, `origin=*` für CORS). Das Script parst die `{{Fußballtabelle/Zeile|…}}`-Vorlagen und nimmt die finale/aktuelle 12er-Gesamttabelle. Saison-Jahr wird automatisch aus dem Datum berechnet. Schlägt das fehl, gibt's einen Fallback auf die (gedeckelte) TheSportsDB-Tabelle.
4. Der Countdown läuft client-seitig per `setInterval` auf Basis des Match-Timestamps.

### ⚠️ Datenquellen-Hinweise

- **Tabelle:** vollständig (alle 12 Teams) **und korrekt** dank Wikipedia. Wikipedia-Inhalte stehen unter CC BY-SA; während einer laufenden Saison kann die Tabelle minimal verzögert aktualisiert werden (Editoren pflegen i.d.R. innerhalb von Stunden nach).
- **Form / Resultate:** Der TheSportsDB-Test-Key `123` deckelt vergangene Spiele auf wenige Datensätze (oft nur 1–2 statt 5). Die UI beschriftet das ehrlich. Echte 5-Spiele-Form gäbe es mit einem TheSportsDB-**Premium-Key** — dann nur `API_KEY` in [`index.html`](index.html) ersetzen.

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
