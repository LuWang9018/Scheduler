import React from 'react';

var moment = require('moment');

export class ClassPanel extends React.Component {
    constructor(props) {
        super(props);
        /*
        this.state = {
            startTime: '',
            stopTime: '',
            dateTime: '',
            className: '',
            classCode: '',
            classSection: '',
            classLocation: '',
            profName: '',
            classType: '',
            color: '',
        };
       */
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
        //0 5 10 15 20 25 30 35 40 45 50 55
        for (let i = 0; i < 60; i++) {
            if ((i % 5) === 0) {
                mints[j] = React.createElement("option", {key: j, value: i}, i);
                j++;
            }
        }
        return mints;
    }

    createPanel() {
        const panelStyle = {
            backgroundColor: '#7FFFD4',
            position: 'center',
            height: '150px',
            width: '1000px',
            zIndex: '10',
            opacity: '1.0',
        };

        const groundLevel = {
            backgroundColor: '#A9A9A9',
            position: 'absolute',
            borderTop: '50px',
            height: '100%',
            width: '100%',
            zIndex: '9',
            opacity: '0.8',
        };

        var AddClass =
            React.createElement('div', {
                    //style: groundLevel,
                    className: "groundLevel"
                },
                React.createElement("div", {
                        //style: panelStyle,
                        className: "AddClassWindow",
                    },
                    //Class information
                    React.createElement("div", {className: "AddSection", id: "ClassInfo"}, "Class Name: ",
                        React.createElement("input", {className: "inputs", id: "ClassName"}),
                        "   ",
                        "Class Code: ",
                        React.createElement("input", {className: "inputs", id: "ClassCode"}),
                        "   ",
                        "Section: ",
                        React.createElement("input", {className: "inputs", id: "ClassSection"})),
                    //Time information
                    React.createElement("div", {className: "AddSection", id: "TimeInfo"}, "Start Time: ",
                        React.createElement("select", {className: "inputs", id: "StartHour"},
                            this.Hours()),
                        " ",
                        React.createElement("select", {className: "inputs", id: "StartMint"},
                            this.Mints()),
                        "   ",
                        "Stop Time: ",
                        React.createElement("select", {className: "inputs", id: "StopHour"},
                            this.Hours()),
                        " ",
                        React.createElement("select", {className: "inputs", id: "StopMint"},
                            this.Mints())),
                    //date information
                    React.createElement("div", {className: "AddSection", id: "DateSection"}, "Date: ",
                        React.createElement("button", {type: "button", className: "SelectButton", id: "Mon"}, "Mon"),
                        React.createElement("button", {type: "button", className: "SelectButton", id: "Tue"}, "Tue"),
                        React.createElement("button", {type: "button", className: "SelectButton", id: "Wed"}, "Wed"),
                        React.createElement("button", {type: "button", className: "SelectButton", id: "Tur"}, "Tur"),
                        React.createElement("button", {type: "button", className: "SelectButton", id: "Fir"}, "Fir"),
                        React.createElement("button", {type: "button", className: "SelectButton", id: "Sat"}, "Sat"),
                        React.createElement("button", {type: "button", className: "SelectButton", id: "Sun"}, "Sun")),
                    //location information
                    React.createElement("div", {className: "AddSection", id: "PlaceInfo"}, "Location: ",
                        React.createElement("input", {className: "inputs", id: "PlaceBuilding", value: "Building"}),
                        "   ",
                        React.createElement("input", {className: "inputs", id: "PlaceRoom", value: "Room"}),
                    ),
                    //Prof information,
                    React.createElement("div", {className: "AddSection", id: "ProfInfo"}, "Prof: ",
                        React.createElement("input", {className: "inputs", id: "ProfName"})),
                    //Color section
                    React.createElement("div", {className: "AddSection", id: "ColorSection"}, "Color: ",
                        React.createElement("button", {type: "button", className: "SelectButton", id: "color1"}),
                        React.createElement("button", {type: "button", className: "SelectButton", id: "color2"}),
                        React.createElement("button", {type: "button", className: "SelectButton", id: "color3"}),
                        React.createElement("button", {type: "button", className: "SelectButton", id: "color4"}),
                        React.createElement("button", {type: "button", className: "SelectButton", id: "color5"}),
                        React.createElement("button", {type: "button", className: "SelectButton", id: "color6"}),
                        React.createElement("button", {type: "button", className: "SelectButton", id: "color7"})),
                    React.createElement("div", {className: "AddSectionButton"},
                        React.createElement("button", {
                            type: "button",
                            className: "DecisionButton",
                            id: "save"
                        }, "Save"),
                        React.createElement("button", {
                            type: "button",
                            className: "DecisionButton",
                            id: "cancel"
                        }, "Cancel"))
                ));
        return AddClass;
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


    /*
    this.changeStartTime() = this.changeStartTime.bind(this);
    this.changeStopTime() = this.changeStopTime.bind(this);
    this.changeDateTime() = this.changeDateTime.bind(this);
    this.changeClassName() = this.changeClassName.bind(this);
    this.changeClassCode() = this.changeClassCode.bind(this);
    this.changeClassSection() = this.changeClassSection.bind(this);
    this.changeClassLocation() = this.changeClassLocation.bind(this);
    this.changeProfName() = this.changeProfName.bind(this);
    this.changeClassType() = this.changeClassType.bind(this);
    this.changeColor() = this.changeColor.bind(this);
    this.saveClass() = this.saveClass.bind(this);
    //this.deleteClass() = this.deleteClass().bind(this);
    //this.cancleClass() = this.cancelClass().bind(this);
}

changeStartTime() {
    //TODO
}

changeStopTime() {
    //TODO
}

changeDateTime() {
    //TODO
}

changeClassName() {
    //TODO
}

changeClassCode() {
    //TODO
}

changeClassSection() {
    //TODO
}

changeClassLocation() {
    //TODO
}

changeProfName() {
    //TODO
}

changeClassType() {
    //TODO
}

changeColor() {
    //TODO
}

saveClass() {
    //TODO
}
*/

    /*
    deleteClass() {
        //TODO
        //delete a class
    }

    cancelClass() {
        //TODO
        //close the pop window and do nothing changed
    }
    */
}

/*
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
*/