# Path Finder
This project provides tools for visualizing path-finding and maze generation algorithms. It's designed for developers, educators, and enthusiasts who want to understand these algorithms or integrate them into their own applications.

## Key Features
- **Visualization of 4 Different Path-Finding Algorithms**: Breadth-First Search (BFS), Depth-First Search (DFS), Dijkstra's Algorithm, A* Algorithm.
- **Visualization of 2 Maze Generation Algorithms**: Recursive Backtracking, Prim's Algorithm.
- **Dynamic Path Finding**: Use path-finding algorithms to find the best path between the start and target points.
- **Interactive Features**
	- Change the positions of both the start and target points.
	- Draw walls (barriers) to create obstacles in the grid.

## How to Run
To run the project locally, follow these steps:

Clone the repository:

```
git clone https://github.com/dxmv/pathFinderReact.git
cd pathFinderReact
```

Install the necessary dependencies:

```
npm install
```

Start the application:

```
npm start
```
Open your web browser and navigate to http://localhost:3000.

## Algorithms
### Path-Finding Algorithms
**1. Breadth-First Search (BFS)**

- Explores all nodes at the present depth level before moving on to nodes at the next depth level.
- Guarantees the shortest path in an unweighted graph.

**2. Depth-First Search (DFS)**

- Explores as far as possible along each branch before backtracking.
- Does not guarantee the shortest path.

**3. Dijkstra's Algorithm**

- Finds the shortest path between the start and target in a graph, which may represent, for example, road networks.
- Uses a priority queue to explore the shortest known path first.

**4. A Algorithm***

- An extension of Dijkstra's Algorithm that uses heuristics to improve performance.
- Finds the shortest path more efficiently by using a cost function f(n) = g(n) + h(n) where:
	- g(n) is the cost from the start node to n.
	- h(n) is the heuristic estimate from n to the goal.

##Maze Generation Algorithms
**1. Recursive Backtracking**
- A depth-first search algorithm that starts at a random cell and visits each cell exactly once.
- Creates a maze by carving passages between cells.

**2. Prim's Algorithm**
- A randomized algorithm that starts with a grid full of walls.
- Grows the maze by adding the lowest-cost wall that connects a visited cell to an unvisited cell.
