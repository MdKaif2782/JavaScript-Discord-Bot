const discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const http = require('http'); // <-- built-in HTTP module

const client = new discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS",
        "DIRECT_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_REACTIONS"
    ]
});

const prefix = '!';
client.commands = new discord.Collection();

// ---------- Load Commands ----------
const commandsPath = path.join(__dirname, 'commands');

function loadCommands(dir) {
    const folders = fs.readdirSync(dir);
    for (const folder of folders) {
        const fullFolderPath = path.join(dir, folder);
        if (fs.statSync(fullFolderPath).isDirectory()) {
            const commandFiles = fs.readdirSync(fullFolderPath).filter(f => f.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(path.join(fullFolderPath, file));
                client.commands.set(file.split('.')[0], command);
            }
        }
    }
}

loadCommands(commandsPath);

// ---------- Load Events ----------
const eventsPath = path.join(__dirname, 'events');

function loadEvents(dir) {
    const folders = fs.readdirSync(dir);
    for (const folder of folders) {
        const fullFolderPath = path.join(dir, folder);
        const eventFiles = fs.readdirSync(fullFolderPath).filter(f => f.endsWith('.js'));
        for (const file of eventFiles) {
            const event = require(path.join(fullFolderPath, file));
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }
        }
    }
}

loadEvents(eventsPath);

// ---------- Message Command Handler ----------
client.on("messageCreate", message => {
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift();
    const command = client.commands.get(commandName);
    if (!command) return message.reply("This command doesn't exist");
    command.run(client, message, args);
});

// ---------- Interaction Handler ----------
client.on("interactionCreate", interaction => {
    // handle interactions here if needed
});

// ---------- Basic HTTP Server ----------
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Bot is alive!\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`HTTP server running on port ${PORT}`);
});

// ---------- Login ----------
const token1 = "OTI0NTc4NzcwNzg1MDEzODAw.YcgnFA";
const token2 = ".d_wjS3yKKbHvSpWeJSRWAnj8cW";
const token3 = "8";
client.login(token1 + token2 + token3).then(() => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
});
