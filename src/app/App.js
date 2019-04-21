/* global alert */
/* eslint-disable max-len */
import React from 'react';

import getApi from '../request';
import './App.css';

class App extends React.Component {
  static scroll(ref) {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }

  constructor() {
    super();
    this.state = {
      n: 10,
      data: [],
    };
    this.myRef = React.createRef();
  }

  handleChange(n) {
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(n)) {
      this.setState({
        n,
      });
    }
  }

  handleKeyDown(e) {
    const { n } = this.state;
    // Handle up arrow key
    if (e.keyCode === 38) {
      this.setState({
        n: n + 1,
      });
    }

    // Handle down arrow key and making sure n is never less than 0
    if (e.keyCode === 40 && n > 0) {
      this.setState({
        n: n - 1,
      });
    }
  }

  async handleClick() {
    const url = 'http://localhost:3000/frequency';
    const { n } = this.state;
    const { isError, response } = await getApi(url, { n });
    if (isError) {
      console.log('Couldn\'t load data');
      this.setState({
        data: [],
      });
      // eslint-disable-next-line no-alert
      alert(response);
    } else {
      this.setState({
        data: response.data.result,
      });
      App.scroll(this.myRef);
    }
  }

  renderTable(data) {
    const { n } = this.state;
    return (
      <React.Fragment>
        <h2>
          {`${n} Most Occuring Words`}
        </h2>
        <div id="second">
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
        </div>
      </React.Fragment>
    );
  }

  render() {
    const { n, data } = this.state;
    return (
      <div id="container">
        <div className="child-container">
          <div id="first">
            <h1 id="main-head">Frequency Count</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <label htmlFor="input-n">
            Enter value of n :
              <input
                type="text"
                value={n}
                id="input-n"
                name="input-n"
                onChange={e => this.handleChange(Number(e.target.value))}
                onKeyDown={e => this.handleKeyDown(e)}
              />
            </label>
            <br />
            <button className="button primary" type="button" onClick={() => this.handleClick()}>Submit</button>
            <br />
          </div>
        </div>
        {data.length > 0
          && (
          <div ref={this.myRef} className="child-container">
            {this.renderTable(data)}
          </div>
          )
        }
      </div>
    );
  }
}

export default App;
