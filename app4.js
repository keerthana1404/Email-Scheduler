document.addEventListener("DOMContentLoaded", function () {
const mymail=document.querySelector(".mail");
const mysubject=document.querySelector(".subject");
const mymailBody=document.querySelector(".mailbody");
const mytime=document.querySelector(".time");
const btn=document.querySelector(".btn");
const output = document.getElementById("output");
const myForm = document.getElementById("myform"); // Add an ID to your form element

        myForm.addEventListener("submit", function (event) {
          event.preventDefault(); // Prevent the default form submission behavior
      
          // Your form submission code here
          // ...
        });
    

btn.addEventListener("click",function onClick(){

    btn.style.color ="red";
    var obj={
        mail: mymail.value,
        subject:mysubject.value,
        mailBody:mymailBody.value,
        time:mytime.value
    };
    fetch("http://localhost:3000/sendEmail",{
        method: "POST",
        headers: {
            "Content-Type": "application/json" // Set the content type to JSON
          },
          body: JSON.stringify(obj),
        })
        .then(function (response) {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then(function (data) {
            // Display the response message in the "output" element
            output.innerHTML = data.message;
          })
          .catch(function (error) {
            console.error("Error:", error);
            // Handle any errors, e.g., display an error message to the user
            output.innerHTML = "An error occurred.";
          });
        })
        
   
    function show(message){
        output.innerHTML=message;
    }
});





