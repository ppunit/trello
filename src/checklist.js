import React from 'react'
import CheckListItem from './checklistItem'
let key = 'ba87a31628190bbc103cc08a388aacea'
let token = '3f3274f0b90505daeca4f34e41b3714051f6838d8967d963592176d8d5750817'
export default class CheckList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checklist: [],
            show:false,
            newCheckList:''

        }
    }
    componentDidMount(){
        this.getCheckList()
    }

    getCheckList() {
       
        fetch(`https://api.trello.com/1/cards/${this.props.cardId}?attachment_fields=all&checkItemStates=true&checklists=all&checklist_fields=all&sticker_fields=all&key=${key}&token=${token}`)
            .then(response => response.json())
            .then(data => {
                
                this.setState({
                    checklist:data.checklists
                    
                })
            })
    }
    postCheckList() {
        console.log("post")
        console.log(this.props.cardId)
        fetch(`https://api.trello.com/1/checklists?idCard=${this.props.cardId}&name=${this.state.newCheckList}&key=${key}&token=${token}`,{
            method:'post'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let newChecklistToBeAdd = this.state.checklist.map(checklist => checklist)
                newChecklistToBeAdd.push(data)
                this.setState({
                     checklist: newChecklistToBeAdd
                      })
                    })


    }
    handleKeyPress = e => {
        if (e.key === "Enter") {
            console.log(this.state.newCheckList)
            this.postCheckList()
            this.state.newCheckList=""
        }
    }
    handleChange = e => {
        console.log(e.target.value)
        this.setState({
            newCheckList: e.target.value
        })
    }

    deleteCheckList(id){
        console.log("deleting..")
        console.log(id)
        fetch(`https://api.trello.com/1/checklists/${id}?key=${key}&token=${token}`,{
            method:'delete'
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            let deletedCheckList = this.state.checklist.filter(checklist =>id!==checklist.id)
                
                this.setState({
                     checklist: deletedCheckList
        
                      })
                    })

        
    }
  
    render() {
        return (
            <div className="checklist-popup">


                <div className="container  modal-content animate" >
                    <h3>Checklist</h3>
                    <span onClick={this.props.checklistclose} className="close" >&times;</span>
                    <div>
                        
                    {this.state.checklist.map(checklist => {
                        return (
                            <div>
                            <div className="checklist">
                            <input type="checkbox"></input>
                            <p>{checklist.name}</p>
                            
                             <a onClick={this.deleteCheckList.bind(this,checklist.id)}>Delete...</a> 
                             
                            </div>
                            <CheckListItem  checklistid={checklist.id} cardid={this.props.cardId}></CheckListItem>
                            </div>
                            

                        )
                        })
                    }
                    <div className="input-button">
                <input
                    type="text"
                    id="add-card"
                    value={this.state.newCheckList}
                    placeholder="+Add  checklist"
                    onKeyPress={this.handleKeyPress}
                    onChange={this.handleChange}
                />
            </div>
                    </div>






                </div>
            </div>
           
        )
    }
}