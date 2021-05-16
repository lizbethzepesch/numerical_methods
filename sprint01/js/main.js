function checking_roots (a, b, X){
    for(let i = 0; i < b.length; i++){
        let res = 0
        for(let j = 0; j < b.length; j++){
            res += a[i][j] * X[j]
        }
        if(Math.round(res) !== b[i]) return false
    }
    return true
}

function invertibleMatrix (mat){
    return math.det(mat) === 0 ? false : true;
}

function drawMatrix(){
    let text = document.getElementById("matrix");
    let matr = '<table>'

    for(let i = 0; i < matrixB.length; i++){
        matr += "<tr>" +"<td>" + '|' + "</td>" 
        for(let j = 0; j < matrixB.length; j++)
            matr += "<td>" +  matrixA[i][j] + "</td>"
        matr +=  "<td>" + '|' + "</td>" + "<td>" + '|' + "</td>" + "<td>" + matrixB[i]+ "</td>"+ "<td>" + '|' + "</td>" +  "</tr>"
    }
    text.innerHTML = matr + '</table>'
    document.querySelector("#matrix").style = " display:flex; justify-content:center;"
}


function createCopy(A) {
    let copy = []
    for (const arr of A) 
        copy.push([...arr])
    
    return copy
}

function copyArr(arr) {
    let copy = []
    copy.push([...arr])
    return copy
}

function cramersRule (a, B){
    if(!invertibleMatrix(a)) return null
    let X = []
    
    for(let i in B){
        let A = createCopy(a)
        for(let k = 0; k < B.length; k++)
            A[k][i] = B[k]
        X[i] = math.det(A)/math.det(a)
    }

    
    let res = ''
    for (let i = 0; i< B.length; i++)
        res += 'x' + i + ' = ' + X[i] + " "
    
    document.querySelector('.result').textContent = 'Result:    ' + res
    document.querySelector('.checkingroots').textContent = 'Checking roots:    ' + checking_roots (a, B, X)

    return X
}

function array_fill(i, n, v) {
    let a = [];
    for (; i < n; i++) {
        a.push(v);
    }
    return a;
}

function gaussMethod(a, b) {
    let A = createCopy(a)
    let i, k, j;

    for (i=0; i < A.length; i++) 
        A[i].push(b[i]);
    
    let n = A.length;

    for (i=0; i < n; i++) { 
        let maxEl = Math.abs(A[i][i]),
            maxRow = i;
        for (k=i+1; k < n; k++) { 
            if (Math.abs(A[k][i]) > maxEl) {
                maxEl = Math.abs(A[k][i]);
                maxRow = k;
            }
        }

        for (k=i; k < n+1; k++) { 
            let tmp = A[maxRow][k];
            A[maxRow][k] = A[i][k];
            A[i][k] = tmp;
        }
        for (k=i+1; k < n; k++) { 
            let c = -A[k][i]/A[i][i];
            for (j=i; j < n+1; j++) { 
                if (i===j) {
                    A[k][j] = 0;
                } else {
                    A[k][j] += c * A[i][j];
                }
            }
        }
    }
    b = array_fill(0, n, 0);
    for (i=n-1; i > -1; i--) { 
        b[i] = A[i][n]/A[i][i];
        for (k=i-1; k > -1; k--) { 
            A[k][n] -= A[k][i] * b[i];
        }
    }


    let res = ''
    for (let i = 0; i< b.length; i++)
        res += 'x' + i + ' = ' + b[i] + " "

    
    document.querySelector('.result').textContent = 'Result:    ' + res   
    document.querySelector('.checkingroots').textContent = 'Checking roots:    ' + checking_roots (a, matrixB, b)
    return b;

}

