import { INode } from "../types";
import getUnvisitedNeighbors from "./getNeighbors";

const aStar = async (
    startCoords: { x: number; y: number },
    endCoords: { x: number; y: number },
    arr: INode[][],
): Promise<{visited: Set<INode>, path: INode[]}> => {
    const grid: INode[][] = [...arr];
    const visited: Set<INode> = new Set();
    const openSet: Set<INode> = new Set();
    const gScore = new Map<string, number>();
    const fScore = new Map<string, number>();
    const parents = new Map<string, string>();

    // Add start node to open set
    const startNode = grid[startCoords.x][startCoords.y];
    openSet.add(startNode);
    
    const startKey = `${startCoords.x},${startCoords.y}`;
    gScore.set(startKey, 0);
    fScore.set(startKey, heuristic(startCoords, endCoords));

    while (openSet.size > 0) {
        let current: INode | null = null;
        let minFScore = Infinity;

        // Find node with lowest fScore
        for (const node of Array.from(openSet)) {
            const key = `${node.row},${node.col}`;
            const score = fScore.get(key) || Infinity;
            if (score < minFScore) {
                minFScore = score;
                current = node;
            }
        }

        if (!current) break;
        
        // Found the target
        if (current.isFinish) {
            visited.add(current);
            break;
        }

        openSet.delete(current);
        visited.add(current);
        current.isChecked = true;

        const neighbors = getUnvisitedNeighbors(grid, current, visited);
        const currentKey = `${current.row},${current.col}`;
        
        for (const neighbor of neighbors) {
            if (neighbor.isWall) continue;

            const neighborKey = `${neighbor.row},${neighbor.col}`;
            const tentativeGScore = (gScore.get(currentKey) || 0) + 1;

            if (tentativeGScore < (gScore.get(neighborKey) || Infinity)) {
                parents.set(neighborKey, currentKey);
                gScore.set(neighborKey, tentativeGScore);
                fScore.set(
                    neighborKey,
                    tentativeGScore + heuristic(
                        {x: neighbor.row, y: neighbor.col},
                        endCoords
                    )
                );
                
                if (!openSet.has(neighbor)) {
                    openSet.add(neighbor);
                }
            }
        }
    }

    // Reconstruct path
    const path: INode[] = [];
    let currentKey = `${endCoords.x},${endCoords.y}`;
    
    while (currentKey && parents.has(currentKey)) {
        const [row, col] = currentKey.split(',').map(Number);
        path.unshift(grid[row][col]);
        currentKey = parents.get(currentKey)!;
    }

    path.unshift(grid[startCoords.x][startCoords.y]);
    
    return { visited, path };
};

const heuristic = (
    pos: { x: number; y: number }, 
    target: { x: number; y: number }
): number => {
    // Manhattan distance
    return Math.abs(pos.x - target.x) + Math.abs(pos.y - target.y);
};

export default aStar;