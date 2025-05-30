require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

// Environment variables (in .env):
// API_BASE_URL=https://vlr.orlandomm.net/api/v1
// VLR_BASE_URL=https://www.vlr.gg
// DISCORD_TOKEN=your_bot_token

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;
  const [cmd, ...args] = message.content.trim().split(/\s+/);

  // Ping command
  if (cmd === '!ping') {
    return message.reply('Pong!');
  }

  // Upcoming matches for a specific team by ID
  if (cmd === '!upcoming') {
    const teamId = args[0];
    if (!teamId) {
      return message.reply('❌ Please specify a team ID: `!upcoming <teamId>`');
    }
    try {
      const res = await fetch(
        `${process.env.API_BASE_URL}/teams/${teamId}`
      );
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      const json = await res.json();
      const upcoming = json.data?.upcoming || [];
      if (upcoming.length === 0) {
        return message.reply(`No upcoming matches found for team ID **${teamId}**.`);
      }
      const next3 = upcoming.slice(0, 3);
      const lines = next3.map(match => {
        const [t1, t2] = match.teams.map(t => t.name);
        const eventName = match.event.name;
        const matchUrl = `${process.env.VLR_BASE_URL}${match.match.url}`;
        return `• **${t1}** vs **${t2}** — ${eventName} — <${matchUrl}>`;
      });
      return message.reply(
        `Upcoming matches for team ID **${teamId}**:\n${lines.join('\n')}`
      );
    } catch (err) {
      console.error('Error fetching team upcoming:', err);
      return message.reply('⚠️ Sorry, couldn’t fetch team schedule right now.');
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
