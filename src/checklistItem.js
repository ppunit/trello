import React from 'react'
import ItemState from './itemState'
let key = 'ba87a31628190bbc103cc08a388aacea'
let token = '3f3274f0b90505daeca4f34e41b3714051f6838d8967d963592176d8d5750817'
export default class CheckList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checklistItem: [],
            newItem:'',
            checked:false
            

        }
       
    }
    componentDidMount(){
        this.getCheckListItem()
    }

    getCheckListItem() {
        console.log(this.props.checklistid)
        console.log(this.props.cardid)
        fetch(`https://api.trello.com/1/checklists/${this.props.checklistid}/checkItems?&key=${key}&token=${token}`)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                this.setState({
                    checklistItem: data
                    
                })
            })
    }
    postCheckListItem(){
        fetch(`https://api.trello.com/1/checklists/${this.props.checklistid}/checkItems?name=${this.state.newItem}&pos=bottom&checked=${this.state.checked}&key=${key}&token=${token}`,{method:'POST'})
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            let addedItem=this.state.checklistItem.map(item=>item)
            addedItem.push(data)
            this.setState({
                checklistItem:addedItem
            })
        })
    }
   
    handleKeyPress = e => {
        if (e.key === "Enter") {
            console.log(this.state.newItem)
            this.postCheckListItem()
            this.state.newItem=''
        }
    }
    handleChange = e => {
        console.log(e.target.value)
        this.setState({
            newItem: e.target.value
        })
    }

    render(){
        return(
            <div>
                {console.log(this.state.checklistItem)}
                {this.state.checklistItem.map(item=>{
                    return(
                        <div className="check-item" key={item.id}>
                        
                        <ItemState id={item.id} state={item.state} name={item.name} cardId={this.props.cardid} checklistId={this.props.checklistid}></ItemState>
                        
                        
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