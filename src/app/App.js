import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      n: 0,
    };
  }

  handleChange(n) {
    this.setState({
      n,
    });
  }

  render() {
    const { n } = this.state;
    return (
      <div>
        <p>Frequency Count</p>
        <label htmlFor="n-input">Enter value of n : </label>
        <input type="number" value={n} onChange={e => this.handleChange(Number(e.target.value))} />
      </div>
    );
  }
}

export default App;
