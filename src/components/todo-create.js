import React from 'react';
import _ from 'lodash';

export default class TodoCreate extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null
        };
    }

    // 错误提示

    renderError() {
        if (!this.state.error) { return null; }
        return <p style={{ padding: '5px 10px', background: '#d9534f', color: '#fff' }}>{ this.state.error }</p>;
    }

    render() {
        return (
            <form className="create form-horizontal" onSubmit={this.handleCreate.bind(this) }>
                <div className="form-group">
                    <div className="col-md-10">
                        <input className="form-control" type="text" ref="createInput" placeholder="What needs to be done?" />
                    </div>
                    <div className="col-md-2 text-right">
                        <button type="submit" className="btn btn-default">Create</button>
                    </div>
                </div>
                { this.renderError() }
            </form>
        )
    }

    // 页面加载后创建表单获取焦点

    componentDidMount() {
        this.refs.createInput.focus();
    }

    // 执行创建任务

    handleCreate(event) {
        event.preventDefault();

        const createInput = this.refs.createInput;
        const task = createInput.value;
        const validateInput = this.validateInput(task);

        if (validateInput) {
            this.setState({ error: validateInput });
            return false;
        }

        this.setState({ error: null });
        this.props.createTask(task);
        this.refs.createInput.value = '';
    }

    // 校验输入的任务是否为空或者重复

    validateInput(task) {
        if (!task) {
            return 'Please enter a task!';
        } else if (_.find(this.props.todos, todo => todo.task === task)) {
            return 'Task already exist!';
        } else {
            return null;
        }
    }
}