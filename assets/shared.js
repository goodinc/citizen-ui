
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


    /* =Site Message
    ----------------------------------------------- */
    /*
    NOTE: If you uncomment this, you’ll want to add a “data-site-message-id”
    attribute to the <html> element on each page of the website. The value
    should be a unique string for your message. For example: "do20-introduction".

    // OPTIONAL: Add a button to hide the site-wide message.
    new HideMessage();

    // OPTIONAL: Add a button to show more details within the site-wide message.
    new MessageDetails();
    */

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

  // http://stackoverflow.com/questions/3437786/how-to-get-web-page-size-browser-window-size-screen-size-in-a-cross-browser-wa
  function windowWidth() {
    var w = window;
    var d = document;
    var e = d.documentElement;
    var g = d.getElementsByTagName('body')[0];
    return w.innerWidth || e.clientWidth || g.clientWidth;
  }


  /* =MessageDetails
  ----------------------------------------------- */
  /*
  var MessageDetails = function() {};

  (function() {

    if (!document.addEventListener) return;

    MessageDetails = function() {

      // Show the details if the .show button or the headline are pressed.
      function handleClick(e) {
        var target = e.target;
        var p = closest(e.target, "p");
        if ((p && p.className.indexOf("show") >= 0) || closest(e.target, "h1")) {

          var section = closest(e.target, "section");
          if (section && section.className.indexOf("has-details") >= 0) {
            section.className += " show-details";
            e.preventDefault();
          }

        }
      }

      // Show the details if any links within it are focused.
      function handleFocus(e) {
        var target = e.target;
        var name = target.nodeName.toLowerCase();
        if (name == "a") {
          var div = closest(e.target, "div");
          if (div.className.indexOf("details") >= 0) {

            var section = closest(e.target, "section");
            if (section && section.className.indexOf("has-details") >= 0) {
              section.className += " show-details";
            }

          }
        }
      }

      document.addEventListener("click", handleClick, false);
      document.addEventListener("focus", handleFocus, true); // TRICKY: Focus events don’t bubble up, so use capture instead

      // Show buttons
      var html = document.getElementsByTagName("html")[0];
      html.className += " scripted-message-details";
    }

  })();
  */


  /* =HideMessage
  ----------------------------------------------- */
  /*
  var HideMessage = function() {};

  (function() {

    if (!window.localStorage || !document.addEventListener) return;

    HideMessage = function() {

      var html = document.getElementsByTagName("html")[0];

      var id = html.getAttribute("data-site-message-id");
      if (!id) return;

      var storageName = "hide_" + id.replace(/-/g, "_");

      // Hide the messages
      function hide(e) {
        if (localStorage[storageName]) {
          html.className += " hide-site-message";
        }
      }

      // Save the user’s preference
      function save(e) {
        var target = e.target;
        var name = target.nodeName.toLowerCase();
        var p = closest(e.target, "p");
        if (p && p.className.indexOf("close") >= 0) {
          var section = closest(e.target, "section");

          if (section && section.className.indexOf("site") >= 0 && section.className.indexOf("message") >= 0) {
            localStorage[storageName] = "hidden";
            hide();
            e.preventDefault();
          }
        }
      }

      hide();
      document.addEventListener("click", save, false);

      // Show the close buttons
      html.className += " scripted-hide-message";
    }

  })();
  */


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

      function handleClick(e) {
        if (!parent) parent = document.getElementById("header");
        if (parent) {
          if (!button) button = parent.querySelector(buttonSelector);
          if (!container) container = parent.querySelector(containerSelector);
          if (e.target === button) {
            toggle(container);
          } else {
            hideInactive(container, e.target);
          }
        }
      }

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


  /* Everything is ready, so start it up
  ----------------------------------------------- */
  start();


})();

