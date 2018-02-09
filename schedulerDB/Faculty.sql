/*Add Faculty*/
INSERT IGNORE INTO Faculty(Faculty_Name, Faculty_Name_Short)
VALUES('Mathematics', 'Math');
INSERT IGNORE INTO Faculty(Faculty_Name)
VALUES('Engineering');
INSERT IGNORE INTO Faculty(Faculty_Name)
VALUES('Science');

/*Add School-Faculty*/
/*UW*/
INSERT IGNORE INTO School_Faculty(School_ID, Faculty_ID)
VALUES(2, 1);
INSERT IGNORE INTO School_Faculty(School_ID, Faculty_ID)
VALUES(2, 2);
INSERT IGNORE INTO School_Faculty(School_ID, Faculty_ID)
VALUES(2, 3);

/*UT*/
INSERT IGNORE INTO School_Faculty(School_ID, Faculty_ID)
VALUES(1, 2);
INSERT IGNORE INTO School_Faculty(School_ID, Faculty_ID)
VALUES(1, 3);

