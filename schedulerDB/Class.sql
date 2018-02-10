/*Add Class_General*/
INSERT IGNORE INTO SchedulerTest.Class_General(Class_Subject, Class_Code, Class_Name, School_ID)
VALUES('CS', '656', 'Computer Networks', 2);

/*Add Class_Detail*/
INSERT IGNORE INTO SchedulerTest.Class_Detail(Class_General_ID, Class_Detail_Section, Class_Detail_TimeFrom, Class_Detail_TimeTo, Class_Detail_Date,
Room_ID, Professor_ID, Class_Detail_Type, Class_Detail_Color, Semester_Detail_ID)
VALUES(1, '001', '10:00', '11:20', '0101000', 1, 1, 'LEC', 'RED', 1);