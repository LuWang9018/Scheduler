/*Add University*/
INSERT IGNORE INTO School(School_Name)
VALUES('University of Waterloo');

/*Add campus*/
/*
MISSISSAUGA
ST.GEORGE
SCARBOROUGH
*/
INSERT IGNORE INTO SchoolCampus(Campus_Name, School_ID, City_ID)
VALUES('MAIN', 2, 2);

