import React, { Component } from 'react'
import './scrumboard.css'

export class AddTask extends Component {
    state = {
        content: ""
    }

    openModal =()=>{
        this.setState({
            isOpen: true
        })
    }

    closeModal =()=>{
        this.setState({
            isOpen: false
        })
    }

    handleChange = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    submitTask = (e) =>{
        e.preventDefault()
        this.setState({
            isOpen: false
        })
        this.props.addTask(this.state)
        this.setState({
            content: ""
        })
    }

  render() {
    return (
      <div>
        <div id="modal" className={this.state.isOpen ? "show" : "hidden"}>
                <div className="header">
                    <h3>Add a new task</h3>
                    <h3 onClick={() => this.closeModal()}>X</h3>
                </div>
                <form onSubmit={this.submitTask}>
                    <input type='text' onChange={this.handleChange} value={this.state.content} />
                    <button>Confirm</button>
                </form>
            </div>
            <button onClick={() => this.openModal()}>Add task</button>
      </div>
    )
  }
}

export default AddTask