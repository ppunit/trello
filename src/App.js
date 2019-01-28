import React from 'react'

import Post from './post'

class App extends React.Component {
    //  constructor() {
    //      super();
         
        
    //  }

    
    render(){
        return(
            <div className="background" >
                <header></header>
                <Post />
            </div>

        )
    }

}

export default App