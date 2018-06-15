// @flow
import React, {Component} from 'react';

type Props = {
  trigger_edit: (number) => void,
  exit_edit: () => void,
  id: number,
  edit: boolean,
  remove: boolean,
}

type State = {
  text: string
}

class Grid extends Component<Props, State> {
  handleChange = (event: SyntheticEvent<HTMLTextAreaElement>) => {
    const value = (event.currentTarget: HTMLTextAreaElement).value;
    this.setState({text: value});
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

  constructor() {
    super();
    this.state = {
      'text': "",
    }
  }

  render() {
    const input = (<textarea className="text_edit" autoFocus value={this.state.text} onKeyDown={this.onKeyDown}
                             onChange={this.handleChange}/>);

    let inner = null;
    if (this.props.edit) {
      inner = input;
    }
    else {
      inner = <p>{this.state.text}</p>;
    }
    return (
      <td className={this.props.remove ? "Grid Remove-Grid" : "Grid"}
          onClick={this.onClick}>
        {inner}
      </td>
    );
  }
}


export default Grid;
