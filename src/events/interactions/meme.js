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
            name:'meme',
            description: 'send a random meme from internet'
        })
	},
};