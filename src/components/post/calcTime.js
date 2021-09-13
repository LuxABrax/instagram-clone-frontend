function getDifferenceInMinutes(date1, date2) {
	const diffInMs = Math.abs(date2 - date1);
	return Math.floor(diffInMs / (1000 * 60));
}

function getDifferenceInHours(date1, date2) {
	const diffInMs = Math.abs(date2 - date1);
	return Math.floor(diffInMs / (1000 * 60 * 60));
}

function getDifferenceInDays(date1, date2) {
	const diffInMs = Math.abs(date2 - date1);
	return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

export const calcTime = createdAt => {
	let created = new Date(createdAt);
	let now = new Date();

	let mins = getDifferenceInMinutes(now, created);
	if (mins < 1) return "just now";
	if (mins < 60) return `${mins} minute${mins > 1 ? "s" : ""} ago`;

	let hours = getDifferenceInHours(now, created);
	if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

	let days = getDifferenceInDays(now, created);
	if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;

	let weeks = Math.round(days / 7);
	return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
};
