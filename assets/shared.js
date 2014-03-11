
(function() {


  /* This starts everything
  ----------------------------------------------- */
  function start() {

    // OPTIONAL: Present the header navigation as dropdowns
    new NavDropDown();

    // OPTIONAL: Present the do buttons as dropdowns
    new DoDropDown();

    // OPTIONAL: Hide redundant labels in browsers that support the placeholder attribute.
    // http://stackoverflow.com/questions/8263891/simple-way-to-check-if-placeholder-is-supported
    function supportsPlaceholder() {
      var test = document.createElement("input");
      return ("placeholder" in test);
    }
    if (supportsPlaceholder()) {
      var html = document.getElementsByTagName("html")[0];
      html.className += " supports-placeholder";
    }

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
  function closest(element, nodeName) {

    // If the element is the target
    if (nodeName === element.nodeName.toLowerCase()) {
      return element;
    } else {
      if (element.parentNode) return closest(element.parentNode, nodeName);
    }

  }


  /* =NavDropDown
  ----------------------------------------------- */
  var NavDropDown = function() {};

  (function() {

    if (!document.addEventListener) return;

    NavDropDown = function() {

      var active; // The currently active element

      function hide(element) {

        // KLUDGE: Wait a brief moment before responding to a new event
        // (to work around an issue in Firefox where clicking a link triggers a focus event)
        if (element._data__NavDropDown_lately) return;
        element._data__NavDropDown_lately = true;
        setTimeout(function() { element._data__NavDropDown_lately = false; }, 250);

        element.className = element.className.replace(/active/g, "");
        if (active === element) active = undefined;
      }

      function show(element) {

        // KLUDGE: Wait a brief moment before responding to a new event
        // (to work around an issue in Firefox where clicking a link triggers a focus event)
        if (element._data__NavDropDown_lately) return;
        element._data__NavDropDown_lately = true;
        setTimeout(function() { element._data__NavDropDown_lately = false; }, 250);

        if (element.className.indexOf("active") < 0) {
          element.className += " active";
        }
        active = element;
      }

      function toggle(e) {
        console.log("toggle");
        var target = e.target;
        var name = target.nodeName.toLowerCase();

        // If a dropdown is currently open and it’s not the target, close it
        if (active) {
          if (!within(e.target, active)) {
            hide(active);
          }
        }

        // If the target is link or an image
        if (name == "a"   ||
            name == "img" ||
            name == "h3"  ||
            name == "h4"  ) {

          var nav = closest(target, "nav");

          // If the target is within the “primary” or “account” nav elements
          if (nav && (nav.className.indexOf("primary") >= 0 ||
                      nav.className.indexOf("account") >= 0 )) {

            var headline = closest(target, "h3") || closest(target, "h4");

            if (headline) {
              e.preventDefault();
            }

            // Toggle the dropdown
            if (headline && nav.className.indexOf("active") >= 0) {
              hide(nav);
            } else {
              show(nav);
            }
          }
        }
      }

      var responded = false;
      document.addEventListener("click", toggle, false);
      document.addEventListener("focus", toggle, true); // TRICKY: Focus events don’t bubble up, so use capture instead


      // Style the dropdowns
      var html = document.getElementsByTagName("html")[0];
      html.className += " scripted-nav";

    };
      
  })();


  /* =DoDropDown
  ----------------------------------------------- */
  var DoDropDown = function() {};

  (function() {

    if (!document.addEventListener) return;

    DoDropDown = function() {

      var active; // The currently active element

      function hide(element) {
        element.className = element.className.replace(/active/g, "");
        if (active === element) active = undefined;
      }

      function show(element) {
        if (element.className.indexOf("active") < 0) {
          element.className += " active";
        }
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


      document.addEventListener("click", toggle, false);
      document.addEventListener("focus", toggle, true); // TRICKY: Focus events don’t bubble up, so use capture instead


      // Style the dropdowns
      var html = document.getElementsByTagName("html")[0];
      html.className += " scripted-do";

    };
      
  })();


  /* Everything is ready, so start it up
  ----------------------------------------------- */
  start();


})();

