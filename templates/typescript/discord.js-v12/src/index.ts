import { Client, Intents, Permissions, APIMessage, Message } from "discord.js";
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const client = new Client({
  ws: {
    intents: Intents.FLAGS.GUILDS,
  },
  partials: ["GUILD_MEMBER", "USER"],
});
const permissions = new Permissions([]);

client.once("ready", () => {
  // Client#userがnullになるのはready以前のみに限られるため
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const clientUser = client.user!;
  console.log(`Logged in as: ${clientUser.tag}#${clientUser.tag}`);
  console.log(
    `Invite Link: https://discord.com/api/oauth2/authorize?client_id=${clientUser.id}&permissions=${permissions.bitfield}&scope=bot`
  );
});
client.login(DISCORD_BOT_TOKEN).catch((err) => {
  console.error(err);
  process.exit(-1);
});
