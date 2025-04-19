let currentUser = '';

$(document).ready(function () {
  // Login
  $("#myModal form").on("submit", function (event) {
    event.preventDefault();
    const username = $("#usrname").val().trim();

    if (username !== "") {
      currentUser = username;
      $("#welcomeMessage").text(`Hello, ${username}!`);
      $("#myBtn").text("Log Off").removeClass("btn-primary").addClass("btn-danger");
      $("#myModal").modal("hide");
      $("#logDropdown").show();
    }
  });

  // Log Off
  $("#myBtn").click(function () {
    if ($(this).text() === "Log Off") {
      currentUser = '';
      $("#welcomeMessage").text("");
      $("#myBtn").text("Login").removeClass("btn-danger").addClass("btn-primary");
      $("#logDropdown").hide();
      $("#logContainer").empty();
    }
  });

  // Load and display logs based on type
  function renderLogCard(type) {
    fetch('data/data.json')
      .then(res => res.json())
      .then(logs => {
        const filteredLogs = logs.filter(entry => entry.type === type);

        let entriesHtml = '';
        filteredLogs.forEach(entry => {
          entriesHtml += `
            <div class="border rounded p-2 mb-2 bg-light" data-id="${entry.date}">
              <strong>${entry.date}</strong> - ${entry.note} <em class="text-muted">(${entry.user})</em>
              <button class="btn btn-danger btn-sm float-end delete-btn">Delete</button>
            </div>
          `;
        });

        const cardHTML = `
          <div id="${type}Log" class="d-flex justify-content-center mt-4">
            <div class="card shadow" style="width: 30rem;">
              <div class="card-body">
                <h5 class="card-title text-center mb-3">${type.charAt(0).toUpperCase() + type.slice(1)} Log</h5>
                <form id="entryForm" data-logtype="${type}">
                  <div class="mb-3">
                    <label for="entryDate" class="form-label">Date</label>
                    <input type="date" class="form-control" id="entryDate" required>
                  </div>
                  <div class="mb-3">
                    <label for="entryComments" class="form-label">Comments</label>
                    <textarea class="form-control" id="entryComments" rows="5" required></textarea>
                  </div>
                  <button type="submit" class="btn btn-success w-100">Save</button>
                </form>
                <hr />
                <h6>Previous Entries</h6>
                <div id="previousEntries">${entriesHtml}</div>
              </div>
            </div>
          </div>
        `;

        $("#logContainer").html(cardHTML);
      })
      .catch(error => console.error("Error fetching the logs:", error));
  }

  // Hook up each dropdown item
  $("#eventLogOption").click(e => {
    e.preventDefault();
    renderLogCard("event");
  });

  $("#inventoryLogOption").click(e => {
    e.preventDefault();
    renderLogCard("inventory");
  });

  $("#serverLogOption").click(e => {
    e.preventDefault();
    renderLogCard("server");
  });

  // Handle save
  $(document).on("submit", "#entryForm", function (e) {
    e.preventDefault();
    const type = $(this).data("logtype");
    const date = $("#entryDate").val();
    const comments = $("#entryComments").val();

    const newEntry = {
      date,
      note: comments,
      type,
      user: currentUser
    };

    const entryHtml = `
      <div class="border rounded p-2 mb-2 bg-light" data-id="${newEntry.date}">
        <strong>${newEntry.date}</strong> - ${newEntry.note} <em class="text-muted">(${newEntry.user})</em>
        <button class="btn btn-danger btn-sm float-end delete-btn">Delete</button>
      </div>
    `;

    $("#previousEntries").prepend(entryHtml);
    $("#entryForm")[0].reset();

    // Optional: save to localStorage (does NOT affect logs.json)
    const savedEntries = JSON.parse(localStorage.getItem("logEntries") || "[]");
    savedEntries.push(newEntry);
    localStorage.setItem("logEntries", JSON.stringify(savedEntries));
  });

  // Handle delete button click
  $(document).on("click", ".delete-btn", function () {
    const entryDiv = $(this).closest('.border');
    const entryDate = entryDiv.data('id');

    // Remove the entry from the DOM
    entryDiv.remove();

    // Optional: remove the entry from localStorage as well
    let savedEntries = JSON.parse(localStorage.getItem("logEntries") || "[]");
    savedEntries = savedEntries.filter(entry => entry.date !== entryDate);
    localStorage.setItem("logEntries", JSON.stringify(savedEntries));
  });
});
