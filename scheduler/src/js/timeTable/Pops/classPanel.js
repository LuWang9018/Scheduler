import React from 'react';

var moment = require('moment');

export class ClassPanel extends React.Component {
    constructor(props) {
        super(props);

        //TODO
        //props.changeClassInfo
        //if it has value then keep or save nothing
        this.state = {
            classNames: this.props.Name,
            classCode: this.props.Code,
            classSection: this.props.Section,
            startHour: this.props.TimeFromH,
            startMint: this.props.TimeFromMin,
            stopHour: this.props.TimeToH,
            stopMint: this.props.TimeToMin,
            placeBuild: this.props.LocationB,
            placeRoom: this.props.LocationR,
            profName: this.props.Prof,
            classType: this.props.Type,
            classColor: this.props.Color,
        };

        console.log("Class Name is: " + this.classNames);
        console.log("Class Code is: " + this.classCode);
    }

    Hours() {
        const hour = [];
        for (let i = 0; i < 24; i++) {
            hour[i] = React.createElement("option", {key: i, value: i}, i);
        }
        return hour;
    }

    Mints() {
        const mints = [];
        let j = 0;
        for (let i = 0; i < 60; i++) {
            if ((i % 5) === 0) {
                mints[j] = React.createElement("option", {key: j, value: i}, i);
            }
        }
        return mints;
    }

    //Add whole panel
    createPanel() {
        //Add class panel detail
        return React.createElement("div", {className: "AddClassWindow"},
            //Title information
            React.createElement("div", {className: "panelTitle"},
                React.createElement("div", {className: "TitleTitle"},
                    "New Class")),
            //Class information
            React.createElement("div", {className: "AddSection", id: "ClassInfo"},
                React.createElement("div", {className: "classTitle"}, "Class: "),
                <input className="inputs" id="ClassName" placeholder="Class Name"/>,
                "   ",
                <input className="inputs" id="ClassCode" placeholder="Class Code"/>,
                "   ",
                <input className="inputs" id="ClassSection" placeholder="Section"/>),
            //Time information
            React.createElement("div", {className: "AddSection", id: "TimeInfo"},
                React.createElement("div", {className: "StartTime"}, "Start Time: "),
                React.createElement("select", {className: "inputs", id: "StartHour", value: this.startHour},
                    this.Hours()),
                " ",
                React.createElement("select", {className: "inputs", id: "StartMint", value: this.startMint},
                    this.Mints()),
                "   ",
                React.createElement("div", {className: "StopTime"}, "Stop Time: "),
                React.createElement("select", {className: "inputs", id: "StopHour", value: this.stopHour},
                    this.Hours()),
                " ",
                React.createElement("select", {className: "inputs", id: "StopMint", value: this.stopMint},
                    this.Mints())),
            //date information
            React.createElement("div", {className: "AddSection", id: "DateSection"},
                React.createElement("div", {className: "DateTime"}, "Date: "),
                <button className="SelectButton" id="Mon">{"Mon"}</button>,
                <button className="SelectButton" id="Tue">{"Tue"}</button>,
                <button className="SelectButton" id="Wed">{"Wed"}</button>,
                <button className="SelectButton" id="Thu">{"Thu"}</button>,
                <button className="SelectButton" id="Fri">{"Fri"}</button>,
                <button className="SelectButton" id="Sat">{"Sat"}</button>,
                <button className="SelectButton" id="Sun">{"Sun"}</button>),
            //location information
            React.createElement("div", {className: "AddSection", id: "PlaceInfo"},
                React.createElement("div", {className: "LocationTitle"}, "Location: "),
                <input className="inputs" id="PlaceBuilding" placeholder="Building"/>,
                "   ",
                <input className="inputs" id="PlaceRoom" placeholder="Room"/>),
            //Add prof name
            React.createElement("div", {className: "AddSection", id: "ProfInfo"},
                React.createElement("div", {className: "ProfTitle"}, "Prof: "),
                <input className="inputs" id="ProfName" placeholder="XXX"/>),
            //Add color section
            React.createElement("div", {className: "AddSection", id: "ColorSection",},
                React.createElement("div", {className: "ColorTitle"}, "Color: "),
                React.createElement("button", {type: "button", className: "SelectButton", id: "color1"}),
                React.createElement("button", {type: "button", className: "SelectButton", id: "color2"}),
                React.createElement("button", {type: "button", className: "SelectButton", id: "color3"}),
                React.createElement("button", {type: "button", className: "SelectButton", id: "color4"}),
                React.createElement("button", {type: "button", className: "SelectButton", id: "color5"}),
                React.createElement("button", {type: "button", className: "SelectButton", id: "color6"}),
                React.createElement("button", {type: "button", className: "SelectButton", id: "color7"})),
            React.createElement(GenDecisionButton, {onClick: this.props.onClick}),
            //Add gray background
            React.createElement('div', {
                className: "groundLevel",
                onClick: this.props.onClick
            }));
    };

    passPanel() {
        if (this.props.OnOff) {
            return this.createPanel();
        } else {
            return null;
        }
    };

    render() {
        return this.passPanel();
    }
}

function GenDecisionButton(props) {
    return React.createElement("div", {className: "AddSectionButton"},
        <GenSaveButton
            onClick={() => props.onClick({OnOff: false})}
        />,
        <GenCancelButton
            onClick={() => props.onClick({OnOff: false})}
        />
    )
}

function GenSaveButton(props) {
    return React.createElement("button", {
            className: "DecisionButton",
            id: "save",
            onClick: props.onClick
        }, "Save"
    );
}

function GenCancelButton(props) {
    return React.createElement("button", {
            className: "DecisionButton",
            id: "cancel",
            onClick: props.onClick
        }, "Cancel"
    );
}