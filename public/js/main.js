// variables
const textarea = document.querySelector("textarea");
const charactersLeft = document.querySelector("#characters-left-span");
charactersLeft.textContent = 150;

// eventlisteners

// show the amount of characters user has left to type
textarea.addEventListener("keyup", function(){
    maxLength = 150;
    currentLength = textarea.value.length
    charactersLeft.textContent = maxLength - currentLength;
    if(currentLength > 150){
        textarea.style.outlineColor = "red";
    }
});
