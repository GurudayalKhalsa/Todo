var React = require('react');
var Todo = require('./todo');

var List = React.createClass({
  render: function(){
    var todos = [];
    var allTodos = this.props.todos;
    for (var key in allTodos) { todos.push(<Todo key={key} todo={allTodos[key]} />); }
    
    return (
      <ul className="todos">{todos}</ul>
    );
  }
});

module.exports = List;