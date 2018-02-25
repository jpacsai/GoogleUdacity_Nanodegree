// Programming Quiz - Navigating the Food Chain (3-8)

/*
Write a series of ternary statements that sets the variable category equal to:

"herbivore" if an animal eats plants
"carnivore" if an animal eats animals
"omnivore" if an animal eats plants and animals
undefined if an animal doesn't eat plants or animals
Use the eatsPlants and eatsAnimals variables to test your code.

*/

//Notes
//   - use the variables `eatsPlants` and `eatsAnimals` in your ternary expressions
//   - `if` statements aren't allowed ;-)

// change the values of `eatsPlants` and `eatsAnimals` to test your code

var eatsPlants = false;
var eatsAnimals = false;

var category = eatsPlants && eatsAnimals ? ("omnivore") : 
    (eatsPlants ? ("herbivore") : 
    (eatsAnimals ? ("carnivore") : ("")));

console.log(category);
console.log("Hello world!");


