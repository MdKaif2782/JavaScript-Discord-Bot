
module.exports = {
	name: 'guildMemberAdd',
	execute(client) {
        (async ()=>{
            const generateImage = await require('../generateImage')
            let server = await client.guild
            if (!server){
                console.log('Server not found')
                return;
            }
            let channel = await server.channels.cache.find(c => c.name === "welcome");
            if (!channel) {
                console.log("Channel not found")
                return;
            }
            const image = await generateImage(client)
            await channel.send({content:`Welcome to the server! <@${client.id}>`,
                files: [image]});
        })()
  
	},
};
