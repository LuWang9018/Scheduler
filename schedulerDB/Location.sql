
/*Add Country*/
INSERT IGNORE INTO Country(Country_Name)
VALUES('Canada');

/*Add Province*/
INSERT IGNORE INTO Province(Province_Name, Country_ID)
VALUES('Ontario', 1);

/*Add City*/
INSERT IGNORE INTO City(City_Name, Province_ID)
VALUES('Waterloo', 1);

