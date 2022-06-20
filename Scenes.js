/*const create_reminder = new Scenes.WizardScene(
	"CREATE_REMINDER",
	async (ctx) => {
		// 1 ctx.reply("okay");
		await ctx.reply("plase enter Date in dd/mm/yyyy format");
		ctx.wizard.next();
	},
	async (ctx) => {
		//Store Date into session
		const date = ctx.message.text;
		ctx.session.date = date;

		// Now ask for time
		await ctx.sendMessage(
			ctx.chat.id,
			"Please enter Time in HH:MM format."
		);
		ctx.wizard.next();
	},
	async (ctx) => {
		// store previous time into session
		const time = ctx.message.text;
		ctx.session.time = time;
		// Now ask for another input
		await ctx.sendMessage(ctx.chat.id, "Please enter message to send ");
		ctx.wizard.next();
	},
	async (ctx) => {
		// store previous input into session
		const messageText = ctx.message.text;
		ctx.session.message = messageText;

		await ctx.reply(
			`You have entered Date: ${ctx.session.date}, Time:${ctx.session.time}, Message: ${ctx.session.message}`
		);
		ctx.scene.leave();
	}
);
module.exports = { create_reminder };*/
