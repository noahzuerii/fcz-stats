<div align="center">

# ⚽ FCZ Matchday Dashboard

**Live-Dashboard für den FC Zürich** — nächstes Spiel mit Countdown, Form, Resultate und Super-League-Tabelle.

[![Live](https://img.shields.io/badge/Live-noahzuerii.github.io%2Ffcz--stats-6cace4?style=for-the-badge)](https://noahzuerii.github.io/fcz-stats/)
[![Deploy](https://github.com/noahzuerii/fcz-stats/actions/workflows/deploy.yml/badge.svg)](https://github.com/noahzuerii/fcz-stats/actions/workflows/deploy.yml)
[![No build step](https://img.shields.io/badge/build-static%2C%20no%20build-5fae6b?style=flat-square)](#-deployment)

### → **[noahzuerii.github.io/fcz-stats](https://noahzuerii.github.io/fcz-stats/)** ←

</div>

---

## ✨ Features

| | |
|---|---|
| 🗓️ **Nächstes Spiel** | Heim/Auswärts-Matchup mit Ort und Anstosszeit |
| ⏱️ **Live-Countdown** | Tage / Std / Min / Sek bis zum Anpfiff, läuft im Browser |
| 📅 **Spielplan** | Die nächsten anstehenden FCZ-Ligaspiele auf einen Blick |
| 📈 **Form** | Letzte Spiele als S/U/N-Badges inkl. Punkteausbeute und Trend-Grafik |
| 📉 **Punkte-Schnitt-Trend** | Punkte pro Spiel, kumuliert über die ganze Saison, als Linien-Grafik |
| 📊 **Saison-Statistik** | Tabellenplatz, Punkteschnitt, Siegquote, Tordifferenz, Tore & Gegentore pro Spiel |
| 📐 **Tabellenverlauf** | FCZ-Tabellenplatz nach jedem Spieltag als Linien-Grafik |
| 🔥 **Nächstes Derby** | Erkennt automatisch das nächste Zürcher Derby (FCZ vs. GC) mit Datum & Countdown-Tagen |
| ▶️ **Highlights** | Pro Resultat ein YouTube-Highlights-Link (echtes Video wenn verfügbar, sonst Suche) |
| 🧩 **Aufstellung** | Formation + Spieler des letzten Spiels nach Mannschaftsteilen (sofern API-Daten vorhanden) |
| 📋 **Resultate** | Liste der jüngsten Spiele mit Endstand |
| 🏆 **Tabelle** | Aktuelle Super-League-Tabelle, FCZ-Zeile hervorgehoben |
| 🏆 **Schweizer Cup** | FCZ-Cup-Spiele dieser Saison (Resultate & nächste Partie), neben der Liga |
| 🛡️ **Wappen** | FCZ-Badge wird live aus der API geladen |
| 🔄 **Auto-Refresh** | Lädt die Daten automatisch alle 5 Minuten neu, pausiert im Hintergrund-Tab |
| 📲 **PWA** | Installierbar als App (Manifest + Service Worker), App-Shell funktioniert offline |

Statische Seite ohne Backend, ohne Build, ohne Framework — `index.html` plus ein kleines Manifest/Service-Worker-Duo für die Installierbarkeit.

## 🛠️ Tech

- **Vanilla HTML/CSS/JS**, kein Build, kein Framework
- Zwei kostenlose APIs, beide direkt im Browser (kein Backend, kein Key-Geheimnis):
  - **Tabelle:** [Wikipedia](https://de.wikipedia.org) (de) — komplette **und korrekte** 12er-Tabelle, ohne Key, CORS-fähig via `origin=*`
  - **Nächstes Spiel / Resultate / Schweizer Cup:** [TheSportsDB](https://www.thesportsdb.com) (öffentlicher Test-Key `123`)
- **PWA:** [`manifest.json`](manifest.json) + [`sw.js`](sw.js) (Service Worker) + [`icon.svg`](icon.svg) machen die Seite installierbar
- Font: Inter (Google Fonts)
- Respektiert `prefers-reduced-motion`; robuste Empty-States statt Crashes

## ⚙️ Wie es funktioniert

1. Beim Laden sucht das Script per `searchteams.php` automatisch nach „FC Zurich" und merkt sich `idTeam` — **keine IDs sind hardcoded**.
2. Mit der Team-ID: `eventsnext.php` (nächstes Spiel) und `eventslast.php` (letzte Spiele) von TheSportsDB.
3. Die **Tabelle** kommt aus dem Wikipedia-Artikel „Super League JJJJ/JJ (Schweiz)" (`action=parse`, `origin=*` für CORS). Das Script parst die `{{Fußballtabelle/Zeile|…}}`-Vorlagen und nimmt die finale/aktuelle 12er-Gesamttabelle. Saison-Jahr wird automatisch aus dem Datum berechnet. Schlägt das fehl, gibt's einen Fallback auf die (gedeckelte) TheSportsDB-Tabelle.
4. Der Countdown läuft client-seitig per `setInterval` auf Basis des Match-Timestamps.
5. Der **Schweizer Cup** kommt über einen einzelnen `eventsseason.php`-Request (Liga-ID `5489`) für die ganze Saison auf einmal; gefiltert wird über die Team-ID statt über den Namen, da ein Namensabgleich auch gleichnamige Amateurvereine wie „Zürich City" träfe.
6. Ein `setInterval` lädt alle 5 Minuten automatisch neu (**Auto-Refresh**), pausiert dabei aber im Hintergrund-Tab und überspringt den Lauf, solange ein vorheriger Refresh noch läuft.
7. [`manifest.json`](manifest.json) + [`sw.js`](sw.js) machen die Seite als **PWA installierbar**. Der Service Worker cacht nur die eigene App-Shell (`index.html`, Manifest, Icon) als Offline-Fallback — Netzwerk-zuerst, damit nie eine veraltete Version aus dem Cache kommt. API-Aufrufe an Wikipedia/TheSportsDB laufen unverändert direkt übers Netz, der Service Worker fängt sie nicht ab.

### ⚠️ Datenquellen-Hinweise

- **Tabelle:** vollständig (alle 12 Teams) **und korrekt** dank Wikipedia. Wikipedia-Inhalte stehen unter CC BY-SA; während einer laufenden Saison kann die Tabelle minimal verzögert aktualisiert werden (Editoren pflegen i.d.R. innerhalb von Stunden nach).
- **Resultate:** Der TheSportsDB-Test-Key `123` deckelt vergangene Spiele auf wenige Datensätze (oft nur 1–2). Mehr gäbe es mit einem TheSportsDB-**Premium-Key** — dann nur `API_KEY` in [`index.html`](index.html) ersetzen.
- **Nächstes Derby:** wird aus den nächsten angesetzten Spielen erkannt (Gegner = GC). Liegt das Derby weiter in der Zukunft, erscheint es, sobald es in den kommenden Spielen auftaucht.
- **Schweizer Cup:** genau wie die Liga-Resultate vom crowd-sourced Testkey abhängig — einzelne Runden oder Partien können fehlen. Die Sektion bleibt ausgeblendet, wenn für die laufende Saison keine FCZ-Cup-Partie gefunden wird.
- **Aufstellung:** kommt aus `lookupevent.php` und wird nur angezeigt, wenn TheSportsDB für das Spiel Lineup-Daten hat — für die Super League ist das je nach Spiel lückenhaft.
- **Highlights:** nutzt das hinterlegte Video, falls vorhanden; sonst öffnet der Link eine YouTube-Suche „Heim Gast Highlights".
- **Spielplan, Punkte-Trend, Tabellenverlauf:** werden client-seitig aus den rundenweise abgerufenen Saison-Ergebnissen (`eventsround.php`) berechnet — derselbe Mechanismus, der schon die Derby-Suche speist. Der Tabellenverlauf nutzt dabei ein vereinfachtes Tie-Break (Punkte, Tordifferenz, Tore); die offizielle Liga kann bei Punktgleichheit abweichende Kopf-an-Kopf-Regeln anwenden.

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

- **Topscorer** — Torschützenliste; mit dem Testkey sind Torschützen-Felder für die Super League zu lückenhaft für eine zuverlässige Liste (zuverlässig erst mit TheSportsDB-Premium-Key, alternativ Best-effort aus vorhandenen Lineup-Daten mit explizitem Unvollständigkeits-Hinweis)
- **Volle Aufstellungs-Historie** — Lineups aller Spiele (Premium-Key erweitert die Datenlage)

## 📄 Lizenz / Daten

Spieldaten via [TheSportsDB](https://www.thesportsdb.com) — crowd-sourced, kann Lücken haben. Für intensivere Nutzung lohnt sich ein Premium-Key für höhere Limits.

<div align="center"><sub>gebaut von Noah · Daten von TheSportsDB</sub></div>
