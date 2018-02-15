CREATE PROCEDURE GetAllSemester()
	BEGIN
		SELECT *  FROM SchedulerTest.Semester_Detail;
	END;