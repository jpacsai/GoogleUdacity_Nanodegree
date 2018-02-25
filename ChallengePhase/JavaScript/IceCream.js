// Programming Quiz: Ice Cream (3-6)

/*
Using logical operators, write a series of complex logical expressions that prints only if the following conditions are true:

if flavor is set to vanilla or chocolate and
if vessel is set to cone or bowl and
if toppings is set to sprinkles or peanuts
If the above conditions are true, then print out:

I'd like two scoops of __________ ice cream in a __________ with __________.

*/

// change the values of `flavor`, `vessel`, and `toppings` to test your code

var flavor = "vanilla";
var vessel = "bowl";
var toppings = "peanuts";

if ((flavor === "vanilla" || flavor === "chocolate") && 
    (vessel === "cone" || vessel === "bowl") && 
    (toppings === "sprinkles" || toppings === "peanuts")) {
        console.log("I'd like two scoops of " + flavor + " ice cream in a " + vessel + " with " + toppings + " .");
}