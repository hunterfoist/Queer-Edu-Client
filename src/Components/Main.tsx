import * as React from 'react';
import { Component } from 'react';

export interface MainProps {
    sessionToken: any
}
 
export interface MainState {
    
}
 
class Main extends React.Component<MainProps, MainState> {
    

    render() { 
        return (
            <div>
                <p>Heyo from Main</p>
            </div>
        );
    }
}
 
export default Main;