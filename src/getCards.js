import React from 'react'
import AddCard from './addCards'
let key = 'ba87a31628190bbc103cc08a388aacea'
let token = '3f3274f0b90505daeca4f34e41b3714051f6838d8967d963592176d8d5750817'
class GetCard extends React.Component{
    constructor(props){
        super(props)
        this.state={
            cards:[]

        }
    }
    componentDidMount(){
        this.getCardOfList()
    }

    getCardOfList(){
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
    render(){
        return(
            <div>
            {this.state.cards.map(list=>{
                return(
                    <div className="cards">
                        <p>{list.name}</p>
                        </div>
                        
                        
                    )
                    }
                    
                )

            }
            <AddCard  id={this.props.id}/>
            
            </div>

        )
    }


}
export default GetCard;