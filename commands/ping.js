export default {
  name: "ping",
  run: async ({ sock, msg, from }) => {
    let start = Date.now();
    await sock.sendMessage(from, { text: "Pinging..." });
    let end = Date.now();
    await sock.sendMessage(from, { text: `Pong! ${end - start}ms` });
  }
};
