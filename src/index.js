const discord = require('discord.js');
const fs = require('fs')

 const client = new discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS",
		"DIRECT_MESSAGE_REACTIONS",
		"GUILD_MESSAGE_REACTIONS"
    ]
})




const prefix = '!'

const path = require('path')
client.commands= new discord.Collection();
const folderPath = fs.readdirSync('src/commands')

for (const folder of folderPath){
	const commands = fs.readdirSync(path.resolve(`src/commands/${folder}`)).filter(file=>file.endsWith('.js'))
	for (const file of commands){
		const commandName= file.split('.')[0]
		const command = require(`./commands/${folder}/${commandName}`);
		client.commands.set(commandName,command)
	}
}



//reading events
const eventFolders = fs.readdirSync('src/events')
for (const folder of eventFolders){
	const eventFiles = fs.readdirSync(`src/events/${folder}`).filter(file => file.endsWith('.js'));

	for (const file of eventFiles) {
		const event = require(`./events/${folder}/${file}`);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
}


//messageCreateCommands
client.on("messageCreate", (message)=>{
    if (message.content.startsWith(prefix)){
        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const commandName = args.shift()
        const command = client.commands.get(commandName)
        if (!command) return message.reply("This command doesn't exist")
        command.run(client,message)
    }
})

// client.on("interactionCreate", (interaction)=>{
//
// })

const token1 = "OTI0NTc4NzcwNzg1MDEzODAw.YcgnFA"
const token2 = ".d_wjS3yKKbHvSpWeJSRWAnj8cW"
client.login(token1 + token2 + "8").then( r => {
	console.log(r);
})








