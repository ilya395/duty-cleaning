import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout';
import AuthLayout from './layouts/AuthLayout/AuthLayout';

// import RoutesContext from './context/routesContext';

import { PrivateRoute } from './services/privateRoute';

const useRoutes = (isAuthenticated) => {

    // console.log(isAuthenticated)

    // if (isAuthenticated) {
    //     return (
    //         <Switch>
    //             <Route 
    //                 path="/main"
    //                 render={(props) => {
    //                     return (
    //                         <RoutesContext.Provider value={{...props}}>
    //                             <MainLayout {...props} />
    //                         </RoutesContext.Provider>
    //                     );
    //                 }}
    //             />
    //             <Redirect to="/main" />
    //         </Switch>
    //     )
    // }

    return (
        <Switch>
            <Route 
                path="/auth" 
                render={(props) => {
                    return (
                        // <RoutesContext.Provider value={{...props}}>
                            <AuthLayout {...props} />
                        // </RoutesContext.Provider>
                    );
                }}
            >
            </Route>
            <PrivateRoute 
                path="/"
                exact
                component={MainLayout}
            />
            <Redirect to="/" />
        </Switch>
        
        // <Switch>
        //     <Route path="/auth" exact>
        //         <AuthLayout />
        //     </Route>
        //     <Redirect to="/auth" />
        // </Switch>
    );
}

export default useRoutes;

