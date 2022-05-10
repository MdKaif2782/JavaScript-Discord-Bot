const DiscordJS = require('discord.js')
module.exports = {
    name: 'ready',
    execute(client) {
        const guildId= "924564717949829161";
        const guild = client.guilds.cache.get(guildId);

        let commands
        if (guild) {
            commands = guild.commands;
        }else{
            commands = client.application.commands
        }
        commands.create({
            name:'nhentai',
            description: 'Read doujins here!',
            options: [{
                name: 'code',
                description: 'Doujin code',
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.INTEGER,
                required: true
            }]
        })
    },
};
