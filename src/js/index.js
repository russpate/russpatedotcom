'use strict'

Page Transitions
$("nav a").on("click", function (event) {

  event.preventDefault()

  const href = $(this).attr("href")

  window.history.pushState(null, null, href)

  $("nav a").removeClass("active")
  $(this).addClass("active")

  $.ajax({
    url: href,
    success: function (data) {
      $("section").fadeOut(250, function () {
        const newPage = $(data).filter("section").html()

        $("section").html(newPage)

        // $("section").fadeIn(250)
      })
    }
  })

})

// sets basic active state on nav
// $("nav a").on("click", function (event) {

//   $("nav a").removeClass("active")
//   $(this).addClass("active")

// })


// clipboard.js 

// var clip = new ClipboardJS('.copier');

// clip.on("success", function () {
//   const alert = document.body.insertAdjacentHTML('beforeend', '<div class="confirmation">Copied! <a class="confirmation-close">close</a></div>');
// });

// clip.on("error", function () {
//   document.body.insertAdjacentHTML('beforeend', '<div>that didn\'t work.</div>');
// });