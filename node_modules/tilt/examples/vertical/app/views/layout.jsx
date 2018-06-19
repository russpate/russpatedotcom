var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link rel="stylesheet" href="https://code.getmdl.io/1.1.3/material.indigo-pink.min.css" />
          <link rel="stylesheet" href="/main.css" />
        </head>
        <body>

          <div className="mdl-layout__container has-scrolling-header">

            <div className="demo-layout mdl-layout mdl-layout--fixed-header mdl-js-layout mdl-color--grey-100">
              <header className="demo-header mdl-layout__header mdl-layout__header--scroll mdl-color--grey-100 mdl-color-text--grey-800">
                <div className="mdl-layout__header-row">
                  <span className="mdl-layout-title">Material Design Lite</span>
                  <div className="mdl-layout-spacer"></div>
                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
                    <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="search">
                      <i className="material-icons">search</i>
                    </label>
                    <div className="mdl-textfield__expandable-holder">
                      <input className="mdl-textfield__input" type="text" id="search" />
                      <label className="mdl-textfield__label" htmlFor="search">Enter your query...</label>
                    </div>
                  </div>
                </div>
              </header>

              <div className="demo-ribbon"></div>
              <main className="demo-main mdl-layout__content">
                <div className="demo-container mdl-grid">
                  <div className="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone"></div>
                  <div className="demo-content mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--8-col">
                    {this.props.children}
                  </div>
                </div>
              </main>
            </div>

          </div>


          <script defer src="https://code.getmdl.io/1.1.3/material.min.js"></script>
        </body>
      </html>
    );
  }
});
