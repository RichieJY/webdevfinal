# Author
**RichieJY**

# Attributes

## User Story
As a DayZ player with a bad memory, I want to keep track of my group's kills, fights, inventory, and all the servers we have tried so we know which we like and which we don't.

## Narrative
I have a terrible memory and often forget things myself and my group experience in our favorite game, DayZ. I already had this idea for our first project in web dev ([GitHub link](https://richiejy.github.io/my-fav-class/)), and I just started over and used this as a guide.  
I built it from the ground up using my imagination. I had a clear vision of what I wanted.  
One thing I learned is how powerful modal windows are — I originally was just going to populate things in the HTML.

# Cool Code Example
```javascript
$(document).on("click", ".delete-btn", function () {
  const entryDiv = $(this).closest('.border');
  const entryDate = entryDiv.data('id');
  const deleteModal = $("#deleteConfirmationModal");

  // Shows the confirmation modal
  deleteModal.modal('show');

  // If user clicks yes
  deleteModal.find("#confirmDeleteBtn").click(function () {
    entryDiv.remove();  // Removes from the DOM

    // Removes the entry from localStorage as well
    let savedEntries = JSON.parse(localStorage.getItem("logEntries") || "[]");
    savedEntries = savedEntries.filter(entry => entry.date !== entryDate);
    localStorage.setItem("logEntries", JSON.stringify(savedEntries));

    deleteModal.modal('hide');  // Hide the confirmation modal
  });
});
```
👆👆👆 This is the delete button. I have added comments so anyone can understand what it does! It essentially is a full working delete button that a.) deletes things from the dom and local storage, and b.) asks a user to confirm what they clicked that doesn't use the jS alert!

New Issue: https://github.com/RichieJY/webdevfinal/issues/1#issue-3025084538



