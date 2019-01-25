import React from 'react'
import ReactDom from 'react-dom'
import Api from './apicalling'
import GetCard from './getCards'
let board='5c47edd01d96813069bd54f3'
let key = 'ba87a31628190bbc103cc08a388aacea'
let token = '3f3274f0b90505daeca4f34e41b3714051f6838d8967d963592176d8d5750817'

class Post extends React.Component {
     constructor() {
         super();
         this.state={
             lists:[],cards:[]

         }
         
        this.fetchData=this.fetchData.bind(this);
     }

     componentDidMount(){
        this.fetchData()
        
       
        

     }
     fetchData(){
        
        fetch(`https://api.trello.com/1/boards/${board}/lists?cards=none&card_fields=all&filter=open&fields=all&key=${key}&token=${token}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    lists:data
                   })
                   console.log(this.state.lists);
            })
            .catch(error => console.log('parsed failed', error))

            
        }
        



           
    render(){
       
        return(
            <div className="list-container">
             {this.state.lists.map(list=>{
                 return(
                     <div className="lists">
                         <h3>{list.name}</h3>
                         <GetCard id={list.id} />
                     
                     
                     </div>
                 )

             })}

            </div>

        )
    }

}

export default Post