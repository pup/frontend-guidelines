import data from './data.mjs';

function hasCycle(nodes, edges) {
    let inDegree = {};
    let graph = {};

    // 初始化入度和邻接表
    nodes.forEach(node => {
        inDegree[node.name] = 0;
        graph[node.name] = [];
    });

    // 构建入度和邻接表
    edges.forEach(edge => {
        let { source, target } = edge;
        graph[source].push(target);
        inDegree[target]++;
    });

    // 拓扑排序
    let queue = Object.keys(inDegree).filter(node => inDegree[node] === 0);
    let visited = 0;
    while (queue.length > 0) {
        let node = queue.shift();
        visited++;
        graph[node].forEach(neighbor => {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        });
    }

    // 如果所有节点都被访问到，则不存在环
    return visited !== Object.keys(inDegree).length;
}


if (hasCycle(data.nodes, data.links)) {
    console.log("图中存在环");
} else {
    console.log("图中不存在环");
}
