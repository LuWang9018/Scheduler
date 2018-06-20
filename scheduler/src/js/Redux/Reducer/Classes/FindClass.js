var moment = require('moment');

export function IfHaveSameClass(state, A_Class){

	var length = state.Class.length;
	for(var i = 0; i < length; i++){
		/*
		console.log(' ');
		console.log('IfHaveSameClass: CourseSubject');
		console.log(A_Class.Class_Subject + " : " + state.Class[i].CourseSubject);
		console.log('IfHaveSameClass: CourseCode');
		console.log(A_Class.Class_Code + " : " + state.Class[i].CourseCode);
		console.log(' ');
		*/
		if(A_Class.Class_Subject === state.Class[i].CourseSubject &&
		   A_Class.Class_Code === state.Class[i].CourseCode){
			return i;
		}
	}

	return -1;
}

export function AddExistClassToList(state, A_Class, index){
	var classinfo = state.Class[index];

	var ToBeAdd = {};

	ToBeAdd.CourseID = A_Class.Class_Detail_ID;
	ToBeAdd.TimeFrom = moment(A_Class.Class_Detail_TimeFrom, "HH-mm-ss");
	ToBeAdd.TimeTo = moment(A_Class.Class_Detail_TimeTo, "HH-mm-ss");
	ToBeAdd.Date = A_Class.Class_Detail_Date;
	ToBeAdd.LocationB = A_Class.Building_Name_Short;
	ToBeAdd.LocationR = A_Class.Room_Number;
	ToBeAdd.Prof = A_Class.Professor_F_Name;
	ToBeAdd.Types = A_Class.Class_Detail_Type;
	ToBeAdd.Color = A_Class.Class_Detail_Color;
	ToBeAdd.CourseDayFrom = A_Class.Class_Day_From;
	ToBeAdd.CourseDayTo = A_Class.Class_Day_To;

	classinfo.Class_Detail = [...classinfo.Class_Detail, ToBeAdd];

	return classinfo;
}

export function AddNonExistClassToList(state, A_Class){
	var NewClass = {};

    NewClass.ClassName = A_Class.Class_Subject + A_Class.Class_Code;
    NewClass.CourseSubject = A_Class.Class_Subject;
    NewClass.CourseCode = A_Class.Class_Code;
    NewClass.CourseSection = A_Class.Class_Detail_Section;
    NewClass.CourseName = A_Class.Class_Name;
    NewClass.Class_Detail = [];

	var ToBeAdd = {};

	ToBeAdd.CourseID = A_Class.Class_Detail_ID;
	ToBeAdd.TimeFrom = moment(A_Class.Class_Detail_TimeFrom, "HH-mm-ss");
	ToBeAdd.TimeTo = moment(A_Class.Class_Detail_TimeTo, "HH-mm-ss");
	ToBeAdd.Date = A_Class.Class_Detail_Date;
	ToBeAdd.LocationB = A_Class.Building_Name_Short;
	ToBeAdd.LocationR = A_Class.Room_Number;
	ToBeAdd.Prof = A_Class.Professor_F_Name;
	ToBeAdd.Types = A_Class.Class_Detail_Type;
	ToBeAdd.Color = A_Class.Class_Detail_Color;
	ToBeAdd.CourseDayFrom = A_Class.Class_Day_From;
	ToBeAdd.CourseDayTo = A_Class.Class_Day_To;

	NewClass.Class_Detail.push(ToBeAdd);

	return NewClass;
}