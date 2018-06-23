import React from "react";
import Tabs from "react-draggable-tabs";
import {AlertWindow} from "./AlertWindow";
import {Col} from "react-bootstrap";
import {CreateElementFromJson} from "./CreateTable/CreateTable";
import {store} from '../../Redux/Redux';

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
    }

    componentDidMount() {
        // it remembers to subscribe to the store so it doesn't miss updates
        this.unsubscribe = store.subscribe(this.UpdateCells.bind(this))
    }

    componentWillUnmount() {
    // and unsubscribe later
        this.unsubscribe()
    }

    UpdateCells(){

        console.log('UpdateCells    (classPanel.JS)');

        //re-render
        this.forceUpdate();
    }
//Add whole panel
    createPanel() {
        return CreateElementFromJson(Format);
    }

    passPanel() {
        if (store.getState().Config.TimeTable.AddClassWindowOn) {
             return this.createPanel();
        } else {
             return null;
        }
    }

    render() {
        return this.passPanel();
    }
}

/*
Format:
<dev>
Type: "DIV",
ClassName : "",
ID: "",
Content: "",
onClick: bool,
Children: []

<input>
Type: "INPUTE",
ClassName: "",
ID: "",
Name: "ClassName",
Placeholder: "Example: ABC123",
onChange: "handleInputChange"

<button>
Type: "BUTTON",
ClassName : "",
ID: "",
Content: "",
onClick: props.onClick,

<select>
Type: "SELECT",
ClassName : "inputs",
ID: "StartHour",
SIZE: 0,
Content: "ContentFunction"

*/

