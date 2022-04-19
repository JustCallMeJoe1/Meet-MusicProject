/*

    Author: Joe Strickland
    Front-end javascript file that will close the flash div when the X button is clicked
    Date: April 19th, 2022
    I'm not using jQuery, you cant pay me any amount of money to use that trash
    Maybe implement a timer instead of a button close....

*/

//When the document has loaded...
function doTheFunny() {
    window.addEventListener("load", () => { 
        
        const closeButtons = Array.from(document.getElementsByClassName("closeButton"));

        closeButtons.forEach(button => {
            button.addEventListener("click", closeTheDiv);
        });

        function closeTheDiv() {
            const theDiv = Array.from(document.getElementsByClassName("messageContainer"));
            theDiv[0].style.display = "none";
        };

    });
};

doTheFunny();