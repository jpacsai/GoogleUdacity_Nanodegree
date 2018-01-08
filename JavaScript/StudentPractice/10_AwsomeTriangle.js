/*
You are a graphic designer and you always feel upset of how many triangles you create in the project 
you work on, so you got an idea :thinking: to write a javascript function that every time you call it, 
generates 3 values represent the angles of this triangle, but you do not need any of these angels to be 
less than 30 degrees, your function should return every time 3 random values represent the angles, 
and of course you need sum of them to be 180 every time

Example

triangle(); // 60,40,80

*/

function triangle(){
    var a = Math.floor(Math.random() * (120 - 30 + 1)) + 30;  
    var b = Math.floor(Math.random() * ((150-a) - 30 + 1)) + 30;
    return [a,b,180-a-b];
}