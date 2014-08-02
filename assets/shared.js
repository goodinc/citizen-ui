
(function() {


  /* This starts everything
  ----------------------------------------------- */
  function start() {

    // OPTIONAL: Present the header navigation as dropdowns.
    new NavDropDown("nav > p:first-child", "nav div div");
    new NavDropDown(".post h3", ".post");
    new NavDropDown(".account h3 img", ".account");


    // OPTIONAL: Present the do, voted, and following buttons as dropdowns.
    new ButtonDropDown();


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


    // OPTIONAL: Use SVG images if the brower supports them.
    // http://toddmotto.com/revisiting-svg-workflow-for-performance-and-progressive-development-with-transparent-data-uris
    // http://css-tricks.com/test-support-svg-img/
    function supportsSvg() {
      return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
    }
    if (supportsSvg()) {
      var html = document.getElementsByTagName("html")[0];
      html.className += " supports-svg";
    }
  }


  /* =NavDropDown
  ----------------------------------------------- */
  var NavDropDown = function() {};

  (function() {

    if (!document.addEventListener || !document.querySelector) return;

    NavDropDown = function(buttonSelector, containerSelector) {

      var active;    // The currently active element
      var parent;    // An element that contains the dropdown
      var button;    // The toggle button
      var container; // The content of the dropdown

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

      function toggle(element) {
        if (element.className.indexOf("active") >= 0) {
          hide(element);
        } else {
          if (active) hide(active);
          show(element);
        }
      }

      function hideInactive(element, target) {
        // If the dropdown is currently open and it’s not the target, close it
        if (active === element && !within(target, element)) {
          hide(element);
        }
      }

      // Toggle the dropdown if the button is pressed
      function handleClick(e) {
        if (!parent) parent = document.getElementById("header");
        if (parent) {
          if (!button)    button    = parent.querySelector(buttonSelector);
          if (!container) container = parent.querySelector(containerSelector);
          if (e.target === button) {
            toggle(container);
          } else {
            hideInactive(container, e.target);
          }
        }
      }

      // Show the drop down if any of its contents gain focus
      function handleFocus(e) {
        if (!parent) parent = document.getElementById("header");
        if (parent) {
          if (!container) container = parent.querySelector(containerSelector);
          if (container && within(e.target, container)) {
            show(container);
          } else {
            hideInactive(container, e.target);
          }
        }
      }

      document.addEventListener("click", handleClick, false);
      document.addEventListener("focus", handleFocus, true); // TRICKY: Focus events don’t bubble up, so use capture instead

      // Style the dropdowns
      var html = document.getElementsByTagName("html")[0];
      if (html.className.indexOf("scripted-nav") < 0) {
        html.className += " scripted-nav";
      }

    };
      
  })();


  /* =ButtonDropDown
  ----------------------------------------------- */
  var ButtonDropDown = function() {};

  (function() {

    if (!document.addEventListener) return;

    ButtonDropDown = function() {

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
        if (active && !within(e.target, active)) {
          hide(active);
        }

        // If the target is a headline or a button
        if (name == "h6" || name == "button" || name == "abbr") {
          var form = closest(target, "form");

          // If the target is within a do, voted, or following form
          if (form && ( form.className.indexOf("do")        >= 0 ||
                        form.className.indexOf("voted")     >= 0 ||
                        form.className.indexOf("following") >= 0 )) {

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
      html.className += " scripted-button";

    };
      
  })();


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

  // http://stackoverflow.com/questions/3437786/how-to-get-web-page-size-browser-window-size-screen-size-in-a-cross-browser-wa
  function windowWidth() {
    var w = window;
    var d = document;
    var e = d.documentElement;
    var g = d.getElementsByTagName('body')[0];
    return w.innerWidth || e.clientWidth || g.clientWidth;
  }


  /* Everything is ready, so start it up
  ----------------------------------------------- */
  start();


})();

