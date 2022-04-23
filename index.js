const discord = require('discord.js');
const { TextChannel, Guild, GuildChannel} = require('discord.js')
const generateImage = require('./generateImage')

 const client = new discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})


client.on("ready",()=>{
    console.log(`logged in as ${client.user.tag}`)

})
//ping
client.on("messageCreate", (event)=>{
    if (event.content.toLowerCase()==="!ping"){
        event.reply("Pong!");
    }
})







const welcomeChannelId ="966699062051090452"

client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member)
    client.guilds.cache.get(member.guild.id).channels.cache.
    get(welcomeChannelId).send({content: `<@${member.id}> Welcome to the server!`,
        files: [img]
    })
})

client.login("OTI0NTc4NzcwNzg1MDEzODAw.YcgnFA.mnZFVV_TTEhW5HsGDTlEptXabLU")








