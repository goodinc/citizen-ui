
(function() {


  /* This starts everything
  ----------------------------------------------- */
  function start() {

    // OPTIONAL: Show drop-down content on press (instead of hover)
    if (document.querySelector) {
      new DropDown(document.querySelector("#header .search"));
      new DropDown(document.querySelector("#header .account"));
      new DropDown(document.querySelector("#header .todos"));
    }

    // OPTIONAL: Present the do buttons as drop-downs
    new DoDropDown();

  }


  /* Utilities
  ----------------------------------------------- */
  function within(needle, haystack) {

    // If the parent element is the target
    if (needle === haystack) {
      return true;

    // If any of the children are the target
    } else if (haystack.firstChild) {
      var child = haystack.firstChild;
      do {
        if (within(needle, child)) return true;
      } while (child = child.nextSibling);
    }

  }


  /* =DropDown
  ----------------------------------------------- */
  var DropDown = function() {};

  (function() {

    if (!document.body.addEventListener || !document.querySelector) return;

    DropDown = function(element) {

      if (!element) return;

      var headline = element.querySelector("h3");
      if (headline.length > 0) {
        headline = headline[0];
      }

      if (!headline) return;

      var detailsShowing;

      function hideDetails() {
        if (element.className.indexOf("summary") < 0) {
          element.className += " summary";
        }
        detailsShowing = false;
      }

      function showDetails() {
        element.className = element.className.replace(/summary/g, "");
        detailsShowing = true;
      }

      function toggle() {
        if (detailsShowing) hideDetails();
        else showDetails();
      }

      hideDetails();

      headline.addEventListener("click", function(e) {
        toggle();
        e.preventDefault();
      }, false);

      element.className += " scripted";

      document.body.addEventListener("click", function(e) {
        if (!within(e.target, element)) {
          hideDetails();
        }
      }, false);

      document.body.addEventListener("focus", function(e) {
        if (within(e.target, element)) {
          showDetails();
        } else {
          hideDetails();
        }
      }, true); // TRICKY: Focus events don’t bubble up, so use capture instead

    };
      
  })();


  /* =DoDropDown
  ----------------------------------------------- */
  var DoDropDown = function() {};

  (function() {

    if (!document.body.addEventListener) return;

    function closest(element, nodeName) {

      // If the element is the target
      if (nodeName === element.nodeName.toLowerCase()) {
        return element;
      } else {
        if (element.parentNode) return closest(element.parentNode, nodeName);
      }

    }

    DoDropDown = function() {

      var active; // The currently active element

      function hide(element) {
        element.className = element.className.replace(/active/g, "");
        if (active === element) active = undefined;
      }

      function show(element) {
        element.className += " active";
        active = element;
      }

      function toggle(e) {
        var target = e.target;
        var name = target.nodeName.toLowerCase();

        // If a dropdown is currently open and it’s not the target, close it
        if (active) {
          if (!within(e.target, active)) {
            hide(active);
          }
        }

        // If the target is a headline or a button
        if (name == "h6" || name == "button") {
          var form = closest(target, "form");

          // If the target is within a “do” form
          if (form && form.className.indexOf("do") >= 0) {

            // Toggle the dropdown
            if (name == "h6" && form.className.indexOf("active") >= 0) {
              hide(form);
            } else {
              show(form);
            }
          }
        }

      }


      document.body.addEventListener("click", toggle, false);
      document.body.addEventListener("focus", toggle, true); // TRICKY: Focus events don’t bubble up, so use capture instead


      // Style the dropdowns
      var html = document.getElementsByTagName("html")[0];
      html.className += " scripted-do";

    };
      
  })();


  /* Everything is ready, so start it up
  ----------------------------------------------- */
  start();


})();

