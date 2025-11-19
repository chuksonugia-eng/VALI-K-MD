import makeWASocket, { useMultiFileAuthState, fetchLatestBaileysVersion } 
from "@whiskeysockets/baileys";
import pino from "pino";

export async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: true,
    logger: pino({ level: "silent" })
  });

  sock.ev.on("creds.update", saveCreds);

  return sock;
}
