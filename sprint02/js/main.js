var chart = null

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

function riemann_sum_left(a, b, n, func){
    let h = (b-a)/n
    let I = 0
    for(let i = a; i < b; i+=h)
        I += func(i)
    
    return I * h
}

function riemann_sum_right(a, b, n, func){
    let h = (b-a)/n
    let I = a
    for(let i = a + h; i <= b; i+=h)
        I += func(i)
    
    return I * h
}

function riemann_sum_center(a, b, n, func){
    let h = (b-a)/n
    let I = 0
    for(let i = a + h / 2; i < b; i+=h)
        I += func(i)
    
    return I * h
}

function trapezoid(a, b, n, func){
    let h = (b-a)/n
    let x1 = a
    let x2 = a + h
    let I = 0
    for(let i = 1; i <= n; i++){
        I += ((func(x1) + func(x2))/2) * h
        x1 = x2
        x2 += h
    }
    
    return I
}

function simpson(a, b, n, func){
    if (n % 2 !== 0) return 'n should be even'
    
    let h = (b - a) / n
    let I = func(a) + func(b)
    
    let mult = 4
    
    for (let i = a + h; i < b; i += h) {
        I += mult * func(i)
        mult = (mult === 4) ? 2 : 4
    }
    
    return I * (h / 3)
}

function input(){
   
    document.querySelector('.solving').style = 'display: unset; margin-top: 15px; text-align: center;'
    result(1)
}

function resultintgr(method){
    let func

    let a = parseFloat(document.querySelector("#a_integral").value)
    let b = parseFloat(document.querySelector("#b_integral").value)
    let n = parseInt(document.querySelector("#n_integral").value)

    switch(document.querySelector("#selectint").value){
        case "exp(-x)":
            func = f1
            break
        case "sin(x)":
            func = f2
            break
        case "x^2":
            func = f3
            break
        case "exp(-x^2)":
            func = f4
            break
        case "exp(-4x-x^3)":
            func = f5
            break
    }


    switch (method){
        case 1:
            document.getElementById("result1").textContent = "Riemann sum (left) = " + riemann_sum_left(a, b, n, func)
            break
        case 2:
            document.getElementById("result1").textContent = "Riemann sum (right) = " + riemann_sum_right(a, b, n, func)
            break
        case 3:
            document.getElementById("result1").textContent = "Riemann sum (center) = " + riemann_sum_center(a, b, n, func)
            break
        case 4:
            document.getElementById("result1").textContent = "Trapezoid = " + trapezoid(a, b, n, func)
            break
        case 5:
            document.getElementById("result1").textContent = "Simpson rule = " + simpson(a, b, n, func)
            break
    }
}

function euler(a, b, n, y0, func){
    
    res = []
    h = (b - a) / n
    let x = a
    let y = y0
    for(let i = 1; i < n + 1; i++){
        y = y + (h * func(x, y))
        x = a + (i * h)
        res.push(y)
    }
    return res
}

function Runge_Kutta2(a, b, n, y0, func){
    let res = []
    let h = (b - a) / n
    let x = a 
    let y = y0
    for(let i = 1; i < n + 1; i++){
        k1 = h * func(x, y)
        k2 = h * func(x + (h/2), y + (k1/2))
        y = y + k2
        x = a + (i * h)
        res.push(y)
    }
    return res
}

function Runge_Kutta3(a, b, n, y0, func){
    let res = []
    let h = (b - a) / n
    let x = a 
    let y = y0
    for(let i = 1; i < n + 1; i++){
        k1 = h * func(x, y)
        k2 = h * func(x + (h/2), y + (k1/2))
        k3 = h * func(x + h, y + (2 * k2) - k1)
        y = y + ((1/6) * (k1 + (4 * k2) + k3))
        x = a + (i * h)
        res.push(y)
    }
    return res
}

function Runge_Kutta4(a, b, n, y0, func){
    let res = []
    let h = (b - a) / n
    let x = a 
    let y = y0
    for(let i = 1; i < n + 1; i++){
        k1 = func(x, y)
        k2 = (func(x + (h/2), y + ((h * k1)/2)))
        k3 = (func(x + (h/2), y + ((h * k2)/2)))
        k4 = func(x + h, y + (h * k3))
        y = y + ((h/6) * (k1 + (2 * k2) + (2 * k3) + k4))
        x = a + (i * h)
        res.push(y)
    }
    return res
}

function arrToStr(arr){
    let str = '[' + arr[0] 

    for(let i = 1; i < arr.length; i++){
        str += ', '+ arr[i] 
    }
    return str + ']'
}

