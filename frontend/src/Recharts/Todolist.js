import React, { Component } from 'react';
import './Todolist.css';

class TodoList extends Component {
  render () {
    console.log(this.props.items);
    if(this.props.items){
      var items = this.props.items.map((item, index) => {
        return (
          <TodoListItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
        );
      });
    }
    return (
      <ul className="list-group"> {items} </ul>
    );
  }
}
  
class TodoListItem extends Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }
  onClickClose() {
    var index = parseInt(this.props.index);
    this.props.removeItem(index);
  }
  onClickDone() {
    var index = parseInt(this.props.index);
    this.props.markTodoDone(index);
  }
  render () {
    var todoClass = this.props.item.done ? 
        "done" : "undone";
    return(
      <li className="list-group-item ">
        <div className={todoClass} >
          {/* <span className="glyphicon glyphicon-ok icon" aria-hidden="true" onClick={this.onClickDone}></span> */}
          <span onClick={this.onClickDone} >{this.props.item.value}</span>
          <button type="button" className="close" onClick={this.onClickClose}>&times;</button>
        </div>
      </li>     
    );
  }
}
  
class TodoHeader extends Component {
  render () {
    return <h3>Devoirs</h3>;
  }
}

class TodoApp extends Component {
  constructor (props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);

    this.state = {todoItems: this.props.todoItems};

    
  }

  removeItem (itemIndex) {
    const array = this.state.todoItems;
    array.splice(itemIndex, 1);
    this.setState({todoItems: array});
  }

  markTodoDone(itemIndex) {
    const array = this.state.todoItems;
    var todo = array[itemIndex];
    array.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done ? array.push(todo) : array.unshift(todo);
    this.setState({todoItems: array});  
  }

  render() {
    return (
      <div id="main">
        <TodoHeader />
        <TodoList items={this.state.todoItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone}/>
      </div>
    );
  }
}
export default TodoApp;
