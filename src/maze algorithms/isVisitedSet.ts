const isVisitedSet = (visited: Set<string>, row: number, col: number) => {
	return visited.has(row + " " + col);
};

export default isVisitedSet;