function drawAChart(id, arr, notfirst){
            
        if (chart && notfirst) {
            for(let i = 1; i < 5; i++)
                document.getElementById('chart' + i).innerHTML = "";
            chart.destroy()
        }
        

        if(chart && document.getElementById(id).innerHTML){
            document.getElementById(id).innerHTML = "";
            chart.destroy()
        }
        let label  = ''
        let color  = ''
        let xs = []
    
        
        switch(id){
            case 'chart1': label = "Euler"; color = 'rgb(30, 72, 163)'; break
            case 'chart2': label = "Runge-Kutta 2"; color = 'rgb(219, 94, 21)'; break
            case 'chart3': label = "Runge-Kutta 3"; color = 'rgb(219, 21, 186)'; break
            case 'chart4': label = "Runge-Kutta 4"; color = 'rgb(5, 238, 30)'; break
        }
        for(let i = 0; i < arr.length; i++){
            xs[i] = 'y(x'+ i+')'
        }
        chart = new Chart(document.getElementById(id).getContext('2d'), {
            type: 'line',
            responsive:false,
            maintainAspectRatio: false,
            data: {
                labels: xs,
                datasets: [{
                    label: label,
                    backgroundColor: color,
                    borderColor: 'rgb(0, 0, 0)',
                    data: arr
                }]
            }
        })
    

}
function resultdiff(method){
    let func
    let a = parseFloat(document.querySelector("#a_diff").value)
    let b = parseFloat(document.querySelector("#b_diff").value)
    let n = parseInt(document.querySelector("#n_diff").value)
    let y = parseFloat(document.querySelector("#y_zero").value)

    switch(document.querySelector("#selectdiff").value){
        case "y'=-xy":
            func = f6
            break
        case "y'=y+x":
            func = f7
            break
        case "y'=(3x-12x^2)y":
            func = f8
            break
        case "y'=(x^2-(2*y))":
            func = f9
            break
        case "y'=x^3+y":
            func = f10
            break
    }
  
    document.getElementById('chart' + method).style = 'display: unset'
    switch (method){
        case 1:
            document.getElementById("result2").textContent = "Euler = " + arrToStr(euler(a, b, n, y, func))
            drawAChart('chart1', euler(a, b, n, y, func), true)
            break
        case 2:
            document.getElementById("result2").textContent = "Runge-Kutta 2 = " + arrToStr(Runge_Kutta2(a, b, n, y, func))
            drawAChart('chart2', Runge_Kutta2(a, b, n, y, func), true)
            break
        case 3:
            document.getElementById("result2").textContent = "Runge-Kutta 3 = " + arrToStr(Runge_Kutta3(a, b, n, y, func))
            drawAChart('chart3', Runge_Kutta3(a, b, n, y, func), true)
            break
        case 4:
            document.getElementById("result2").textContent = "Runge-Kutta 4 = " + arrToStr(Runge_Kutta4(a, b, n, y, func))
            drawAChart('chart4', Runge_Kutta4(a, b, n, y, func), true)
            break
    }
    
}

// function resultdiffall(){
//     let func
//     switch(document.querySelector("#selectdiff").value){
//         case "y'=-xy":
//             func = f6
//             break
//         case "y'=y+x":
//             func = f7
//             break
//         case "y'=(3x-12x^2)y":
//             func = f8
//             break
//         case "y'=(x^2-(2*y))":
//             func = f9
//             break
//         case "y'=x^3+y":
//             func = f10
//             break
//     }
//     let text = document.getElementById("result2");
//     let a = parseFloat(document.querySelector("#a_diff").value)
//     let b = parseFloat(document.querySelector("#b_diff").value)
//     let n = parseInt(document.querySelector("#n_diff").value)
//     let y = parseFloat(document.querySelector("#y_zero").value)
//     let table = '<table>'

 
//         table += "<tr>" + "<td>" + "Euler = " + arrToStr(euler(a, b, n, y, func)) + "</td>" + "</tr>"
//         table += "<tr>" + "<td>" + "Runge-Kutta 2 = " + arrToStr(Runge_Kutta2(a, b, n, y, func)) + "</td>" + "</tr>"
//         table += "<tr>" + "<td>" + "Runge-Kutta 3 = " + arrToStr(Runge_Kutta3(a, b, n, y, func)) + "</td>" + "</tr>"
//         table += "<tr>" + "<td>" + "Runge-Kutta 4 = " + arrToStr(Runge_Kutta4(a, b, n, y, func)) + "</td>" + "</tr>"

//     text.innerHTML = table + '</table>'

//     drawAChart('chart1', euler(a, b, n, y, func), true, true)
//     drawAChart('chart2', Runge_Kutta2(a, b, n, y, func), false, true)
//     drawAChart('chart3', Runge_Kutta3(a, b, n, y, func), false, true)
//     drawAChart('chart4', Runge_Kutta4(a, b, n, y, func), false, true)
// }

function resultintgrall(){
    let func 
    switch(document.querySelector("#selectint").value){
        case "exp(-x)":
            func = f1
            break
        case "sin(x)":
            func = f2
            break
        case "x^2":
            func = f3
            break
        case "exp(-x^2)":
            func = f4
            break
        case "exp(-4x-x^3)":
            func = f5
            break
    }
    let text = document.getElementById("result1");
    let a = parseFloat(document.querySelector("#a_integral").value)
    let b = parseFloat(document.querySelector("#b_integral").value)
    let n = parseInt(document.querySelector("#n_integral").value)
    let table = '<table>'

   
        table += "<tr>" + "<td>" + "Riemann sum (left) = " + riemann_sum_left(a, b, n, func) + "</td>" + "</tr>"
        table += "<tr>" + "<td>" + "Riemann sum (right) = " + riemann_sum_right(a, b, n, func) + "</td>" + "</tr>"
        table += "<tr>" + "<td>" + "Riemann sum (center) = " + riemann_sum_center(a, b, n, func) + "</td>" + "</tr>"
        table += "<tr>" + "<td>" + "Trapezoid = " + trapezoid(a, b, n, func) + "</td>" + "</tr>"
        table += "<tr>" + "<td>" + "Simpson rule = " + simpson(a, b, n, func) + "</td>" + "</tr>"

    text.innerHTML = table + '</table>'

    
}
