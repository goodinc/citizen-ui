
(function() {


  /* This starts everything
  ----------------------------------------------- */
  function start() {

    // OPTIONAL: Show drop-down content on press (instead of hover)
    new DropDown(document.querySelector("#header .search"));
    new DropDown(document.querySelector("#header .account"));
    new DropDown(document.querySelector("#header .todos"));

  };


  /* =Drop Down
  ----------------------------------------------- */
  var DropDown = function() {};

  (function() {

    if (!document.body.addEventListener || !document.querySelector) return;

    function within(needle, haystack) {

      // If the parent element is the target
      if (needle === haystack) {
        return true;

      // If any of the children are the target
      } else if (haystack.firstChild) {
        var child = haystack.firstChild;
        do {
          if (within(needle, child)) return true;
        } while(child = child.nextSibling);
      }

    }


    /* =DropDown
    ----------------------------------------------- */
    DropDown = function(element) {

      if (!element) return;

      var headline = element.getElementsByTagName("h3");
      if (headline.length > 0) {
        headline = headline[0];
      }

      var detailsShowing;

      function hideDetails() {
        element.className += " summary";
        detailsShowing = false;
      };

      function showDetails() {
        element.className = element.className.replace(/summary/g, "");
        detailsShowing = true;
      };

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

    }
      
  })();


  /* Everything is ready, so start it up
  ----------------------------------------------- */
  start();


})();

