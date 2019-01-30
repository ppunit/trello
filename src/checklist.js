import React from 'react'
import CheckListItem from './checklistItem'
import api from './api';

export default class CheckList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checklistItem: [],
            newItem: '',
            checked: false


        }

    }
    componentDidMount() {
        this.getCheckListItem()
    }

    getCheckListItem() {
        console.log(this.props.checklistid)
        console.log(this.props.cardid)
        api.getRequestForCheckListItem(this.props.checklistid)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    checklistItem: data

                })
            })
    }
    postCheckListItem() {
        api.postRequestForcheckListItem(this.props.checklistid,this.state.newItem,this.state.checked) 
            .then(response => response.json())
            .then(data => {
                let addedItem = this.state.checklistItem.map(item => item)
                addedItem.push(data)
                this.setState({
                    checklistItem: addedItem
                })
            })
    }

    handleKeyPress = e => {
        if (e.key === "Enter") {
            console.log(this.state.newItem)
            this.postCheckListItem()
            this.state.newItem = ''
        }
    }
    handleChange = e => {
        console.log(e.target.value)
        this.setState({
            newItem: e.target.value
        })
    }

    render() {
        return (
            <div>
                {console.log(this.state.checklistItem)}
                {this.state.checklistItem.map(item => {
                    return (
                        <div className="check-item" key={item.id}>

                            <CheckListItem id={item.id} state={item.state} name={item.name} cardId={this.props.cardid} checklistId={this.props.checklistid}></CheckListItem>


                        </div>

                    )
                })}

                <div className="input-button">
                    <input
                        type="text"
                        id="add-card"
                        value={this.state.newItem}
                        placeholder="Add an item"
                        onKeyPress={this.handleKeyPress}
                        onChange={this.handleChange}
                    />
                </div>
            </div>


        )
    }
}