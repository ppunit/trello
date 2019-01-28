import React from 'react'
import ReactDom from 'react-dom'
import Api from './apicalling'
import GetCard from './getCards'
let board = '5c47edd01d96813069bd54f3'
let key = 'ba87a31628190bbc103cc08a388aacea'
let token = '3f3274f0b90505daeca4f34e41b3714051f6838d8967d963592176d8d5750817'

class Post extends React.Component {
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
        fetch(`https://api.trello.com/1/boards/${board}/lists?cards=none&card_fields=all&filter=open&fields=all&key=${key}&token=${token}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    lists: data,
                    newList:""
                })
                console.log(this.state.lists);
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
        fetch(`https://api.trello.com/1/lists?name=${this.state.newList}&idBoard=${board}&pos=bottom&key=${key}&token=${token}`,{method:'POST'})
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
        fetch(`https://api.trello.com/1/lists/${id}/closed?value=true&key=${key}&token=${token}`,{method:'PUT'})
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
                            <h3>{list.name}</h3>
                            <span  onClick={this.deleteList.bind(this,list.id)}style={{display:"block",width:"1px"}} className="close" title="Close Modal">&times;</span>
                            <GetCard id={list.id} />
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

export default Post