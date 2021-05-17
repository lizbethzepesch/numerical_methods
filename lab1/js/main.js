function symmetric_difference(matrixA, matrixB){
    let res = []
    matrixA.filter((value, index, arr) => arr.indexOf(value) === index)
    matrixB.filter((value, index, arr) => arr.indexOf(value) === index)
    matrixA.sort()
    matrixB.sort()
    
    let i = 0
    let k = 0
    let j = 0

    while ((i < matrixA.length) && (j < matrixB.length)) { 
        if (matrixA[i] < matrixB[j]) { 
            res[k] = matrixA[i]
            k++
            i++
        } 
        else if (matrixA[i] > matrixB[j]) {
            res[k] = matrixB[j]
            k++
            j++
        } 
        else {
            i++
            j++
        }
    }
    
    for (; i < matrixA.length; k++, i++)  
        res[k] = matrixA[i]

    for (; j < matrixB.length; k++, j++) 
        res[k] = matrixB[j]

    return res
}

function difference(matrixA, matrixB){
    let res = []
    matrixA.filter((value, index, arr) => arr.indexOf(value) === index)
    matrixB.filter((value, index, arr) => arr.indexOf(value) === index)
    matrixA.sort()
    matrixB.sort()
    
    let i = 0
    let k = 0

	for (let j = 0; i < matrixA.length && j < matrixB.length; ) {
		if (matrixA[i] == matrixB[j]) { 
			i++
            j++
		} 
        else {
			if (matrixA[i] < matrixB[j]) {
				res[k] = matrixA[i]
				k++
				i++
			} 
            else j++
		}
	}

	for (; i < matrixA.length; k++, i++) 
		res[k] = matrixA[i]
		
	
    return res;
}

function intersection(matrixA, matrixB){
    let res = []
    matrixA.filter((value, index, arr) => arr.indexOf(value) === index)
    matrixB.filter((value, index, arr) => arr.indexOf(value) === index)
    matrixA.sort()
    matrixB.sort()

    for (let i = 0, k = 0, j = 0; i < matrixA.length && j < matrixB.length; ) 
		if (matrixA[i] == matrixB[j]) { 
			res[k] = matrixA[i];
			k++, i++, j++
		} 
        else 
			if (matrixA[i] < matrixB[j]) i++
            else j++
	
    return res;
}

function fixInput(set){
    let res = []
    for (let i = 0; i < set.length; i++)
        if(!res.includes(set[i].toUpperCase()) && set[i].length === 1 && set[i].match(/[matrixA-z]/i))
            res.push(set[i].toUpperCase())
    return res
}

function entry(matrixA, matrixB){
    for (let i = 0; i < matrixA.length; i++)
       if (!matrixB.includes(matrixA[i])){
           console.log(matrixA[i])
           return 'False'
        }

    return 'True'
}

function union(matrixA, matrixB){
    let res = []
    for (let i = 0; i < matrixA.length; i++)
        res.push(matrixA[i])

    for (let i = 0; i < matrixB.length; i++)
        if (!res.includes(matrixB[i]))
            res.push(matrixB[i])
    return res
}

function toRes(arr){
    let res = '[' 
    res += arr[0] 
    for(let i = 1; i < arr.length; i++)
        res += ', ' + arr[i]
    
    return res + ']'
}

function solve(){
    let matrixA = fixInput(document.querySelector('.A').value.split(" "))
    document.querySelector('.mA').innerHTML = 'A:' + toRes(matrixA)
    let matrixB = fixInput(document.querySelector('.B').value.split(" "))
    document.querySelector('.mB').innerHTML = 'B:' + toRes(matrixB)


    switch(document.querySelector("#select").value){
        case "union":
            document.querySelector('.res').textContent = toRes(union(matrixA, matrixB))
            break
        case "entry":
            document.querySelector('.res').textContent = entry(matrixA, matrixB)
            break
        case "symmetric difference":
            document.querySelector('.res').textContent = toRes(symmetric_difference(matrixA, matrixB))
            break
        case "difference":
            document.querySelector('.res').textContent = toRes(difference(matrixA, matrixB))
            break
        case "intersection":
            document.querySelector('.res').textContent = toRes(intersection(matrixA, matrixB))
            break
    }

    document.querySelector('#result').style.display = 'unset'
}
// F G J Q
// L F H J I O P E