function seidel(a, b){
    let A = createCopy(a)

    let x = []
    for (let i = 0; i< A.length; i++)
	    x[i] = 0;
	let converge = false
	let pogr = 0
    let x_new
	while (!converge) {
        pogr = 0
	    x_new = copyArr(x)
	    for (let i = 0; i < A.length; i++){
            let s1 = 0
            for (let j = 0; j < i; j++)
	            s1 +=A[i][j] * x_new[j]
            
            let s2 = 0
            for (let j = i + 1; j < A.length; j++)
	            s2 += A[i][j] * x[j]

	        x_new[i] = (b[i] - s1 - s2) / A[i][i]
        }

        for(let i = 0; i < A.length; i++){
	        pogr += Math.abs(x_new[i] - x[i])
        }
      
	    converge = pogr < 0.0001
	    x = x_new
    }
    
    let res = ''
    for (let i = 0; i< b.length; i++)
        res += 'x' + i + ' = ' + x[i] + " "
    
    
    document.querySelector('.result').textContent = 'Result:    ' + res    
    document.querySelector('.checkingroots').textContent = 'Checking roots:    ' + checking_roots (a, b, x)

	return x
}

var matrixA = new Array()
var matrixB = []


function gaussJordan(a, b) {
    let A = createCopy(a)
    let i, k, j;

    for (i=0; i < A.length; i++) 
        A[i].push(b[i]);
    
    let n = A.length;


    for (i=0; i < n; i++) { 
        let maxEl = Math.abs(A[i][i]),
            maxRow = i;
        for (k=i+1; k < n; k++) { 
            if (Math.abs(A[k][i]) > maxEl) {
                maxEl = Math.abs(A[k][i]);
                maxRow = k;
            }
        }


        for (k=i; k < n+1; k++) { 
            let tmp = A[maxRow][k];
            A[maxRow][k] = A[i][k];
            A[i][k] = tmp;
        }
        for (k=i+1; k < n; k++) { 
            let c = -A[k][i]/A[i][i];
            for (j=i; j < n+1; j++) { 
                if (i===j) {
                    A[k][j] = 0;
                } else {
                    A[k][j] += c * A[i][j];
                }
            }
        }
    }
    
    for(let i = 0; i < n; i++){
        let divider = A[i][i]
        for(let j = 0; j < n + 1; j++)
            A[i][j] = A[i][j] / divider
        
    }
    for (let a = n - 1; a > 0; a--)
        for (let i = 0; i < a; i++) {
            let k = A[i][a]
            for (let j = 0; j <= n; j++)
                A[i][j] = A[i][j] - k * A[a][j]
    }
    
    b = array_fill(0, n, 0);
    for (i=n-1; i > -1; i--) { 
        b[i] = A[i][n]/A[i][i];
        for (k=i-1; k > -1; k--) { 
            A[k][n] -= A[k][i] * b[i];
        }
    }

     
    let res = ''
    for (let i = 0; i< b.length; i++)
        res += 'x' + i + ' = ' + b[i] + " "
    
    document.querySelector('.result').textContent = 'Result:    ' + res   
    document.querySelector('.checkingroots').textContent = 'Checking roots:    ' + checking_roots (a, matrixB, b)
     return b;
}

function check_diag(A) {
    for (let i = 0; i < A.length; i++) {
        let sum = 0
        for (let j = 0; j < A.length; j++) {
            if (i === j) continue
            sum += A[i][j]
        }
        if (Math.abs(A[i][i]) < Math.abs(sum))
            return false
    }
    return true
}

function evalSolving(row, number, x) {
    let res = 0
    for (let i = 0; i < row.length - 1; i++) {
        if (i == number) res += row[i]
        else res += row[i] * x[i] * (-1)
    }
    res = res / row[row.length - 1]
    return res
}

function checking(e) {
    for (let i = 0; i < e.length; i++)
        if (e[i] <= 0.000001)
            return false
    return true
}

