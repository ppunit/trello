import React from 'react'
import AddCard from './addCards'
import Api from './api'
import DisplayCard from './displayCard'

class GetCards extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cards: [],
            

        }
        this.stateChangeAfterAddingCards = this.stateChangeAfterAddingCards.bind(this)

    }
    componentDidMount() {
        this.getCardOfList()
    }
    newUpdatedCardList = []

    stateChangeAfterAddingCards(newCard) {
        this.newUpdatedCardList = this.state.cards.map(data => {
            return data;

        })
        this.newUpdatedCardList.push(newCard);
       
        this.setState({
            cards: this.newUpdatedCardList
        })
    }
    deleteCardFromTheList(id) {
        Api.deleteCard(id)
            .then(response => response.json())
            .then(data => {

                let updatedCardList = this.state.cards.filter(card => id !== card.id)
                this.setState({
                    cards: updatedCardList
                })
            })
            .catch(error => console.log('parsed failed', error))


    }

    getCardOfList() {

        Api.getCardRequest(this.props.id)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    cards: data
                })
                
            })
            .catch(error => console.log('parsed failed', error))

    }


    render() {
        
        return (
            <div>
                {this.state.cards.map(card => {
                    return (

                        <div className="cards" key={card.id} >
                            
                            <DisplayCard id={card.id} name={card.name}deleteCard={this.deleteCardFromTheList.bind(this, card.id)}></DisplayCard>

                        </div>)
                })}
                <AddCard updateCardList={this.stateChangeAfterAddingCards} id={this.props.id} />
            </div>)
    }
}
export default GetCards;