import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class TimeTable extends React.Component {

	
	CreateColumn(){
		for (var i = 0; i < 7; i++) {
			React.createElement("tr")
		}
	}
	render() {
		return (
			React.createElement("div", {id: "TimeTableDIV"},
				React.createElement("table", {id: "TimeTable"},
					this.CreateColumn()
				)
			)
		);
	}
}

// ========================================

ReactDOM.render(
  <TimeTable />,
  document.getElementById('root')
);
