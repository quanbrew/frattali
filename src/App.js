// @flow
import React, {Component} from 'react';
import './App.css';
import Layer from './Layer';


type State = {}

class App extends Component<void, State> {
  constructor() {
    super();
  }


  render() {
    return (
      <main className="App">
        <Layer/>
      </main>
    );
  }
}

export default App;
