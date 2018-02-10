/*Add prof*/
INSERT IGNORE INTO SchedulerTest.Professor(Professor_F_Name, Professor_L_Name, Professor_M_Name, School_ID)
VALUES("Limam", "Noura", null, 2 );

/*Add Professor_Faculty*/
INSERT IGNORE INTO SchedulerTest.Professor_Faculty(Professor_ID, Faculty_ID)
VALUES(1, 1 );