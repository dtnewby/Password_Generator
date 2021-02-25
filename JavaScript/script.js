// Constants
const YES = "Y";
const NO = "N";

// Assignment Code
var generateBtn = document.querySelector("#generate");

/* This function determines if its parameter, userInput, is either null or the empty string.
It returns true if userInput is null or the empty string.  
It returns false if userInput is not null or the empty string.*/
function isNullOrEmptyString(userInput)
{  
  if (userInput === null || userInput.length === 0)
  {
    return true;
  }
  else
  {
    return false;
  }
}

/* This function determines if its parameter, userInput, is Y or N.  It assumes its parameter is not null.
It returns false if its parameter is not Y or N (case-sensitive).
Otherwise, it returns true. */
function didUserEnterYorN(userInput)
{
  if (userInput !== YES && userInput !== NO)
  {
    return false;
  }
  else
  {
    return true;
  }
}

/* This function determines if its parameter is null, the empty string, Y, or N.
It returns true if the parameter is Y or N.
Otherwise, it returns false. */
function userPasswordQuestionResponseValid(userAnswerToQuestionAboutPswd)
{
  // Verify that the user entered something.
  if (isNullOrEmptyString(userAnswerToQuestionAboutPswd))
  {
    return false;
  }

  // Verify what the user entered is either a Y or a N.
  var capitalizedUserAnswerToQuestionAboutPswd = userAnswerToQuestionAboutPswd.toUpperCase();
  
  if (!didUserEnterYorN(capitalizedUserAnswerToQuestionAboutPswd))
  {
    return false;
  }
  else 
  {
    return true;
  }
}

/* This function determines if its parameter, userInputOfYOrN, is Y or N.
It returns true if its parameter is Y, N, y, or n.
Otherwise, it returns false. */
function isYes(userInputOfYOrN)
{
  if (userInputOfYOrN === null)
  {
    return false;
  }

  var capitalizedUserInputOfYOrN = userInputOfYOrN.toUpperCase();
  if (capitalizedUserInputOfYOrN === YES)
  {
    return true;
  }
  else
  {
    return false;
  }
}

/* This function generates a random password using criteria that the user enters.  The criteria include whether or not the password
should include lowercase letters, uppercase letters, numbers, and/or symbols (from the OWASP-approved list of symbols).
The password generated is returned as a String.*/
function generatePassword()
{
  // Default the generated password to the Empty String.  This will be used as a return value when the user enters invalid data.
  var generatedPswd = "";
  
  // Prompt user to enter a password length between 7 and 129 characters.
  var pswdLength = prompt("Please enter the desired length of your password.  The length should be at least 8 characters long and no more than 128 characters long.");

  // Verify that the user entered something.
  if (isNullOrEmptyString(pswdLength))
  {
    alert("Please enter a password length.");
    return generatedPswd;
  }

  // Verify that the length the user entered is a number.
  var pswdLengthNbr = parseInt(pswdLength);
  if (isNaN(pswdLengthNbr))
  {
    alert("Please enter a numeric password length.");
    return generatedPswd;
  }
  // Verify that the password length the user entered is between 7 and 129.
  else if (pswdLengthNbr < 8)
  {
    alert ("The password length entered is not at least 8.");
    return generatedPswd;
  }
  else if (pswdLengthNbr > 128)
  {
    alert("The password length entered is over 128.");
    return generatedPswd;
  }

  // Ask the user if the password to be generated should contain lowercase letters.
  var shouldContainLowercaseLetters = prompt("Should the password contain lowercase letters?  Please answer with a Y or a N.");
  
  if (!userPasswordQuestionResponseValid(shouldContainLowercaseLetters))
  {
    alert("Please answer the question, should the password contain lowercase letters, with a Y or a N");
    return generatedPswd;
  }

  // Ask the user if the password to be generated should contain uppercase letters.
  var shouldContainUppercaseLetters = prompt("Should the password contain uppercase letters?  Please answer with a Y or a N.");

  // Validate what the user entered.
  if (!userPasswordQuestionResponseValid(shouldContainUppercaseLetters))
  {
    alert("Please answer the question, should the password contain uppercase letters, with a Y or a N.");
    return generatedPswd;
  }

  // Ask the user if the password to be generated should contain numbers.
  var shouldContainNumbers = prompt("Should the password contain numbers?  Please answer with a Y or a N.");

  // Validate what the user entered.
  if (!userPasswordQuestionResponseValid(shouldContainNumbers))
  {
    alert("Please answer the question, should the password contain numbers, with a Y or a N.");
    return generatedPswd;
  }

  // Ask the user if the password to be generated should contain symbols.
  var shouldContainSymbols = prompt("Should the password contain symbols from the approved list?  Answer with a Y or N.");

  // Validate what the user entered.
  if (!userPasswordQuestionResponseValid(shouldContainSymbols))
  {
    alert("Please answer the question, should the password contain symbols from the approved list, with a Y or a N.");
    return generatedPswd;
  }

  // Verify that the user answered Y to at least one of the 4 data criteria. 
  if (shouldContainLowercaseLetters === NO 
        && shouldContainUppercaseLetters === NO
        && shouldContainNumbers === NO
        && shouldContainSymbols === NO)
  {
    alert("Please answer, Y, to at least one of the questions about lowercase letters, uppercase letters, numbers, or symbols.");
    return generatedPswd;
  }

  // Assemble list of characters that the password can be comprised of.
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}";

  var charactersToGeneratePswdFrom = "";
  if (isYes(shouldContainLowercaseLetters))
  {
    charactersToGeneratePswdFrom += lowerCase;
  }

  if (isYes(shouldContainUppercaseLetters))
  {
    charactersToGeneratePswdFrom += upperCase;
  }

  if (isYes(shouldContainNumbers))
  {
    charactersToGeneratePswdFrom += numbers;
  }

  if (isYes(shouldContainSymbols))
  {
    charactersToGeneratePswdFrom += symbols;
  }
    
  var randomCharacterIndex = 0;
  for (var i = 0; i < pswdLengthNbr; i++)
  {
    // Use floor() and random() methods of Math class to generate a random number.
    randomCharacterIndex = Math.floor((Math.random() * charactersToGeneratePswdFrom.length));
    
    // Add the charater at the random character index to the generated password.
    generatedPswd += charactersToGeneratePswdFrom.charAt(randomCharacterIndex);

    // Repeat this process until it reaches the password length that the user entered.
  }

  // Return generated password for display in text area.
  return generatedPswd;
}

/* This function generates a password and then writes the generated password to a text area named password. */
function writePassword() 
{
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);