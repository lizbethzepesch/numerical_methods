var A = []
var B = []

function createCopy(A) {
    let copy = []
    for (const arr of A) 
        copy.push([...arr])
    
    return copy
}

function check(a, b){
    A = []
    B = []
    for (let i = 0; i < a.length; i++)
        if (!a.includes(i))
            A.push(i.toUpperCase())
    for (let i = 0; i < b.length; i++)
        if (!b.includes(i))
            B.push(i.toUpperCase())
}