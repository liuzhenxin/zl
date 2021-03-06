/**
 * Created by Administrator on 2016/7/15.
 */
$(function () {
    //initialize
    $('.container').css({
        'perspective-origin': '50% 0%',
        '-webkit-perspective-origin': '50% 0%'
    });
    $('.container .example').css({
        'animation': 'topleave 400ms forwards',
        '-webkit-animation': 'topleave 400ms forwards'
    });

    $('.container').bind('mouseenter mouseleave', function (e) {
        var dir = getDirection($(this), e),
            enter = e.type === 'mouseenter',
            topPerspectiveOrigin = {
                'perspective-origin': '50% 0%',
                '-webkit-perspective-origin': '50% 0%'
            },
            rightPerspectiveOrigin = {
                'perspective-origin': '100% 50%',
                '-webkit-perspective-origin': '100% 50%'
            },
            bottomPerspectiveOrigin = {
                'perspective-origin': '50% 100%',
                '-webkit-perspective-origin': '50% 100%'
            },
            leftPerspectiveOrigin = {
                'perspective-origin': '0% 50%',
                '-webkit-perspective-origin': '0% 50%'
            },
            $target = $(this).find('.example');
        switch (dir) {
            case 0:
                if (enter) {
                    $(this).css(topPerspectiveOrigin);
                    $target.css({
                        'animation': 'topenter 400ms forwards',
                        '-webkit-animation': 'topenter 400ms forwards'
                    });
                } else {
                    $(this).css(topPerspectiveOrigin);
                    $target.css({
                        'animation': 'topleave 400ms forwards',
                        '-webkit-animation': 'topleave 400ms forwards'
                    });
                };
                break;
            case 1:
                if (enter) {
                    $(this).css(rightPerspectiveOrigin);
                    $target.css({
                        'animation': 'rightenter 400ms forwards',
                        '-webkit-animation': 'rightenter 400ms forwards'
                    });
                } else {
                    $(this).css(rightPerspectiveOrigin);
                    $target.css({
                        'animation': 'rightleave 400ms forwards',
                        '-webkit-animation': 'rightleave 400ms forwards'
                    });
                };
                break;
            case 2:
                if (enter) {
                    $(this).css(bottomPerspectiveOrigin);
                    $target.css({
                        'animation': 'bottomenter 400ms forwards',
                        '-webkit-animation': 'bottomenter 400ms forwards'
                    });
                } else {
                    $(this).css(bottomPerspectiveOrigin);
                    $target.css({
                        'animation': 'bottomleave 400ms forwards',
                        '-webkit-animation': 'bottomleave 400ms forwards'
                    });
                };
                break;
            case 3:
                if (enter) {
                    $(this).css(leftPerspectiveOrigin);
                    $target.css({
                        'animation': 'leftenter 400ms forwards',
                        '-webkit-animation': 'leftenter 400ms forwards'
                    });
                } else {
                    $(this).css(leftPerspectiveOrigin);
                    $target.css({
                        'animation': 'leftleave 400ms forwards',
                        '-webkit-animation': 'leftleave 400ms forwards'
                    });
                };
                break;
        }

    });
})

function getDirection($element, event) {
    var w = $element.width(),
        h = $element.height(),
        x = (event.pageX - $element.offset().left - (w / 2)) * (w > h ? (h / w) : 1),
        y = (event.pageY - $element.offset().top - (h / 2)) * (h > w ? (w / h) : 1),
        direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
    return direction;
}