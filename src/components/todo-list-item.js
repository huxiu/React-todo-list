import React from 'react';

export default class TodoListItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        };
    }

    // 渲染任务内容

    renderTaskSection() {
        const { task, isCompleted } = this.props;

        const taskStyle = {
            color: isCompleted ? '#5cb85c' : '#d9534f',
            cursor: 'pointer'
        };

        if (this.state.isEditing) {
            return (
                <label className="col-md-7 text-left">
                    <form onSubmit={this.onSaveClick.bind(this) }>
                        <input className="form-control input-sm" defaultValue={task} ref="editInput" type="text"/>
                    </form>
                </label>
            )
        }

        return (
            <label className="col-md-7 text-left text" style={ taskStyle } onClick={this.props.toggleTask.bind(this, task) }>
                {task}
            </label>
        )
    }

    // 渲染状态显示

    renderStateSection() {
        const { isCompleted } = this.props;

        if (isCompleted) {
            return (
                <div className="col-md-2 text-right">
                    <span className="label label-success">done</span>
                </div>
            )
        }

        return (
            <div className="col-md-2 text-right">
                <span className="label label-danger">undone</span>
            </div>
        )
    }

    // 渲染任务功能操作

    renderActionSection() {
        if (this.state.isEditing) {
            return (
                <div className="col-md-3 text-right">
                    <button className="btn btn-primary btn-xs" onClick={this.onSaveClick.bind(this) }>Save</button>
                    &nbsp; &nbsp; &nbsp;
                    <button className="btn btn-primary btn-xs" onClick={this.onCancelClick.bind(this) }>Cancel</button>
                </div>
            )
        }

        return (
            <div className="col-md-3 text-right">
                <button className="btn btn-primary btn-xs" onClick={this.onEditClick.bind(this) }>Edit</button>
                &nbsp; &nbsp; &nbsp;
                <button className="btn btn-primary btn-xs" onClick={this.props.deleteTask.bind(this, this.props.task) }>Delete</button>
            </div>
        )
    }

    render() {
        return (
            <div className="form-group">
                { this.renderTaskSection() }
                { this.renderStateSection() }
                { this.renderActionSection() }
            </div>
        )
    }

    // 开启编辑后表单获取焦点

    componentDidUpdate() {
        if (this.state.isEditing) {
            this.refs.editInput.focus();
        }
    }

    // 开启编辑状态

    onEditClick() {
        this.setState({ isEditing: true });
        // this.refs.editInput.getDOMNode().focus();
    }

    // 取消编辑状态

    onCancelClick() {
        this.setState({ isEditing: false });
    }

    // 保存编辑

    onSaveClick(event) {
        event.preventDefault();

        const oldTask = this.props.task;
        const newTask = this.refs.editInput.value;
        this.props.saveTask(oldTask, newTask);
        this.setState({ isEditing: false });
    }

}