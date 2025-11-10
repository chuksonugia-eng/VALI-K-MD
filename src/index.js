require('dotenv').config();
const { default: makeWASocket, fetchLatestBaileysVersion, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const menu = require('./menu');

async function startBot() {
    const { version } = await fetchLatestBaileysVersion();
    const { state, saveCreds } = await useMultiFileAuthState('baileys_auth_info'); // session folder

    const sock = makeWASocket({
        version,
        printQRInTerminal: true,
        auth: state
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.message || msg.key.fromMe) return;
        const from = msg.key.remoteJid;
        const body = msg.message.conversation || (msg.message.extendedTextMessage && msg.message.extendedTextMessage.text) || "";

        if (body && (body.startsWith('.menu') || body.startsWith('!menu'))) {
            await menu.sendMenu(sock, from, msg);
        }
        // Add further command handlers here for more commands!
    });
}

startBot();
