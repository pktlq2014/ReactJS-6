import React, { Component } from 'react';
import {Redirect, Route} from 'react-router-dom';
// class PrivateRoute extends Component {
//     render() {
//         return (
//             <div>
                
//             </div>
//         );
//     }
// }


const PrivateRoute = ({component: Component, ...rest}) => {
    return <Route {...rest} component={(props) => {
        const dataLogin = JSON.parse(localStorage.getItem('dataLogin'));
        if(dataLogin) {
            return <Component {...props}/>
        }
        else {
            return <Redirect to={`/signin`}/>
        }
    }}/>
}
export default PrivateRoute;