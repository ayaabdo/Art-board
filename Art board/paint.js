var pen = document.getElementById("pen");
var line = document.getElementById("line");
var rec = document.getElementById("rec");
var circle = document.getElementById("circle");
var eraser = document.getElementById("eraser");

var canvas = document.getElementById('convas');
var context = canvas.getContext("2d");

var flag = "",prevX = 0,currX = 0,prevY = 0,currY = 0,dot_flag = false;
var fillStyle = document.getElementById("fill");
var strokeStyle = document.getElementById("stroke");
context.strokeStyle = "black";
context.fillStyle = "black";

w = canvas.width;
h = canvas.height;

fillStyle.addEventListener("input", function() { 
    context.fillStyle = fillStyle.value;
 }, false);

 strokeStyle.addEventListener("input", function() { 
    context.strokeStyle = strokeStyle.value;
 }, false);

function convasEvents(){
    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}

pen.addEventListener("click",()=>{
    flag = "free";
    convasEvents();
});
line.addEventListener("click",()=>{
    flag = "line";
    convasEvents();
});
rec.addEventListener("click",()=>{
    flag = "rec";
    convasEvents();
});
circle.addEventListener("click",()=>{
    flag = "circle";
    convasEvents();
});
eraser.addEventListener("click",()=>{
    flag = "erase";
    convasEvents();
});

function freeHand(x1,y1,x2,y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    
    context.lineWidth = 1;
    context.stroke();
    context.closePath();
}

function drawLine(x1,y1,x2,y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    
    context.lineWidth = 1;
    context.stroke();
    context.closePath();
}
function drawRec(x1,y1,x2,y2) {
    context.beginPath();
    context.fillRect(x1, y1, x2, y2);
    context.stroke();
    context.closePath();
}
function drawCircle(x,y,rad)
{
    context.beginPath(); 
    context.arc(x,y, rad,0,2*Math.PI); 
    context.stroke(); 
}

function erase(x1,y1,x2,y2) {
    context.clearRect(x1, y1, x2, y2);
}

function findxy(type, e) {
    if(type == "down"){
        prevX = e.offsetX;
        prevY = e.offsetY;
    }
    if(type == "up"){
        currX = e.offsetX;
        currY = e.offsetY;

        if(flag == "line")
        {
            drawLine(prevX,prevY,currX,currY);
        }
        if(flag == "rec")
        {
            drawRec(prevX,prevY,currX,currY);
        }
        if(flag == "circle")
        {
            let y = Math.pow(Math.max(prevY,currY)-Math.min(prevY,currY),2);
            let x = Math.pow(Math.max(prevX,currX)-Math.min(prevX,currX),2);
            drawCircle(prevX,prevY,Math.sqrt(x+y));
        }
    }
    if(type == "move")
    {
        if(flag == "erase")
        {
            erase(prevX,prevY,currX,currY);
        }
        if(flag == "free")
        {
            freeHand(prevX,prevY,currX,currY);
        }
    }
   
}

