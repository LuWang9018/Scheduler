import React from 'react';
import ReactDOM from 'react-dom';
import {TableGen} from './timeTable/cellGen.js';
import '../css/index.css';

import test from '../assets/try.jpg';
// ========================================
/*
Add user setting later
*/
//
function GenUI(){
	var UI = React.createElement("")
}


ReactDOM.render(
	<div>
		<TableGen 
		//TODO
		//change Time format later!
			TimeRange={[6, 11]}
		/>
		<img src = {test} alt='test'/>
	</div>,	
  document.getElementById('root')
);
