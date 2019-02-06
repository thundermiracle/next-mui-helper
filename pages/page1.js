import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from 'next/link';

class Page1 extends React.PureComponent {
  state = {
    inputText: '',
  }

  componentDidMount() {
    console.log('render only once');
  }

  onTextFieldChange = (e) => {
    this.setState({
      inputText: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <TextField
          name="text1"
          onChange={this.onTextFieldChange}
          value={this.state.inputText}
          label="Input Test1"
        />
        <Link href="/">
          <Button>To Top</Button>
        </Link>
      </div>
    );
  }
}

export default Page1;
