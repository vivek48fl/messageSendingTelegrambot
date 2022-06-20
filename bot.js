const { Telegraf, session, Scenes } = require("telegraf");
//const { create_reminder } = require("./Scenes");
const {
	createReminder,
	checkDatabase,
	readReminders,
	getCurrentDate,
	createDate,
} = require("./helperFunctions");
require("dotenv").config();
userId = 02;

console.log(process.env.TOKEN);
const bot = new Telegraf(process.env.TOKEN);
bot.start((ctx) => ctx.reply("Welcome"));
bot.hears("hi", (ctx) => {
	ctx.reply("Hey there");
	console.log("Chat id: - ", ctx.chat.id);
});

bot.command("listReminder", async (ctx) => {
	console.log("Hello from List Reminder command");
	const reminders = await readReminders(userId);
	ctx.reply("Here is a list of Reminders");
	for (let i = 0; i < reminders.length; i++) {
		ctx.reply(
			`Name: - ${reminders[i].name}, DateTime: - ${reminders[i].dateTime}`
		);
	}
});

const stage = new Scenes.Stage([create_reminder]);
bot.use(stage.middleware());
/*bot.command("createreminder", (ctx) => {
	ctx.scene.enter("CREATE_REMINDER");
});*/
bot.launch();
