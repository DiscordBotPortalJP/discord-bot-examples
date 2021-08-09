const { Client, Intents, Permissions } = require("discord.js");
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const PREFIX = "!";

const client = new Client({
  ws: {
    // GUILDSはキャッシュのために必要
    intents:
      Intents.FLAGS.GUILDS |
      Intents.FLAGS.GUILD_MESSAGES |
      Intents.FLAGS.DIRECT_MESSAGES,
  },
  partials: ["GUILD_MEMBER", "USER"],
});
const permissions = new Permissions(["VIEW_CHANNEL", "SEND_MESSAGES"]);
const operations = {
  add: { run: (l, r) => l + r, mark: "+" },
  multiply: { run: (l, r) => l * r, mark: "*" },
  subtract: { run: (l, r) => l - r, mark: "-" },
  divide: { run: (l, r) => l / r, mark: "/" },
};
/**
 * メッセージハンドラ
 * @param {import("discord.js").Message} message
 */
async function onMessage(message) {
  if (message.webhookID || message.author.bot) {
    return;
  }
  if (!message.content.startsWith(PREFIX)) {
    return;
  }
  const [command, ...term] = message.content
    .substring(PREFIX.length)
    .split(" ")
    .filter((e) => e !== "");
  const operation = operations[command];
  if (!operation) {
    return;
  }
  if (term.length != 2) {
    await message.channel.send("引数は2つである必要があります。");
    return;
  }
  const [a, b] = term.map(Number);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    await message.channel.send("引数は数字である必要があります。");
    return;
  }
  const result = operation.run(a, b);
  await message.channel.send(
    `${message.author} ${a} ${operation.mark} ${b} = ${result}`
  );
}
client.on("message", (message) => {
  onMessage(message).catch((err) => console.error(err));
});
client.once("ready", () => {
  const clientUser = client.user;
  console.log(`Logged in as: ${clientUser.tag}`);
  console.log(
    `Invite Link: https://discord.com/api/oauth2/authorize?client_id=${clientUser.id}&permissions=${permissions.bitfield}&scope=bot`
  );
});
client.login(DISCORD_BOT_TOKEN).catch((err) => {
  console.error(err);
  process.exit(-1);
});
