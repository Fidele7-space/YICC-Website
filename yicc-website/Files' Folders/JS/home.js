
  let lastScrollY = window.scrollY;
  const topbar = document.querySelector(".topbar");

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      // scrolling DOWN
      topbar.classList.add("topbar--hidden");
    } else {
      // scrolling UP
      topbar.classList.remove("topbar--hidden");
    }

    lastScrollY = currentScrollY;
  });


  /* Storing Username and message information */
 document.addEventListener("DOMContentLoaded", ()=> {
  const form =document.getElementById('contactForm');

  form.addEventListener("submit", async (e) =>{
    e.preventDefault(); //preventing page reload

    try{
      const submitBtn = document.getElementById('#submitBtn').value.trim();
      const username = document.getElementById('#username').value.trim();
      const email = document.getElementById('#email').value.trim();
      const message = document.getElementById('#message');

      if (username.length < 6){
        throw new Error("Name Full name must be at least 6 characters");
      }
      
      if(!email.contains("@")){
        throw new Error("Your email should contain @ symbol");
      }

      if(message.length < 10){
        throw new Error("The message should be at least 10 characters");
      }
      
    //-----------SEND TO BACKEND-------------

      const response = await fetch("/api/contact", {
      method: "POST", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username, email, message})
      });

      if(!response.ok){
        throw new Error("Something went wrong. Please try again later.");
      }

      form.reset();
    } catch(error){
      alert(error.message);
    }
  });
 });




