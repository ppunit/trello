import React from 'react'
import GetCard from './getCards'
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
export default function List(props)
{
   
    return(
        <div>
             <h3>{props.name}</h3>
             <IconButton aria-label="Delete" className="delete-list" onClick={props.deleteList}>
                                      <DeleteIcon fontSize="small" />
                                         </IconButton>
            
            <GetCard id={props.id} />
        </div>
    )
}