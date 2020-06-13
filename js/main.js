function hello(param) {
    return "hello " + param;
}

helloarrow = param => "helloarrow " + param;

window.onclick = e => {
    console.log(e.target.id);
} 

function onclick(e) {
    return console.log(e.target.id);
}