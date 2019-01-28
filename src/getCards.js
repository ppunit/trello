import React from 'react'
import AddCard from './addCards'
import Checklist from './checklist'
let key = 'ba87a31628190bbc103cc08a388aacea'
let token = '3f3274f0b90505daeca4f34e41b3714051f6838d8967d963592176d8d5750817'
class GetCard extends React.Component {
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
        console.log("in parent", newCard)
        console.log(this.state.cards)
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
        console.log(id)
        fetch(`https://api.trello.com/1/cards/${id}?closed=true&key=${key}&token=${token}`, {
            method: 'PUT'
        })
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
        fetch(`https://api.trello.com//1/lists/${this.props.id}/cards?fields=id,name,badges,labels&key=${key}&token=${token}`)
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
        console.log("called")
        console.log(id)
      

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
        return (
            <div>
                {this.state.cards.map(list => {
                    return (
                        
                        <div className="cards" >
                            {console.log("i am calling",this.state.checklistPopUp)}
                        {this.state.checklistPopUp?<Checklist checklistclose={this.hideCheckList.bind(this,list.id)} cardId={list.id}></Checklist>:null}
                           <span onClick= {this.showChecklist.bind(this,list.id)}><p>{list.name}</p></span> 
                            <span onClick={this.deleteCardFromTheList.bind(this,list.id) } style={{display:"block",width:"1px"}} className="close" title="Close Modal">&times;</span>
                        </div>)
                } )}
 <AddCard updateCardList={this.stateChangeAfterAddingCards} id={this.props.id} />
        </div> )}
}
export default GetCard;