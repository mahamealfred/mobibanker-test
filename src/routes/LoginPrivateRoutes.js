import React, { Component } from 'react'
import {Redirect, Route} from 'react-router-dom';

// export default class PrivateRoute extends Component {
//     render() {
//         return <Route {...this.props}/>
//     }
// }
const PrivateRoute=({auth,component:Component,...rest})=>{
    const Auth=sessionStorage.getItem("mobicash-auth")
    return(
       <Route
       {...rest}
       render={()=>!Auth?(
        <Component/>
       ):(
        <Redirect to="/dashboard"/>
       )
      
    }
       /> 
    )
}
export default PrivateRoute;