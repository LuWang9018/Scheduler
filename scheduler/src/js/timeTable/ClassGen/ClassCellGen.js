import React, {Component} from 'react';

const moment = require('moment');


function GenClassCells(props) {
    const DayArr = ["Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday",
        "Sunday"];

    const unityPX = 1;

    const divStyle = {
        position: 'absolute',
        top: '0px',
        left: '0px',
        margin: '0px',
        padding: '0px 0px',
        //border: '0',
        height: '0px',
        width: (100.00 / 7).toString() + "%",
        'backgroundColor': props.Class.Color[props.index],
        color: 'black',
        border: '0.1px solid black',
        'boxSizing': 'border-box',
        "marginLeft": "0px",
    };
    const startTime = props.TimeRange.MinTime;
    let timeDiff = props.Class.TimeFrom[props.index].diff(startTime);

// console.log("startTime: ");
// console.log(startTime);
// console.log("timeDiff: ");
// console.log(timeDiff);

    const duration = moment.duration(timeDiff);
    const minutes = duration.asMinutes();

    const timeDiff2 = props.Class.TimeTo[props.index].diff(props.Class.TimeFrom[props.index]);
    const duration2 = moment.duration(timeDiff2);
    const minutes2 = duration2.asMinutes();

    divStyle.left = ((DayArr.indexOf(props.Date) * (100.00 / 7))).toString() + "%";
    divStyle.top = (30 + minutes * unityPX).toString() + "px";
    divStyle.height = (minutes2 * unityPX).toString() + "px";
    //divStyle.marginLeft = DayArr.indexOf(props.Date).toString() + "px";

    return React.createElement("div",
        {
            style: divStyle,
            key: props.Class.Name + " ",
            onClick: props.onClick
        },
        props.Class.Name +
        props.Class.Code + '-' +
        props.Class.Section + ' (' +
        props.Class.Types[props.index] + ')',
        <br/>,
        props.Class.LocationB[props.index] + props.Class.LocationR[props.index]
    );
}

class GenAClassForATimeRange extends Component {
    constructor(props) {
        super(props);

    }

    GenAClassForATimeRange() {
        return this.props.Class.Date[this.props.index].map((Date, index) =>
            <GenClassCells
                Class={this.props.Class}
                Date={Date}
                key={Date + index}
                TimeRange={this.props.TimeRange}
                onClick={() => this.props.onClick({
                    AddClassWindowOn: true,
                    Class: this.props.Class
                })}
                index={this.props.index}
            />
        );
    }

    render() {
        return this.GenAClassForATimeRange();
    }
}

class GenClassForAllDay extends Component {
    constructor(props) {
        super(props);
    }

    ClassForAllDay() {

        return this.props.Class.Date.map((Date, index) =>
            <GenAClassForATimeRange
                Class={this.props.Class}
                Date={Date}
                key={Date + index}
                TimeRange={this.props.TimeRange}
                index={index}
                onClick={() => this.props.onClick({
                    AddClassWindowOn: true,
                    Class: this.props.Class
                })}
            />
        );
    }

    render() {
        return this.ClassForAllDay();
    }
}

export function GenAllClasses(props) {
    return props.Class.map((Class, index) =>
        <GenClassForAllDay
            TimeRange={props.TimeRange}
            Class={Class}
            key={Class + index}
            onClick={(i) => props.onClick(i)}
        />
    );
}