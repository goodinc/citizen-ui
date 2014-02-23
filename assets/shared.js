
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

      document.addEventListener("click", function(e) {
        if (!within(e.target, element)) {
          hideDetails();
        }
      }, false);

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

      if (!document.body.addEventListener) return;

      var html = document.getElementsByTagName("html")[0];
      html.className += " scripted-do";

      var active;
      function show(target) {
        target.className += " active";
        active = target;
      }

      function hide(target) {
        target.className = target.className.replace(/active/g, "");
        if (active === target) {
          active = undefined;
        }
      }

      function toggle(target) {
        if (active === target && active.className.indexOf("active") >= 0) {
          hide(active);
        } else {
          show(target);
        }
      }

      function delegate(e) {
        var target = e.target;

        if (active) {
          if (!within(target, active)) {
            hide(active);
          }
        }

        if (target.nodeName.toLowerCase() === "h6") {
          var form = closest(target, "form");
          if (form && (form.className.indexOf("do")    >= 0 ||
                       form.className.indexOf("doing") >= 0 ||
                       form.className.indexOf("done")  >= 0)) {
            toggle(form);
          }
        }
      }

      document.body.addEventListener("click", delegate, false);

      // TODO: Handle the case where a user is tabbing between buttons and links on the page
      //document.body.addEventListener("focus", delegate, false);

    };
      
  })();


  /* Everything is ready, so start it up
  ----------------------------------------------- */
  start();


})();

