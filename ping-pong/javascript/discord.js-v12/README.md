- discord.js v12にはインラインリプライのサポートがないため、@メンションを使用した。
  - 例えば、以下のようにするとv12でもインラインリプライが使用できる。
    ```js
    const reply = new APIMessage(message.channel, {
      content: "pong!",
    });
    reply.resolveData();
    reply.data.message_reference = { message_id: message.id };
    await message.channel.send(reply);
    ```