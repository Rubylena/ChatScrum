import React, { Component } from 'react'
import './scrumboard.css'
import data from '../static/data'
import Tasks from '../tasks/Tasks';
import AddTask from './AddTask';
import Users from './users/Users';
import axios from 'axios';

export class Scrumboard extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: data,
            isOpen: false,
            tasks: [],
            loading: true
        }
    }

    addTask = (task) => {
        task.id = Math.random().toString(36).slice(2,9)
        let tasks = [...this.state.tasks, task]
        this.setState({
            tasks
        })
    }

    deleteTask = (id) => {
        const tasks = this.state.tasks.filter( task => {
            return(
            task.id !== id
        )})
        this.setState({
            tasks
        })
    }

    componentDidMount(){
        axios.get('http://liveapi.chatscrum.com/scrum/api/scrumgoals/')
        .then(res => {
            this.setState({
                tasks: res.data
            })
        })
    }

  render() {
    return (
      <div className='scrum'>
        <nav>
            <h1>CHATSRUM</h1>
            <div>
                <p>User Type: {data.usertype}</p>
                <p>Project Name: {data.projecttype}</p>
            </div>
        </nav>
        <p>Hello {data.fullname}, Welcome to your Scrumboard</p>

        <div >
            <Tasks data={this.state.tasks} deleteTask={this.deleteTask} />

            <AddTask addTask={this.addTask} />
        </div>

        <Users />
      </div>
    )
  }
}

export default Scrumboard