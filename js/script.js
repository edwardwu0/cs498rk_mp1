$(document).ready(function() {
    //Store original height of navBar
    var navBar = $('nav.main');
    jQuery.data(navBar, 'oHeight', navBar.height());

    //click event handler for nav bar items
    $('ul#menu-main li a').on('click', function(event) {

        var target = $($(this).attr('href'));

        if (target.length) {
            var navBarHeight = jQuery.data(navBar, 'oHeight');
            event.preventDefault();

            //smooth scroll to target
            $('body,html').animate({
                scrollTop: target.offset().top - navBarHeight * 0.5
            }, 500);
        }
    });

    //scroll event handler for navbar resizing and navbar position indicator
    $(window).scroll(function() {
        //get current position
        var position = $(this).scrollTop();

        //get stored original navbar height
        var navBarHeight = jQuery.data(navBar, 'oHeight');

        //array of positions of each section
        var sectionHeights = [];

        //populate the array with heights
        $('.content').each(function(i, obj) {
            sectionHeights.push($(this).offset().top - (navBarHeight * 0.5));
        });

        //index of which section we're in
        var sectionIndex = 0;

        //check if we're at the bottom of the page otherwise try to find where we are
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

        //set the color of the list item corresponding to the section we're in to dark
        //set the color of everything else as white
        $('ul#menu-main li').each(function(i, obj) {
            if (i === sectionIndex) {
                $(this).css({'background': '#dedede'});
            } else {
                $(this).css({'background': 'white'});
            }
        });

        //if we've moved past 1/2 the nav bar size then resize the navbar
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

    //code for carousel
    //get how wide one item in the carousel is
    var carouselWidth = $('ul#carousel-list li').outerWidth();
    //negative carousel item width
    var leftIndent = -1 * carouselWidth;

    //send the last carousel item before the first carousel item for navigating backwards
    $('ul#carousel-list li:first').before($('ul#carousel-list li:last'));

    //shift the entire carousel to the left by a carousel item width to give the illusion of scrolling
    $('ul#carousel-list').css({'left': leftIndent});

    //next
    $('#right').click(function() {
        var left_indent = parseInt($('ul#carousel-list').css('left')) - carouselWidth;

        //animate the carousel moving
        $('ul#carousel-list').animate({'left': left_indent}, 750, function() {
            $('ul#carousel-list li:last').after($('ul#carousel-list li:first'));

            $('ul#carousel-list').css({'left': leftIndent});
        })
    });

    //before
    $('#left').click(function() {
        var left_indent = parseInt($('ul#carousel-list').css('left')) + carouselWidth;

        $('ul#carousel-list').animate({'left': left_indent}, 750, function() {
            $('ul#carousel-list li:first').before($('ul#carousel-list li:last'));

            $('ul#carousel-list').css({'left': leftIndent});
        })
    });

    //closing the modal
    $('#modal-close').click(function() {
        $('#modal-overlay').css({'display': 'none'});
    });

    //opening the modal
    $('#resume-button').click(function() {
        $('#modal-overlay').css({'display': 'inline'});
    });
});