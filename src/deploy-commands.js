const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');


const commands = [];
const commandFiles = fs.readdirSync('src/commands/slashCommands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/slashCommands/${file}`);
	commands.push(command.data.toJSON());
}