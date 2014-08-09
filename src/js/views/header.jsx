var React = require('react');
var TodoActions = require('../actions/todoActions');

var Header = React.createClass({
  getInitialState: function(){
    return {text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    TodoActions.create({title: this.state.text});
    this.setState({text: ''});
  },
  render: function(){
    return (
      <header>
        <form onSubmit={this.handleSubmit}>
          <input type="text" 
                 className="add" 
                 value={this.state.text} 
                 onChange={this.onChange} 
                 placeholder="What do you need to do?" 
          />
        </form>
      </header>
    )
  }
});

module.exports = Header;