import './App.css';
import { Component } from 'react';
import React from 'react'
import Navigationbar from './components/Navigationbar'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import { SetDetails } from './pages/SetDetails'
import { Home } from './pages/Home'
import {About} from './pages/About'
import {OperationDetails} from './pages/OperationDetails';
import {BarrelDetails} from './pages/BarrelDetails'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
    }
  }

  render() {
    return (
      
      <BrowserRouter>
        <div className = "App">
          <Navigationbar />
        
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/about' exact component={About} />
            <Route path={'/:id'} exact component={SetDetails}/>
            <Route path= {'/:id/ops/:pos'} exact component={OperationDetails}/>
            <Route path= {'/:id/:pos'} exact component={BarrelDetails}/>
          </Switch>

        </div>
      </BrowserRouter>
    )
  }
}

export default App;
