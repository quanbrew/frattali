import React, { Component } from 'react';
import './App.css';



class Grid extends Component {
  constructor() {
    super();
    this.state = {
      'text': "",
    }
  }

  handleChange = (event) => {
    this.setState({text: event.target.value});
  };


  render() {
    const input = (<textarea value={this.state.text} onChange={this.handleChange} />);
    return (
      <div className="Grid" onDoubleClick={() => this.props.trigger_edit(this.props.id)}>
        { this.props.edit ? input : <p>{this.state.text}</p> }
      </div>
    );
  }
}



class App extends Component {
  constructor() {
    super();
    this.state = {
      current_edit: null
    }
  }

  editNodeText = (x) => {
    this.setState({ current_edit: x });
  };

  loseFocus = () => {
    console.log("lose focus");
  };

  render() {
    return (
      <main className="App" onClick={this.loseFocus}>
        {[...Array(9).keys()].map((x) => <Grid key={x} id={x} trigger_edit={this.editNodeText} edit={this.state.current_edit === x} />)}
      </main>);
  }
}

export default App;
