import React from 'react'
let key = 'ba87a31628190bbc103cc08a388aacea'
let token = '3f3274f0b90505daeca4f34e41b3714051f6838d8967d963592176d8d5750817'
class AddCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newCard: ''
        }
    }
    handleKeyPress = e => {
        if (e.key === "Enter") {
            console.log(this.state.newCard)
            this.postCardOnList()
            this.state.newCard=""
        }
    }
    handleChange = e => {
        console.log(e.target.value)
        this.setState({
            newCard: e.target.value
        })
    }
    postCardOnList() {
        fetch(`https://api.trello.com/1/cards?name=${this.state.newCard}&pos=top&idList=${this.props.id}&keepFromSource=all&key=${key}&token=${token}`, {
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => {

                console.log(data);
                this.props.updateCardList(data)

            })
            .catch(error => console.log('parsed failed', error))
    }
    render() {
        return (
            <div className="input-button">
                <input
                    type="text"
                    id="add-card"
                    value={this.state.newCard}
                    placeholder="+Add another card"
                    onKeyPress={this.handleKeyPress}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}

export default AddCards