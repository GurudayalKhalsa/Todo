var UndoStore = require('./undoStore');
var util = require('../lib/util');
var App = require('../app');

var TodoStore = UndoStore.extend({

  initialize: function(){
    this._super.apply(this, arguments);
    
    //retrieve from local storage
    if(localStorage.ReactTodos){
      this.set("todos", JSON.parse(localStorage.ReactTodos));
    }
    
    //save to local storage every change
    this.on('change', function(){
      localStorage.ReactTodos = JSON.stringify(this.get("todos"));
    });
  },

  create: function(data){
    var todo = {
      title: data.title || '',
      complete: data.complete || false
    };
    
    this.set("todos."+todo.title, todo);
  },

  destroy: function(title){
    var todos = this.get("todos");
    delete todos[title];
    this.set("todos", todos);
  },
  
  update: function(key, data){
    return this.set("todos."+key, data);
  }
});



var store = new TodoStore({todos:{}, nowShowing: App.ALL_TODOS});

module.exports = store;