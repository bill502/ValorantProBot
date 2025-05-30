# ValorantProBot

A Discord bot that brings pro Valorant esports info—match schedules, live scores, and player stats—right into your server.

## Features

- **`!upcoming <team>`**: Shows the next 3 upcoming matches for a given org (e.g. Sentinels, Fnatic).  
- **`!live`**: If a match is in progress, returns current score and map.  
- **`!stats <player>`**: Fetches basic pro-player stats (KD ratio, favorite agent, recent performance).  
- **`!notify <team>`**: Subscribes the channel to 10-minute reminders before that team’s next match.

## Tech Stack

- [Node.js](https://nodejs.org/)  
- [discord.js](https://discord.js.org/)  
- [`node-fetch`](https://www.npmjs.com/package/node-fetch) 
- Unofficial Valorant esports API (e.g. https://vlrggapi.vercel.app)
