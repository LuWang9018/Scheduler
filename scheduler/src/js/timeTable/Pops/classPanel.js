import React from "react";
import Tabs from "react-draggable-tabs";

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

function findDate(dates, day) {
    const found = false;

    for (let i = 0; i < dates.length; i++) {
        if (dates[i].includes(day)) {
            return true;
        }
    }

    return found;
}

function addDate(dates, day) {
    dates[0].push(day);

    return dates;
}

function deleteDate(dates, day) {
    for (let i = 0; i < dates[0].length; i++) {
        if (dates[0].indexOf(day) !== -1) {
            dates[0].splice(dates[0].indexOf(day), 1);
        }
    }

    return dates;
}

export class ClassPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Name: "",
            Section: "",
            TitleName: "",
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
            Tabs: [""]
        };

        //bind handler
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleDateSelect = this.handleDateSelect.bind(this);
        this.handleTabMove = this.handleTabMove.bind(this);
        this.handleTabSelect = this.handleTabSelect.bind(this);
        this.handleTabAdd = this.handleTabAdd.bind(this);
        this.handleTabClose = this.handleTabClose.bind(this);

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
        const types = ["Lec", "Tut", "Lab"];
        for (let i = 0; i < types.length; i++) {
            type[i] = React.createElement("option", {key: i, value: types[i]}, types[i]);
        }
        return type;
    }

    DateButtons() {
        const day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const daysList = [""];
        let bColor = "#ffffff";

        for (let i = 0; i < 7; i++) {
            if (findDate(this.state.Date, days[i])) {
                bColor = "#ff0000";
            } else {
                bColor = "#ffffff";
            }
            daysList[i] = React.createElement("button", {
                className: "SelectButton",
                id: days[i],
                name: day[i],
                value: days[i],
                key: i,
                style: {backgroundColor: bColor},
                onClick: this.handleDateSelect
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

        this.setState({
            /*TimeFrom: nextProps.TimeFrom,
            TimeTo: nextProps.TimeTo,
            Date: nextProps.Date,*/
            LocationB: nextProps.LocationB,
            LocationR: nextProps.LocationR,
            Color: nextProps.Color
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
            Changed: true
        });
    }

    handleSelectChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        switch (name) {
            case "StartHour":
                this.setState({
                    value: this.state.TimeFrom[0].hour(value), Changed: true
                });
                break;
            case "StartMint":
                this.setState({
                    value: this.state.TimeFrom[0].minute(value), Changed: true
                });
                break;
            case "StopHour":
                this.setState({
                    value: this.state.TimeTo[0].hour(value), Changed: true
                });
                break;
            case "StopMint":
                this.setState({
                    value: this.state.TimeTo[0].minute(value), Changed: true
                });
                break;
            case "classType":
                this.state.Type.pop();
                this.state.Type.push(value);

                this.setState({
                    value: value, Changed: true,
                    changeTab: true
                });
                break;
        }
    }

    handleDateSelect(event) {
        const value = event.target.value;

        if (findDate(this.state.Date, value)) {
            let newDate1 = deleteDate(this.state.Date, value);
            this.setState({
                Date: newDate1,
                Changed: true,
                backgroundColor: "#ffffff"
            });
        } else {
            let newDate2 = addDate(this.state.Date, value);
            this.setState({
                Date: newDate2,
                Changed: true,
                backgroundColor: "#ff0000"
            });
        }
    }

    handleTabMove(dragIndex, hoverIndex) {
        let newTabs = this.state.Tabs;

        newTabs.splice(hoverIndex, 0, newTabs.splice(dragIndex, 1)[0]);

        this.setState({
            Tabs: newTabs
        });
    }

    handleTabSelect(selectedIndex, selectedID) {
        const newTabs = this.state.Tabs;

        for (let i = 0; i < newTabs.length; i++) {
            newTabs[i].active = newTabs[i].id === selectedID;
        }

        this.setState({
            Tabs: newTabs
        });
    }

    handleTabAdd() {
        let newTabs = this.state.Tabs;
        const count = "Time " + (newTabs[newTabs.length - 1].id + 1);

        newTabs[newTabs.length - 1].active = false;

        const newTab = {
            id: (newTabs[newTabs.length - 1].id + 1),
            content: count,
            active: true,
            display: this.createDetailPanel(),
        };

        newTabs.push(newTab);

        this.setState({
            Tabs: newTabs
        });
    }

    handleTabClose(removedIndex) {
        let newTabs = this.state.Tabs;

        if (removedIndex !== 0) {
            newTabs.splice(removedIndex, 1);
            newTabs[newTabs.length - 1].active = true;
            this.setState({
                Tabs: newTabs,
                changeTab: true
            });
        }
    }

    newTabs() {
        if (this.state.Tabs[0] === "") {
            this.state.Tabs[0] = {
                id: 1,
                content: "Time 1",
                active: true,
                display: this.createDetailPanel()
            };
        }

        const activeTab = this.state.Tabs.filter(tab => tab.active === true);

        return <div className="tabs">
            <Tabs
                moveTab={this.handleTabMove}
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
    createDetailPanel() {
        return React.createElement("div", {className: "classDetail"},
            //Time information
            React.createElement("div", {className: "AddSection", id: "TimeInfo"},
                React.createElement("div", {className: "startTime"},
                    React.createElement("div", {className: "StartTime"}, "Start Time: "),
                    React.createElement("div", {className: "StartTimeInput"},
                        <select className="inputs" id="StartHour" name="StartHour"
                                value={this.state.TimeFrom[0].hour()}
                                onChange={this.handleSelectChange}>
                            {ClassPanel.Hours()}
                        </select>,
                        <select className="inputs" id="StartMint" name="StartMint"
                                value={this.state.TimeFrom[0].minute()}
                                onChange={this.handleSelectChange}>
                            {ClassPanel.Mints()}
                        </select>
                    )),
                React.createElement("div", {className: "stopTime"},
                    React.createElement("div", {className: "StopTime"}, "Stop Time: "),
                    React.createElement("div", {className: "StopTimeInput"},
                        <select className="inputs" id="StopHour" name="StopHour"
                                value={this.state.TimeTo[0].hour()}
                                onChange={this.handleSelectChange}>
                            {ClassPanel.Hours()}
                        </select>,
                        <select className="inputs" id="StopMint" name="StopMint"
                                value={this.state.TimeTo[0].minute()}
                                onChange={this.handleSelectChange}>
                            {ClassPanel.Mints()}
                        </select>
                    )),
            ),
            //date information
            React.createElement("div", {className: "AddSection", id: "DateSection"},
                React.createElement("div", {className: "DateTime"}, "Date: "),
                React.createElement("div", {className: "DateTimeInput"},
                    this.DateButtons())
            ),
            //class type
            React.createElement("div", {className: "classType"}, "Class Type: ",
                <select className="inputs" id="classType" name="classType"
                        value={this.state.Type[0]}
                        onChange={this.handleSelectChange}>
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
                        placeholder="Building"
                        value={this.state.LocationB}
                        onChange={this.handleInputChange}
                    />,
                    <input
                        className="inputs"
                        id="PlaceRoom"
                        name="LocationR"
                        placeholder="Room"
                        value={this.state.LocationR}
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
                React.createElement("div", {className: "AddSection", id: "ClassInfo"},
                    React.createElement("div", {className: "classTitle"}, "Class: "),
                    React.createElement("div", {className: "classInput"},
                        <input
                            className="inputs"
                            id="ClassName"
                            name="Name"
                            placeholder="Class"
                            value={this.state.Name}
                            onChange={this.handleInputChange}
                        />,
                        <input
                            className="inputs"
                            id="ClassSection"
                            name="Section"
                            placeholder="Section"
                            value={this.state.Section}
                            onChange={this.handleInputChange}
                        />),
                    React.createElement("div", {className: "classTitle"}, "Class Detail: "),
                    React.createElement("div", {className: "classInput"},
                        <input
                            className="inputs"
                            id="ClassTitleName"
                            name="titleName"
                            placeholder="Example: Introduction of Java"
                            value={this.state.TitleName}
                            onChange={this.handleInputChange}
                        />)
                ),
                //Class Detail tabs
                this.newTabs(),
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
                //Save and Cancel button
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
            React.createElement(
                'div', {
                    className: "groundLevel",
                    onClick: this.props.onClick
                }
            )
        )
    }

    passPanel() {
        if (this.props.AddClassWindowOn) {
            return this.createPanel();
        } else {
            return null;
        }
    }

    render() {
        return this.passPanel();
    }
}