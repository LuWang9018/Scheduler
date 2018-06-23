import { createStore } from 'redux';
import { Reducer } from './Reducer/reducers';

var moment = require('moment');

var Data = {
    //Class list
    //TODO
    //should get from server
    //Define a fromate later
    Class: [
        {
            ClassName: "ENG101",           
            CourseSubject: "ENG",
            CourseCode: "101",
            CourseSection: "001",
            CourseName: "PLACEHOLDER",                        
            Class_Detail: [
                {
                    CourseID: -1,
                    TimeFrom: moment('06:10 am', "HH:mm A"),
                    TimeTo: moment('07:30 am', "HH:mm A"),
                    Date: "1010100",
                    LocationB: "MC",
                    LocationR: "3003",
                    Prof: "SB",
                    Types: "LEC",
                    Color: 2,
                    CourseDayFrom: "2018-01-01",
                    CourseDayTo: "2018-12-30"               
                },
                {
                    CourseID: -2,
                    TimeFrom: moment('10:10 am', "HH:mm A"),
                    TimeTo: moment('11:30 am', "HH:mm A"),
                    Date: "1000000",
                    LocationB: "MC2",
                    LocationR: "3027",
                    Prof: "ABC",
                    Types: "TUT",
                    Color: 2,
                    CourseDayFrom: "2018-01-01",
                    CourseDayTo: "2018-12-30"               
                }
            ]
        },
        {
            ClassName: "MATH102",
            CourseSubject: "MATH",
            CourseCode: "102",
            CourseSection: "001",
            CourseName: "PLACEHOLDER",            
            Class_Detail: [{
            	CourseID: -3,
                TimeFrom: moment('09:00 am', "HH:mm A"),
                TimeTo: moment('10:30 am', "HH:mm A"),
                Date: "0100000",
                LocationB: "RCH",
                LocationR: "160A",
                Prof: "SB",
                Types: "LEC",
                Color: 1,
                CourseDayFrom: "2018-01-01",
                CourseDayTo: "2018-12-30"
            }]
        },
    ],
    Tmp_Class:{
            ClassName: "ENG101",           
            CourseSubject: "ENG",
            CourseCode: "101",
            CourseSection: "001",
            CourseName: "PLACEHOLDER",                        
            Class_Detail: [
                {
                    CourseID: -1,
                    TimeFrom: moment('06:10 am', "HH:mm A"),
                    TimeTo: moment('07:30 am', "HH:mm A"),
                    Date: "1010100",
                    LocationB: "MC",
                    LocationR: "3003",
                    Prof: "SB",
                    Types: "LEC",
                    Color: 2,
                    CourseDayFrom: "2018-01-01",
                    CourseDayTo: "2018-12-30"               
                },
                {
                    CourseID: -2,
                    TimeFrom: moment('10:10 am', "HH:mm A"),
                    TimeTo: moment('11:30 am', "HH:mm A"),
                    Date: "1000000",
                    LocationB: "MC2",
                    LocationR: "3027",
                    Prof: "ABC",
                    Types: "TUT",
                    Color: 2,
                    CourseDayFrom: "2018-01-01",
                    CourseDayTo: "2018-12-30"               
                }
            ]
        },
    Config: {
        TimeTable: {
            AddClassWindowOn: false,
            AddTableDirty: false,
            ActiveTab: 0,
            CurrentAction: "null",
            ColorGroup: [
                            {
                                "borderColor": "#CCFFFF",
                                "fontColor": "#FFCCCC",
                                "backgroundColor" : "#FFCCCC",
                            },
                            {
                                "borderColor": "#FF9999",
                                "fontColor": "#000000",
                                "backgroundColor" : "#FFCCCC",
                            },
                            {
                                "borderColor": "#66CCCC",
                                "fontColor": "#000000",
                                "backgroundColor" : "#CCFFFF",
                            },
                            {
                                "borderColor": "#66CC66",
                                "fontColor": "#000000",
                                "backgroundColor" : "#CCFF99",
                            },
                        ]
        }
    }
};


export const store = createStore(Reducer, Data);