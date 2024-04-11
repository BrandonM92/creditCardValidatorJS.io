/*Code by Brandon Mathews Assignment derived from CodeAcademy FrontEnd Course */

// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4] //invalid
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9] //valid
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3] //invalid
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3] //invalid
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3] //valid

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]




// This takes the arrays above and runs different checks for validity as well as reorganize all the arrays above that were collected in the const batch variable and
// placed into a new variable that only holds arrays with invalid numbers. 

function validateCred(array){
    let total = array[array.length-1]; // this extracts the payload ex valid1 payload is '8'
    //console.log(`check digit ${total}`)
    let count = 0;
    for (let i = array.length -2; i >= 0; i--){ 
    // this iterates through the array and if the "count" is an even number or multiple of 2 in this case, it will be doubled and then added to total
        if (count % 2 === 0){
            if (array[i] * 2 > 9){ //if the doubled number is over 9 then we subtract 9 from that amount before adding to total
                total += array[i] * 2 - 9;
            }
            else{
                total += array[i] * 2; // if the doubled number isn't over 9 we add the doubled number to total
            }
            count++; // running count 
        }else if (count % 2 !== 0){
            total += array[i]; // if count isn't an even number or multiple of 2, then we just add the amount itself to the total
            count++;
        }
    }
    // If the total mod 10 with nothing remaining, it's valid, fallelse it will return invalid. ex. 120 % 10 = 12 (No Remainder) == Valid.
    if (total % 10 === 0){ 
        return 'valid';
    }else{
        return 'invalid'
    }
}

/*This function will go through the batch array and run the validateCred function for every array above. All arrays that are deemed invalid will be added to 
new array and returned as a variable*/
function findInvalidCards(array){
    let invalidCards =[]
    for(let i=0; i < array.length;i++){
        let newArray = array[i];
        if (validateCred(newArray) !== 'valid'){
            invalidCards.push(newArray);
        } 
        
    }
    return invalidCards;
}



/* This function will iterate through the array we created from findInvalidCards function and check each array's first digit. If the digit is a 3,4,5,6 it will add
a specific company name to a new array titled CompanyList but is also coded to not have duplicates
 */
function idInvalidCompanies(array){
    let companyList =[]
    for(let i= 0; i< array.length;i++){
        let firstDigit = array[i][0];
        if (firstDigit >= 3 && firstDigit <= 6){
            if (firstDigit === 3 && !companyList.includes('Amex(American Express)')){
                companyList.push('Amex(American Express)');
            }else if(firstDigit === 4 && !companyList.includes('Visa')){
                companyList.push('Visa');
            }else if (firstDigit === 5 && !companyList.includes('MasterCard')){
                companyList.push('MasterCard');
            } else if (firstDigit === 6 && !companyList.includes('Discover')){
                companyList.push('Discover');
            }
        }

    }
    return companyList
}

/* Validation Main Loop */
console.log("This is to show the results for the Validation Main Loop")
console.log(validateCred(valid1)) // output valid
console.log(validateCred(invalid1)) // output invalid
invalidCardArray = findInvalidCards(batch) //create a variable to hold an array of invalid credit card numbers from above
console.log(idInvalidCompanies(invalidCardArray)) // creates an array of company names derived from invalid credit card numbers


// Bonus Challenge : Create a Random Card Generator and Do the same checks for validity and which company issued the card number.
function randomCreditCardGenerator(){
    let randomCreditCard = [Math.floor(Math.random() *4) + 3]
    for(let i = 1; i < 16; i++){
        let randomNumber = Math.floor(Math.random() * 9)
        randomCreditCard.push(randomNumber);
    }
    return randomCreditCard;
}


function checkRandomInvalidCompanies(array){
    let firstDigit = array[0];    
    if (firstDigit === 3){
        return 'Amex(American Express)';
    }else if(firstDigit === 4){
        return ('Visa');
    }else if (firstDigit === 5){
        return 'MasterCard';
    } else if (firstDigit === 6){
        return 'Discover';
    }
}



// ~~~~~~~~Random Card Main Loop~~~~~~~~~~~
console.log("This is to show the results from the Random Card Generator Main Loop ")
randomCreditCard = randomCreditCardGenerator();
console.log(randomCreditCard)
console.log(validateCred(randomCreditCard))
console.log(checkRandomInvalidCompanies(randomCreditCard))

