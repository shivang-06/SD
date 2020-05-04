let root = {
    data: "d10",
    children: [
        {
            data: "d20",
            children: [
                { data: "d50", children: [] },
                { data: "d60", children: [] }
            ]
        },
        {
            data: "d30",
            children: [
                {
                    data: "d70",
                    children: []
                }
            ]
        },
        {
            data: "d40",
            children: [
                {
                    data: "d80",
                    children: []
                }, {
                    data: "d90",
                    children: []
                }
            ]
        }
    ]
}

function viewGtre(node) {
    let meNmyfamily = node.data + "=>"
    for (let i = 0; i < node.children.length; i++) {
        let child = node.children[i];
        meNmyfamily = meNmyfamily + child.data + ", "
    }
    console.log(meNmyfamily);

    //children order
    for (let i = 0; i < node.children.length; i++) {
        let child = node.children[i];
        viewGtre(child);
    }
}


viewGtre(root);