// @flow

import * as _ from "lodash";
import React, {Component} from "react";
import Grid from './Grid';

type State = {
  current_edit: null | number,
  remove_now: boolean,
}

type Props = {}

class Layer extends Component<Props, State> {
  triggerEdit = (x: number) => {
    this.setState({current_edit: x});
  };
  loseFocus = () => {
    this.setState({current_edit: null});
  };
  onClick = () => {
    this.loseFocus();
    this.setState((old_state) => {
      old_state.remove_now = !old_state.remove_now;
      return old_state;
    });
  };

  constructor() {
    super();
    this.state = {
      current_edit: null,
      remove_now: false,
    }
  }

  render() {
    const idx = _.chunk([...Array(9).keys()], [3]);
    const grid_table = idx.map((row) => {
      return (<tr>
        {row.map((x) => {
          return (<Grid
            key={x}
            id={x}
            trigger_edit={this.triggerEdit}
            exit_edit={this.loseFocus}
            remove={this.state.remove_now}
            edit={this.state.current_edit === x}/>);
        })}
      </tr>)
    });

    return (
      <table onClick={this.onClick}>{grid_table}</table>
    );
  }
}

export default Layer;
