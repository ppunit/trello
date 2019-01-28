import React from 'react'
let key = 'ba87a31628190bbc103cc08a388aacea'
let token = '3f3274f0b90505daeca4f34e41b3714051f6838d8967d963592176d8d5750817'
export default class CheckList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checklist: [],
            show:false

        }
    }
    componentDidMount(){
        this.getCheckList()
    }

    getCheckList() {
        fetch(`https://api.trello.com/1/cards/${this.props.cardId}/checklists?checkItems=all&checkItem_fields=name%2CnameData%2Cpos%2Cstate&filter=all&fields=all&key=${key}&token=${token}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    checklist: data,
                    newCheckList:''
                })
            })
    }
    postCheckList(){
        fetch(`https://api.trello.com/1/cards/id/checklists?name=${newCheckList}&key=${key}&token=${token}`,{method:'POST'})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // this.setState({
                //     checklist: data
                // })
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
  
    render() {
        return (
            <div class="checklist-popup">


                <div class="container  modal-content animate" >
                    <h3>Checklist</h3>
                    <span onClick={this.props.checklistclose} className="close" >&times;</span>
                    <div>
                    {this.state.checklist.map(checklist => {
                        return (
                            <div>
                            <input type="checkbox"></input>
                            <p>{checklist.name}</p>
                             <a >Delete...</a> 
                            </div>
       
                               )
                        })
                    }
                    <div className="input-button">
                <input
                    type="text"
                    id="add-card"
                    value={this.state.newCard}
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