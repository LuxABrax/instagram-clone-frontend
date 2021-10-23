import { useState, useEffect } from "react";

export default function useFilterStories() {
	const [stories, setStories] = useState([]);
	const [filteredStories, setFilteredStories] = useState([]);

	useEffect(() => {
		const sortStories = () => {
			const unSeenArr = [];
			const seenArr = [];

			stories.forEach(s => {
				if (s.user.hasUnseen) {
					unSeenArr.push(s);
				} else {
					seenArr.push(s);
				}
			});

			if (unSeenArr.length > 0)
				unSeenArr.sort(
					(a, b) => new Date(b.user.lastStory) - new Date(a.user.lastStory)
				);
			if (seenArr.length > 0)
				seenArr.sort(
					(a, b) => new Date(b.user.lastStory) - new Date(a.user.lastStory)
				);

			setFilteredStories([...unSeenArr, ...seenArr]);
		};

		if (stories.length > 0) sortStories();
	}, [stories]);

	return [filteredStories, setStories];
}
