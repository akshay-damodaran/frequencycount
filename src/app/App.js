import React from 'react';

import getApi from '../request';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      n: 0,
      data: [],
    };
  }

  handleChange(n) {
    if(!isNaN(n)) {
      this.setState({
        n,
      });
    }
  }

  handleKeyDown(e) {
    const { n } = this.state;
    if (e.keyCode === 38)
      this.setState({
        n: n + 1,
      });
    if (e.keyCode === 40 && n > 0) {
      this.setState({
        n: n - 1,
      });
    }
  }

  async handleClick() {
    const url = "http://localhost:3000/frequency";
    const { n } = this.state;
    const { isError, response } = await getApi(url, { n });
    if (isError) {
      console.log('Couldn\'t load data');
      this.setState({
        data: [],
      })
      alert(response);
    } else {
      this.setState({
        data: response.data.result,
      })
    }
  }

  renderTable(data) {
    return (
      <table>
        <thead>
          <tr>
            <th>Sr no.</th>
            <th>Word</th>
            <th>Frequency</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.word}>
              <td>{i + 1}</td>
              <td>{row.word}</td>
              <td>{row.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  render() {
    const { n, data } = this.state;
    return (
      <div>
        <h1>Frequency Count</h1>
        <label htmlFor="n-input">Enter value of n : </label>
        <input
          type="text"
          value={n}
          onChange={e => this.handleChange(Number(e.target.value))}
          onKeyDown={e => this.handleKeyDown(e)}
        />
        <button type="button" onClick={() => this.handleClick()}>Submit</button>
        {data.length > 0 && this.renderTable(data)}
      </div>
    );
  }
}

export default App;
