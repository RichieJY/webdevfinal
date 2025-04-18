$(document).ready(function () {
    // Login
    $("#myModal form").on("submit", function (event) {
      event.preventDefault();
      const username = $("#usrname").val().trim();
  
      if (username !== "") {
        $("#welcomeMessage").text(`Hello, ${username}!`);
        $("#myBtn").text("Log Off").removeClass("btn-primary").addClass("btn-danger");
        $("#myModal").modal("hide");
        $("#logDropdown").show();
      }
    });
  
    // Log Off
    $("#myBtn").click(function () {
      if ($(this).text() === "Log Off") {
        $("#welcomeMessage").text("");
        $("#myBtn").text("Login").removeClass("btn-danger").addClass("btn-primary");
        $("#logDropdown").hide();
        $("#logContainer").empty(); // Destroys card
      }
    });
  
    // Handle Event Log dropdown click
    $("#eventLogOption").click(function (e) {
      e.preventDefault();
      const saved = JSON.parse(localStorage.getItem("eventLogEntry")) || { date: '', comments: '' };
  
      const cardHTML = `
        <div id="eventLog" class="d-flex justify-content-center mt-4">
          <div class="card shadow" style="width: 30rem;">
            <div class="card-body">
              <h5 class="card-title text-center mb-3">Event Log</h5>
              <form id="eventLogForm">
                <div class="mb-3">
                  <label for="eventDate" class="form-label">Date</label>
                  <input type="date" class="form-control" id="eventDate" value="${saved.date}" required>
                </div>
                <div class="mb-3">
                  <label for="eventComments" class="form-label">Comments</label>
                  <textarea class="form-control" id="eventComments" rows="5" required>${saved.comments}</textarea>
                </div>
                <button type="submit" class="btn btn-success w-100">Save</button>
              </form>
            </div>
          </div>
        </div>`;
  
      $("#logContainer").html(cardHTML);
    });
  
    // Handle Save (using delegated event binding because we inject form later)
    $(document).on("submit", "#eventLogForm", function (e) {
      e.preventDefault();
      const date = $("#eventDate").val();
      const comments = $("#eventComments").val();
      localStorage.setItem("eventLogEntry", JSON.stringify({ date, comments }));
      alert("Saved!");
    });
  });
  