import React from 'react'
import Api from './api';
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
            this.state.newCard = ""
        }
    }
    handleChange = e => {
        console.log(e.target.value)
        this.setState({
            newCard: e.target.value
        })
    }
    postCardOnList() {
        Api.addNewCardToTheList(this.state.newCard, this.props.id)
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