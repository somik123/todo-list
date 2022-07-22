import React, {Component} from "react";
import { Redirect, Route } from "react-router-dom";
import TodoService from "../Services/TodoService";

export default class CreateTodo extends Component {

    constructor(props){
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.saveTodo = this.saveTodo.bind(this);

        this.state = {
            name: "",
            description: "",
            date: "",
            completed: false
        };
    }

    onChangeName(e){
        this.setState({name: e.target.value});
    }

    onChangeDescription(e){
        this.setState({description: e.target.value});
    }

    onChangeDate(e){
        this.setState({date: e.target.value});
    }

    saveTodo(){
        var data = {
            name: this.state.name,
            description: this.state.description,
            date: this.state.date
        };

        TodoService.createTodo(data)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    description: response.data.description,
                    date: response.data.date,
                    completed: true
                });
                console.log(response.data);
            })
            .catch(e =>{console.log(e)});

            
    }

    newTodo(){
        this.setState({
            name: "",
            description: "",
            date: "",
            completed: false
        });
    }

    render(){
        if(this.state.completed){
            return ( <Redirect to="/" />)
        }
        else {
            return(
                <div className="container">
                    <div className="form-group">
                        <lable htmlFor="name">Name</lable>
                        <input type="text" className="form-control" id="TodoName" required 
                        value={this.state.name} onChange={this.onChangeName} name="name" />
                    </div>
                    <div className="form-group">
                        <lable htmlFor="description">Description</lable>
                        <input type="text" className="form-control" id="TodoDescription" required 
                        value={this.state.description} onChange={this.onChangeDescription} name="description" />
                    </div>
                    <div className="form-group">
                        <lable htmlFor="date">Date</lable>
                        <input type="date" className="form-control" id="TodoDate" required 
                        value={this.state.date} onChange={this.onChangeDate} name="date" />
                    </div>

                    <button onClick={this.saveTodo} className="btn btn-success">Save</button>
                </div>
            )
        }
    }
    
}