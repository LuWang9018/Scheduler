import React, {Component} from 'react';
import {GenTimeColumns} from "./ColumnsGen/TimeCGen";
import {GenDayColumns} from "./ColumnsGen/DayCGen";
import {GenAllClasses} from "./ClassGen/ClassCellGen";
import {ClassPanel} from "./Pops/ClassPanel";
import {store} from '../Redux/Redux';
import {Act_RequestData, Act_Change_Tmp_Class} from '../Redux/Action/actions'

var moment = require('moment');

export class TableGen extends Component {
    constructor(props) {
        super(props);

        

        this.state = {

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

    componentDidMount() {
        // it remembers to subscribe to the store so it doesn't miss updates
        this.unsubscribe = store.subscribe(this.UpdateCells.bind(this))
    }

    componentWillUnmount() {
    // and unsubscribe later
        this.unsubscribe()
    }

    UpdateCells(){

        console.log('UpdateCells    (cellGen.JS)');

        var NewClasses = store.getState().Class;
        console.log(store.getState());

        //update class lish first
        this.setState( {Class: NewClasses} );

        //re-calculate time gap
        this.setState( 
            {
                TimeRange: this.FindMinMaxTime(this.state),
                TimeArr: this.InitTime(
                    {
                        Class: this.state.Class
                    }
                )
            }
        )

        //re-render
        this.forceUpdate();
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

            for (var p = 0; p < props.Class[i].Class_Detail.length; p++) {
                var start = props.Class[i].Class_Detail[p].TimeFrom.clone();
                if (start.isBefore(min)) {
                    min = start.clone();
                }
            }
            for (var p = 0; p < props.Class[i].Class_Detail.length; p++) {
                var end = props.Class[i].Class_Detail[p].TimeTo.clone();
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
                    onClick={(props) => this.handleCellClick(props)}
                />,
                <GenAllClasses
                    TimeRange={this.state.TimeRange}
                    Class={this.state.Class}
                    form={this.state.AddClassWindowOn}
                    onClick={(props) => this.handleCellClick(props)}
                />
            ),
            <ClassPanel
                ChangingClassInfo={currentChangingClassInfo}
                AddClassWindowOn={this.state.AddClassWindowOn}
            />
        )
    }


    //turn add class window on/off
    //props: {
    //	OnOff: true/flase
    //}
    handleCellClick(props) {

        

        console.log("handleCellClick    (cellGen.JS)");
        console.log(props);
        store.dispatch(Act_Change_Tmp_Class(props.Class));
        /*
        if (props.Situation !== undefined) {
            if (props.Situation === "Change") {
                this.props.UpdateData(props.Class);
            } else if (props.Situation === "Add") {
                this.props.AddData(props.Class);
            }
            console.log("RequestData     (cellGen.JS)");
            console.log(this.props.RequestData());

            var Class = this.props.RequestData();
            this.setState({Class: Class.Class});
        }
        */
    }


    render() {        
        return this.CreateTimeCells()
    }
}
