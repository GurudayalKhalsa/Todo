var React = require('react');
var addons = React.addons;
var cx = addons.classSet;
var TodoActions = require('../actions/todoActions');

var Todo = React.createClass({
  
  onChange: function(e){
    TodoActions.update(this.props.key + ".complete", !this.props.todo.complete);
  },
  
  remove: function(){
    return TodoActions.destroy(this.props.todo);
  },
  
  render: function(){
        
    var nameClasses = cx({
      'name': true,
      'complete': this.props.todo.complete
    });
    
    return (
      <li className="todo">
        <input type="checkbox" checked={this.props.todo.complete} onChange={this.onChange} />
        <div className={nameClasses}>{this.props.todo.title}</div>
        <button className="remove" onClick={this.remove}>x</button>
      </li> 
    )
  }
});

module.exports = Todo;