function jacobi(a, b) {
    if (check_diag(a) === false) 
        return null
    
    if (!invertibleMatrix(a)) 
        return null
    
    A = createCopy(a)
    let n = A.length
    let x_tmp = []
    let x = []
    let e = []

    for (let i = 0; i < n; i++) {
        x[i] = 0
        x_tmp[i] = 0
        b[i] = +b[i]
    }
    for (let i = 0; i < n; i++) 
        A[i].push(b[i])
    
    for (let i = 0; i < n; i++) {
        let temp = A[i][i]
        A[i][i] = A[i][n]
        A[i][n] = temp
    }

    A = createCopy(A)

    do {
        for (let i = 0; i < n; i++) {
            x[i] = evalSolving(A[i], i, x_tmp)
            e[i] = Math.abs(x_tmp[i] - x[i])
            if (!isFinite(x[i])) {
                return false
            }
        }
        for (let i = 0; i < n; i++)
            x_tmp[i] = x[i]
    } while(checking(e))

     
    let res = ''
    for (let i = 0; i< b.length; i++)
        res += 'x' + i + ' = ' + x[i] + " "
    
    document.querySelector('.result').textContent = 'Result:    ' + res   
    document.querySelector('.checkingroots').textContent = 'Checking roots:    ' + checking_roots (a, b, x)

    return x
       
}

function fileInput(){
    document.querySelector(".fileInput").style = "display: unset; text-align: center;"
    document.querySelector(".keybInput").style = "display: none;"
    document.querySelector("#solveSole").style = "display: none;"
    document.querySelector(".result").style = "display: none;"
    document.querySelector(".solving").style = "display: none;"
    document.querySelector("#matrix").style = "display: none;"
    document.querySelector("#solveSoleKeyb").style = "display: none;"
    document.querySelector(".checkingroots").style = "display: none;"
}

function keybInput(){
    document.querySelector(".keybInput").style = "display: unset; text-align: center;"
    document.querySelector(".fileInput").style = "display: none;"
    document.querySelector("#solveSoleKeyb").style = "display: unset;"
    document.querySelector(".result").style = "display: none;"
    document.querySelector(".solving").style = "display: none;"
    document.querySelector("#matrix").style = "display: none;"
    document.querySelector("#solveSole").style = "display: none;"
    document.querySelector(".checkingroots").style = "display: none;"

}

function matrixFromKeyb(){
    matrixA = []
    matrixB = []
    let m = document.querySelector('.input').value.split(" ")
        let n = m[0];

        for (let i = 0; i < n; i++)
            matrixA[i] = new Array();

        let k = 1
        for(let i = 0; i < n; i++)
            for(let j = 0; j < n; j++, k++)
                matrixA[i][j] = parseFloat(m[k])
        
        for(let i = 0; i < n; k++, i++)
            matrixB[i] = parseFloat(m[k])

        drawMatrix()
        

        for (let i of matrixA)
            if(i === undefined){
                alert("Invalid input")
                return
            }

        for (let i of matrixB)
            if(i === undefined){
                alert("Invalid input")
                return
            }

        if (n === undefined){
            alert("Invalid input")
            return
        }

        if (!matrixB.length || !matrixA.length){
            alert("Invalid input")
            return
        }
        document.querySelector('.solving').style = 'display: unset; margin-top: 15px; text-align: center;'
        result(1)
}

function readFile(input) {
    let file = input.files[0];
  
    let reader = new FileReader();
  
    reader.readAsText(file);
  
    reader.onload = function() {
        matrixA = []
        matrixB = []
        let m = reader.result.split(" ")
        let n = m[0];


        for (let i = 0; i < n; i++)
            matrixA[i] = new Array();

        let k = 1
        for(let i = 0; i < n; i++)
            for(let j = 0; j < n; j++, k++)
                matrixA[i][j] = parseFloat(m[k])
        
        for(let i = 0; i < n; k++, i++)
            matrixB[i] = parseFloat(m[k])

        drawMatrix()

        for (let i of matrixA)
            if(i === undefined){
                alert("Invalid input")
                return
            }

        for (let i of matrixB)
            if(i === undefined){
                alert("Invalid input")
                return
            }

        if (n === undefined){
            alert("Invalid input")
            return
        }
        document.querySelector("#solveSole").style = "display: unset;"
        result(1)

    };
  
    reader.onerror = function() {
      console.log(reader.error);
    };
}

function result(method){

    switch (method){
        case 1:
            cramersRule(matrixA, matrixB)
            break
        case 2:
            jacobi(matrixA, matrixB)
            break

        case 3:
            gaussMethod(matrixA, matrixB)
            break

        case 4:
            seidel(matrixA, matrixB)
            break

        case 5:
            gaussJordan(matrixA, matrixB)
            break
    }
}

