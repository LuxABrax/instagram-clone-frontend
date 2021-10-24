import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFiltered } from "../../redux/storiesSlice";

export default function useFilterStories() {
	const [stories, setStories] = useState([]);
	const [filteredStories, setFilteredStories] = useState([]);

	const dispatch = useDispatch();

	useEffect(() => {
		const unSeenIdx = uStories => {
			let firstUnseen = undefined;
			uStories.forEach((s, idx) => {
				if (s.seen === false && firstUnseen === undefined) {
					firstUnseen = idx;
				}
			});
			if (firstUnseen === undefined) return 0;
			return firstUnseen;
		};

		const sortStories = () => {
			const unSeenArr = [];
			const seenArr = [];

			stories.forEach((s, idx) => {
				const indexObj = {
					userIdx: idx,
					storyIdx: unSeenIdx(s.stories),
				};
				const newS = { ...s, indexes: indexObj };
				if (s.user.hasUnseen) {
					unSeenArr.push(newS);
				} else {
					seenArr.push(newS);
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
			console.log(unSeenArr);
			const arr = [...unSeenArr, ...seenArr];
			dispatch(setFiltered(arr));
			setFilteredStories(arr);
		};

		if (stories.length > 0) sortStories();
	}, [stories, dispatch]);

	return [filteredStories, setStories];
}
