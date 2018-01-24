import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css';

import {TableGen, NewTableGen} from './timeTable/cellGen.js';
import {RequestData} from './RequestData/RequestData'


ReactDOM.render(
	<div>
		<TableGen 
			Data={RequestData()}
		/>
	</div>,	
  document.getElementById('root')
);
