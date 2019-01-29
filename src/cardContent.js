import React from 'react'
import CheckListItem from './checklist'
import Api from './api';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';

export default class CardContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checklist: [],
            show: false,
            newCheckList: ''

        }
    }
    componentDidMount() {
        this.getCheckList()
    }

    getCheckList() {

        Api.getCheckListRequest(this.props.cardId)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    checklist: data.checklists
                })
            })
    }
    postCheckList() {
        Api.postRequestForCheckList(this.props.cardId,this.state.newCheckList)     
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
            this.state.newCheckList = ""
        }
    }
    handleChange = e => {
        console.log(e.target.value)
        this.setState({
            newCheckList: e.target.value
        })
    }

    deleteCheckList(id) {
        console.log("delete")
       
        Api.deleteRequestForCheckList(id)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let deletedCheckList = this.state.checklist.filter(checklist => id !== checklist.id)

                this.setState({
                    checklist: deletedCheckList

                })
            })


    }

    render() {
        return (
            <div className="checklist-popup">


                <div className="container  modal-content animate" >
                    
                    <h1>{this.props.cardName}</h1>
                    
                    <span onClick={this.props.checklistclose} className="close" >&times;</span>
                    <hr></hr>

                        {this.state.checklist.map(checklist => {
                            return (
                                <div>
                                    <div className="checklist">
                                        
                                        <h2>{checklist.name}</h2>

                                        <IconButton aria-label="Delete" onClick={this.deleteCheckList.bind(this, checklist.id)}>
                                      <DeleteIcon fontSize="small" />
                                        </IconButton>
                                       
                                    </div>
                                    <CheckListItem checklistid={checklist.id} cardid={this.props.cardId}></CheckListItem>
                                </div>


                            )
                        })
                        }
                        <div className="input-button add-checklist">
                            <hr ></hr>

                            <Input className="add-checklist"
                                type="text"
                                id="add-card"
                                value={this.state.newCheckList}
                                label="+Add  checklist"
                                onKeyPress={this.handleKeyPress}
                                onChange={this.handleChange}
                            />
                        </div>
                  






                </div>
                
            </div>

        )
    }
}