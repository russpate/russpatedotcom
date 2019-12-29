'use strict'

// custom cursor - https://stackoverflow.com/questions/51281666/animate-custom-cursor-when-hovering-on-a-link

$(document).mousemove(function(e) {

    const target = $(event.target);

    // const cursor = document.querySelector('.cursor');
    const cursor = $('.cursor');

    // update position of cursor
    cursor.css('left', e.pageX-10).css('top', e.pageY-10);
    
    // set link and hovered cursor
    const isLinkTag = target.is('a');
    const isHovered = cursor.hasClass('hoveredCursor');
    
    // toggle the cursor class if necessary 
    if(isLinkTag && !isHovered) {
      cursor.addClass('hoveredCursor');
    } else if(!isLinkTag && isHovered) {
      cursor.removeClass('hoveredCursor');
    }
  });
  
//   $(document).mouseleave(function(e) {
//     const cursor = $('.cursor');
//     cursor.hide()
//   });

//   $(document).mouseenter(function(e) {
//     const cursor = $('.cursor');
//     cursor.show()
//   });