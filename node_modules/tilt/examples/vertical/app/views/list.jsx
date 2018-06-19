var React = require('react');

var Layout = require('./layout.jsx');
var TableComponent = require('./table.jsx');

class CreateForm extends React.Component {
  render() {
    var child = this.props.users.length ? <TableComponent {...this.props} /> : (<p>No user created yet. <a href="/create">Create one</a></p>);

    return (
      <Layout title={this.props.title}>
        {child}
      </Layout>
    );
  }
}

module.exports = CreateForm;
