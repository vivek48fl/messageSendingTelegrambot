require("dotenv").config();
const axios = require("axios").default;
const cron = require("node-cron");
const { checkDatabase, updateSentReminder } = require("./helperFunctions");

async function sendMessage(text) {
	const uri = `https://api.telegram.org/bot${
		process.env.TOKEN
	}/sendMessage?chat_id=${1338579680}&text=${text}`;
	axios.get(uri).then(async (response) => {
		console.log("Message sent to telegram second bot");
	});
}

async function main() {
	let status = await checkDatabase("test", "scheduler");
	console.log(status, "status");
	if (status != null) {
		let userId = status.userId;
		const reminderId = status._id;
		await sendMessage(`Hey this is demo message`);
		// Update sent Reminder to database as status sent
		const updateResult = await updateSentReminder(userId, reminderId);
		updateResult.modifiedCount > 0 && updateResult.matchedCount > 0
			? console.log("Database status is updated")
			: console.log("Database status is not updated");
	}
}

cron.schedule("* * * * *", async () => {
	console.log("Sendin message");
	main();
});
