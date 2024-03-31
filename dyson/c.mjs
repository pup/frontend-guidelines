import data from './data.mjs';

function dfs(graph, source, targets) {
    for (const link of graph.links) {
        if (link.source === source) {
            targets.push(link.target)
            // const source = link.target;
            // dfs(graph, source, targets);
        }
    }
}

function findTargets(graph) {
    const finalTargets = graph.nodes.filter(node => node.finalTarget).map(node => node.name);
    const allTargets = {};
    for (const source of finalTargets) {
        const targets = [];
        dfs(graph, source, targets);

        targets.forEach(t => {
            if (allTargets[t]) {
                allTargets[t] = allTargets[t] + 1;
            } else {
                allTargets[t] = 1;
            }
        });
    }

    return allTargets;
}


const targets =  findTargets(data);

console.log(JSON.stringify(targets, null, 2))