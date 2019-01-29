import React from 'react'
import Api from './api'

export default class CheckListItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: '',
            itemState:this.props.state


        }
        this.itemStateChecker = this.itemStateChecker.bind(this)
    }
    componentDidMount() {
        this.itemStateChecker()
    }
    itemStateChecker() {
        if (this.state.itemState === "incomplete")
            this.setState({
                checked: false,
                
            })
        else
            this.setState({
                checked: true,
                
            })
    }
    itemStateUpdater() {
        if (this.state.itemState === "incomplete") {
            Api.putrequestForCheckListItem(this.props.cardId,this.props.id,this.props.checklistId,"complete")
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.setState({
                        checked: true,
                        itemState:"complete"
                    })
                })
                .catch(error => console.log(error))
        }
        else {
            Api.putrequestForCheckListItem(this.props.cardId,this.props.id,this.props.checklistId,"incomplete")
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.setState({
                        checked: false,
                        itemState:"incomplete"
                    })
                })
                .catch(error => console.log(error))
        }
    }
    render() {

        return (
            <div className="check-item">
                <input type="checkbox" onClick={this.itemStateUpdater.bind(this)} ></input>
                {!this.state.checked ? <p>{this.props.name}</p> : <strike>{this.props.name}</strike>}

            </div>
        )
    }
}
