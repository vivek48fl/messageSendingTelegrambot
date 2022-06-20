const { clientPromise } = require("./util/mongoDbConnector");
const { ObjectId } = require("mongodb");
function getCurrentDate() {
	let date = new Date();
	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();
	let hours = date.getHours();
	let minutes = date.getMinutes();
	//convert date to timestamp
	let timestamp = new Date(year, month, day, hours, minutes).getTime();
	console.log(timestamp, "in currentDate");
	console.log(new Date().getTime());
	return timestamp;
}
const createDate = (date, time) => {
	const newDates = date.split("/");
	const newTimes = time.split(":");
	console.log("newDates Array in createDate", newDates);
	const timeStamp = new Date(
		newDates[2],
		newDates[1],
		newDates[0],
		newTimes[0],
		newTimes[1]
	).getTime();
	/*console.log(
		"Date in createDate function",
		date,
		"time in createDate function",
		time
	);
	const dateTime = new Date(date + " " + time);
	console.log(dateTime);
	const day = dateTime.getDate();
	const month = dateTime.getMonth() + 1;
	const year = dateTime.getFullYear();
	const hours = dateTime.getHours();
	const minutes = dateTime.getMinutes();
	let currentDate =
		day + "/" + month + "/" + year + " " + hours + ":" + minutes;
	console.log(currentDate);
	//convert date to timestamp
	let timestamp = new Date(currentDate).getTime();
	console.log("Date Now", timestamp);*/

	return timeStamp;
};

const checkDatabase = async (dbName, collectionName) => {
	console.log("dbName in checkDatabase", dbName, collectionName);
	const client = await clientPromise;
	console.log(client, "client in checkDatabase");
	const db = await client.db(dbName);
	console.log("db in checkDatabase", db);
	const collection = await db.collection(collectionName);
	console.log("collection in checkDatbase", collection);
	const currentTime = getCurrentDate();

	console.log(currentTime, "current time in checkDatabase");
	const result = await collection.findOne({ dateTime: currentTime });
	console.log(result, "result in checkDatabase");
	return result;
};
const readReminders = async (id) => {
	const client = await clientPromise;
	const db = await client.db("test");
	const collection = await db.collection("scheduler");
	const reminders = collection.find({ userId: id }).toArray();
	return reminders;
};
const createReminder = async (id, date, time, messageText) => {
	const timeStamp = createDate(date, time);
	let client = await clientPromise;
	let db = await client.db("test");
	let collection = await db.collection("scheduler");
	const insertResult = await collection.insertOne({
		userId: id,
		dateTime: timeStamp,
		messageText: messageText,
	});
};
const updateSentReminder = async (id, reminderId) => {
	let client = await clientPromise;
	let db = await client.db("test");
	let collection = await db.collection("scheduler");
	const updateResult = await collection.updateOne(
		{
			_id: ObjectId(reminderId),
			userId: id,
		},
		{ $set: { status: "sent" } }
	);
	return updateResult;
};

module.exports = {
	checkDatabase,
	readReminders,
	createDate,
	createReminder,
	getCurrentDate,
	updateSentReminder,
};

// const { clientPromise } = require("./util/mongoDbConnector");

// async function checkDatabase() {
// 	let client = await clientPromise;
// 	let db = await client.db("test");
// 	let collection = await db.collection("scheduler");
// 	let results = await collection.find({}).toArray();
// 	console.log(results);
// }

// module.exports = {
// 	checkDatabase,
// };
