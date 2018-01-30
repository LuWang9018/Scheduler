import React from 'react';

const moment = require('moment');

function GenSaveButtons(props) {
    return React.createElement("div", {},
        <GenSaveButton
            onClick={function (i) {

                const TMPClass = props.Class;
                let Situation = TMPClass.Situation;
                delete TMPClass.Situation;

                if (!TMPClass.Changed) {
                    Situation = "Cancel";
                }
                delete TMPClass.Changed;
                return props.onClick({
                    AddClassWindowOn: false,
                    Class: TMPClass,
                    Situation: Situation
                })
            }}
        />
    )
}

function GenCancelButtons(props) {
    return React.createElement("div", {},
        <GenCancelButton
            onClick={() => props.onClick({AddClassWindowOn: false})}
        />
    )
}

function GenSaveButton(props) {
    return React.createElement("button",
        {
            className: "DecisionButton",
            id: "save",
            onClick: props.onClick,
        },
        "Save"
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

export class ClassPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Name: "",
            Code: "",
            Section: "",
            TimeFrom: [moment("00:00 am", "HH:mm a")],
            TimeTo: [moment("00:00 am", "HH:mm a")],
            Date: [[""]],
            LocationB: [""],
            LocationR: [""],
            Prof: "",
            Type: [""],
            Color: ["red"],
            Situation: "Cancel",
            Changed: false,
        };

        //bind handler
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleDateSelect = this.handleDateSelect.bind(this);
    }

    static Hours() {
        const hour = [];
        for (let i = 0; i < 24; i++) {
            hour[i] = React.createElement("option", {key: i, value: i}, i);
        }
        return hour;
    }

    static Mints() {
        const mints = [];
        let j = 0;
        for (let i = 0; i < 60; i++) {
            if ((i % 5) === 0) {
                mints[j] = React.createElement("option", {key: j, value: i}, i);
                j++;
            }
        }
        return mints;
    }

    DateButtons() {
        const day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const daysList = [];
        let bColor = "#ffffff";
        const buttonColor = "#ff0000";

        console.log(this.state.Date);

        for (let i = 0; i < days.length; i++) {
            if (this.state.Date.includes([[days[i]]])) {
                bColor = buttonColor;
            }
            daysList[i] = React.createElement("button", {
                className: "SelectButton",
                id: day[i],
                name: day[i],
                value: days[i],
                key: i,
                style: {backgroundColor: bColor},
                onClick: this.handleDateSelect
            }, day[i]);
        }

        console.log("daysList: " + daysList);

        return daysList;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.ChangingClassInfo.Name !== "") {
            this.setState(nextProps.ChangingClassInfo);
            this.setState({Situation: "Change"});
        } else {
            this.setState(nextProps.ChangingClassInfo);
            this.setState({Situation: "Add"});
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;


        console.log("Input: " + name + ", " + value);

        this.setState({
            [name]: value,
            Changed: true,
        });

        console.log(this.state)
    }

    handleSelectChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        switch (name) {
            case "StartHour":
                this.setState({
                    value: this.state.TimeFrom[0].hour(value), Changed: true,
                });
                break;
            case "StartMint":
                this.setState({
                    value: this.state.TimeFrom[0].minute(value), Changed: true,
                });
                break;
            case "StopHour":
                this.setState({
                    value: this.state.TimeTo[0].hour(value), Changed: true,
                });
                break;
            case "StopMint":
                this.setState({
                    value: this.state.TimeTo[0].minute(value), Changed: true,
                });
                break;
        }

        console.log(this.state);
    }

    handleDateSelect(event) {
        const name = event.target.name;
        const value = event.target.value;

        console.log("DateInput: " + name + "," + value + "," + event.target);

        if (event.target.enabled) {
            this.state.Date.splice(this.state.Date.indexOf(value), 1);
            this.state.Date.sort();
            this.setState({
                Date: this.state.Date,
                Changed: true,
                backgroundColor: "#ffffff",
            });
            console.log("disable: " + this.state.enabled)
        } else {
            this.state.Date.push([value]);
            this.state.Date.sort();
            this.setState({
                Date: this.state.Date,
                Changed: true,
                backgroundColor: "#ff0000",
            });
            console.log("able: " + this.state.enabled)
        }

        console.log("Date: " + this.state.Date);
    }

    //Add whole panel
    createPanel() {
        const Class = this.state;
        console.log("Update panel contents:");
        console.log(Class);
        //Add class panel detail

        return React.createElement("div", {},
            React.createElement("div", {className: "AddClassWindow"},
                //Title information
                React.createElement("div", {className: "panelTitle"},
                    React.createElement("div", {className: "TitleTitle"},
                        "New Class")),
                //Class information
                React.createElement("div", {className: "AddSection", id: "ClassInfo"},
                    React.createElement("div", {className: "classTitle"}, "Class: "),
                    React.createElement("div", {className: "classInput"},
                        <input
                            className="inputs"
                            id="ClassName"
                            name="Name"
                            placeholder="Class Name"
                            value={this.state.Name}
                            onChange={this.handleInputChange}
                        />,
                        <input
                            className="inputs"
                            id="ClassCode"
                            name="Code"
                            placeholder="Class Code"
                            value={this.state.Code}
                            onChange={this.handleInputChange}
                        />,
                        <input
                            className="inputs"
                            id="ClassSection"
                            name="Section"
                            placeholder="Section"
                            value={this.state.Section}
                            onChange={this.handleInputChange}
                        />)
                ),
                //Time information
                React.createElement("div", {className: "AddSection", id: "TimeInfo"},
                    React.createElement("div", {className: "StartTime"}, "Start Time: "),
                    React.createElement("div", {className: "StartTimeInput"},
                        <select className="inputs" id="StartHour" name="StartHour"
                                value={this.state.TimeFrom[0].hour()}
                                onChange={this.handleSelectChange}>
                            {ClassPanel.Hours()}
                        </select>,
                        "   ",
                        <select className="inputs" id="StartMint" name="StartMint"
                                value={this.state.TimeFrom[0].minute()}
                                onChange={this.handleSelectChange}>
                            {ClassPanel.Mints()}
                        </select>
                    ),
                    "   ",
                    React.createElement("div", {className: "StopTime"}, "Stop Time: "),
                    React.createElement("div", {className: "StopTimeInput"},
                        <select className="inputs" id="StopHour" name="StopHour"
                                value={this.state.TimeTo[0].hour()}
                                onChange={this.handleSelectChange}>
                            {ClassPanel.Hours()}
                        </select>,
                        "   ",
                        <select className="inputs" id="StopMint" name="StopMint"
                                value={this.state.TimeTo[0].minute()}
                                onChange={this.handleSelectChange}>
                            {ClassPanel.Mints()}
                        </select>
                    )
                ),
                //date information
                React.createElement("div", {className: "AddSection", id: "DateSection"},
                    React.createElement("div", {className: "DateTime"}, "Date: "),
                    React.createElement("div", {className: "DateTimeInput"},
                        /*
                        <button className="SelectButton" id="Mon" name="Mon"
                                value="Monday"
                                inlist={this.state.Date.includes(["Monday"])}
                                style={{backgroundColor: this.state.bColor}}
                                onClick={this.handleDateSelect}>{"Mon"}</button>,
                        <button className="SelectButton" id="Tue" name="Tue"
                                value="Tuesday"
                                inlist={!this.state.Date.includes(["Tuesday"])}
                                style={{backgroundColor: this.state.bColor}}
                                onClick={this.handleDateSelect}>{"Tue"}</button>,
                        <button className="SelectButton" id="Wed" name="Wed"
                                value="Wednesday"
                                inlist={!this.state.Date.includes(["Wednesday"])}
                                style={{backgroundColor: this.state.bColor}}
                                onClick={this.handleDateSelect}>{"Wed"}</button>,
                        <button className="SelectButton" id="Thu" name="Thu"
                                value="Thursday"
                                inlist={!this.state.Date.includes(["Thursday"])}
                                style={{backgroundColor: this.state.bColor}}
                                onClick={this.handleDateSelect}>{"Thu"}</button>,
                        <button className="SelectButton" id="Fri" name="Fri"
                                value="Friday"
                                inlist={!this.state.Date.includes(["Friday"])}
                                style={{backgroundColor: this.state.bColor}}
                                onClick={this.handleDateSelect}>{"Fri"}</button>,
                        <button className="SelectButton" id="Sat" name="Sat"
                                value="Saturday"
                                inlist={!this.state.Date.includes(["Saturday"])}
                                style={{backgroundColor: this.state.bColor}}
                                onClick={this.handleDateSelect}>{"Sat"}</button>,
                        <button className="SelectButton" id="Sun" name="Sun"
                                value="Sunday"
                                inlist={!this.state.Date.includes(["Sunday"])}
                                style={{backgroundColor: this.state.bColor}}
                                onClick={this.handleDateSelect}>{"Sun"}</button>)
                                */
                        this.DateButtons())
                ),
                //location information
                React.createElement("div", {className: "AddSection", id: "PlaceInfo"},
                    React.createElement("div", {className: "LocationTitle"}, "Location: "),
                    React.createElement("div", {className: "classLocationInput"},
                        <input
                            className="inputs"
                            id="PlaceBuilding"
                            name="LocationB"
                            placeholder="Building"
                            value={this.state.LocationB[0]}
                            onChange={this.handleInputChange}
                        />,
                        <input
                            className="inputs"
                            id="PlaceRoom"
                            name="LocationR"
                            placeholder="Room"
                            value={this.state.LocationR[0]}
                            onChange={this.handleInputChange}
                        />)
                ),
                //Add prof name
                React.createElement("div", {className: "AddSection", id: "ProfInfo"},
                    React.createElement("div", {className: "ProfTitle"}, "Prof: "),
                    React.createElement("div", {className: "profInfoInput"},
                        <input
                            className="inputs"
                            id="ProfName"
                            name="Prof"
                            placeholder="Prof Name"
                            value={this.state.Prof}
                            onChange={this.handleInputChange}
                        />)
                ),
                //Add color section
                React.createElement("div", {className: "AddSection", id: "ColorSection",},
                    React.createElement("div", {className: "ColorTitle"}, "Color: "),
                    React.createElement("div", {className: "colorInput"},
                        React.createElement("button", {type: "button", className: "SelectButton", id: "color1"}),
                        React.createElement("button", {type: "button", className: "SelectButton", id: "color2"}),
                        React.createElement("button", {type: "button", className: "SelectButton", id: "color3"}),
                        React.createElement("button", {type: "button", className: "SelectButton", id: "color4"}),
                        React.createElement("button", {type: "button", className: "SelectButton", id: "color5"}),
                        React.createElement("button", {type: "button", className: "SelectButton", id: "color6"}),
                        React.createElement("button", {type: "button", className: "SelectButton", id: "color7"}))
                ),
                React.createElement("div", {className: "AddSectionButton"},
                    <GenSaveButtons
                        Class={this.state}
                        onClick={(i) => this.props.onClick(i)}
                    />,
                    <GenCancelButtons
                        onClick={() => this.props.onClick({
                            AddClassWindowOn: false,
                            Action: "Cancel"
                        })}
                    />)
            ),
            //Add gray background
            React.createElement('div', {
                className: "groundLevel",
                onClick: this.props.onClick
            })
        )
    };

    passPanel() {
        if (this.props.AddClassWindowOn) {
            return this.createPanel();
        } else {
            return null;
        }
    };

    render() {
        return this.passPanel();
    }
}

