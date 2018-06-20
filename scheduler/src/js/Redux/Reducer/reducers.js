import React, {Component} from 'react';
import {Act_handleSelectChange, Act_Delete_Tab, Act_Set_ActiveTab, Act_Btn_Cancle, Act_RequestData, Act_Change_Tep_Class, Act_AddClass, Act_ChangeClass} from '../Action/actions'
import {IfHaveSameClass, AddExistClassToList, AddNonExistClassToList} from './Classes/FindClass'
import {store} from '../../Redux/Redux';
export function Reducer(state, action){
	switch (action.type){
		case 'Request_Data':
			console.log('Reducer : Request_Data     (Reducer.JS)');
			console.log(action.Data);

		    return Object.assign({}, state, Red_Request_Data(state, action.Data));
		    break;				
		case 'Change_Tmp_Class':
			console.log('Reducer : Change_Tmp_Class     (Reducer.JS)');
			console.log(action.Data);
			if(action.Data.ClassName === ""){
				return { 
							...state,
							Tmp_Class: action.Data,
							Config:{
									...state.Config,
						  			TimeTable:{
						  				...state.Config.TimeTable,
						  				AddClassWindowOn: true,
						  				Action: "ADD_CLASS"
						  			}
						  		}
						}
			}else{
				return {
							...state, 
							Tmp_Class: action.Data,
							Config:{
									...state.Config,
						  			TimeTable:{
						  				...state.Config.TimeTable,
						  				AddClassWindowOn: true,
						  				Action: "EDIT_CLASS"
						  			}
						  		}					

						};
			}
			
			break;	
		case 'handleInputChange':
			console.log('Reducer : handleInputChange     (Reducer.JS)');
			console.log(action.Data);

			return { 
						...state, 
						Tmp_Class: Red_handleInputChange(action.Data),
					  	Config:{
					  		...state.Config,
				  			TimeTable:{
				  				...state.Config.TimeTable,
				  				AddTableDirty: true, 
				  			}
				  		}												
					}
			break;
		case 'handleSelectChange':
			console.log('Reducer : handleSelectChange     (Reducer.JS)');
			console.log(action.Data);

			return Red_handleSelectChange(state, action.Data);

			break;

		case 'AddClass':

			console.log('AddClass');
			return Object.assign({}, state, {});
			break;

		case 'ChangeClass':
			console.log('ChangeClass');
			return Object.assign({}, state, {});
			break;	

		case 'Btn_Cancle' :
			console.log('Btn_Cancle');
			console.log(store.getState());
			if(store.getState().Config.TimeTable.AddTableDirty){
				//add later
			}else{
				return {
						...state,
						Config: {
							...state.Config,
							TimeTable: 
								{
									...state.Config.TimeTable,
									AddClassWindowOn: false
								}
							}
						}				
			}
			break;
		case 'Set_ActiveTab':
			console.log('Set_ActiveTab');
			console.log(store.getState());
			return  {
					...state,
					Config: {
						...state.Config,
						TimeTable: 
							{
								...state.Config.TimeTable,
								ActiveTab: action.Data
							}
						}
					}

			break;	
		case 'ChangeColor':
			var Cur_Tag = store.getState().Config.TimeTable.ActiveTab;
			console.log('Act_ChangeColor');
			console.log(action.Data);
			return { 
						...state, 
						Tmp_Class: {
							...state.Tmp_Class,
							Class_Detail: [
								...state.Tmp_Class.Class_Detail.slice(0, Cur_Tag),
								{
									...state.Tmp_Class.Class_Detail[Cur_Tag],
									Color: action.Data
								},
								...state.Tmp_Class.Class_Detail.slice(Cur_Tag + 1)								
							]
						}											
					}	

			break;	
		case 'Set_Date':{
			console.log('Set_Date');
			var Cur_Tag = store.getState().Config.TimeTable.ActiveTab;

			return { 
						...state, 
						Tmp_Class: {
							...state.Tmp_Class,
							Class_Detail: [
								...state.Tmp_Class.Class_Detail.slice(0, Cur_Tag),
								{
									...state.Tmp_Class.Class_Detail[Cur_Tag],
									Date: action.Data
								},
								...state.Tmp_Class.Class_Detail.slice(Cur_Tag + 1)								
							]
						}											
					}			
		}				
		case 'Delete_Tab':
			console.log('Delete_Tab');
			console.log(store.getState());		
			if(store.getState().Tmp_Class.Class_Detail.length === 1){
				return {
						...state,
						Tmp_Class: {
							...state.Tmp_Class,
							Class_Detail: 
								[
									EmptyClassDetail
								]
							}
						}
			}else{
				return {
						...state,
							Tmp_Class: {
								...state.Tmp_Class,
								Class_Detail: 
									[
										...state.Tmp_Class.Class_Detail.slice(0, action.Data),
										...state.Tmp_Class.Class_Detail.slice(action.Data+1)
									]
							}
						}
			}
			

			break;
		default:
			return state;  
	}
};

