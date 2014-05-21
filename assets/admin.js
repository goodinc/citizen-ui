
(function() {


  /* This starts everything
  ----------------------------------------------- */
  function start() {

    // OPTIONAL: Create a new checkbox and append it to first header cell in the table
    new AddTableCheckbox();

    // OPTIONAL: Create a new checkbox and append it to batch options
    new AddBatchCheckbox();

  }


  /* =AddTableCheckbox
  ----------------------------------------------- */
  var AddTableCheckbox = function() {};

  (function() {

    if (!document.querySelector) return;

    AddTableCheckbox = function() {

      var form = document.querySelector("form.table");

      var label = document.createElement("label");
      label.className = "toggle";
      form.querySelector("th").appendChild(label);

      var button = document.createElement("input");
      button.type = "checkbox";
      label.appendChild(button);

      var text = document.createElement("span");
      text.innerHTML = "Check/Uncheck all";
      label.appendChild(text);

      // When the checkbox is pressed, toggle the other checkboxes in the table
      button.addEventListener("change", function(e) {
        var checkboxes = form.querySelectorAll("input[type=\"checkbox\"]");

        for (var index = 0; index < checkboxes.length; index++) {
          if (checkboxes[index] !== button) {
            checkboxes[index].checked = button.checked;
          }
        }
      }, false);

    }

  })();


  /* =AddBatchCheckbox
  ----------------------------------------------- */
  var AddBatchCheckbox = function() {};

  (function() {

    if (!document.querySelector) return;

    AddBatchCheckbox = function() {

      var form = document.querySelector("form.table");
      var batch = document.querySelector(".batch");

      var item = document.createElement("li");
      batch.insertBefore(item, batch.firstChild);

      var label = document.createElement("label");
      label.className = "toggle";
      item.appendChild(label);

      var button = document.createElement("input");
      button.type = "checkbox";
      label.appendChild(button);

      var text = document.createElement("span");
      text.innerHTML = "Check/Uncheck all";
      label.appendChild(text);

      // When the checkbox is pressed, toggle the other checkboxes in the table
      button.addEventListener("change", function(e) {
        var checkboxes = form.querySelectorAll("input[type=\"checkbox\"");

        for (var index = 0; index < checkboxes.length; index++) {
          if (checkboxes[index] !== button) {
            checkboxes[index].checked = button.checked;
          }
        }
      }, false);

    }

  })();


  /* Everything is ready, so start it up
  ----------------------------------------------- */
  start();


})();
