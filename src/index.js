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
const prefix = '!'
const fs = require('fs')
client.commands= new discord.Collection();
const commands = fs.readdirSync('src/commands').filter(file => file.endsWith('.js'));

for (file of commands){
    const commandName= file.split('.')[0]
    const command = require(`./commands/${commandName}`);
    client.commands.set(commandName,command)
}


client.on("ready",()=>{
    console.log(`logged in as ${client.user.tag}`)

})
//ping
// client.on("messageCreate", (event)=>{
//     if (event.content.toLowerCase()==="!ping"){
//         event.reply("Pong!");
//     }
// })

client.on("messageCreate", (message)=>{
    if (message.content.startsWith(prefix)){
        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const commandName = args.shift()
        const command = client.commands.get(commandName)
        if (!command) return message.reply("This command doesn't exist")
        command.run(client,message,args)
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

client.login("OTI0NTc4NzcwNzg1MDEzODAw.YcgnFA.E3NnBbn2Q2Es125A4psmnYrMpRY")








