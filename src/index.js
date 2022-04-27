const discord = require('discord.js');
const { TextChannel, Guild, GuildChannel} = require('discord.js')
const fs = require('fs')

 const client = new discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})




const prefix = '!'

const path = require('path')
client.commands= new discord.Collection();
const commands = fs.readdirSync(path.resolve('src/commands')).filter(file => file.endsWith('.js'));
//reading commands
for (file of commands){
    const commandName= file.split('.')[0]
    const command = require(`./commands/${commandName}`);
    client.commands.set(commandName,command)
}


//reading events
const eventFiles = fs.readdirSync('src/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

const interactionCreateFiles = fs.readdirSync('src/events/interactions').filter(file => file.endsWith('.js'));

for (const file of interactionCreateFiles) {
	const event = require(`./events/interactions/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

const interactionResponseFiles = fs.readdirSync('src/events/interactionResponse').filter(file => file.endsWith('.js'));

for (const file of interactionResponseFiles) {
	const event = require(`./events/interactionResponse/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


//messageCreateCommands
client.on("messageCreate", (message)=>{
    if (message.content.startsWith(prefix)){
        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const commandName = args.shift()
        const command = client.commands.get(commandName)
        if (!command) return message.reply("This command doesn't exist")
        command.run(client,message,args)
    }
})





// const welcomeChannelId ="966699062051090452"
// client.on("guildMemberAdd", async (member) => {
//     const img = await generateImage(member)
//     client.guilds.cache.get(member.guild.id).channels.cache.
//     get(welcomeChannelId).send({content: `<@${member.id}> Welcome to the server!`,
//         files: [img]
//     })
// })

const token1 = "OTI0NTc4NzcwNzg1MDEzODAw.YcgnFA"
const token2 = ".d_wjS3yKKbHvSpWeJSRWAnj8cW"
client.login(token1+token2+"8")








