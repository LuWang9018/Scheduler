import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css';

import {NewTableGen, TableGen} from './timeTable/cellGen.js';
import {AddData, RequestData, UpdateData} from './RequestData/RequestData'


ReactDOM.render(
    <div>
        <TableGen
            Data={RequestData()}
            RequestData={(props) => RequestData(props)}
            UpdateData={(props) => UpdateData(props)}
            AddData={(props) => AddData(props)}
        />
    </div>,
    document.getElementById('root')
);
