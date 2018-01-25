import React from 'react';

var moment = require('moment');

export class ClassPanel extends React.Component {
    constructor(props) {
        super(props);

        //TODO
        //props.changeClassInfor
        //if it has value then keep or save nothing
        this.state = {
            classNames: this.props.className,
            classCode: this.props.classCode,
            classSection: this.props.classSection,
            startHour: this.props.startHour,
            startMint: this.props.startMint,
            stopHour: this.props.stopHour,
            stopMint: this.props.stopMint,
            placeBuild: this.props.placeBuild,
            placeRoom: this.props.placeRoom,
            profName: this.props.profName,
        };
    }

    Hours() {
        var hour = [];
        for (let i = 0; i < 24; i++) {
            hour[i] = React.createElement("option", {key: i, value: i}, i);
        }
        return hour;
    }

    Mints() {
        var mints = [];
        let j = 0;
        for (let i = 0; i < 60; i++) {
            if ((i % 5) === 0) {
                mints[j] = React.createElement("option", {key: j, value: i}, i);
                j++;
            }
        }
        return mints;
    }

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

    onToggle(event) {
        this.setState({classNames: event.target.value});
        this.setState({classCode: event.target.value});
        this.setState({classSection: event.target.value});
        this.setState({startHour: event.target.value});
        this.setState({startMint: event.target.value});
        this.setState({stopHour: event.target.value});
        this.setState({stopMint: event.target.value});
        this.setState({placeBuild: event.target.value});
        this.setState({placeRoom: event.target.value});
        this.setState({profName: event.target.value});
    }
}

//TODO
//data format

//TODO
//buttons
function DecisionButtons() {
    <div className="AddSectionButton">
        <button className="DecisionButton" id="save" onClick={(event) => this.onToggle(event)}>"Save"</button>
    </div>;
    //Decision Button
    React.createElement("div", {className: "AddSectionButton"},
        React.createElement("button", {
            type: "button",
            className: "DecisionButton",
            id: "save",
            onClick: this.onToggle(event)
        }, "Save"),
        React.createElement("button", {
            type: "button",
            className: "DecisionButton",
            id: "cancel",
            onClick: this.props.onClick
        }, "Cancel"))
}

//TODO
function CreateClassPanel() {
    const panelStyle = {
        backgroundColor: '#7fffd4',
        position: 'absolute',
        height: '400px',
        width: '600px',
        zIndex: '10',
    };

    const groundLevel = {
        backgroundColor: '#A9A9A9',
        position: 'relative',
        borderTop: '50px',
        height: '500px',
        width: '793px',
        zIndex: '9',
        opacity: '0.7',
    };

    var AddClass;
    AddClass = React.createElement("div", {className: "windowPanel"},
        //Add class panel detail
        React.createElement("div", {
                style: panelStyle,
                className: "AddClassWindow"
            },
            React.createElement("div", {className: "panelTitle"}, "New Class"),
            //Class information
            React.createElement("div", {className: "AddSection", id: "ClassInfo"}, "Class: ",
                React.createElement("input", {
                    className: "inputs",
                    id: "ClassName",
                    placeholder: "Class Name",
                    value: this.classNames
                }),
                "   ",
                React.createElement("input", {
                    className: "inputs",
                    id: "ClassCode",
                    placeholder: "Class Code",
                    value: this.classCode
                }),
                "   ",
                React.createElement("input", {
                    className: "inputs",
                    id: "ClassSection",
                    placeholder: "Section",
                    value: this.classSection
                })
            ),
            //Time information
            React.createElement("div", {className: "AddSection", id: "TimeInfo"}, "Start Time: ",
                React.createElement("select", {className: "inputs", id: "StartHour", value: this.startHour},
                    this.Hours()),
                " ",
                React.createElement("select", {className: "inputs", id: "StartMint", value: this.startMint},
                    this.Mints()),
                "   ",
                "Stop Time: ",
                React.createElement("select", {className: "inputs", id: "StopHour", value: this.stopHour},
                    this.Hours()),
                " ",
                React.createElement("select", {className: "inputs", id: "StopMint", value: this.stopMint},
                    this.Mints())),
            //date information
            React.createElement("div", {className: "AddSection", id: "DateSection"}, "Date: ",
                React.createElement("button", {
                    type: "button",
                    className: "SelectButton",
                    id: "Mon"
                }, "Mon"),
                React.createElement("button", {
                    type: "button",
                    className: "SelectButton",
                    id: "Tue"
                }, "Tue"),
                React.createElement("button", {
                    type: "button",
                    className: "SelectButton",
                    id: "Wed"
                }, "Wed"),
                React.createElement("button", {
                    type: "button",
                    className: "SelectButton",
                    id: "Tur"
                }, "Tur"),
                React.createElement("button", {
                    type: "button",
                    className: "SelectButton",
                    id: "Fir"
                }, "Fir"),
                React.createElement("button", {
                    type: "button",
                    className: "SelectButton",
                    id: "Sat"
                }, "Sat"),
                React.createElement("button", {
                    type: "button",
                    className: "SelectButton",
                    id: "Sun"
                }, "Sun")),
            //location information
            React.createElement("div", {className: "AddSection", id: "PlaceInfo"}, "Location: ",
                React.createElement("input", {
                    className: "inputs",
                    id: "PlaceBuilding",
                    placeholder: "Building",
                    value: this.placeBuild
                }),
                "   ",
                React.createElement("input", {
                    className: "inputs",
                    id: "PlaceRoom",
                    placeholder: "Room",
                    value: this.placeRoom
                }),
            ),
            //Prof information,
            React.createElement("div", {className: "AddSection", id: "ProfInfo"}, "Prof: ",
                React.createElement("input", {
                    className: "inputs",
                    id: "ProfName",
                    placeholder: "XXX",
                    value: this.profName
                })),
            //Color section
            React.createElement("div", {className: "AddSection", id: "ColorSection",}, "Color: ",
                React.createElement("button", {type: "button", className: "SelectButton", id: "color1"}),
                React.createElement("button", {type: "button", className: "SelectButton", id: "color2"}),
                React.createElement("button", {type: "button", className: "SelectButton", id: "color3"}),
                React.createElement("button", {type: "button", className: "SelectButton", id: "color4"}),
                React.createElement("button", {type: "button", className: "SelectButton", id: "color5"}),
                React.createElement("button", {type: "button", className: "SelectButton", id: "color6"}),
                React.createElement("button", {type: "button", className: "SelectButton", id: "color7"}))
        ),
        //gray background when panel is on
        React.createElement('div', {
            style: groundLevel,
            className: "groundLevel",
            onClick: this.props.onClick
        }));

    return AddClass;

}