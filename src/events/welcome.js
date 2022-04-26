module.exports = {
	name: 'guildMemberAdd',
	execute(client) {
    let guild = client.guild
    let channel = guild.channels.cache.find(c => c.name === "welcome");
    channel.send({content: `Welcome to the server! <@${client.id}>` 
})

    

	},
};