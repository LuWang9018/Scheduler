/*Add Building*/
INSERT IGNORE INTO SchedulerTest.Building(Building_Name, Building_Name_Short, School_ID)
VALUES('Mathematics & Computer Building', 'MC', 2);
INSERT IGNORE INTO SchedulerTest.Building(Building_Name, Building_Name_Short, School_ID)
VALUES('J.R. Coutts Engineering Lecture Hall', 'RCH', 2);

/*Add rooms*/
INSERT IGNORE INTO SchedulerTest.Room(Room_Number, Building_ID)
VALUES('303', 2);