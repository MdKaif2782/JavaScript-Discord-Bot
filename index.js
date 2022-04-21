const discord = require('discord.js');
const ping = require('./Commands/ping')

 const client = new discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})
exports.client = client

client.on("ready",()=>{
    console.log(`logged in as ${client.user.tag}`)
    ping.ping
})
//ping
client.on("messageCreate", (event)=>{
    if (event.content.toLowerCase()==="ping"){
        event.reply("Pong!");
    }
})



function login(){
    client.login("OTI0NTc4NzcwNzg1MDEzODAw.YcgnFA.uPgUyAbJild0DtHPtSnaRltsTng")
}
login();







