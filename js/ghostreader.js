$(function () {

    var Page = {
        config : {
            $bookBlock: $('#bb-bookblock'),
            $navNext: $('#bb-nav-next'),
            $navPrev: $('#bb-nav-prev'),
            $navFirst: $('#bb-nav-first'),
            $navLast: $('#bb-nav-last')
        },

        init : function () {
            Page.config.$bookBlock.bookblock({
                speed: 1000,
                shadowSides: 0.8,
                shadowFlip: 0.4
            });

            Page.initEvents();
            Page.initSlabText();
            Page.initFeaturedImages();
        },

        initEvents : function () {

            var $slides = Page.config.$bookBlock.children();

            // add navigation events
            Page.config.$navNext.on('click touchstart', function () {
                Page.config.$bookBlock.bookblock('next');
                return false;
            });

            Page.config.$navPrev.on('click touchstart', function () {
                Page.config.$bookBlock.bookblock('prev');
                return false;
            });

            Page.config.$navFirst.on('click touchstart', function () {
                Page.config.$bookBlock.bookblock('first');
                return false;
            });

            Page.config.$navLast.on('click touchstart', function () {
                Page.config.$bookBlock.bookblock('last');
                return false;
            });

            // add swipe events
            $slides.on({
                'swipeleft': function (event) {
                    Page.config.$bookBlock.bookblock('next');
                    return false;
                },
                'swiperight': function (event) {
                    Page.config.$bookBlock.bookblock('prev');
                    return false;
                }
            });

            // add keyboard events
            $(document).keydown(function (e) {
                var keyCode = e.keyCode || e.which,
                    arrow = {
                        left: 37,
                        up: 38,
                        right: 39,
                        down: 40
                    };

                switch (keyCode) {
                    case arrow.left:
                        Page.config.$bookBlock.bookblock('prev');
                        break;
                    case arrow.right:
                        Page.config.$bookBlock.bookblock('next');
                        break;
                }
            });

            $(window).on('resize',function(){
                Page.initSlabText();
                Page.doSlabText($('.story-page:visible').find('h1.content-title'));
            })
        },

        initSlabText : function (full) {
            $('.container').css('visibility', 'hidden');
            $('.story-page:hidden').each(function () {
                var $el = $(this);
                $el.css('display', 'block');
                Page.doSlabText($el.find('h1.content-title'));
                $el.css('display', 'none');
            });
            $('.container').css('visibility', 'visible');
        },

        doSlabText : function(el) {
            el.slabText({
                fontRatio: 1.6,
                minCharsPerLine: 5,
                maxFontSize: 400,
                noResizeEvent: true
            });
        },

        initFeaturedImages : function () {
            $('.story-page').each(function () {
                var $fImg = $(this).find('.right img');
                if ($fImg.length) {
                    var src = $fImg[0].src;
                    $($fImg[0]).hide();
                    var $bg = $fImg.parents('.story-page').find('.left');
                    $bg.css('background-image','url('+ src +')');
                }
            });
        }
    };

    Page.init();

});

