
module.exports = {
	name: 'interactionCreate',
	execute(client) {


		if(client.commandName==="meme"){
            const fetch = require('cross-fetch')
            const {MessageEmbed} = require('discord.js')
            async function getMeme(){
            const response = await fetch('https://meme-api.herokuapp.com/gimme')
            const data = await response.json()
            const embed = await new MessageEmbed()
            .setTitle(data.title)
            .setAuthor("Succubot","https://images-ext-2.discordapp.net/external/p1DFrAGKk7cNMjhMZ3D6uoNJAYknMj7jxKk5qx0ArjU/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/924578770785013800/a537422edd17a355bd4f8b8cbe37acc4.png?width=468&height=468")
            .setDescription(`*[Posted](${data.postLink}) on r/${data.subreddit} by u/${data.author}*`)
            .setImage(data.url)
            .setFooter(`Upvotes: ${data.ups}  NSFW: ${data.nsfw}  Spoiler: ${data.spoiler}`)
            console.log(data);
            client.reply({embeds: [embed]});
            }getMeme();

            

            
        }
	},
};