export const calcPopupOffset = (e, hoveredEl) => {
	console.log("handle popup");
	const yOffsetPercent = (e.clientY - 54) / (e.view.outerHeight - 54);
	console.log(yOffsetPercent);

	const offY = yOffsetPercent < 0.5 ? -10 : 10;
	const offX = hoveredEl === "icon" ? 4 : hoveredEl === "name" ? 52 : 15;
	console.log(offY, offX);

	return { offY, offX };
};
