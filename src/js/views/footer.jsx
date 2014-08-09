var React = require('react');
var addons = require('react-addons');
var cx = addons.classSet;

var TodoActions = require('../actions/todoActions');


var Footer = React.createClass({
  showType: function(type){
    return TodoActions.setShowing(type);
  },
  render: function(){
    
    var len = Object.keys(this.props.todos).length;
    var amount = len + (len !== 1 ? " Items" : " Item");
    
    var all = cx({ 'selected': this.props.nowShowing === App.ALL_TODOS });
    var active = cx({ 'selected': this.props.nowShowing === App.ACTIVE_TODOS });
    var complete = cx({ 'selected': this.props.nowShowing === App.COMPLETE_TODOS });
    
    return (
      <footer>
        <span className="amount">{amount}</span>
        
        <div className="filter">
          <a onClick={this.showType.bind(this, "all")} className={all}>All</a>
          <a onClick={this.showType.bind(this, "active")} className={active}>Active</a>
          <a onClick={this.showType.bind(this, "complete")} className={complete}>Complete</a>
        </div>
      </footer>
    )
  }
});

module.exports = Footer;