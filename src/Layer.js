// @flow

import * as _ from "lodash";
import React, {Component} from "react";
import Grid from './Grid';


const N = 3;


type State = {
  current_edit: null | number,
  record: Record
}

type Props = {}


function Record(parent) {
  this.parent = parent;
  this.children = _.range(N * N).map(() => {
    return {"text": "", "child": null}
  });
}

class Layer extends Component<Props, State> {
  triggerEdit = (x: number) => {
    this.setState({current_edit: x});
  };
  loseFocus = () => {
    this.setState({current_edit: null});
  };
  onClick = () => {
    this.loseFocus();
  };

  enter = (id: number) => {
    let record = this.state.record;
    if (record.children[id].child === null) {
      record.children[id].child = new Record(record);
    }
    this.setState({record: record.children[id].child});
  };

  pop = () => {
    const record = this.state.record;
    if (record.parent !== null) {
      this.setState({record: this.state.record.parent})
    }
  };

  changeRecord = (id: number, value: string) => {
    let record = this.state.record;
    record.children[id].text = value;
    this.setState({record: record});
  };

  constructor() {
    super();
    this.state = {
      current_edit: null,
      record: new Record(null),
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
        edit={this.state.current_edit === id}
        record={this.state.record.children[id].text}
        change={this.changeRecord}
        enter={this.enter}
        out={this.pop}
      />)
    }));

    return (
      <div className="Layer" onClick={this.onClick}>
        <div className="grids">{grids}</div>
        <button className="pop" onClick={this.pop}>⇧</button>
      </div>
    );
  }
}

export default Layer;
