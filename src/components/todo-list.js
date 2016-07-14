import React from 'react';
import _ from 'lodash';
import TodoCount from './todo-count';
import TodoListItem from './todo-list-item';

export default class TodoList extends React.Component {

    // 渲染单条任务
    
    renderTodoItems() {
        const props = _.omit(this.props, 'todos');
        return _.map(this.props.todos, (todo, index) => <TodoListItem key={index} {...todo} {...props} />);
    }

    render() {
        return (
            <div className="list form-horizontal">
                <TodoCount todos={ this.props.todos }/>
                { this.renderTodoItems() }
            </div>
        )
    }
}