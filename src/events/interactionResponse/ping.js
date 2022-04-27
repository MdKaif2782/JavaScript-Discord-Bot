module.exports = {
	name: 'interactionCreate',
	execute(client) {
		const inetraction = client
		if(inetraction.commandName==="ping"){
            inetraction.reply({ content:"Pong!"});
        }
	},
};