import React, {Component} from 'react';
import {store} from '../../../Redux/Redux';
import {Act_ChangeColor, Act_Set_Date, Act_handleSelectChange, Act_Delete_Tab, Act_Set_ActiveTab, Act_Btn_Cancle, Act_handleInputChange, Act_AddClass, Act_ChangeClass} from '../../../Redux/Action/actions'
import Tabs from "react-draggable-tabs";

export function CreateElementFromJson(format){
    var RJSelement = [];
    if(format != null){
        for(var i = 0; i< format.length; i++){
    		switch(format[i].Type){
    			case "DIV":
    				RJSelement.push(<AddClassTableDiv key={format[i].ID} Data={format[i]}/>);
    				break;
    			case "INPUTE":

    				//console.log("CreateElementFromJson    (CreateTable.JS)");
        			//console.log(store.getState());

    				RJSelement.push(
    					<input
                            className= {format[i].ClassName}
                            id= {format[i].ID}
                            key= {format[i].ID}
                            name={format[i].Name}
                            placeholder={format[i].Placeholder}
                            value={store.getState().Tmp_Class === undefined ? undefined : show_value(format[i].Name)}
                            onChange={handleInputChange}
                        />                        
                    );
    				break;	
    			case "BUTTON":
    				RJSelement.push(
    					<BuildButtons Data = {format[i]} key = {format[i].ID + "1"}/>
    				);
    				break;
    			case 'Tag':
					RJSelement.push(<HandleTabs key = {format[i].ID + "1"} Content = {format[i]}/>);
					break;

				case 'SELECT':
					RJSelement.push(<select className = {format[i].inputs} 
											id = {format[i].ID}
											key = {format[i].ID}
											size = "0"
		                                    value = {show_value(format[i].ID)}

		                                    onChange={handleSelectChange}
		                            >
		                                {Select_Content_Builder(format[i].Content)}
		                            </select>);
				break;

				case 'DayButtons':
					return <DateButtons/>
				break;

				case 'ColorButtons':
					//console.log("ColorButtons");
					return <ColorButtons/>
				break;
    			default:

    		}
    	}
    }

	return RJSelement;
}

class HandleTabs extends Component{

    handleTabSelect(selectedIndex) {
    	store.dispatch(Act_Set_ActiveTab(selectedIndex));
    }	

    handleTabClose(removedIndex) {
    	var tab_num = store.getState().Tmp_Class.Class_Detail.length;
    	//if delete == select
    	if(removedIndex === tab_num-1 && tab_num >= 1){
    		store.dispatch(Act_Set_ActiveTab(removedIndex - 1));
    	}

    	store.dispatch(Act_Delete_Tab(removedIndex));
    }

	render(){

		return <div className="tabs" key = {store.getState().Tmp_Class.ClassName}>
		            <Tabs
		                selectTab={this.handleTabSelect}
		                closeTab={this.handleTabClose}
		                key = {store.getState().Tmp_Class.ClassName}
		                tabs={store.getState().Tmp_Class.Class_Detail}
		            > 
		            	<button>+</button>
		            </Tabs>
		            {CreateElementFromJson(this.props.Content.Children)}
	        	</div>
	    }
}

class AddClassTableDiv extends Component{
	constructor(props) {
		super(props);

		this.state = {
			ID: props.Data.ID
		}
	}

	handleClick(props){
		switch(this.props.Data.ID){
			case "groundLevel": 
					return store.dispatch(Act_Btn_Cancle(null));
				break;
			default:
				return;
		}
	}

	render(){
		/*
		return React.createElement("div", {className: this.props.Data.ClassName,
											key: this.props.Data.ID,
											id: this.props.Data.ID === undefined ? null : this.props.Data.ID,
											onClick: this.handleClick
											}, 
											this.props.Data.Content === undefined ? null : this.props.Data.Content,
											CreateElementFromJson(this.props.Data.Children))	
		*/
		return <div 
					className={this.props.Data.ClassName}
					key={this.props.Data.ID}
					id={this.props.Data.ID === undefined ? null : this.props.Data.ID}
					onClick = {(props) => this.handleClick(props)}
				>
					{this.props.Data.Content === undefined ? null : this.props.Data.Content}
					{CreateElementFromJson(this.props.Data.Children)}
				</div>										
	}
}

class DateButtons extends React.Component {

	handleDateSelect(value){
		var day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
		var current_tab = store.getState().Config.TimeTable.ActiveTab;

		var index = day.indexOf(value);
		var old_daystring = store.getState().Tmp_Class.Class_Detail[current_tab].Date;


		var new_daystring;
		if(old_daystring.charAt(index) === '0'){
			new_daystring = old_daystring.substr(0,index) + 
						    '1' +
						    old_daystring.substr(index+1);
		}else{
			new_daystring = old_daystring.substr(0,index) + 
						    '0' + 
						    old_daystring.substr(index+1);
		}	
						    
		store.dispatch(Act_Set_Date(new_daystring));
	}