function Red_Request_Data(state, Data){
	var NewClasses = Object.assign({}, state, {});

	for(var i = 0; i < Data.length - 1; i++){
		var index = IfHaveSameClass(state, Data[i]);

		if(index != -1){
			NewClasses.Class[index].Class_Detail.push(AddExistClassToList(state, Data[i], index));
		}else{
			NewClasses.Class.push(AddNonExistClassToList(state, Data[i]));
		}
	}

	console.log('Reducer : Request_Data after     (Reducer.JS)');
	console.log(NewClasses);
	return NewClasses;
}

function Red_handleInputChange(event) {
    const value = event.target.value.toUpperCase();
    const name = event.target.name;

    var TmpClass = Object.assign({}, store.getState().Tmp_Class);
    TmpClass.Changed = true
    var Cur_Tag = store.getState().Config.TimeTable.ActiveTab;

    switch (name) {
        case "ClassName":
            const parts = value.match(/([A-Za-z]+)([0-9]+)/);
            if (parts == null) {            	
            	TmpClass.ClassName = value;
            	TmpClass.CourseSubject = value;
            	TmpClass.CourseCode = '';
            } else {
            	TmpClass.ClassName = parts[0];
            	TmpClass.CourseSubject = parts[1];
            	TmpClass.CourseCode = parts[2];           	
            }
            break;
        case "CourseSection":
            TmpClass.CourseSection = value;

            break;
        case "TitleName":
            TmpClass.CourseName = value;

            break;
//need to check later                
        case "LocationB":
            TmpClass.Class_Detail[Cur_Tag].LocationB = value;

            break;
        case "LocationR":
            TmpClass.Class_Detail[Cur_Tag].LocationR = value;

            break;
        case "Prof":
            TmpClass.Class_Detail[Cur_Tag].Prof = value;
            break;
    }

    return TmpClass;
}

function Red_handleSelectChange(state, event) {
    const name = event.target.id;
    const value = event.target.value;

    var Cur_Tag = store.getState().Config.TimeTable.ActiveTab;

    switch (name) {
        case "StartHour":
        	console.log("here")
        	var time = store.getState().Tmp_Class.Class_Detail[Cur_Tag].TimeFrom.hour(value);
			return { 
						...state, 
						Tmp_Class: {
							...state.Tmp_Class,
							Class_Detail: [
								...state.Tmp_Class.Class_Detail.slice(0, Cur_Tag),
								{
									...state.Tmp_Class.Class_Detail[Cur_Tag],
									TimeFrom: time
								},
								...state.Tmp_Class.Class_Detail.slice(Cur_Tag + 1)								
							]
						}											
					}

            break;
        case "StartMint":
        	var time = store.getState().Tmp_Class.Class_Detail[Cur_Tag].TimeFrom.minute(value);
			return { 
						...state, 
						Tmp_Class: {
							...state.Tmp_Class,
							Class_Detail: [
								...state.Tmp_Class.Class_Detail.slice(0, Cur_Tag),
								{
									...state.Tmp_Class.Class_Detail[Cur_Tag],
									TimeFrom: time
								},
								...state.Tmp_Class.Class_Detail.slice(Cur_Tag + 1)								
							]
						}											
					}

            break;
        case "StopHour":
        	var time = store.getState().Tmp_Class.Class_Detail[Cur_Tag].TimeTo.hour(value);
			return { 
						...state, 
						Tmp_Class: {
							...state.Tmp_Class,
							Class_Detail: [
								...state.Tmp_Class.Class_Detail.slice(0, Cur_Tag),
								{
									...state.Tmp_Class.Class_Detail[Cur_Tag],
									TimeTo: time
								},
								...state.Tmp_Class.Class_Detail.slice(Cur_Tag + 1)								
							]
						}											
					}

            break;
        case "StopMint":
        	var time = store.getState().Tmp_Class.Class_Detail[Cur_Tag].TimeTo.minute(value);
			return { 
						...state, 
						Tmp_Class: {
							...state.Tmp_Class,
							Class_Detail: [
								...state.Tmp_Class.Class_Detail.slice(0, Cur_Tag),
								{
									...state.Tmp_Class.Class_Detail[Cur_Tag],
									TimeTo: time
								},
								...state.Tmp_Class.Class_Detail.slice(Cur_Tag + 1)								
							]
						}											
					}

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

var EmptyClassDetail = 
{                     
    Class_Detail: [
        {
            CourseID: -1,
            TimeFrom: undefined,
            TimeTo: undefined,
            Date: undefined,
            LocationB: undefined,
            LocationR: undefined,
            Prof: undefined,
            Types: undefined,
            Color: undefined,
            CourseDayFrom:undefined,
            CourseDayTo: undefined              
        }
    ]
}