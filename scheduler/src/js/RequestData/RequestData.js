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
            Name: "Eng",
            Code: 101,
            Section: "001",
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
        },
        {
            Name: "Math",
            Code: 102,
            Section: "001",
            TimeFrom: [moment('09:30 am', "HH:mm A")],
            TimeTo: [moment('11:00 am', "HH:mm A")],
            Date: [["Tuesday", "Thursday"]],
            LocationB: ["RCH"],
            LocationR: ["160A"],
            Prof: "SB",
            Types: ["LEC"],
            Color: ["Red"],
        },
    ],
};


// SD.Semester_ID, SD.Semester_From, SD.Semester_To,
// SG.Semester_Year, SG.Semester_Season

function precressDataOneSem(Data){
    var Classes = [];
    for(var i = 0; i < Data.length - 1; i++){
        var Class_tmp = {};
        Class_tmp.CourseSubject = Data[i].Class_Subject;
        Class_tmp.CourseCode = Data[i].Class_Code;
        Class_tmp.CourseName = Data[i].Class_Name;
        Class_tmp.CourseSection = Data[i].Class_Detail_Section;
        Class_tmp.CourseID = Data[i].Class_Detail_ID;
        Class_tmp.CourseTimeFrom = Data[i].Class_Detail_TimeFrom;
        Class_tmp.CourseTo = Data[i].Class_Detail_TimeTo;
        Class_tmp.CourseDayFrom = Data[i].Class_Day_From;
        Class_tmp.CourseDayTo = Data[i].Class_Day_To;
        Class_tmp.LocationB = Data[i].Building_Name_Short;
        Class_tmp.LocationR = Data[i].Room_Number;
        Class_tmp.Prof = Data[i].Professor_F_Name;
        Class_tmp.Types = Data[i].Class_Detail_Type;
        Class_tmp.Color = Data[i].Class_Detail_Color;
        Class_tmp.Date = [];

        for(var j = 0; i < 7; i++){
            if(Data[i].Class_Detail_Date.charAt(j) == 1){
                Class_tmp.Date.push(DayArr[j]);
            }
        }
        
        console.log(Class_tmp);
    }
}

export function RequestData(props) {

    socket.on('Hello', function (msg) {
        console.log(msg);
        socket.emit('RequestData', {my: 'data'});
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