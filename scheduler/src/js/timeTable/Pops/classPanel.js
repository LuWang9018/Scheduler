import React from 'react';

var moment = require('moment');

export class classPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: '',
            stopTime: '',
            className: '',
            classCode: '',
        };

        this.changeTime() = this.changeTime().bind(this);
        this.changeClass() = this.changeClass().bind(this);
        this.saveClass() = this.saveClass().bind(this);
        this.deleteClass() = this.deleteClass().bind(this);
        this.cancleClass() = this.changeClass().bind(this);
    }

    changeTime() {
        //TODO
        //change or add time for class
    }

    changeClass() {
        //TODO
        //change or add class with code
    }

    saveClass() {
        //TODO
        //modify or create class and time
    }

    deleteClass() {
        //TODO
        //delete a class
    }

    cancleClass() {
        //TODO
        //close the pop window and do nothing changed
    }

    render() {
        return (

        );
    }
}

function panelClass(startTime, stopTime, className, classCode) {
    const panelStyle = {
        backgroundColor: 'white',
        position: 'center',
        height: '100px',
        width: '100px',
        zIndex: '10',
    };

    return React.createElement("div", {style: panelStyle},
        React.createElement("div", {},
            "Start Time: ",
            React.createElement(""),
            "\t",
            "Stop Time: ",
            React.createElement("")),
        "\n",
        React.createElement("div", {},
            "Class Name: ",
            React.createElement(""),
            "\t",
            "Class Code",
            React.createElement("")),
        React.createElement("div", {},
            React.createElement(""),
            React.createElement(""))
    )
}           