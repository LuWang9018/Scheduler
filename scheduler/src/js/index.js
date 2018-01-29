import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css';

import {TableGen, NewTableGen} from './timeTable/cellGen.js';
import {RequestData, UpdateData, AddData} from './RequestData/RequestData'


ReactDOM.render(
	<div>
		<TableGen 
			Data={RequestData()}
			RequestData={() => RequestData()}
			UpdateData={(props) => UpdateData(props)}
			AddData={(props) => AddData(props)}
		/>
	</div>,	
  document.getElementById('root')
);
