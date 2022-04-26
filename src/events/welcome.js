const discord = require('discord.js');
module.exports = {
	name: 'guildMemberAdd',
	execute(client) {
		if (!client.guild) return;
    let guild = client.guild
    let channel = guild.channels.cache.find(c => c.name === "welcome");
  
    let membercount = guild.members
    if (!channel) return;
    
    let embed = new discord.MessageEmbed() 
      .setColor("GREEN") 
      .setTitle("New Server Member!")
      .setDescription(`Welcome, ${client.user.tag} to **${guild.name}!**`)
      .setThumbnail(client.user.displayAvatarURL())
      //.setFooter(`You are the ${membercount}th member to join`);
    channel.send(embed);
	},
};