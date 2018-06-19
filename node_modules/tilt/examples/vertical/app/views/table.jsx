import React from 'react';

class TableComponent extends React.Component {
  render() {
    return (
      <div>
        <div className="mdl-cell mdl-cell--12-col">
          <a className="mdl-button mdl-js-button mdl-button--raised" href="/create">
            Create
          </a>
        </div>
        <table className="mdl-data-table mdl-js-data-table mdl-data-table--selectable">
          <thead>
            <tr>
              {Object.keys(this.props.users[0]).map((key, j) => {
                return <th key={ j }>{ key }</th>
              })}
            </tr>
          </thead>
          <tbody>
            {this.props.users.map(function(user, i) {
              return (<tr key={user.id}>
                {Object.keys(user).map((key, j) => {
                  return <td key={ j }>{user[key] + '' }</td>
                })}
              </tr>);
            })}
          </tbody>
        </table>
      </div>
		);
  }
}

module.exports = TableComponent;
