// @flow
import React, {Component} from 'react';
import './App.css';
import Layer from './Layer';


type State = {}

class App extends Component<void, State> {
  render() {
    return (
      <main className="App">
        <Layer/>
      </main>
    );
  }
}

export default App;
