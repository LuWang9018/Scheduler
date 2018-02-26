import React from "react";
import Tabs from "react-draggable-tabs";
import {AlertWindow} from "./AlertWindow";
import {Col} from "react-bootstrap";

const moment = require('moment');

function GenSaveButtons(props) {
    return React.createElement("div", {},
        <GenSaveButton
            onClick={function () {

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

function findDate(dates, day) {
    for (let i = 0; i < dates.length; i++) {
        if (dates[i].includes(day)) {
            return true;
        }
    }

    return false;
}

function addDate(dates, day, e) {
    if (dates[e][0] === "") {
        dates[e][0] = day;
    } else {
        dates[e].push(day);
    }

    return dates;
}

function deleteDate(dates, day, e) {
    for (let i = 0; i < dates[e].length; i++) {
        if (dates[e][i].indexOf(day) === 0) {
            dates[e].splice(i, 1);
        }
    }

    return dates;
}

function finalzeClass() {

}

function fieldCheck(course) {

}

export class ClassPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ClassName: "",
            Name: "",
            Code: "",
            Section: "",
            TitleName: "",
            TimeFrom: [moment("00:00 am", "HH:mm a")],
            TimeTo: [moment("00:00 am", "HH:mm a")],
            Date: [[""]],
            LocationB: [""],
            LocationR: [""],
            Prof: "",
            Types: [""],
            Color: ["red"],
            Situation: "Cancel",
            Changed: false,
            Tabs: [""],
            ActiveTabIndex: 0,
            visible: false,
            Semesters: ["Winter 2018", "Spring/Summer 2018", "Fall 2018"],
            Semester: ""
        };

        //initial state
        this.initialState = this.state;

        //bind handler
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleDateSelect = this.handleDateSelect.bind(this);
        this.handleTabSelect = this.handleTabSelect.bind(this);
        this.handleTabAdd = this.handleTabAdd.bind(this);
        this.handleTabClose = this.handleTabClose.bind(this);
        this.handleAlert = this.handleAlert.bind(this);
        this.handleSemester = this.handleSemester.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static Hours() {
        const hour = [""];
        for (let i = 0; i < 24; i++) {
            hour[i] = React.createElement("option", {key: i, value: i}, i);
        }
        return hour;
    }

    static Mints() {
        const mints = [""];
        let j = 0;
        for (let i = 0; i < 60; i++) {
            if ((i % 5) === 0) {
                mints[j] = React.createElement("option", {key: j, value: i}, i);
                j++;
            }
        }
        return mints;
    }

    static Types() {
        const type = [""];
        const types = ["LEC", "TUT", "LAB"];
        for (let i = 0; i < types.length; i++) {
            type[i] = React.createElement("option", {key: i, value: types[i]}, types[i]);
        }
        return type;
    }

    Semester() {
        const semester = [""];
        const semesters = this.state.Semesters;
        for (let i = 0; i < semesters.length; i++) {
            semester[i] = React.createElement("option", {key: i, value: semesters[i]}, semesters[i]);
        }
        return semester;
    }

    DateButtons(e) {
        const day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const daysList = [""];
        let bColor;

        for (let i = 0; i < 7; i++) {
            if (findDate(this.state.Date[e], days[i])) {
                bColor = "#ff0000";
            } else {
                bColor = "";
            }

            daysList[i] = React.createElement("button", {
                className: "SelectButton",
                id: days[i],
                name: day[i],
                value: days[i],
                key: i,
                style: {backgroundColor: bColor},
                onClick: (event) => this.handleDateSelect(event, e)
            }, day[i]);
        }

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

        if (this.props.AddClassWindowOn) {
            this.setState(this.initialState);
        }
    }

    handleInputChange(event, selectedIndex) {
        const value = event.target.value.toUpperCase();
        const name = event.target.name;

        switch (name) {
            case "ClassName":
                const parts = value.match(/([A-Za-z]+)([0-9]+)/);
                if (parts == null) {
                    this.setState({
                        ClassName: value,
                        Name: value,
                        Code: "",
                        Changed: true
                    });
                } else {
                    this.setState({
                        ClassName: parts[0],
                        Name: parts[1],
                        Code: parts[2],
                        Changed: true
                    });
                }
                break;
            case "Section":
                this.setState({
                    Section: value,
                    Changed: true
                });
                break;
            case "TitleName":
                this.setState({
                    TitleName: value,
                    Changed: true
                });
                break;
            case "LocationB":
                this.state.LocationB[selectedIndex] = value;
                this.setState({
                    LocationB: this.state.LocationB,
                    Changed: true
                });
                break;
            case "LocationR":
                this.state.LocationR[selectedIndex] = value;
                this.setState({
                    LocationR: this.state.LocationR,
                    Changed: true
                });
                break;
            case "Prof":
                this.setState({
                    Prof: value,
                    Changed: true
                });
                break;
        }
    }

    handlePreProcess() {
        this.state.ClassName = this.state.Name + this.state.Code;
    }

    handleSelectChange(event, selectedIndex) {
        const name = event.target.name;
        const value = event.target.value;

        switch (name) {
            case "StartHour":
                this.state.TimeFrom[selectedIndex].hour(value);

                this.setState({
                    TimeFrom: this.state.TimeFrom,
                    Changed: true
                });
                break;
            case "StartMint":
                this.state.TimeFrom[selectedIndex].minute(value);

                this.setState({
                    TimeFrom: this.state.TimeFrom,
                    Changed: true
                });
                break;
            case "StopHour":
                this.state.TimeTo[selectedIndex].hour(value);

                this.setState({
                    TimeTo: this.state.TimeTo,
                    Changed: true
                });
                break;
            case "StopMint":
                this.state.TimeTo[selectedIndex].minute(value);

                this.setState({
                    TimeTo: this.state.TimeTo,
                    Changed: true
                });
                break;
            case "Types":
                this.state.Types[selectedIndex] = value;
                this.setState({
                    Types: this.state.Types,
                    Changed: true
                });
                break;
        }
    }

    handleDateSelect(event, e) {
        const value = event.target.value;

        if (findDate(this.state.Date[e], value)) {
            let newDate1 = deleteDate(this.state.Date, value, e);
            this.setState({
                Date: newDate1,
                Changed: true
            });
        } else {
            let newDate2 = addDate(this.state.Date, value, e);
            this.setState({
                Date: newDate2,
                //backgroundColor: "#ff0000",
                Changed: true
            });
        }
    }

    handleSemester(event) {
        const value = event.target.value;
        this.setState({
            Semester: value,
            Changed: true
        })
    }

    handleAlert(event) {
        const name = event.target.name;

        if (name === "alertYes") {
            this.props.onClick({
                AddClassWindowOn: false
            })
        }

        this.setState({
            visible: !this.state.visible
        });
    }

    handleSubmit() {
        if (fieldCheck(this.state)) {

        } else {

        }
    }

    handleTabSelect(selectedIndex) {
        const newTabs = this.state.Tabs;

        for (let i = 0; i < newTabs.length; i++) {
            newTabs[i].active = i === selectedIndex;
        }

        this.setState({
            ActiveTabIndex: selectedIndex,
            Tabs: newTabs
        });
    }

    handleTabAdd() {
        const newTabs = this.state.Tabs;
        const count = "Time " + (newTabs[newTabs.length - 1].id + 2);
        const length = newTabs.length;
        const TimeFrom = this.state.TimeFrom;
        const TimeTo = this.state.TimeTo;
        const Date = this.state.Date;
        const Types = this.state.Types;
        const LocationB = this.state.LocationB;
        const LocationR = this.state.LocationR;

        for (let i = 0; i < newTabs.length; i++) {
            newTabs[i].active = false;
        }

        TimeFrom.push(moment("00:00 am", "HH:mm a"));
        TimeTo.push(moment("00:00 am", "HH:mm a"));
        Date.push([""]);
        Types.push("");
        LocationB.push("");
        LocationR.push("");

        this.setState({
            TimeFrom: TimeFrom,
            TimeTo: TimeTo,
            Date: Date,
            Types: Types,
            LocationB: LocationB,
            LocationR: LocationR
        });

        newTabs.push({
            id: (newTabs[newTabs.length - 1].id + 1),
            content: count,
            active: true,
            display: this.createDetailPanel(length),
        });

        this.setState({
            ActiveTabIndex: (newTabs.length - 1),
            Tabs: newTabs,
            Changed: true
        });
    }

    handleTabClose(removedIndex) {
        const newTabs = this.state.Tabs;
        let activeTab = removedIndex;
        const TimeFrom = this.state.TimeFrom;
        const TimeTo = this.state.TimeTo;
        const Date = this.state.Date;
        const Types = this.state.Types;
        const LocationB = this.state.LocationB;
        const LocationR = this.state.LocationR;

        for (let i = 0; i < newTabs.length; i++) {
            newTabs[i].active = false;
        }

        newTabs.splice(removedIndex, 1);
        TimeFrom.splice(removedIndex, 1);
        TimeTo.splice(removedIndex, 1);
        Date.splice(removedIndex, 1);
        Types.splice(removedIndex, 1);
        LocationB.splice(removedIndex, 1);
        LocationR.splice(removedIndex, 1);

        if (newTabs.length === 0 && removedIndex === 0) {
            TimeFrom.push(moment("00:00 am", "HH:mm a"));
            TimeTo.push(moment("00:00 am", "HH:mm a"));
            Date.push([""]);
            Types.push("");
            LocationB.push("");
            LocationR.push("");

            this.setState({
                TimeFrom: TimeFrom,
                TimeTo: TimeTo,
                Date: Date,
                Types: Types,
                LocationB: LocationB,
                LocationR: LocationR
            });

            newTabs.push({
                id: 0,
                content: "Time 1",
                active: true,
                display: this.createDetailPanel(0)
            });
            activeTab = 0;
        } else if (removedIndex === newTabs.length) {
            newTabs[removedIndex - 1].active = true;
            activeTab = removedIndex - 1;
        } else {
            newTabs[removedIndex].active = true;
            activeTab = removedIndex;
        }

        this.setState({
            TimeFrom: TimeFrom,
            TimeTo: TimeTo,
            Date: Date,
            Types: Types,
            LocationB: LocationB,
            LocationR: LocationR,
            ActiveTabIndex: activeTab,
            Tabs: newTabs,
            Changed: true
        });
    }

    newTabs() {
        if (this.state.Situation === "Add") {
            this.state.Tabs = [""];
        }

        const type1 = "LEC";
        const type2 = "TUT";
        const type3 = "LAB";
        let count1 = 1;
        let count2 = 1;
        let count3 = 1;
        let content;

        for (let i = 0; i < this.state.Date.length; i++) {
            if (this.state.Types[i] === type1) {
                content = "LEC " + count1;
                count1++;
            } else if (this.state.Types[i] === type2) {
                content = "TUT " + count2;
                count2++;
            } else if (this.state.Types[i] === type3) {
                content = "LAB " + count3;
                count3++;
            } else {
                content = "Time " + (i + 1);
            }

            let active = false;
            active = i === this.state.ActiveTabIndex;

            this.state.Tabs[i] = {
                id: i,
                content: content,
                active: active,
                display: this.createDetailPanel(i)
            };
        }

        const activeTab = this.state.Tabs.filter(tab => tab.active === true);

        return <div className="tabs">
            <Tabs
                selectTab={this.handleTabSelect}
                closeTab={this.handleTabClose}
                tabs={this.state.Tabs}
            >
                <button onClick={this.handleTabAdd}>+</button>
            </Tabs>
            {activeTab.length !== 0 ? activeTab[0].display : ""}
        </div>;
    }

//Class detail information
    createDetailPanel(i) {
        return React.createElement("div", {className: "classDetail"},
            //Time information
            React.createElement("div", {className: "AddSection", id: "TimeInfo"},
                React.createElement("div", {className: "startTime"},
                    React.createElement("div", {className: "StartTime"}, "Start Time: "),
                    React.createElement("div", {className: "StartTimeInput"},
                        <Col xs={6}>
                            <select className="inputs" id="StartHour" name="StartHour" size="0"
                                    value={this.state.TimeFrom[i].hour()}
                                    onChange={(event) => this.handleSelectChange(event, i)}>
                                {ClassPanel.Hours()}
                            </select>
                        </Col>,
                        <select className="inputs" id="StartMint" name="StartMint" size="0"
                                value={this.state.TimeFrom[i].minute()}
                                onChange={(event) => this.handleSelectChange(event, i)}>
                            {ClassPanel.Mints()}
                        </select>
                    )),
                React.createElement("div", {className: "stopTime"},
                    React.createElement("div", {className: "StopTime"}, "Stop Time: "),
                    React.createElement("div", {className: "StopTimeInput"},
                        <select className="inputs" id="StopHour" name="StopHour" size="0"
                                value={this.state.TimeTo[i].hour()}
                                onChange={(event) => this.handleSelectChange(event, i)}>
                            {ClassPanel.Hours()}
                        </select>,
                        <select className="inputs" id="StopMint" name="StopMint" size="0"
                                value={this.state.TimeTo[i].minute()}
                                onChange={(event) => this.handleSelectChange(event, i)}>
                            {ClassPanel.Mints()}
                        </select>
                    )),
            ),
            //date information
            React.createElement("div", {className: "AddSection", id: "DateSection"},
                React.createElement("div", {className: "DateTime"}, "Date: "),
                React.createElement("div", {className: "DateTimeInput"},
                    this.DateButtons(i))
            ),
            //class Types
            React.createElement("div", {className: "classType"}, "Class Types: ",
                <select className="inputs" id="classType" name="Types"
                        value={this.state.Types[i]}
                        onChange={(event) => this.handleSelectChange(event, i)}>
                    <option value="" disabled>Select your class types</option>
                    {ClassPanel.Types()}
                </select>),
            //location information
            React.createElement("div", {className: "AddSection", id: "PlaceInfo"},
                React.createElement("div", {className: "LocationTitle"}, "Location: "),
                React.createElement("div", {className: "classLocationInput"},
                    <input
                        className="inputs"
                        id="PlaceBuilding"
                        name="LocationB"
                        value={this.state.LocationB[i]}
                        placeholder="Example: ABC"
                        onChange={(event) => this.handleInputChange(event, i)}
                    />,
                    <input
                        className="inputs"
                        id="PlaceRoom"
                        name="LocationR"
                        value={this.state.LocationR[i]}
                        placeholder="Example: 123"
                        onChange={(event) => this.handleInputChange(event, i)}
                    />)
            ),
            //Add color section
            React.createElement("div", {className: "AddSection", id: "ColorSection",},
                React.createElement("div", {className: "ColorTitle"}, "Color: "),
                React.createElement("div", {className: "colorInput"},
                    React.createElement("button", {className: "SelectButton", id: "color1"}),
                    React.createElement("button", {className: "SelectButton", id: "color2"}),
                    React.createElement("button", {className: "SelectButton", id: "color3"}),
                    React.createElement("button", {className: "SelectButton", id: "color4"}),
                    React.createElement("button", {className: "SelectButton", id: "color5"}),
                    React.createElement("button", {className: "SelectButton", id: "color6"}),
                    React.createElement("button", {className: "SelectButton", id: "color7"}))
            ));
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
                React.createElement("div", {className: "AddSection", id: "ClassTitle"},
                    React.createElement("div", {className: "classTitle"}, "Course: "),
                    React.createElement("div", {className: "classInput"},
                        <input
                            className="inputs"
                            id="ClassName"
                            name="ClassName"
                            placeholder="Example: ABC123"
                            value={this.state.ClassName}
                            onChange={this.handleInputChange}
                        />,
                        <input
                            className="inputs"
                            id="ClassSection"
                            name="Section"
                            placeholder="Example: 101"
                            value={this.state.Section}
                            onChange={this.handleInputChange}
                        />
                    )),
                React.createElement("div", {className: "AddSection", id: "ClassDetail"},
                    React.createElement("div", {className: "classTitle"}, "Class Detail: "),
                    React.createElement("div", {className: "classInput"},
                        <input
                            className="inputs"
                            id="ClassTitleName"
                            name="TitleName"
                            placeholder="Example: Introduction of Java"
                            value={this.state.TitleName}
                            onChange={this.handleInputChange}
                        />)),
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
                //Semester
                React.createElement("div", {className: "SemesterInput", id: "SemesterInfo"},
                    React.createElement("div", {className: "SemesterTitle"}, "Semester: "),
                    React.createElement("div", {className: "semesterInfoInput"},
                        <Col xs={6}>
                            <select className="Semester" name="Semester"
                                    value={this.state.Semester}
                                    onChange={this.handleSemester}>
                                <option value="" disabled>Select your semester</option>
                                {this.Semester()}
                            </select>
                        </Col>),
                ),
                //Class Detail tabs
                this.newTabs(),
                //Save and Cancel button
                React.createElement("div", {className: "AddSectionButton"},
                    <GenSaveButtons
                        Class={this.state}
                        onClick={(i) => this.props.onClick(i)}
                        //onClick={this.handleSubmit}
                    />,
                    <GenCancelButtons
                        onClick={() => this.props.onClick({
                            AddClassWindowOn: false,
                            Action: "Cancel"
                        })
                        }
                    />)
            ),
            //Add gray background
            React.createElement(
                'div', {
                    className: "groundLevel",
                    onClick: this.handleAlert
                }
            ),
            React.createElement("div", {},
                <AlertWindow
                    visible={this.state.visible}
                    changeVisible={this.handleAlert}
                />)
        )
    }

    passPanel() {
        if (this.props.AddClassWindowOn) {
            this.handlePreProcess();
            return this.createPanel();
        } else {
            return null;
        }
    }

    render() {
        return this.passPanel();
    }
}
