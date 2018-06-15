// @flow

import * as _ from "lodash";
import React, {Component} from "react";
import Grid from './Grid';


const N = 3;


type State = {
  current_edit: null | number,
  remove_now: boolean,
  record: string
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

  changeRecord = (id: number, value: string) => {
    this.setState({record: value});
  };

  constructor() {
    super();
    this.state = {
      current_edit: null,
      remove_now: false,
      record: "",
    }
  }

  render() {
    const row_id = _.range(N);


    const grids = row_id.map((i) => _.range(N).map((j) => {
      const id = i * N + j;
      return (<Grid
        key={id}
        id={id}
        row={i}
        column={j}
        trigger_edit={this.triggerEdit}
        exit_edit={this.loseFocus}
        remove={this.state.remove_now}
        edit={this.state.current_edit === id}
        record={this.state.record}
        change={this.changeRecord}
      />)
    }));

    return (
      <div className="Layer" onClick={this.onClick}>{grids}</div>
    );
  }
}

export default Layer;
