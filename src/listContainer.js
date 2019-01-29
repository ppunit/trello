import React from 'react'
import ReactDom from 'react-dom'
import Api from './api'
import GetCard from './getCards'
import List from './list'
import api from './api';
let board = '5c47edd01d96813069bd54f3'
let key = 'ba87a31628190bbc103cc08a388aacea'
let token = '3f3274f0b90505daeca4f34e41b3714051f6838d8967d963592176d8d5750817'

class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            lists: [],
            newList:''
        }
        this.fetchData = this.fetchData.bind(this);
    }
    componentDidMount() {
        this.fetchData()
    }

    
    fetchData() {
            Api.getListsOnBoard()
            .then(response => response.json())
            .then(data => {
                this.setState({
                    lists: data,
                    newList:""
                })
            })
            .catch(error => console.log('parsed failed', error))
    
}

    handleKeyPress = e => {
        if (e.key === "Enter") {
            console.log("new list" ,this.state.newList)
            this.AddNewList()
            this.state.newList=""
        }
    }
    handleChange = e => {
        console.log(e.target.value)
        this.setState({
            newList: e.target.value
        })
    }

    AddNewList(){
       Api.postNewListOnBoard(this.state.newList)
        .then(response=>response.json())
        .then(data=>{
            let newListToBeAdded=[];
            newListToBeAdded=this.state.lists.map(list=>list)
            newListToBeAdded.push(data)
            this.setState({
                lists:newListToBeAdded

            })
        })
    }

    deleteList(id){
        Api.deleteListFromTheBoard(id)        
        .then(response=>response.json())
        .then(data=>{

            let listToBeDeleted=[];
            listToBeDeleted=this.state.lists.filter(list=>list.id!==id)
            
            this.setState({
                lists:listToBeDeleted

            })

        })
    }
    render() {
        return (
            <div className="list-container">
                {this.state.lists.map(list => {
                    return (
                        <div className="lists">
                            <List deleteList={this.deleteList.bind(this,list.id)} id={list.id} name={list.name}></List>
                        </div>
                    )
                })}
                <div className="input-button" >
                <input
                    type="text"
                    id="add-card"
                    value={this.state.newList}
                    placeholder="+Add another list"
                    onKeyPress={this.handleKeyPress}
                    onChange={this.handleChange}
                />
            </div>
            </div>)
    }
}

export default Board