import React, {Component} from "react";
import TodoService from "../Services/TodoService";
import { Link } from "react-router-dom";

export default class TodoList extends Component {
    constructor(props){
        super(props);
        this.retrieveTodoList = this.retrieveTodoList.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);

        this.state = {
            todoList: [],
            currentTodo: null,
            currentIndex: -1,
        };
    }

    componentDidMount(){
        this.retrieveTodoList();
    }

    retrieveTodoList(){
        TodoService.getTodo()
            .then(response => {
                this.setState({todoList: response.data});
                console.log(response.data);
            })
            .catch(e=> {console.log(e)});
    }

    refreshList(){
        this.retrieveTodoList();
        this.setState({
            currentTodo: null,
            currentIndex: null,
        });
    }


    deleteTodo(todo){
        TodoService.deleteTodo(todo.id)
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e =>{
                console.log(e);
            });
    }


    render(){
        const {todoList, currentTodo, currentIndex} = this.state;

        return(
            <div className="container">
                <div className="text-right">
                    <Link to={"/add"}>
                        <button type="button" className="btn btn-primary">New Todo</button>
                    </Link>
                </div>
                <div>
                    {
                        todoList && todoList.map( (todo, index) => (
                            <div className="shadow-sm border border-primary rounded mt-3 text-start pl-3 pr-3 pt-2 pb-2" key={todo.id}>
                                <div className="row text-start">
                                    <div className="col-11">
                                        <Link to={"/edit/" + todo.id}>
                                            <h3>{todo.name}</h3>
                                        </Link>
                                        &#x1F4C5; {todo.date} 
                                        <span className="font-italic">
                                            {todo.description == "" ? "": " - " + todo.description}
                                        </span>
                                        <br />
                                    </div>
                                    <div className="col-1">
                                        <button type="button" 
                                            className="btn btn-outline-secondary float-right mt-3 mr-2" 
                                            onClick={()=> this.deleteTodo(todo)}>&#x2610;</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }


}