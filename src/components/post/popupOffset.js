export const calcPopupOffset = (e, hoveredEl) => {
	// calculate if popup should be over or under the trigger based on position on the screen
	const yOffsetPercent = (e.clientY - 54) / (e.view.outerHeight - 54);
	const offY = yOffsetPercent < 0.5 ? -10 : 10;

	let offX;

	switch (hoveredEl) {
		case "icon":
			offX = 4;
			break;
		case ("name", "comm"):
			offX = -4;
			break;
		default:
			offX = 0;
			break;
	}

	return { offY, offX };
};
