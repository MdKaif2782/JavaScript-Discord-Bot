module.exports = {
	name: 'ping',
	once: true,
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
            name:'ping',
            description: 'replies with pong'
        })
	},
};