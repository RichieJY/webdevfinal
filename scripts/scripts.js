 $(document).ready(function(){
    // Optional: You don’t actually need this anymore unless you're manually triggering the modal
    $("#myBtn").click(function(){
      $("#myModal").modal("show");
    });
  
    // Handle the form submission
    $("#myModal form").on("submit", function(event){
      event.preventDefault(); // Prevent actual form submission
      const username = $("#usrname").val().trim();
      if(username !== ""){
        $("#welcomeMessage").text(`Welcome, ${username}!`);
      } else {
        $("#welcomeMessage").text(`Welcome!`);
      }
      $("#myModal").modal("hide"); // Hide the modal
    });
  });
  