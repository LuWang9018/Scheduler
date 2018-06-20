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
            ClassName: "Eng101",           
            CourseSubject: "Eng",
            CourseCode: "101",
            CourseSection: "001",
            CourseName: "placeHolder",                        
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
                    Color: "Red",
                    CourseDayFrom: "2018-01-01",
                    CourseDayTo: "2018-12-30"               
                },
                {
                	CourseID: -1,
                    TimeFrom: moment('2:10 pm', "HH:mm A"),
                    TimeTo: moment('3:30 pm', "HH:mm A"),
                    Date: '1010100',
                    LocationB: "MC",
                    LocationR: "3003",
                    Prof: "SB",
                    Types: "TUT",
                    Color: "Red",
                    CourseDayFrom: "2018-01-01",
                    CourseDayTo: "2018-12-30"               
                }
            ]
        },
        {
            Class_Name: "Math102",
            CourseSubject: "Math",
            CourseCode: "102",
            CourseSection: "001",
            CourseName: "placeHolder",            
            Class_Detail: [{
            	CourseID: -1,
                TimeFrom: moment('09:00 am', "HH:mm A"),
                TimeTo: moment('10:30 am', "HH:mm A"),
                Date: "0100000",
                LocationB: "RCH",
                LocationR: "160A",
                Prof: "SB",
                Types: "LEC",
                Color: "Red",
                CourseDayFrom: "2018-01-01",
                CourseDayTo: "2018-12-30"
            }]
        },
    ],
    Tmp_Class:{
            ClassName: "Eng101",           
            CourseSubject: "Eng",
            CourseCode: "101",
            CourseSection: "001",
            CourseName: "placeHolder",                        
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
                    Color: 0,
                    CourseDayFrom: "2018-01-01",
                    CourseDayTo: "2018-12-30"               
                },
                {
                    CourseID: -1,
                    TimeFrom: moment('06:10 am', "HH:mm A"),
                    TimeTo: moment('07:30 am', "HH:mm A"),
                    Date: "1010100",
                    LocationB: "MC",
                    LocationR: "3003",
                    Prof: "SB",
                    Types: "LEC",
                    Color: 1,
                    CourseDayFrom: "2018-01-01",
                    CourseDayTo: "2018-12-30"               
                }
            ]
        },
    Config: {
        TimeTable: {
            AddClassWindowOn: true,
            AddTableDirty: false,
            ActiveTab: 0,
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
                        ]
        }
    }
};


export const store = createStore(Reducer, Data);