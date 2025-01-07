import { INode } from "../types";
import getUnvisitedNeighbors from "./getNeighbors";

const randomWalk = (
    grid: INode[][],
    startCoords: { row: number; col: number },
    endCoords: { row: number; col: number }
): { visited: Set<INode>; path: INode[] } => {
    const visited: Set<INode> = new Set();
    const path: INode[] = [];
    const startNode = grid[startCoords.row][startCoords.col];
    const endNode = grid[endCoords.row][endCoords.col];
    let found = false;

    const traverse = (current: INode): void => {
        if (found) return; // Terminate recursion if the target is already found

        visited.add(current);
        current.isChecked = true;
        path.push(current);

        // Check if we've reached the target
        if (current === endNode) {
            found = true;
            return;
        }

        const neighbors = getUnvisitedNeighbors(grid, current, visited);

        if (neighbors.length > 0) {
            // Randomly shuffle neighbors to ensure random selection
            for (let i = neighbors.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [neighbors[i], neighbors[j]] = [neighbors[j], neighbors[i]];
            }

            // Attempt to traverse each neighbor randomly
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    traverse(neighbor);
                    if (found) return; // Stop further exploration if the target is found
                }
            }
        }

        // Backtrack if no path is found from the current node
        path.pop();
    };

    traverse(startNode);

    return { visited, path };
};

export default randomWalk;
