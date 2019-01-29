
let board = '5c47edd01d96813069bd54f3'
let key = 'ba87a31628190bbc103cc08a388aacea'
let token = '3f3274f0b90505daeca4f34e41b3714051f6838d8967d963592176d8d5750817'


function getListsOnBoard()

 {
    console.log("hii")
       return fetch(`https://api.trello.com/1/boards/${board}/lists?cards=none&card_fields=all&filter=open&fields=all&key=${key}&token=${token}`,{
           headers:{
               'Content-Type':'application/json',
               'Accept':'application/json'
           }
       })
            
    }


    function postNewListOnBoard(name)
    {
        return  fetch(`https://api.trello.com/1/lists?name=${name}&idBoard=${board}&pos=bottom&key=${key}&token=${token}`,{method:'POST'})
    }
    

function deleteListFromTheBoard(id)
{
   return fetch(`https://api.trello.com/1/lists/${id}/closed?value=true&key=${key}&token=${token}`,{method:'PUT'})
}

function deleteCard(id){
    return  fetch(`https://api.trello.com/1/cards/${id}?closed=true&key=${key}&token=${token}`, {
        method: 'PUT'
    })
}


function getCardRequest(id){
    return fetch(`https://api.trello.com//1/lists/${id}/cards?fields=id,name,badges,labels&key=${key}&token=${token}`)
}

function addNewCardToTheList(newCardName,id){
    return fetch(`https://api.trello.com/1/cards?name=${newCardName}&pos=top&idList=${id}&keepFromSource=all&key=${key}&token=${token}`, {
        method: 'POST'
    })
}

function getCheckListRequest(cardId){
    return fetch(`https://api.trello.com/1/cards/${cardId}?attachment_fields=all&checkItemStates=true&checklists=all&checklist_fields=all&sticker_fields=all&key=${key}&token=${token}`)
}

function postRequestForCheckList(cardId,nameOfCheckList){
   return  fetch(`https://api.trello.com/1/checklists?idCard=${cardId}&name=${nameOfCheckList}&key=${key}&token=${token}`, {
        method: 'post'
    })
}

function deleteRequestForCheckList(id)
{
    return fetch(`https://api.trello.com/1/checklists/${id}?key=${key}&token=${token}`, {
        method: 'delete'
    })
}

function getRequestForCheckListItem(checklistid){
    return fetch(`https://api.trello.com/1/checklists/${checklistid}/checkItems?&key=${key}&token=${token}`)
}

function postRequestForcheckListItem(checklistid,newItem,checked)
{
    return fetch(`https://api.trello.com/1/checklists/${checklistid}/checkItems?name=${newItem}&pos=bottom&checked=${checked}&key=${key}&token=${token}`, { method: 'POST' })
}

function putrequestForCheckListItem(cardId,id,checklistId,state)
{
    return fetch(`https://api.trello.com/1/cards/${cardId}/checkItem/${id}?state=${state}&idChecklist=${checklistId}&key=${key}&token=${token}`, { method: 'PUT' })
}

export default {getListsOnBoard,postNewListOnBoard,deleteListFromTheBoard,deleteCard,getCardRequest,addNewCardToTheList,getCheckListRequest,postRequestForCheckList,deleteRequestForCheckList,getRequestForCheckListItem,postRequestForcheckListItem,putrequestForCheckListItem};