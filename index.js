import { connectToWhatsApp } from "./lib/baileys.js";
import config from "./config.js";
import fs from "fs";

let commands = {};

function loadCommands() {
  fs.readdirSync("./commands").forEach(file => {
    if (file.endsWith(".js")) {
      const cmd = await import(`./commands/${file}`);
      commands[cmd.default.name] = cmd.default;
    }
  });
}

async function startBot() {
  const sock = await connectToWhatsApp();
  loadCommands();

  sock.ev.on("messages.upsert", async ({ messages }) => {
    try {
      const msg = messages[0];
      if (!msg.message) return;

      const from = msg.key.remoteJid;
      const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
      if (!text) return;

      if (!text.startsWith(config.prefix)) return;

      const cmdName = text.slice(1).trim().split(" ")[0].toLowerCase();
      const cmd = commands[cmdName];

      if (cmd) {
        await cmd.run({ sock, msg, text, from });
      }
    } catch (e) {
      console.log("Error:", e);
    }
  });
}

startBot();
