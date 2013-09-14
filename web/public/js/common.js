var element_y;
var swiffy;
var cur_groupid;
var group_sortable = new Array();
var lightbox;
var content;
var slider;
var t;
var type = "Scroll";
window.addEvent('load', function() {

    if ( jQuery('#main-content').length ) {
        checkImages();
        checkWidth();
    }

    checkScrollerWidth();
});

function checkImages() {
    var check_w = window.getSize().x + 500;
    var wx = 0;

    var divs = $$('.single_image_holder');
    for(var i=0; i<divs.length; i++) {
        if(divs[i].getChildren().length) continue;
        if((parseInt($('main_images').getPosition().x) + parseInt(divs[i].get('xpos'))) >= check_w) {return};
        var img = new Element('img', {
            'src': divs[i].get('source')
        });
        divs[i].adopt(img);

    }


}
function checkWidth(){

    if ( jQuery('.joomimg').length ) return;

    var wx = 0;

    if(wx == 0 && jQuery('#content_scroll').length){
        wc = $('content_scroll').getSize().x;
        $('main_images').setStyle('width', wc+20+'px');
    }

    if(wx == 0 ) wx = $('main-content').getSize().x;


    if(!jQuery('#content_scroll').length){
        $('main_images').setStyle('width', wx+20+'px');

    }

    jQuery('.content-orange').css('width', wx+'px');
    jQuery('.content-orange .componentheading').css('width', wx+30+'px');
    jQuery('.content-orange .contentheading').css('width', wx+30+'px');

}
window.addEvent('resize', function(){
    checkScrollerWidth();
});

function checkScrollerWidth() {
    if($('scrollbar2') && $('main-content') && $('handle2'))
        makeScrollbar( $('main-content'), $('main_images'), $('scrollbar2'), $('handle2'), true);
}

function makeScrollbar(content,checkContent,scrollbar,handle,horizontal,ignoreMouse){
    if(checkContent.getScrollSize().x < scrollbar.getSize().x) {
        handle.setStyle('display','none');
        if ( jQuery('#sc-next').length ) $('sc-next').setStyle('display','none');
        if ( jQuery('#sc-back').length ) $('sc-back').setStyle('display','none');
        return;
    }

    handle.setStyle('display','block');

    var steps = (horizontal?(content.getScrollSize().x - content.getSize().x):(content.getScrollSize().y - content.getSize().y))
    slider = new Slider(scrollbar, handle, {
        steps: steps,
        mode: (horizontal?'horizontal':'vertical'),
        onChange: function(step){
            var x = (horizontal?step:0);
            var y = (horizontal?0:step);
            if(type=="Scroll")
                content.scrollTo(x,y);
            else
                jQuery('#main-content').animate({scrollLeft:x}, 300);
            //content.scrollTo(x,y);
            checkImages();
        }
    }).set(0);


    content.addEvent('DOMMouseScroll', function(e){
        type ="Scroll";
        e = new Event(e).stop();
        var step = slider.step - e.wheel * 30;
        slider.set(step);

    });

    content.addEvent('mousewheel', function(e){
        type ="Scroll";
        e = new Event(e).stop();
        var step = slider.step - e.wheel * 30;
        slider.set(step);
    });
}

/* Touch Events */
jQuery(function(){
    jQuery("#main-content").swipe({
        swipe:function(event, direction, distance, duration, fingerCount) {
            if (direction == 'right'){
                moveRightTouch(distance);
            } else if (direction == 'left'){
                moveLeftTouch(distance);
            }
        },
        threshold:0
    });
});
function moveLeftTouch(theDistance){
    type ="slideLeft";
    var step = slider.step + theDistance;
    slider.set(step);
}
function moveRightTouch(theDistance){
    type ="slideRight";
    var step = slider.step - theDistance;
    slider.set(step);
}
/* End Touch Events */


function moveLeft(){
    type ="slideLeft";
    var step = slider.step + 300;
    slider.set(step);
    //t = setTimeout("moveLeft()",600);
}
function moveRight(){
    type ="slideRight";
    var step = slider.step - 300;
    slider.set(step);
    //t = setTimeout("moveRight()",600);
}
function stopMove(){
    type = "Scroll";
    clearTimeout(t);
}