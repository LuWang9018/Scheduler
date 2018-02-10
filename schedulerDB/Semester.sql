/*Add Semester_General*/
INSERT IGNORE INTO SchedulerTest.Semester_General(Semester_Year, Semester_Season)
VALUES('2018', 'Winter');

/*Add Semester_Detail*/
INSERT IGNORE INTO SchedulerTest.Semester_Detail(Semester_ID, Semester_From, Semester_To, User_ID)
VALUES(1, '2018-01-09', '2018-3-25', 1);