import React from 'react'
import AddCard from './addCards'
import Api from './api'
import ListContent from './cardContent'

class Cards extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cards: [],
            checklistPopUp:false

        }
        this.stateChangeAfterAddingCards = this.stateChangeAfterAddingCards.bind(this)
        this.hideCheckList=this.hideCheckList.bind(this)
        this.showChecklist=this.showChecklist.bind(this)
        
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
        console.log(this.newUpdatedCardList)
        this.setState({
            cards: this.newUpdatedCardList
        })
    }
    deleteCardFromTheList(id){
       Api.deleteCard(id)
            .then(response => response.json())
            .then(data => {
                
                console.log(data)
                let updatedCardList=this.state.cards.filter(card=>id!==card.id)
                this.setState({
                    cards:updatedCardList
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
                console.log(this.state.cards)
            })
            .catch(error => console.log('parsed failed', error))

    }

    showChecklist=(id)=>{
     this.setState({
         checklistPopUp:true
        })
    }
    hideCheckList=(id)=>{
        console.log("called in hide")
        console.log(id)
        this.setState({ checklistPopUp: false });
      };
    render() {
        console.log("calling from getcards",this.props.id)
        return (
            <div>
                {this.state.cards.map(card => {
                    return (
                        
                        <div className="cards" >
                            {console.log("i am calling",this.state.checklistPopUp)}
                        {this.state.checklistPopUp?<ListContent checklistclose={this.hideCheckList.bind(this,card.id)} cardId={card.id} cardName={card.name}></ListContent>:null}
                           <span onClick= {this.showChecklist.bind(this,card.id)}><p>{card.name}</p></span> 
                            <span onClick={this.deleteCardFromTheList.bind(this,card.id) } style={{display:"block",width:"1px"}} className="close" title="Close Modal">&times;</span>
                        </div>)
                } )}
                   <AddCard updateCardList={this.stateChangeAfterAddingCards} id={this.props.id} />
        </div> )}
}
export default Cards;