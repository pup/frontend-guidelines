import data from './data.mjs'


function topologicalSort(graph) {
  const inDegree = {};
  const queue = [];
  const result = [];

  // 初始化入度
  graph.nodes.forEach(node => {
    inDegree[node.name] = 0;
  });

  // 计算入度
  graph.links.forEach(link => {
    inDegree[link.target]++;
  });

  // 将入度为0的节点加入队列
  graph.nodes.forEach(node => {
    if (inDegree[node.name] === 0) {
      queue.push(node);
    }
  });

  // 拓扑排序
  while (queue.length !== 0) {
    const currentNode = queue.shift();
    result.push(currentNode);

    graph.links.forEach(link => {
      if (link.source === currentNode.name) {
        inDegree[link.target]--;
        if (inDegree[link.target] === 0) {
          queue.push(graph.nodes.find(node => node.name === link.target));
        }
      }
    });
  }

  // 检查是否有环
  if (result.length !== graph.nodes.length) {
    // console.log(JSON.stringify(result, null, 2))
    const r1 = result.map(item => item.name);
    console.log(r1.length)
    console.log(r1)
    console.log(new Set(r1).length)
    console.log('================================')
    const r2 = graph.nodes.map(item => item.name);
    // console.log(JSON.stringify(graph.nodes, null, 2))
    console.log(r2.length)
    console.log(r2)
    console.log('================ 22222 ================')
    console.log(new Set(r2).size);

    const s1 = new Set(r1);
    
    r2.forEach(name => {
      s1.delete(name)
    })

    console.log(Array.from(s1));





    throw new Error('The graph contains a cycle!');
  }

  return result;
}


console.log(JSON.stringify(topologicalSort(data), null, 2));
