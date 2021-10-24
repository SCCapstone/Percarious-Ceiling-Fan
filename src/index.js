import React from 'react';
import ReactDOM from 'react-dom';

//Define component
export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
	}
//Call when button clicked
  handleButtonClicked() {
    //Do Something
  }
//Define component layout
  render() {
    return (
      <div>
        <label>
          Set speed of fan:
        </label>
        <button onClick={this.handleButtonClicked.bind(this)}>
          Click me!
        </button>
        <br/>
        <label>
			Fan Speed:
        </label>
     </div>

    );
  }
}
//Render component
ReactDOM.render(
  <SearchForm/>,
  document.getElementById('root')
);
