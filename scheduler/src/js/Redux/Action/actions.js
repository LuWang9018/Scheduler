import {RequestData} from '../../RequestData/RequestData'

//Client Server
const Request_Data = 'Request_Data';

//Class Panel
const Change_Tmp_Class = 'Change_Tmp_Class';
const handleInputChange = 'handleInputChange';
const handleSelectChange = 'handleSelectChange';
const AddClass = 'AddClass';
const ChangeClass = 'ChangeClass';
const Btn_Cancle = 'Btn_Cancle';
const Set_ActiveTab = 'Set_ActiveTab';
const Delete_Tab = 'Delete_Tab';
const Set_Date = 'Set_Date';
const ChangeColor = 'ChangeColor';

export function Act_RequestData(Data){
	return{
		type: Request_Data,
		Data
	}
}

export function Act_Change_Tmp_Class(Data){
	return{
		type: Change_Tmp_Class,
		Data
	}
}

export function Act_handleInputChange(Data){
	return{
		type: handleInputChange,
		Data
	}
}

export function Act_handleSelectChange(Data){
	return{
		type: handleSelectChange,
		Data
	}
}

export function Act_AddClass(Data){
	return{
		type: AddClass,
		Data
	}
}

export function Act_ChangeClass(Data){
	return{
		type: ChangeClass,
		Data
	}
}

export function Act_Btn_Cancle(Data){
	return{
		type: Btn_Cancle,
		Data
	}
}

export function Act_Set_ActiveTab(Data){
	return{
		type: Set_ActiveTab,
		Data
	}
}

export function Act_Delete_Tab(Data){
	return{
		type: Delete_Tab,
		Data
	}
}

export function Act_Set_Date(Data){
	return{
		type: Set_Date,
		Data
	}	
}

export function Act_ChangeColor(Data){
	return{
		type: ChangeColor,
		Data
	}	
}