var Format = [{
    Type: "DIV",
    ClassName : "AddClassWindow",
    ID: "AddClassWindow",
    Children: [
        // Top Green part
        {
            Type: "DIV",
            ClassName: "panelTitle",
            ID: "panelTitle",
            Children: [{            
                Type: "DIV",
                ClassName: "TitleTitle",
                ID: "TitleTitle",
                Content: "New Class",
                Childern: []
            }]
        },
        // ClassName & CourseSection
        {
            Type: "DIV",
            ClassName : "AddSection",
            ID: "ClassTitle",
            Children: [
                {
                    Type: "DIV",
                    ClassName : "classTitle",
                    ID: "Course:",
                    Content: "Course:",
                    Children: []
                },
                {
                    Type: "INPUTE",
                    ClassName: "inputs",
                    ID: "ClassName",
                    Name: "ClassName",
                    Placeholder: "Example: ABC123",
                 },
                {
                    Type: "INPUTE",
                    ClassName: "inputs",
                    ID: "ClassSection",
                    Name: "CourseSection",
                    Placeholder: "Example: 101",
                }
            ]
        },
        //Class ClassDetail
        {
            Type: "DIV",
            ClassName : "AddSection",
            ID: "ClassDetail",
            Children: [
                {
                    Type: "DIV",
                    ClassName : "classTitle",
                    ID: "ClassDetail1",
                    Content: "Class Detail: ",
                    Children: []
                },
                {
                    Type: "DIV",
                    ClassName : "classInput",
                    ID: "classInput",
                    Children: [
                        {
                            Type: "INPUTE",
                            ClassName: "inputs",
                            ID: "ClassTitleName",
                            Name: "TitleName",
                            Placeholder: "Example: Introduction of Java",
                        }
                    ]
                }
            ]
        },
        //Tag
        {
            Type: "Tag",
            ID: "Tags",
            Children: [
                {
                    Type: "DIV",
                    ClassName : "classDetail",
                    ID: "classDetail2",
                    Children: [
                        //time info
                        {
                            Type: "DIV",
                            ClassName : "AddSection",
                            ID: "TimeInfo",
                            Children: [
                                {
                                    Type: "DIV",
                                    ClassName : "startTime",
                                    ID: "startTimeBox",
                                    Children: [
                                        {
                                            Type: "DIV",
                                            ClassName : "StartTime",
                                            ID: "startTimeTitle",
                                            Content: "Start Time: ",
                                            Children: []
                                        },
                                        {
                                            Type: "DIV",
                                            ClassName : "StartTimeInput",
                                            ID: "StartTimeInput",
                                            Children: [
                                                {
                                                    Type: "SELECT",
                                                    ClassName : "inputs",
                                                    ID: "StartHour",
                                                    SIZE: 0,
                                                    Content: "HOUR"
                                                },
                                                {
                                                    Type: "SELECT",
                                                    ClassName : "inputs",
                                                    ID: "StartMint",
                                                    SIZE: 0,
                                                    Content: "MINUTE"
                                                }                                                
                                            ]
                                        }                                        
                                    ]
                                },
                                {
                                    Type: "DIV",
                                    ClassName : "stopTime",
                                    ID: "stopTimeBox",
                                    Children: [
                                        {
                                            Type: "DIV",
                                            ClassName : "StopTime",
                                            ID: "stopTimeTitle",
                                            Content: "Stop Time: ",
                                            Children: []
                                        },
                                        {
                                            Type: "DIV",
                                            ClassName : "StopTimeInput",
                                            ID: "StopTimeInput",
                                            Children: [
                                                {
                                                    Type: "SELECT",
                                                    ClassName : "inputs",
                                                    ID: "StopHour",
                                                    SIZE: 0,
                                                    Content: "HOUR"
                                                },
                                                {
                                                    Type: "SELECT",
                                                    ClassName : "inputs",
                                                    ID: "StopMint",
                                                    SIZE: 0,
                                                    Content: "MINUTE"
                                                }                                                
                                            ]
                                        } 
                                    ]
                                }
                            ]
                        },
                        //date info
                        {
                            Type: "DIV",
                            ClassName : "AddSection",
                            ID: "DateSection",
                            Children: [
                                {
                                    Type: "DIV",
                                    ClassName : "DateTime",
                                    ID: "DateTimeTatle",
                                    Content: "Date: ",
                                    Children: []
                                },
                                {
                                    Type: "DIV",
                                    ClassName : "DateTimeInput",
                                    ID: "DateTimeInput",
                                    Children: [
                                        {
                                            Type: "DayButtons", 
                                        }                                       
                                    ]
                                }
                            ]
                        },
                        //Class type
                        {
                            Type: "DIV",
                            ClassName : "classType",
                            ID: "classType",
                            Content: "Class Types: ",
                            Children: [
                                {
                                    Type: "SELECT",
                                    ClassName : "inputs",
                                    ID: "TYPES",
                                    SIZE: 0,
                                    Content: "TYPES"
                                }  
                            ]
                        },
                        //prof
                        {
                            Type: "DIV",
                            ClassName : "AddSection",
                            ID: "ProfInfo",
                            Children: [
                                {
                                    Type: "DIV",
                                    ClassName : "ProfTitle",
                                    ID: "ProfTitle",
                                    Content: "Professor Name: ",
                                    Children: []                   
                                },
                                {
                                    Type: "DIV",
                                    ClassName : "profInfoInput",
                                    ID: "profInfoInput",
                                    Children: [
                                        {
                                            Type: "INPUTE",
                                            ClassName: "inputs",
                                            ID: "ProfName",
                                            Name: "Prof",
                                            Placeholder: "Prof Name",
                                        }
                                    ]                   
                                },                
                            ]
                        },
                        //location
                        {
                            Type: "DIV",
                            ClassName : "AddSection",
                            ID: "PlaceInfo",
                            Children: [
                                {
                                    Type: "DIV",
                                    ClassName : "LocationTitle",
                                    ID: "LocationTitle",
                                    Content: "Location: ",
                                    Children: []
                                },
                                {
                                    Type: "DIV",
                                    ClassName : "classLocationInput",
                                    ID: "classLocationInput",
                                    Children: [
                                        {
                                            Type: "INPUTE",
                                            ClassName: "inputs",
                                            ID: "PlaceBuilding",
                                            Name: "LocationB",
                                            Placeholder: "Example: ABC",
                                            onChange: "handleInputChange"
                                        },
                                        {
                                            Type: "INPUTE",
                                            ClassName: "inputs",
                                            ID: "PlaceRoom",
                                            Name: "LocationR",
                                            Placeholder: "Example: 123",
                                            onChange: "handleInputChange"
                                        }                                        
                                    ]
                                }
                            ]
                        },
                        //Color select
                        {
                            Type: "DIV",
                            ClassName : "AddSection",
                            ID: "ColorSection",
                            Children: [
                                {
                                    Type: "DIV",
                                    ClassName : "ColorTitle",
                                    ID: "ColorTitle",
                                    Content: "Color: ",
                                    Children: []     
                                },
                                {
                                    Type: "DIV",
                                    ClassName : "colorInput",
                                    ID: "colorInput",
                                    Children: [
                                        {
                                            Type: "ColorButtons",
                                            ClassName: "colorInput"
                                        }
                                    ]                                         
                                }

                            ]
                        }                       
                    ]
                }
            ]
        },
        //button
        {
            Type: "DIV",
            ClassName : "AddSectionButton",
            ID: "AddSectionButton",
            Children: [
                {
                    Type: "BUTTON",
                    ClassName : "DecisionButton",
                    ID: "Btn_Save",
                    Content: "Save",
                },
                {
                    Type: "BUTTON",
                    ClassName : "DecisionButton",
                    ID: "Btn_Cancle",
                    Content: "Cancle",
                }
            ]
        }
    ]
},
{
    Type: "DIV",
    ClassName : "groundLevel",
    ID: "groundLevel",
    onClick: true
}
]