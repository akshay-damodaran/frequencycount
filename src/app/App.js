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
    this.setState({
      n,
    });
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
        <p>Frequency Count</p>
        <label htmlFor="n-input">Enter value of n : </label>
        <input type="number" value={n} onChange={e => this.handleChange(Number(e.target.value))} />
        <button type="button" onClick={() => this.handleClick()}>Submit</button>
        {data.length > 0 && this.renderTable(data)}
      </div>
    );
  }
}

export default App;
