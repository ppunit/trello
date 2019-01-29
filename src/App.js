import React from 'react'

import Board from './listContainer'

class App extends React.Component {
    //  constructor() {
    //      super();
         
        
    //  }

    
    render(){
        return(
            <div className="background" >
                <header></header>
                <Board />
            </div>

        )
    }

}

export default App