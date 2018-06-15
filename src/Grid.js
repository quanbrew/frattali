// @flow
import React, {Component} from 'react';

type Props = {
  trigger_edit: (number) => void,
  exit_edit: () => void,
  id: number,
  edit: boolean,
  row: number,
  column: number,
  record: any,
  change: (number, string) => void,
  enter: (number) => void,
  out: () => void,
}

type State = {
  text: string
}

class Grid extends Component<Props, State> {
  handleChange = (event: SyntheticEvent<HTMLTextAreaElement>) => {
    const value = (event.currentTarget: HTMLTextAreaElement).value;
    if (value !== this.props.record) {
      console.log(value);
      this.props.change(this.props.id, value);
    }
  };
  onKeyDown = (event: SyntheticKeyboardEvent<>) => {
    const ESC_CODE = 27;
    if (event.keyCode === ESC_CODE) {
      this.props.exit_edit();
    }
  };
  onClick = (event: SyntheticMouseEvent<>) => {
    event.stopPropagation();
    this.props.trigger_edit(this.props.id);
  };
  onWheel = (e: SyntheticWheelEvent<>) => {
  };

  constructor() {
    super();
    this.state = {
      text: "",
    }
  }

  render() {
    const text = this.props.record;
    const input = (<textarea
        className="text_edit"
        autoFocus
        value={text}
        onKeyDown={this.onKeyDown}
        onWheel={(e) => {
          e.stopPropagation()
        }}
        onChange={this.handleChange}/>
    );

    let inner = null;
    if (this.props.edit) {
      inner = input;
    }
    else {
      inner = <pre>{text}</pre>;
    }
    return (
      <div
        className={"Grid row-" + this.props.row + " col-" + this.props.column}
        onClick={this.onClick}
        onWheel={this.onWheel}
      >
        <div className="inner">{inner}</div>
        <button onClick={(e) => {
          e.stopPropagation();
          this.props.enter(this.props.id)
        }}>⬇︎
        </button>
      </div>
    );
  }
}


export default Grid;
