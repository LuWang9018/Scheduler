import React from 'react';
import openSocket from 'socket.io-client';

var moment = require('moment');
const socket = openSocket('http://localhost:8090');

const DayArr = ["Monday", "Tuesday", "Wednesday",
                "Thursday", "Friday", "Saturday",
                "Sunday"];

var Data = {
    //Class list
    //TODO
    //should get from server
    //Define a fromate later
    Class: [
        {
            CourseID: [-1],
            CourseSubject: "Eng",
            CourseCode: 101,
            CourseSection: "001",
            CourseName: "placeHolder",
            TimeFrom: [moment('06:10 am', "HH:mm A"),
                moment('08:10 am', "HH:mm A")],
            TimeTo: [moment('07:30 am', "HH:mm A"),
                moment('9:10 am', "HH:mm A")],
            Date: [["Monday", "Wednesday", "Friday"],
                ["Monday", "Wednesday"]],
            LocationB: ["MC", "MC"],
            LocationR: ["3003", "3006"],
            Prof: "SB",
            Types: ["LEC", "TUT"],
            Color: ["Red", "Green"],
            CourseDayFrom: "2018-01-01",
            CourseDayTo: "2018-12-30"
        },
        {
            CourseID: [-1],
            CourseSubject: "Math",
            CourseCode: 102,
            CourseSection: "001",
            CourseName: "placeHolder",
            TimeFrom: [moment('09:30 am', "HH:mm A")],
            TimeTo: [moment('11:00 am', "HH:mm A")],
            Date: [["Tuesday", "Thursday"]],
            LocationB: ["RCH"],
            LocationR: ["160A"],
            Prof: "SB",
            Types: ["LEC"],
            Color: ["Red"],
            CourseDayFrom: "2018-01-01",
            CourseDayTo: "2018-12-30"
        },
    ],
};


// SD.Semester_ID, SD.Semester_From, SD.Semester_To,
// SG.Semester_Year, SG.Semester_Season

function precressDataOneSem(Data){
    var Classes = [];
    for(var i = 0; i < Data.length - 1; i++){
        var Class_tmp = {};

        console.log(Data[i].Class_Detail_Date);

        //var DataJson = JSON.parse(Data[i]);

        //console.log(DataJson);
        Class_tmp.CourseID = [];
        Class_tmp.CourseSubject = Data[i].Class_Subject;
        Class_tmp.CourseCode = Data[i].Class_Code;
        Class_tmp.CourseSection = Data[i].Class_Detail_Section;        
        Class_tmp.CourseName = Data[i].Class_Name;
        Class_tmp.TimeFrom = [];
        Class_tmp.TimeTo = [];
        Class_tmp.Date = [[]];
        Class_tmp.LocationB = [];
        Class_tmp.LocationR = [];
        Class_tmp.Prof = Data[i].Professor_F_Name;
        Class_tmp.Types = [];
        Class_tmp.Color = [];
        Class_tmp.CourseDayFrom = Data[i].Class_Day_From;
        Class_tmp.CourseDayTo = Data[i].Class_Day_To;

        Class_tmp.CourseID.push(Data[i].Class_Detail_ID);
        Class_tmp.TimeFrom.push(Data[i].Class_Detail_TimeFrom);
        Class_tmp.TimeTo.push(Data[i].Class_Detail_TimeTo);
        Class_tmp.LocationB.push(Data[i].Building_Name_Short);
        Class_tmp.LocationR.push(Data[i].Room_Number);
        Class_tmp.Types.push(Data[i].Class_Detail_Type);
        Class_tmp.Color.push(Data[i].Class_Detail_Color);

        Class_tmp.DateString = Data[i].Class_Detail_Date;
        for(var j = 0; j < 7; j++){
            if(Class_tmp.DateString.charAt(j) == 1){
                Class_tmp.Date[0].push(DayArr[j]);
            }
        }
        
        console.log(Class_tmp);
        Classes.push(Class_tmp);
    }
}

export function RequestData(props) {

    socket.on('Hello', function (msg) {
        console.log(msg);
        socket.emit('RequestData', props);
        socket.on('Data', function (data) {
            console.log(data);
            precressDataOneSem(data);
        })
    });


    return Data

}

export function UpdateData(props) {
    console.log("update called");
    console.log(props);
}

export function AddData(props) {
    console.log("add called");
    console.log(props);
    // props.TimeFrom = [moment('11:30 am', "HH:mm A")]
    // props.TimeTo = [moment('12:30 pm', "HH:mm A")]
    // props.Date = [["Monday"]]
    // props.LocationB = ["AAA"]
    // props.LocationR = ["AAA"]
    // console.log(props);
    props.Color = ["Red"];
    Data.Class.push(props);

    console.log(Data);
}