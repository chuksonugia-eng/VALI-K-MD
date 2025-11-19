import config from "../config.js";

export default {
  name: "alive",
  run: async ({ sock, from }) => {
    await sock.sendMessage(from, {
      image: { url: config.botImg },
      caption: `╭━━━━━━ ⚜️  ${config.botName} ⚜ ━━━━━━╮
│    
│ ⚜️I\`m: ⚜️ ${config.botName}
│ ⚜️STATUS: Online ⚡
│ ⚜️VERSION: 1.0.0
│    
╰━━━━━━━━━━━━━━━━━━━━━━╯`
    });
  }
};
