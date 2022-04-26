const discord = require('discord.js');
const { welcomeImage } = require('discord-welcome-card');
module.exports = {
	name: 'guildMemberAdd',
	execute(client) {
		if (!client.guild) return;
    let guild = client.guild
    let channel = guild.channels.cache.find(c => c.name === "welcome");
  
    let membercount = guild.members
    if (!channel) return;
    const member = client;
    (async ()=>{
      const image = await welcomeImage(member, {theme:'circuit'})
    channel.send({files:[image]})
  })()
  
	},
};
