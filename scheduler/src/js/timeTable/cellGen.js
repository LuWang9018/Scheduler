import React, {Component} from 'react';
import {GenTimeColumns} from "./ColumnsGen/TimeCGen";
import {GenDayColumns} from "./ColumnsGen/DayCGen";
import {GenAllClasses} from "./ClassGen/ClassCellGen";
import {ClassPanel} from "./Pops/ClassPanel";

var moment = require('moment');

export class TableGen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //display time from xx:xx to yy:yy
            //TODO
            //change Time format later!
            TimeRange: this.FindMinMaxTime(props.Data),

            //A time array
            //eg: 6:00, 6:30 .....
            TimeArr: this.InitTime({
                Class: props.Data.Class
            }),

            //Class list
            //TODO
            //should get from server
            //Define a fromate later
            Class: props.Data.Class,

            //CellHeight: 30,
            AddClassWindowOn: false,
            ChangingClassInfo: null
        };
    }

    InitTime(props) {

        var TimeRange = this.FindMinMaxTime({Class: props.Class});

        var start = TimeRange.MinTime.clone();

        var end = TimeRange.MaxTime.clone();

        var TmpTimeArr = [];

        for (var i = start.clone(); i.isBefore(end); i.add(30, "minutes")) {

            var tmp = moment().hour(i.hour()).minute(i.minute());
            TmpTimeArr.push(tmp);
            //console.log(tmp);

        }

        return TmpTimeArr
    }

    FindMinMaxTime(props) {

        var min = moment('10:00 am', 'HH:mm A');
        var max = moment('04:30 pm', 'HH:mm A');


        for (var i = 0; i < props.Class.length; i++) {

            for (var p = 0; p < props.Class[i].TimeFrom.length; p++) {
                var start = props.Class[i].TimeFrom[p].clone();
                if (start.isBefore(min)) {
                    min = start.clone();
                }
            }
            for (var p = 0; p < props.Class[i].TimeTo.length; p++) {
                var end = props.Class[i].TimeTo[p].clone();
                if (end.isAfter(max)) {
                    max = end.clone();
                }
            }

        }

        var remainder = min.minute() % 30;

        min.subtract(remainder, 'minutes');

        remainder = 30 - max.minute() % 30;
        max.add(remainder, "minutes").format("HH:mm A");

        return {MinTime: min, MaxTime: max}
    }

    CreateTimeCells() {
        const currentChangingClassInfo = this.state.ChangingClassInfo;
        //console.log("currentChangingClassInfo");
        //console.log(currentChangingClassInfo);

        return React.createElement("div",
            {
                className: "TimeTable"
            },
            <GenTimeColumns
                TimeArr={this.state.TimeArr}
            />,
            React.createElement("div",
                {
                    className: "TimeTableDayColumns"
                },
                <GenDayColumns
                    TimeArr={this.state.TimeArr}
                    onClick={(props) => this.handleWhiteCellClick(props)}
                />,
                <GenAllClasses
                    TimeRange={this.state.TimeRange}
                    Class={this.state.Class}
                    form={this.state.AddClassWindowOn}
                    onClick={(props) => this.handleWhiteCellClick(props)}
                />
            ),
            //this.GenClassEdit()
            <ClassPanel
                ChangingClassInfo={currentChangingClassInfo}
                AddClassWindowOn={this.state.AddClassWindowOn}
                onClick={(props) => this.handleWhiteCellClick(props)}
            />
        )
    }

    /*
        GenClassEdit(){

            if(this.state.AddClassWindowOn === true){
                return <ClassPanel
                    ChangingClassInfo = {this.state.ChangingClassInfo}
                    OnOff= {this.state.AddClassWindowOn}
                    onClick={(props) => this.handleWhiteCellClick(props)}
                />
            }
        }
    */

    //turn add class window on/off
    //props: {
    //	OnOff: true/flase
    //}
    handleWhiteCellClick(props) {
        console.log("handleWhiteCellClick");
        console.log(props);

        var Class = {
            CourseID: -1,           
            CourseSubject: '',
            CourseCode: '',
            CourseSection: "",
            CourseName: "placeHolder",            
            TimeFrom: [moment("00:00 am", "HH:mm a")],
            TimeTo: [moment("00:00 am", "HH:mm a")],
            Date: [[""]],
            LocationB: [""],
            LocationR: [""],
            Prof: "",
            Types: [""],
            Color: ["red"],
            CourseDayFrom: "2018-01-01",
            CourseDayTo: "2018-12-30"            
        };


        if (props.Class !== undefined) {
            this.setState({
                AddClassWindowOn: props.AddClassWindowOn,
                ChangingClassInfo: props.Class
            });
        } else {
            this.setState({
                AddClassWindowOn: props.AddClassWindowOn,
                ChangingClassInfo: Class
            });
        }

        if (props.Situation !== undefined) {
            if (props.Situation === "Change") {
                this.props.UpdateData(props.Class);
            } else if (props.Situation === "Add") {
                this.props.AddData(props.Class);
            }
            console.log("RequestData");
            console.log(this.props.RequestData());

            var Class = this.props.RequestData();
            this.setState({Class: Class.Class});
        }
    }


    render() {
        return this.CreateTimeCells()
    }
}
