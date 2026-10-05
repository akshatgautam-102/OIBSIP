const result =document.querySelector(".result");
const numbers = document.querySelectorAll(".num");
const operators= document.querySelectorAll(".operator");
const clearbtn= document.querySelector(".clear");
let currentInput="";
numbers.forEach(button=>{
    button.addEventListener("click",()=>{
        console.log("number clicked");
        currentInput=currentInput+ button.textContent.trim();
        result.textContent=currentInput;
    });
})

operators.forEach(button=>{
    button.addEventListener("click",()=>{
        console.log("operator clicked");
        currentInput=currentInput+ button.textContent.trim();
        
        result.textContent=currentInput;

    });
})


clearbtn.addEventListener("click",()=>{
        console.log("all clear");
        currentInput="";
        result.textContent ="";
    });

const backspacebtn=document.querySelector(".backspace");
backspacebtn.addEventListener("click",()=>{
    console.log("backspace button");
    currentInput=currentInput.slice(0,-1);
    result.textContent=currentInput;
});

const equalbtn = document.querySelector(".equal");
equalbtn.addEventListener("click",()=>{
    console.log("equal");
    let finaalInput= currentInput.replaceAll("×", "*").replaceAll("÷", "/").replaceAll("&#215;", "*").replaceAll("&#247;", "/").replaceAll("%","/100");
    console.log(finaalInput);

    try{
        let answer=eval(finaalInput);
        result.textContent =answer;
        currentInput=answer.toString();
    } catch{
        result.textContent ="Error";
        currentInput="";
    }
});

const decimal = document.querySelector(".decimal");
decimal.addEventListener("click",()=>{
    console.log("decimal");
    currentInput=currentInput+ decimal.textContent.trim();
    result.textContent=currentInput;
    
})

const bracket= document.querySelector(".bracket");
bracket.addEventListener("click",()=>{
    let opencount=0;
    let closecount=0;

    for (let char of currentInput){
        if (char==="(") opencount++;
        if (char===")") closecount++;
    }
    let lastChar = currentInput[currentInput.length - 1];
    if ((!isNaN(lastChar) ||  lastChar==")") && opencount>closecount){
        currentInput = currentInput+")";
    }else{
        currentInput = currentInput+"(";
    }
result.textContent=currentInput;
});

const percent = document.querySelector(".percentage");
percent.addEventListener("click", ()=>{
    currentInput = currentInput + "%";
    result.textContent = currentInput;
})