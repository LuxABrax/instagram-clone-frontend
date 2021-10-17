import { useState, useEffect } from "react";

export default function useSortToRows() {
	const [posts, setPosts] = useState([]);
	const [postRows, setPostRows] = useState([]);

	useEffect(() => {
		const sortPosts = () => {
			const rows = [];
			const len = posts.length;
			const rowNum = Math.ceil(len / 3);
			const emptyNum = rowNum * 3 - len;
			const totalNum = len + emptyNum;

			let row = [];
			let j = 0;

			for (let i = 0; i < totalNum; i++) {
				if (i < len) {
					row.push(posts[i]);
				} else {
					row.push({ _id: `${i}empty`, photo: "empty" });
				}
				j++;

				if (j === 3) {
					rows.push(row);
					row = [];
					j = 0;
				}
				if (i === totalNum) rows.push(row);
			}

			setPostRows(rows);
		};

		if (posts.length > 0) sortPosts();
	}, [posts]);

	return [postRows, setPosts];
}