    buildDayButtons(){
		var day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
		var daysList = [];
		

		var current_tab = store.getState().Config.TimeTable.ActiveTab;
		var tmp_color = store.getState().Tmp_Class.Class_Detail[current_tab].Color;
		var tmp_style = store.getState().Config.TimeTable.ColorGroup[tmp_color];

	    for (let i = 0; i < 7; i++) {
	        if (store.getState().Tmp_Class.Class_Detail[current_tab].Date.charAt(i) === '1') {
	            var tmp_style = store.getState().Config.TimeTable.ColorGroup[tmp_color];
	        } else {
	            var tmp_style = {"backgroundColor" : "#ffffff"};
	        }

	        daysList.push(React.createElement("button", {
	        	            className: "SelectButton",
	        	            id: day[i],
	        	            name: day[i],
	        	            value: day[i],
	        	            key: day[i] + i,
	        	            style: tmp_style,
	        	            onClick: () => this.handleDateSelect(day[i])
	        	        }, day[i]));
	    }

	    return daysList;		
	}


    render(){ 
    	return this.buildDayButtons();
    };
}

class ColorButtons extends React.Component {

	handleColorSelect(event){

    	var i = event.target.value;

		console.log("color here");
		console.log(i);
		store.dispatch(Act_ChangeColor(i));
	}

	buildColorButtons(){



		var current_tab = store.getState().Config.TimeTable.ActiveTab;
		var numberOfKind = store.getState().Config.TimeTable.ColorGroup.length;



		var buttonArray = [];
		for(var i = 0; i < numberOfKind; i++){
			var tmp_style = store.getState().Config.TimeTable.ColorGroup[i];
			var value = i;
			buttonArray.push(React.createElement("button",{
				className: "ColorSelectButton",
				id: "color" + i,
				key: "Color" + i,
				value: i,
				style: tmp_style,
				onClick: this.handleColorSelect
			},"C"));
		}
	
		return buttonArray;
	}

	render(){
		return this.buildColorButtons();
	}
}
function Check_Input(){
	return true;
}

class BuildButtons extends React.Component {

	handleClick(){
		Find_Action(this.props.Data.ID);
	}

	render() {
		// This syntax ensures `this` is bound within handleClick	
		return (
			<button onClick = {() => this.handleClick()}
					className = {this.props.Data.ClassName}
		            id = {this.props.Data.ID}
		            key = {this.props.Data.ID}
			>
				{this.props.Data.Content}
			</button>
		);
	}
}

function Find_Action(ID){
	console.log('Click');
	console.log(store.getState());
	console.log(ID);
	switch(ID){
		case "Btn_Save":
			var current_Action = store.getState().Action;
			if(current_Action === "ADD_CLASS"){
				store.dispatch(Act_AddClass(null));
			}else{
				store.dispatch(Act_ChangeClass(null));
			}			
			break;
		case "Btn_Cancle":
			store.dispatch(Act_Btn_Cancle(null));
			break;
		default:
			return "";
	}
}


function show_value(valueName){
	var current_tab = store.getState().Config.TimeTable.ActiveTab;
	switch(valueName){
		case "ClassName":
			return store.getState().Tmp_Class.ClassName;
			break;
		case "CourseSection":
			return store.getState().Tmp_Class.CourseSection;
			break;
		case "TitleName":
			return store.getState().Tmp_Class.CourseName;
			break;
		case "LocationB":
			return store.getState().Tmp_Class.Class_Detail[current_tab].LocationB;
			break;
		case "LocationR":
			return store.getState().Tmp_Class.Class_Detail[current_tab].LocationR;
			break;
		case "StartHour":
			return store.getState().Tmp_Class.Class_Detail[current_tab].TimeFrom.hour();
			break;
		case "StartMint":
			return store.getState().Tmp_Class.Class_Detail[current_tab].TimeFrom.minute();
			break;
		case "StopHour":
			return store.getState().Tmp_Class.Class_Detail[current_tab].TimeTo.hour();
			break;
		case "StopMint":
			return store.getState().Tmp_Class.Class_Detail[current_tab].TimeTo.minute();
			break;						
		default:
			return;
	}
}

function Select_Content_Builder(SelectName){
	switch(SelectName){
		case "HOUR":
			const hour = [""];
	        for (let i = 0; i < 24; i++) {
	            hour[i] = React.createElement("option", {key: i, value: i}, i);
	        }
	        return hour;
	    case "MINUTE":
	        const mints = [""];
	        let j = 0;
	        for (let i = 0; i < 60; i++) {
	            if ((i % 5) === 0) {
	                mints[j] = React.createElement("option", {key: j, value: i}, i);
	                j++;
	            }
	        }
	        return mints;
	    case "TYPES":
	        const type = [""];
	        const types = ["LEC", "TUT", "LAB"];
	        for (let i = 0; i < types.length; i++) {
	            type[i] = React.createElement("option", {key: i, value: types[i]}, types[i]);
	        }
	        return type;	    	
		default:
			return;
	}
}

function handleInputChange(event){
	store.dispatch(Act_handleInputChange(event));
}

function handleSelectChange(event){
	store.dispatch(Act_handleSelectChange(event));
}