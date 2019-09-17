// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".eat").on("click", function(event) {
    var id = $(this).data("id");
    var newEaten = $(this).data("neweaten");

    var newEatenState = {
      eaten: newEaten
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newEatenState
    }).then(function() {
      console.log("changed sleep to", newEaten);
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      burger_name: $("#ca")
        .val()
        .trim(),
      eaten: 0
    };
    console.log(newBurger);
    if (newBurger.burger_name == "") {
      console.log("error");
      var intermediate = $("<p>Please enter a name for your burger!</p>");
      $(".modal-body").prepend(intermediate);
      setTimeout(function() {
        intermediate.remove();
      }, 3000);
    } else {
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(function() {
        console.log("created new burger");
        location.reload();
      });
    }
  });

  $(".delete").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(function() {
      console.log("deleted Burger", id);
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
