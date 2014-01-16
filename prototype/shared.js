
(function() {

  if (!document.body.addEventListener || !document.querySelector) return;

/*  =ToggleButton
  ----------------------------------------------- */
  var ToggleButton = function(element, labels) {

    if (!element) return;

    var button = element.getElementsByTagName("button");
    if (button.length > 0) button = button[0];

    var cursor = 0;

    function toggle() {
      cursor++;
      if (cursor > labels.length - 1) cursor = 0;
      button.innerHTML = labels[cursor];
    };

    element.addEventListener("submit", function(e) { e.preventDefault(); }, false);

    var span;
    if (labels.length > 2) {
      span = document.createElement("span");
      button.parentNode.appendChild(span);
      for (var index = 1; index < labels.length; index++) {
        var temp = button.cloneNode(true);
        temp.innerHTML = labels[index]
        span.appendChild(temp);
      }
    } else {
      button.addEventListener("click", function(e) {
        toggle();
        e.preventDefault();
      }, false);
    }

  }

  /*
  var articles = document.getElementsByTagName("article");
  for (var index = 0; index < articles.length; index++) {

    var form = articles[index].querySelector(".body .todo_actions form");
    if (form) {
      new ToggleButton(form, ["Do It", "To Do", "Done"]);
    }

    forms = articles[index].querySelectorAll(".details form");
    for (var j = 0; j < forms.length; j++) {
      new ToggleButton(forms[j], ["Follow", "Following"]);
    }

  }
  */

})();



