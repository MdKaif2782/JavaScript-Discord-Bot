module.exports = {
    name: 'interactionCreate',
    execute(client) {

        if(client.commandName==="testreact"){
            const message = client;
            message.reply("Interacting to Reaction add/remove command:")
            message.channel.send("Testing").then( mes =>{
                mes.react("✅").then(r => {console.log(r.emoji.name)})
                mes.client.on('messageReactionAdd',(reaction,user)=>{
                    if (reaction.message.id===mes.id) {
                        console.log(reaction.emoji.name)
                        console.log(user.tag)
                        mes.edit(`${user.tag} reacted ${reaction.emoji.name} on my message`)
                        //add event {your code goes here}
                    }
                })
                mes.client.on('messageReactionRemove',(reaction,user)=>{
                    if (reaction.message.id===mes.id) {
                        console.log(reaction.emoji.name)
                        console.log(user.tag)
                        mes.edit(`${user.tag} removed ${reaction.emoji.name} from my message`)
                    }
                    //add event {your code goes here}
                })

            })

        }
    },
};