var React = window.React = require('react');
var Router = require('../lib/director').Router;
var App = require('../app');
var TodoStore = require('../stores/todoStore'),
    TodoActions = require('../actions/todoActions'),
    Header = require('./header'),
    List = require('./list'),
    Footer = require('./footer');

var TodoApp = React.createClass({
  
  getInitialState: function(){
    return TodoStore.get();
  },
  
  componentWillMount: function(){
    //set state on change
    TodoStore.on('change', function(){
      this.setState(TodoStore.get());
    }.bind(this));
    
    window.addEventListener("keydown", function(e){
      if(e.target.tagName.toLowerCase() === "input") return;

      if(String.fromCharCode(e.keyCode).toLowerCase() === "z"){
        //undo
        if(e.metaKey && !e.shiftKey){
          e.preventDefault();
          TodoStore.undo();
        }
        //redo
        else if(e.metaKey && e.shiftKey){
          e.preventDefault();
          TodoStore.redo();
        }
      }
    });
  },
  
  render: function(){
    
    var unfilteredTodos = this.state.todos, filter = this.state.nowShowing || App.ALL_TODOS, todos = {};
    for(var i in unfilteredTodos){
      if(filter === App.ALL_TODOS) todos[i] = unfilteredTodos[i];
      if(filter === App.ACTIVE_TODOS && unfilteredTodos[i].complete === false) todos[i] = unfilteredTodos[i];
      if(filter === App.COMPLETE_TODOS && unfilteredTodos[i].complete === true) todos[i] = unfilteredTodos[i];
    }
    
    return  <div>
              <Header />
              <List todos={todos} />
              <Footer todos={todos} nowShowing={this.state.nowShowing} />
            </div>
  }
});

module.exports = TodoApp;