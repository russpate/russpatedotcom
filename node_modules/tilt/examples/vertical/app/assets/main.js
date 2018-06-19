(function () {
  class App {
    constructor () {
      console.log('Hello');
    }

    init () {
      console.log('init');
    }
  }

  var app = new App();
  app.init();
})();
