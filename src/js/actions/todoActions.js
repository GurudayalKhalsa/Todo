var TodoStore = require('../stores/todoStore');

var actions = {
  create: function(data){
    if(typeof data === "string"){
      data = {title: data};
    }
    TodoStore.create(data);
  },
  destroy: function(key){
    if(typeof key !== "string"){
      key = key.title;
    }
    TodoStore.destroy(key);
  },
  update: function(key, data){
    return TodoStore.update(key, data);
  },
  setShowing: function(key){
    return TodoStore.set("nowShowing", key);
  }
};

module.exports = actions;