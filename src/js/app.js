var React = require('react');

var App = module.exports = window.App = {};

//constants
App.ALL_TODOS = "all";
App.ACTIVE_TODOS = "active";
App.COMPLETE_TODOS = "complete";

//components
App.store = require('./stores/todoStore');
App.view = require('./views/main');

React.renderComponent(App.view(), document.querySelector("#view"))