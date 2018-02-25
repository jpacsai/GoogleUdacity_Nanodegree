// Programming Quiz - Checking Your Balance (3-5)

/*
Using the flowchart below, write the code to represent checking 
your balance at the ATM. The yellow diamonds represent conditional 
statements and the blue rectangles with rounded corners represent 
what should be printed to the console.

(flowchart)

Use the following variables in your solution:

balance - the account balance
isActive - if account is active
checkBalance - if you want to check balance

*/

// change the values of `balance`, `checkBalance`, and `isActive` to test your code

var balance = 325.00;
var checkBalance = false;
var isActive = true;

if (checkBalance === true) {
        if (isActive === true && balance > 0) {
            console.log("Your balance is $" + balance + ".");
        } else {
            if (isActive === false ) {
                console.log("Your account is no longer active."); 
            } else {
                if(balance === 0) {
                    console.log("Your account is empty."); 
                } else { console.log("Your balance is negative. Please contact bank.");
                }
            } 
        }
} else { console.log("Thank you. Have a nice day!");
}

