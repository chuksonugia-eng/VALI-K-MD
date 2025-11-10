require('dotenv').config();
const { default: makeWASocket, useSingleFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const menu = require('./menu');

const { state, saveState } = useSingleFileAuthState('./session.json');

async function startBot() {
    const { version } = await fetchLatestBaileysVersion();
    const sock = makeWASocket({
        version,
        printQRInTerminal: true,
        auth: state,
    });

    sock.ev.on('creds.update', saveState);

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.message || msg.key.fromMe) return;
        const from = msg.key.remoteJid;
        const body = msg.message.conversation || msg.message.extendedTextMessage?.text;

        if (body && (body.startsWith('.menu') || body.startsWith('!menu'))) {
            await menu.sendMenu(sock, from, msg);
        }
        // Add more command handlers here later!
    });
}

startBot();
