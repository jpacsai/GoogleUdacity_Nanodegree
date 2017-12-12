// Programming Quiz: I Got Bills (6-9)

/*
Use the map() method to take the array of bill amounts shown below, and create a second array of numbers 
called totals that shows the bill amounts with a 15% tip added.

Things to note:
- each entry in the totals array must be a number
- each number must have an accuracy of two decimal points

*/

var bills = [50.23, 19.12, 34.01,
    100.11, 12.15, 9.90, 29.11, 12.99,
    10.00, 99.22, 102.20, 100.10, 6.77, 2.22
];



var totals = bills.map(function (element, index, array) {
    element *= 1.15;
    return Number(element.toFixed(2));
});

console.log(totals);