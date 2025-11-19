import config from "../config.js";

export default {
  name: "menu",
  run: async ({ sock, from }) => {
    await sock.sendMessage(from, {
      image: { url: config.botImg },
      caption:
`⚜️ *VALI K MD - MENU* ⚜️

• .ping
• .alive
• .menu

(We will add all other commands later)`
    });
  }
};
