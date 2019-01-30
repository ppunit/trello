import React from 'react'
import Api from './api'
import List from './list'
class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            lists: [],
            newList: ''
        }
        this.fetchListData = this.fetchListData.bind(this);
    }
    componentDidMount() {
        this.fetchListData()
    }


    fetchListData() {
        Api.getListsOnBoard()
            .then(response => response.json())
            .then(data => {
                this.setState({
                    lists: data,
                    newList: ""
                })
            })
            .catch(error => console.log('parsed failed', error))

    }

    handleKeyPress = e => {
        if (e.key === "Enter") {
            console.log("new list", this.state.newList)
            this.AddNewList()
            this.state.newList = ""
        }
    }
    handleChange = e => {
        console.log(e.target.value)
        this.setState({
            newList: e.target.value
        })
    }

    AddNewList() {
        Api.postNewListOnBoard(this.state.newList)
            .then(response => response.json())
            .then(data => {
                let newListToBeAdded = [];
                newListToBeAdded = this.state.lists.map(list => list)
                newListToBeAdded.push(data)
                this.setState({
                    lists: newListToBeAdded

                })
            })
    }

    deleteList(id) {
        Api.deleteListFromTheBoard(id)
            .then(response => response.json())
            .then(data => {

                let listUpdatedAfterDeletedList = [];
                listUpdatedAfterDeletedList = this.state.lists.filter(list => list.id !== id)

                this.setState({
                    lists: listUpdatedAfterDeletedList

                })

            })
    }
    render() {
        return (
            <div className="list-container">
                {this.state.lists.map(list => {
                    return (
                        <div className="lists" key={list.id}>
                            <List deleteList={this.deleteList.bind(this, list.id)} id={list.id} name={list.name}></List>
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