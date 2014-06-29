
(function() {


  /* This starts everything
  ----------------------------------------------- */
  function start() {

    // OPTIONAL: Present the header navigation as dropdowns.
    //new NavDropDown();
    new HeaderDropDown();

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
  /*
  var NavDropDown = function() {};

  (function() {

    if (!document.addEventListener || !document.querySelector) return;

    NavDropDown = function() {

      var active; // The currently active element

      function hide(element) {

        // KLUDGE: Wait a brief moment before responding to a new event
        // (to work around an issue in Firefox where pressing a link triggers a focus event)
        if (element._data__NavDropDown_lately) return;
        element._data__NavDropDown_lately = true;
        setTimeout(function() { element._data__NavDropDown_lately = false; }, 250);

        element.className = element.className.replace(/active/g, "");
        if (active === element) active = undefined;


        // KLUDGE: Activate the post or search elements separately, on large screens
        // (This might be improved by having separate logic for small and large screens)

        // Post
        var item = element.querySelector("li.post");
        if (item) {
          item.className = item.className.replace(/active/g, "");
        }

        // Search
        var section = element.querySelector("section.search");
        if (section) {
          section.className = section.className.replace(/active/g, "");
        }
      }

      function show(element, target) {

        // KLUDGE: Wait a brief moment before responding to a new event
        // (to work around an issue in Firefox where pressing a link triggers a focus event)
        if (element._data__NavDropDown_lately) return;
        element._data__NavDropDown_lately = true;
        setTimeout(function() { element._data__NavDropDown_lately = false; }, 250);

        if (element.className.indexOf("active") < 0) {
          element.className += " active";
        }
        active = element;


        // KLUDGE: Activate the post or search elements separately, on large screens
        // (This might be improved by having separate logic for small and large screens)

        var section = closest(target, "section");
        var list = closest(target, "ul");
        var item = closest(target, "li");

        var post;

        // The target might be the “Post” link
        if (item && item.className.indexOf("post") >= 0 && item.className.indexOf("active") < 0) {
          post = item;
        // Or it might be a link in the child list
        } else if (list && list.parentNode.nodeName.toLowerCase() == "li" && list.parentNode.className.indexOf("post") >= 0 && list.parentNode.className.indexOf("active") < 0) {
          post = list.parentNode;
        }

        // If the post dropdown was activated
        if (post) {

          // Close the search dropdown
          section = element.querySelector("section.search");
          if (section) {
            section.className = section.className.replace(/active/g, "");
          }

          post.className += " active";

        // If the search dropdown was activated
        } else if (section && section.className.indexOf("search") >= 0 && section.className.indexOf("active") < 0) {

          // Close the post dropdown
          item = element.querySelector("li.post");
          if (item) {
            item.className = item.className.replace(/active/g, "");
          }

          section.className += " active";
        }
      }

      function toggle(e) {

        var target = e.target;

        // KLUDGE: Make any interaction outside of a dropdown close it on wide screens
        if (windowWidth() >= 800) { // This number is arbitrary, but happens to be a little larger than
                                    // the media query used to switch between inline and positioned dropdowns
          if (active) {
            if (!within(target, active)) {
              hide(active);
            }
          }
        }

        // If the target is one of the elements we’re listening for
        var name = target.nodeName.toLowerCase();
        if (name == "a"      ||
            name == "img"    ||
            name == "h3"     ||
            name == "h4"     ||
            name == "input"  ||
            name == "button"  ) {

          var nav = closest(target, "nav");

          // If the target is within the “primary” or “account” nav elements
          if (nav && (nav.className.indexOf("primary") >= 0 ||
                      nav.className.indexOf("account") >= 0 )) {

            // If a dropdown is currently open and it’s not the target, close it
            if (active) {
              if (!within(target, active)) {
                hide(active);
              }
            }

            var item = closest(target, "li");
            var headline = closest(target, "h3") || closest(target, "h4");

            // If the post dropdown was pressed
            if (item && item.className.indexOf("post") >= 0) {

              // If the post dropdown is open
              if (item.className.indexOf("active") >= 0) {
                hide(nav);
              } else {
                show(nav, target);
              }

            // If the account or primary dropdown was pressed
            } else if (headline && headline.nodeName.toLowerCase() == "h3" && nav.className.indexOf("active") >= 0) {
              hide(nav);

            // If the search dropdown was pressed
            } else if (headline && nav.className.indexOf("active") >= 0) {

              var section = closest(target, "section");

              // If the search dropdown is open
              if (section && section.className.indexOf("active") >= 0) {
                hide(nav);
              } else {
                show(nav, target);
              }

            } else {
              //nav.className.indexOf("active") >= 0
              show(nav, target);
            }


            // If a link that triggers a toggle was pressed, prevent the browser from following the link.
            if (headline || (item && item.className.indexOf("post") >= 0)) {
              e.preventDefault();
            }
          }
        }
      }

      document.addEventListener("click", toggle, false);
      document.addEventListener("focus", toggle, true); // TRICKY: Focus events don’t bubble up, so use capture instead


      // Style the dropdowns
      var html = document.getElementsByTagName("html")[0];
      html.className += " scripted-nav";

    };
      
  })();
  */


  /* =HeaderDropDown
  ----------------------------------------------- */
  var HeaderDropDown = function() {};

  (function() {

    if (!document.addEventListener || !document.querySelector) return;

    HeaderDropDown = function() {

      var active; // The currently active element

      function hide(element) {
        element.className = element.className.replace(/active/g, "");
        if (active === element) active = undefined;
      }

      function show(element) {
        if (active) hide(active);
        if (element.className.indexOf("active") < 0) {
          element.className += " active";
        }
        active = element;
      }

      function toggle(e) {
        var target = e.target;
        var name = target.nodeName.toLowerCase();

        // KLUDGE: Make any interaction outside of a dropdown close it on wide screens
        //if (windowWidth() >= 1050) { // This number is arbitrary, but happens to be a little larger than
                                    // the media query used to switch between inline and positioned dropdowns

          // If a dropdown is currently open and it’s not the target, close it
          if (active) {
            if (!within(e.target, active)) {
              hide(active);
            }
          }
        //}

        // If the target is a headline or a link
        if (name == "h3" || name == "img" || name == "a" || name == "p") {
          var section = closest(target, "section");

          // If the target is within a post or member section
          if (section && ( section.className.indexOf("post")      >= 0 ||
                           section.className.indexOf("member")    >= 0 )) {

            // If the target is within a headline, assume the headline is the target
            if (name == "img") {
              var headline = closest(target, "h3");
              if (headline) {
                target = headline;
                name = "h3";
              }
            }

            // Toggle the dropdown
            if (name == "h3" && section.className.indexOf("active") >= 0) {
              hide(section);
            } else {
              show(section);
            }
          } else {
            var nav    = closest(target, "nav");
            var header = closest(target, "header");

            // KLUDGE: Ignore clicks in the primary navigation (Featured, Popular, Newest, etc)
            var list = closest(target, "ul");
            if (list && list.parentNode === nav && header.id == "header") {
              return;
            }

            if (nav && header && header.id == "header") {
              // Toggle the dropdown
              if (name == "p" && nav.className.indexOf("active") >= 0) {
                hide(nav);
              } else {
                show(nav);
              }

            }
          }
        }
      }


      document.addEventListener("click", toggle, false);
      document.addEventListener("focus", toggle, true); // TRICKY: Focus events don’t bubble up, so use capture instead


      // Style the dropdowns
      var html = document.getElementsByTagName("html")[0];
      html.className += " scripted-header";

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
        if (active) {
          if (!within(e.target, active)) {
            hide(active);
          }
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

