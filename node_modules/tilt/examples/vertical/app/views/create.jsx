var React = require('react');

var Layout = require('./layout.jsx');

var CreateForm = React.createClass({
  render: function() {
    return (<Layout title={this.props.title}>
      <form action="/create" method="POST">
        <div className="mdl-grid">

          <div className="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--12-col">
            <input className="mdl-textfield__input" type="text" id="username" name="username" />
            <label className="mdl-textfield__label" htmlFor="username">Username</label>
          </div>

          <div className="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--12-col">
            <button className="mdl-button mdl-js-button mdl-button--raised" type="submit">
              Save
            </button>
          </div>

        </div>
      </form>
    </Layout>);
  }
});

module.exports = CreateForm;
