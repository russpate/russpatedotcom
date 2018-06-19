var React = require('react');

var HelloMessage = React.createClass({
  render: function() {
    return (<div>Bonjour {this.props.name}</div>);
  }
});

module.exports = HelloMessage;
