import axios from 'axios'
import React, { Component } from 'react'
import "./users.css"

export class Users extends Component {
    constructor(){
        super()

        this.state = {
            users: [],
            loading: true
        }
    }

    componentDidMount(){
        axios.get('http://liveapi.chatscrum.com/scrum/api/scrumusers/')
        .then(response => this.setState({
            users: response.data.slice(0, 9)
        }))
    }

    toggleModal = () => {
        if(this.state.isOpen){
            this.setState({
                isOpen: false
            })
        } else {
            this.setState({
                isOpen: true
            })
        }
    }
  render() {
    return (
      <div className='users'>
        <h4 onClick={()=>{this.toggleModal()}} >Connected Users</h4>
        <div className={this.state.isOpen ? "show" : "hidden"} >
            {this.state.users.map(({nickname, id}) => {
                return(
                    <div key={id} className='users_name' >
                        {nickname}
                    </div>
                )
            })}
        </div>
      </div>
    )
  }
}

export default Users