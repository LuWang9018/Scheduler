import React from 'react';
import ReactDOM from 'react-dom';
import {TableGen, NewTableGen} from './timeTable/cellGen.js';
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
			TimeRange = {[6, 11]}
		/>
	</div>,	
  document.getElementById('root')
);
