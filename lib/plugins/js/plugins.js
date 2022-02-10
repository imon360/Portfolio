/*---------------------------
Mobile Nav
---------------------------*/
(function ($) {
  "use strict";

  // Mobile Navigation
  if ($(".main-nav").length) {
    var $mobile_nav = $(".main-nav").clone().prop({
      class: "mobile-nav d-lg-none",
    });
    $("body").append($mobile_nav);
    $("body").prepend(
      '<button type="button" class="mobile-nav-toggle d-lg-none"><i class="fa fa-bars"></i></button>'
    );
    $("body").append('<div class="mobile-nav-overly"></div>');

    $(document).on("click", ".mobile-nav-toggle", function (e) {
      $("body").toggleClass("mobile-nav-active");
      $(".mobile-nav-toggle i").toggleClass("fa-times fa-bars");
      $(".mobile-nav-overly").toggle();
    });

    $(document).on("click", ".mobile-nav .drop-down > a", function (e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass("active");
    });

    $(document).click(function (e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass("fa-times fa-bars");
          $(".mobile-nav-overly").fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }
})(jQuery);

/*---------------------------
Typing.js
---------------------------*/
!(function (i) {
  "use strict";

  var e,
    s,
    t = 2500,
    n = 600,
    r = 1500;

  function o(a) {
    var e,
      s = (e = a).is(":last-child") ? e.parent().children().eq(0) : e.next();
    a.parents(".cd-headline").hasClass("clip") &&
      a.parents(".cd-words-wrapper").animate(
        {
          width: "2px",
        },
        n,
        function () {
          var e, t;
          (e = s),
            a.removeClass("is-visible").addClass("is-hidden"),
            e.removeClass("is-hidden").addClass("is-visible"),
            (t = s).parents(".cd-headline").hasClass("clip") &&
              t.parents(".cd-words-wrapper").animate(
                {
                  width: t.width() + 10,
                },
                n,
                function () {
                  setTimeout(function () {
                    o(t);
                  }, r);
                }
              );
        }
      );
  }
  (e = i(".cd-headline")),
    (s = t),
    e.each(function () {
      var e = i(this);
      if (e.hasClass("clip")) {
        var t = e.find(".cd-words-wrapper"),
          a = t.width() + 10;
        t.css("width", a);
      }
      setTimeout(function () {
        o(e.find(".is-visible").eq(0));
      }, s);
    });
})(jQuery);

/*---------------------------
Contact Form
---------------------------*/
jQuery(document).ready(function ($) {
  "use strict";

  //Contact
  $("form.contactForm").submit(function () {
    var f = $(this).find(".form-group"),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children("input").each(function () {
      // run all inputs

      var i = $(this); // current input
      var rule = i.attr("data-rule");

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(":", 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case "required":
            if (i.val() === "") {
              ferror = ierror = true;
            }
            break;

          case "minlen":
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case "email":
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case "checked":
            if (!i.is(":checked")) {
              ferror = ierror = true;
            }
            break;

          case "regexp":
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next(".validation")
          .html(
            ierror
              ? i.attr("data-msg") !== undefined
                ? i.attr("data-msg")
                : "wrong Input"
              : ""
          )
          .show("blind");
      }
    });
    f.children("textarea").each(function () {
      // run all inputs

      var i = $(this); // current input
      var rule = i.attr("data-rule");

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(":", 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case "required":
            if (i.val() === "") {
              ferror = ierror = true;
            }
            break;

          case "minlen":
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next(".validation")
          .html(
            ierror
              ? i.attr("data-msg") != undefined
                ? i.attr("data-msg")
                : "wrong Input"
              : ""
          )
          .show("blind");
      }
    });
    if (ferror) return false;
    else var str = $(this).serialize();
    var action = $(this).attr("action");
    if (!action) {
      action = "https://formspree.io/mvovorzz";
      // action = 'contactform/contactform.php';
    }
    $.ajax({
      type: "POST",
      url: action,
      data: str,
      success: function (msg) {
        // alert(msg);
        if (msg == "OK") {
          $("#sendmessage").addClass("show");
          $("#errormessage").removeClass("show");
          $(".contactForm").find("input, textarea").val("");
        } else {
          $("#sendmessage").removeClass("show");
          $("#errormessage").addClass("show");
          $("#errormessage").html(msg);
        }
      },
    });
    return false;
  });
});
