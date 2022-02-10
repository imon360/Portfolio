! function(i) {
    "use strict";

    var e, s, t = 2500,
        n = 600,
        r = 1500;

    function o(a) {
        var e, s = (e = a).is(":last-child") ? e.parent().children().eq(0) : e.next();
        a.parents(".cd-headline").hasClass("clip") && a.parents(".cd-words-wrapper").animate({
            width: "2px"
        }, n, function() {
            var e, t;
            e = s, a.removeClass("is-visible").addClass("is-hidden"), e.removeClass("is-hidden").addClass("is-visible"), (t = s).parents(".cd-headline").hasClass("clip") && t.parents(".cd-words-wrapper").animate({
                width: t.width() + 10
            }, n, function() {
                setTimeout(function() {
                    o(t)
                }, r)
            })
        })
    }
    e = i(".cd-headline"), s = t, e.each(function() {
        var e = i(this);
        if (e.hasClass("clip")) {
            var t = e.find(".cd-words-wrapper"),
                a = t.width() + 10;
            t.css("width", a)
        }
        setTimeout(function() {
            o(e.find(".is-visible").eq(0))
        }, s)
    });
}(jQuery);