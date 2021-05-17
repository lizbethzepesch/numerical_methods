function toIncident(ribs, numNodes){
    let res = new Array()

    for(let i = 0; i < numNodes; i++)
        res[i] = new Array(ribs.length)


    for(let i = 0; i < numNodes; i++)
        for(let j = 0; j < ribs.length; j++)
            res[i][j] = 0

    for (let i = 1; i < numNodes + 1; i++)
        for (let j = 1; j < ribs.length + 1; j++)
                if (ribs[j - 1][0] == i)
                    res[i - 1][j - 1] = 1
                else if (ribs[j - 1][1] == i)
                    res[i - 1][j - 1] = -1
                else continue
    return res
}

function toAdjacencies(ribs, numNodes){
    let res = new Array(numNodes)
    
    for(let i = 0; i < numNodes; i++)
        res[i] = new Array(numNodes)
    
    for(let i = 1; i < res.length + 1; i++)
        for(let j = 1; j < res.length + 1; j++)
            for(let k = 0; k < ribs.length; k++){
                if(ribs[k][0] === i && ribs[k][1] === j) {
                res[i - 1][j - 1] = 1
                break
            }
                else res[i - 1][j - 1] = 0
                
            }
    return res
}

function degree(matrix){
    let res = new Array()

    for(let i = 0; i < matrix.length; i++)
        res[i] = [i + 1, 0]
    let count = 0
    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix.length; j++){
            
            if(matrix[i][j] === 1)
                count++ 
        }

        for(let j = 0; j < matrix.length; j++){
            if(matrix[j][i] === 1)
                count++ 
        }
        res[i][1] = count
        count = 0
    }
    
    return res
}

function form(matrix){
    let res = new Array()

    for(let i = 0; i < matrix.length; i++)
        res[i] = []

    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix.length; j++){
            
            if(matrix[i][j] === 1)
                res[i].push(j+1)
        }
    }
    return res
}

function pForm(matrix){
    let res = new Array()

    for(let i = 0; i < matrix.length; i++)
        res[i] = []

    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix.length; j++){
            
            if(matrix[j][i] === 1)
                res[i].push(j+1)
        }
    }
    return res
}

function toTable(matrix){
    let res = '<table>'

    for (let i = 0; i < matrix.length; i++){
        res += '<tr> ' 
        for(let j = 0; j < matrix.length; j++)
            res += '<td>' + matrix[i][j] + '</td>' 
        res += ' </tr>'
    }
    res += '</table>'
    return res
}

var ribs = new Array()
let numOfNodes = 6
ribs.push([1, 2])
ribs.push([2, 3])
ribs.push([3, 6])
ribs.push([1, 4])
ribs.push([4, 3])
ribs.push([3, 4])
ribs.push([4, 5])
ribs.push([6, 5])
ribs.push([2, 4])
ribs.push([5, 3])

document.querySelector('#adjacencies').innerHTML += toTable(toAdjacencies(ribs, numOfNodes))
document.querySelector('#incident').innerHTML += toTable(toIncident(ribs, numOfNodes))

document.querySelector('#degree').textContent += 'Степень вершин: ' 
for(let i = 0; i < numOfNodes; i++)
    document.querySelector('#degree').textContent += (i + 1) + ':'+ degree(toAdjacencies(ribs, numOfNodes))[i][1] + ', '

document.querySelector('#form').textContent += 'Образы: ' 
for(let i = 0; i < numOfNodes; i++)
    document.querySelector('#form').textContent += (i + 1) + ':(' + form(toAdjacencies(ribs, numOfNodes))[i] + '),'

document.querySelector('#pForm').textContent += 'Прообразы: ' 
for(let i = 0; i < numOfNodes; i++)
    document.querySelector('#pForm').textContent += (i + 1) + ':(' + pForm(toAdjacencies(ribs, numOfNodes))[i] + '),'
