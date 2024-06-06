const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols="~'!@#$%^&*()={\}|:;<,>?/";

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();

// Set strength circle color to grey
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

// Event listener to update lengthDisplay when slider changes
inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    lengthDisplay.innerText = passwordLength;
});

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    // shadow can be added here if needed
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min))+min;
}

function generateRandomNumber(){
      return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123)); 

}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,90)); 

}

function generateSymbol(){
   const randNum=getRndInteger(0,symbols.length);
   return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if(uppercaseCheck.Checked) hasUpper=true;
    if(lowercaseCheck.Checked) hasUpper=true;
    if(numbersCheck.Checked) hasUpper=true;
    if(symbolsCheck.Checked) hasUpper=true;

  if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength>=8){
    setIndicator("#0f0");

  }else if(
    (hasLower || hasUpper)&&
    (hasNum   || hasSym)&&
    passwordLength>=6
  ){
    setIndicator("#ff0");
  }else{
    setIndicator("#f00");
  }
}

async function copyContent(){
    try{
      await navigator.clipboard.writeText(passwordDisplay.value);
      copyMsg.innerText="copied";
    }catch(e){
       copyMsg.innerText="Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");
    setTimeout( ()=>{
        copyMsg.classList.remove("active");
    },20000);
}

function  shufflePassword(array){
  //Fisher Yates Method

  for(let i=array.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    const temp=array[i];
    array[i]=array[j];
    array[j]=temp;
  }

  let str="";
  array.forEach((el)=> (str+=el));
  return str;

}

function handleCheckBoxChange(){
  checkCount=0;
  allCheckBox.forEach((checkbox)=>{
    if(checkbox.checked)
      checkCount++;
  });

  //special condition
if(passwordLength<checkCount){
  passwordLength=checkCount;
  handleSlider();
}

}

allCheckBox.forEach((checkbox)=>{
  checkbox.addEventListener('change',handleCheckBoxChange);
})


inputSlider.addEventListener('input',(e)=>{
  passwordLength=e.target.value;
  handleSlider();

})

copyBtn.addEventListener('click',()=>{
  if(passwordDisplay.value)
    copyContent();
})

generateBtn.addEventListener('click',()=>{
  //none of the checkbox are connected
  if(checkCount<=0) return;

  if(passwordLength<checkCount){
    passwordLength=checkCount;
    handleSlider();
  }



  //lets start the journey to find the new password
  console.log("Starting the journey");
  //remove password
  password="";
  //lets put the stuff mentioned by checkboxes




if(uppercaseCheck.checked){
  password+=generateUpperCase();
}


if(lowercaseCheck.checked){
  password+=generateUpperCase();
}


if(numbersCheck.checked){
  password+=generateUpperCase();
}


if(symbolsCheck.checked){
  password+=generateUpperCase();
}

let funcArr=[];
if(uppercaseCheck.checked)
  funcArr.push(generateUpperCase);
if(lowercaseCheck.checked)
  funcArr.push(generateLowerCase);

if(numbersCheck.checked)
  funcArr.push(generateRandomNumber);

if(symbolsCheck.checked)
  funcArr.push(generateSymbol);


//compulsory addition
for(let i=0;i<funcArr.length;i++){
  password+=funcArr[i]();
}
console.log("Compulsory addition done");
//remaining addition

for(let i=0;i<passwordLength-funcArr.length;i++){
  let randIndex=getRndInteger(0,funcArr.length);
console.log("randIndex"+randIndex); 

  password+=funcArr[randIndex]();
}
console.log("remaining addition done");
//shuffle the password
password=shufflePassword(Array.from(password));
console.log("shuffling addition done");

//show in UI
passwordDisplay.value=password;
console.log("UI addition done");

//calculate strength
calcStrength();

})



////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const lengthSlider = document.querySelector('[data-lengthSlider]');
  const lengthNumber = document.querySelector('[data-lengthNumber]');
  const indicator = document.querySelector('[data-indicator]');
  const generateButton = document.querySelector('.generateButton');
  const display = document.querySelector('[data-passwordDisplay]');

  lengthSlider.addEventListener('input', () => {
      lengthNumber.textContent = lengthSlider.value;
      updateIndicator();
  });

  generateButton.addEventListener('click', () => {
      const password = generatePassword(lengthSlider.value);
      display.value = password;
      updateIndicator();
  });

  function generatePassword(length) {
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
      let password = "";
      for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * charset.length);
          password += charset[randomIndex];
      }
      return password;
  }

  function updateIndicator() {
      const length = lengthSlider.value;
      if (length <= 6) {
          indicator.className = 'strength-weak';
      } else if (length <= 12) {
          indicator.className = 'strength-moderate';
      } else {
          indicator.className = 'strength-strong';
      }
  }
});
