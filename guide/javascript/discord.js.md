# discord-bot-examples javascript discord.js contribution guide
これは規約ではなく推奨事項です。

## 共通
- `Intents`は最小限のものを使用する。
  - 必要に応じて`partial`、`fetch`等を活用する。
- `unhandledPromiseRejection`を起こさないようにする。
- 環境変数`DISCORD_BOT_TOKEN`よりトークンを読み出すこと。
  - このとき意図的に`undefined`の検証を行わないことにより、`discord.js`の慣例である`DISCORD_TOKEN`にも対応させることができる。
- `linter`、`formatter`を積極的に利用する。
- `jsdoc`を必要に応じて利用する。
- その機能に必要な最小な権限を示す。
- `ready`でログインしているユーザーと招待リンクを表示する。

## v12

## v13
- `message`ではなく`messageCreate`を使用する。

