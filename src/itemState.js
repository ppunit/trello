import React from 'react'
let key = 'ba87a31628190bbc103cc08a388aacea'
let token = '3f3274f0b90505daeca4f34e41b3714051f6838d8967d963592176d8d5750817'
export default class CheckList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: ''


        }
        this.itemStateChecker = this.itemStateChecker.bind(this)
    }
    componentDidMount() {
        this.itemStateChecker()
    }
    itemStateChecker() {
        if (this.props.state === "incomplete")
            this.setState({
                checked: false
            })
        else
            this.setState({
                checked: true
            })
    }
    itemStateUpdater() {
        if (this.props.state === "incomplete") {
            fetch(`https://api.trello.com/1/cards/${this.props.cardId}/checkItem/${this.props.id}?state=complete&idChecklist=${this.props.checklistId}&key=${key}&token=${token}`, { method: 'PUT' })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.setState({
                        checked: true
                    })
                })
                .catch(error => console.log(error))
        }
        else {
            fetch(`https://api.trello.com/1/cards/${this.props.cardId}/checkItem/${this.props.id}?state=incomplete&idChecklist=${this.props.checklistId}&key=${key}&token=${token}`, { method: 'PUT' })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.setState({
                        checked: false
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