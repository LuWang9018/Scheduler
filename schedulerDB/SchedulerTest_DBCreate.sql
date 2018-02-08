-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema SchedulerTest
-- -----------------------------------------------------
-- my DB ER
-- 

-- -----------------------------------------------------
-- Schema SchedulerTest
--
-- my DB ER
-- 
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `SchedulerTest` DEFAULT CHARACTER SET utf8 ;
USE `SchedulerTest` ;

-- -----------------------------------------------------
-- Table `SchedulerTest`.`Country`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SchedulerTest`.`Country` (
  `Country_ID` INT NOT NULL AUTO_INCREMENT,
  `Country_Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Country_ID`),
  UNIQUE INDEX `Country_Name_UNIQUE` (`Country_Name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SchedulerTest`.`Province`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SchedulerTest`.`Province` (
  `Province_ID` INT NOT NULL AUTO_INCREMENT,
  `Province_Name` VARCHAR(45) NOT NULL,
  `Country_ID` INT NOT NULL,
  PRIMARY KEY (`Province_ID`),
  INDEX `fk_Province_Country_idx` (`Country_ID` ASC),
  CONSTRAINT `fk_Province_Country`
    FOREIGN KEY (`Country_ID`)
    REFERENCES `SchedulerTest`.`Country` (`Country_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SchedulerTest`.`City`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SchedulerTest`.`City` (
  `City_ID` INT NOT NULL AUTO_INCREMENT,
  `City_Name` VARCHAR(45) NOT NULL,
  `Province_ID` INT NOT NULL,
  PRIMARY KEY (`City_ID`),
  INDEX `fk_City_Province1_idx` (`Province_ID` ASC),
  CONSTRAINT `fk_City_Province1`
    FOREIGN KEY (`Province_ID`)
    REFERENCES `SchedulerTest`.`Province` (`Province_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SchedulerTest`.`School`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SchedulerTest`.`School` (
  `School_ID` INT NOT NULL AUTO_INCREMENT,
  `School_Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`School_ID`),
  UNIQUE INDEX `School_Name_UNIQUE` (`School_Name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SchedulerTest`.`SchoolCampus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SchedulerTest`.`SchoolCampus` (
  `Campus_ID` INT NOT NULL AUTO_INCREMENT,
  `Campus_Name` VARCHAR(45) NOT NULL,
  `School_ID` INT NOT NULL,
  `City_City_ID` INT NOT NULL,
  PRIMARY KEY (`Campus_ID`, `City_City_ID`),
  INDEX `fk_SchoolCampus_School1_idx` (`School_ID` ASC),
  INDEX `fk_SchoolCampus_City1_idx` (`City_City_ID` ASC),
  CONSTRAINT `fk_SchoolCampus_School1`
    FOREIGN KEY (`School_ID`)
    REFERENCES `SchedulerTest`.`School` (`School_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SchoolCampus_City1`
    FOREIGN KEY (`City_City_ID`)
    REFERENCES `SchedulerTest`.`City` (`City_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SchedulerTest`.`Faculty`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SchedulerTest`.`Faculty` (
  `Faculity_ID` INT NOT NULL AUTO_INCREMENT,
  `Faculty_Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Faculity_ID`),
  UNIQUE INDEX `Faculty_Name_UNIQUE` (`Faculty_Name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SchedulerTest`.`School-Faculty`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SchedulerTest`.`School-Faculty` (
  `School_ID` INT NOT NULL,
  `Faculity_ID` INT NOT NULL,
  INDEX `fk_School-Faculty_School1_idx` (`School_ID` ASC),
  INDEX `fk_School-Faculty_Faculty1_idx` (`Faculity_ID` ASC),
  CONSTRAINT `fk_School-Faculty_School1`
    FOREIGN KEY (`School_ID`)
    REFERENCES `SchedulerTest`.`School` (`School_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_School-Faculty_Faculty1`
    FOREIGN KEY (`Faculity_ID`)
    REFERENCES `SchedulerTest`.`Faculty` (`Faculity_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SchedulerTest`.`Major`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SchedulerTest`.`Major` (
  `Major_ID` INT NOT NULL,
  `Major_Name` VARCHAR(70) NOT NULL,
  `Major_Short` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`Major_ID`),
  UNIQUE INDEX `Major_Name_UNIQUE` (`Major_Name` ASC),
  UNIQUE INDEX `Major_ID_UNIQUE` (`Major_ID` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SchedulerTest`.`Faculty-Major`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SchedulerTest`.`Faculty-Major` (
  `Faculty_Faculity_ID` INT NOT NULL,
  `Major_Major_ID` INT NOT NULL,
  INDEX `fk_Faculty-Major_Faculty1_idx` (`Faculty_Faculity_ID` ASC),
  INDEX `fk_Faculty-Major_Major1_idx` (`Major_Major_ID` ASC),
  CONSTRAINT `fk_Faculty-Major_Faculty1`
    FOREIGN KEY (`Faculty_Faculity_ID`)
    REFERENCES `SchedulerTest`.`Faculty` (`Faculity_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Faculty-Major_Major1`
    FOREIGN KEY (`Major_Major_ID`)
    REFERENCES `SchedulerTest`.`Major` (`Major_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SchedulerTest`.`Class_General`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SchedulerTest`.`Class_General` (
  `Class_ID` INT NOT NULL,
  `Class_Code` VARCHAR(45) NOT NULL,
  `Class_Name` VARCHAR(45) NULL,
  `Major_ID` INT NOT NULL,
  `School_ID` INT NOT NULL,
  PRIMARY KEY (`Class_ID`),
  INDEX `fk_Class_Major1_idx` (`Major_ID` ASC),
  INDEX `fk_Class_School1_idx` (`School_ID` ASC),
  CONSTRAINT `fk_Class_Major1`
    FOREIGN KEY (`Major_ID`)
    REFERENCES `SchedulerTest`.`Major` (`Major_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Class_School1`
    FOREIGN KEY (`School_ID`)
    REFERENCES `SchedulerTest`.`School` (`School_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SchedulerTest`.`Professor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SchedulerTest`.`Professor` (
  `Professor_ID` INT NOT NULL AUTO_INCREMENT,
  `Professor_F_Name` VARCHAR(45) NOT NULL,
  `Professor_L_Name` VARCHAR(45) NOT NULL,
  `Professor_M_Name` VARCHAR(45) NULL,
  `School_ID` INT NOT NULL,
  PRIMARY KEY (`Professor_ID`),
  INDEX `fk_Professor_School1_idx` (`School_ID` ASC),
  CONSTRAINT `fk_Professor_School1`
    FOREIGN KEY (`School_ID`)
    REFERENCES `SchedulerTest`.`School` (`School_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SchedulerTest`.`Semester_General`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SchedulerTest`.`Semester_General` (
  `Semester_ID` INT NOT NULL AUTO_INCREMENT,
  `Semester_Year` VARCHAR(45) NULL,
  `Semester_Season` VARCHAR(45) NULL,
  PRIMARY KEY (`Semester_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SchedulerTest`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SchedulerTest`.`User` (
  `User_ID` INT NOT NULL AUTO_INCREMENT,
  `User_Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`User_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SchedulerTest`.`Semester_Detail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SchedulerTest`.`Semester_Detail` (
  `Semester_Detail_ID` INT NOT NULL AUTO_INCREMENT,
  `Semester_Semester_ID` INT NOT NULL,
  `Semester_From` DATE NOT NULL,
  `Semester_To` DATE NOT NULL,
  `User_User_ID` INT NOT NULL,
  PRIMARY KEY (`Semester_Detail_ID`, `User_User_ID`),
  INDEX `fk_Semester_Detail_User1_idx` (`User_User_ID` ASC),
  CONSTRAINT `fk_Semester_Detail_Semester1`
    FOREIGN KEY (`Semester_Semester_ID`)
    REFERENCES `SchedulerTest`.`Semester_General` (`Semester_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Semester_Detail_User1`
    FOREIGN KEY (`User_User_ID`)
    REFERENCES `SchedulerTest`.`User` (`User_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SchedulerTest`.`Building`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SchedulerTest`.`Building` (
  `Building_ID` INT NOT NULL AUTO_INCREMENT,
  `Building_Name` VARCHAR(45) NULL,
  `Building_Name_Short` VARCHAR(10) NOT NULL,
  `School_ID` INT NOT NULL,
  `Faculity_ID` INT NOT NULL,
  PRIMARY KEY (`Building_ID`),
  INDEX `fk_Building_School1_idx` (`School_ID` ASC),
  INDEX `fk_Building_Faculty1_idx` (`Faculity_ID` ASC),
  CONSTRAINT `fk_Building_School1`
    FOREIGN KEY (`School_ID`)
    REFERENCES `SchedulerTest`.`School` (`School_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Building_Faculty1`
    FOREIGN KEY (`Faculity_ID`)
    REFERENCES `SchedulerTest`.`Faculty` (`Faculity_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SchedulerTest`.`Room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SchedulerTest`.`Room` (
  `Room_ID` INT NOT NULL AUTO_INCREMENT,
  `Room_Number` VARCHAR(10) NOT NULL,
  `Building_ID` INT NOT NULL,
  PRIMARY KEY (`Room_ID`),
  INDEX `fk_Room_Building1_idx` (`Building_ID` ASC),
  CONSTRAINT `fk_Room_Building1`
    FOREIGN KEY (`Building_ID`)
    REFERENCES `SchedulerTest`.`Building` (`Building_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SchedulerTest`.`Class_Detail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SchedulerTest`.`Class_Detail` (
  `Class_Detail_ID` INT NOT NULL AUTO_INCREMENT,
  `Class_General_ID` INT NOT NULL,
  `Class_Detail_Section` INT NULL,
  `Class_Detail_TimeFrom` TIME NOT NULL,
  `Class_Detail_TimeTo` TIME NOT NULL,
  `Class_Detail_Date` INT NOT NULL,
  `Room_ID` INT NOT NULL,
  `Professor_ID` INT NULL,
  `Class_Detail_Type` VARCHAR(10) NOT NULL DEFAULT 'LEC',
  `Class_Detail_Color` VARCHAR(45) NOT NULL DEFAULT 'RED',
  `Semester_Detail_ID` INT NOT NULL,
  PRIMARY KEY (`Class_Detail_ID`),
  INDEX `fk_Class_Detail_Class_General1_idx` (`Class_General_ID` ASC),
  INDEX `fk_Class_Detail_Semester_Detail1_idx` (`Semester_Detail_ID` ASC),
  INDEX `fk_Class_Detail_Professor1_idx` (`Professor_ID` ASC),
  INDEX `fk_Class_Detail_Room1_idx` (`Room_ID` ASC),
  CONSTRAINT `fk_Class_Detail_Class_General1`
    FOREIGN KEY (`Class_General_ID`)
    REFERENCES `SchedulerTest`.`Class_General` (`Class_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Class_Detail_Semester_Detail1`
    FOREIGN KEY (`Semester_Detail_ID`)
    REFERENCES `SchedulerTest`.`Semester_Detail` (`Semester_Detail_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Class_Detail_Professor1`
    FOREIGN KEY (`Professor_ID`)
    REFERENCES `SchedulerTest`.`Professor` (`Professor_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Class_Detail_Room1`
    FOREIGN KEY (`Room_ID`)
    REFERENCES `SchedulerTest`.`Room` (`Room_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SchedulerTest`.`Professor-Faculty`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SchedulerTest`.`Professor-Faculty` (
  `Professor_ID` INT NOT NULL,
  `Faculity_ID` INT NOT NULL,
  PRIMARY KEY (`Professor_ID`, `Faculity_ID`),
  INDEX `fk_Professor_has_Faculty_Faculty1_idx` (`Faculity_ID` ASC),
  INDEX `fk_Professor_has_Faculty_Professor1_idx` (`Professor_ID` ASC),
  CONSTRAINT `fk_Professor_has_Faculty_Professor1`
    FOREIGN KEY (`Professor_ID`)
    REFERENCES `SchedulerTest`.`Professor` (`Professor_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Professor_has_Faculty_Faculty1`
    FOREIGN KEY (`Faculity_ID`)
    REFERENCES `SchedulerTest`.`Faculty` (`Faculity_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
