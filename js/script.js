$(document).ready(function() {
    //Store original height of navBar
    var navBar = $('nav.main');
    jQuery.data(navBar, 'oHeight', navBar.height());

    $('ul#menu-main li a').on('click', function(event) {

        var target = $($(this).attr('href'));

        if (target.length) {
            var navBarHeight = jQuery.data(navBar, 'oHeight');
            event.preventDefault();

            $('body,html').animate({
                scrollTop: target.offset().top - navBarHeight * 0.5
            }, 500);
        }
    });

    $(window).scroll(function() {
        var position = $(this).scrollTop();

        console.log(position);

        var navBarHeight = jQuery.data(navBar, 'oHeight');

        var sectionHeights = [];

        $('.content').each(function(i, obj) {
            sectionHeights.push($(this).offset().top - (navBarHeight * 0.5));
        });

        for (var i = 0; i < sectionHeights.length; i++) {
            console.log(sectionHeights[i]);
        }

        console.log($(document).height());

        var sectionIndex = 0;

        if (position + $(window).height() >= $(document).height() - 50) {
            sectionIndex = sectionHeights.length - 1;
        } else {
            for (var i = 1; i < sectionHeights.length; i++) {
                if (position + 100 >= sectionHeights[i]) {
                    sectionIndex = i;
                } else {
                    break;
                }
            }
        }

        console.log(sectionIndex);

        $('ul#menu-main li').each(function(i, obj) {
            if (i === sectionIndex) {
                $(this).css({'background': '#dedede'});
            } else {
                $(this).css({'background': 'white'});
            }
        });

        if (position > navBarHeight * 0.5) {
            navBar.stop().animate({
                height: navBarHeight * 0.5
            }, 500);
        } else {
            navBar.stop().animate({
                height: navBarHeight
            }, 500);
        }
    });

    var carouselWidth = $('ul#carousel-list li').outerWidth();
    var leftIndent = -1 * carouselWidth;

    $('ul#carousel-list li:first').before($('ul#carousel-list li:last'));

    $('ul#carousel-list').css({'left': leftIndent});

    $('#right').click(function() {
        var left_indent = parseInt($('ul#carousel-list').css('left')) - carouselWidth;

        $('ul#carousel-list').animate({'left': left_indent}, 750, function() {
            $('ul#carousel-list li:first').before($('ul#carousel-list li:last'));

            $('ul#carousel-list').css({'left': leftIndent});
        })
    });

    $('#left').click(function() {
        var left_indent = parseInt($('ul#carousel-list').css('left')) + carouselWidth;

        $('ul#carousel-list').animate({'left': left_indent}, 750, function() {
            $('ul#carousel-list li:first').before($('ul#carousel-list li:last'));

            $('ul#carousel-list').css({'left': leftIndent});
        })
    });

    $('#modal-close').click(function() {
        $('#modal-overlay').css({'display': 'none'});
    });

    $('#resume-button').click(function() {
        $('#modal-overlay').css({'display': 'inline'});
    });
});