# Реалізація інформаційного та програмного забезпечення

## SQL-скрипт для створення на початкового наповнення бази даних


```
-- MySQL Script generated by MySQL Workbench
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema default_schema
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema OUR project
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `OUR project` ;

-- -----------------------------------------------------
-- Schema OUR project
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `OUR project` DEFAULT CHARACTER SET utf8 ;
USE `OUR project` ;

-- -----------------------------------------------------
-- Table `OUR project`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OUR project`.`user` ;

CREATE TABLE IF NOT EXISTS `OUR project`.`user` (
  `id` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  `email` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `avatar` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OUR project`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OUR project`.`role` ;

CREATE TABLE IF NOT EXISTS `OUR project`.`role` (
  `id` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  `name` ENUM('ProjectManager', 'ProjectUser', 'SystemAdministrator') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OUR project`.`access`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OUR project`.`access` ;

CREATE TABLE IF NOT EXISTS `OUR project`.`access` (
  `user_id` BINARY(16) NOT NULL,
  `role_id` BINARY(16) NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`),
  INDEX `fk_access_user_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_access_role1_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `fk_access_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `OUR project`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_access_role`
    FOREIGN KEY (`role_id`)
    REFERENCES `OUR project`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OUR project`.`operation_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OUR project`.`operation_type` ;

CREATE TABLE IF NOT EXISTS `OUR project`.`operation_type` (
  `id` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  `name` ENUM('create', 'read', 'update', 'delete') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OUR project`.`request_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OUR project`.`request_type` ;

CREATE TABLE IF NOT EXISTS `OUR project`.`request_type` (
  `id` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  `object_id` BINARY(16) NOT NULL,
  `operation_type_id` BINARY(16) NOT NULL,
  PRIMARY KEY (`id`, `object_id`, `operation_type_id`),
  INDEX `fk_request_type_operation_type1_idx` (`operation_type_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_request_operation`
    FOREIGN KEY (`operation_type_id`)
    REFERENCES `OUR project`.`operation_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OUR project`.`grant`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OUR project`.`grant` ;

CREATE TABLE IF NOT EXISTS `OUR project`.`grant` (
  `request_type_id` BINARY(16) NOT NULL,
  `role_id` BINARY(16) NOT NULL,
  PRIMARY KEY (`request_type_id`, `role_id`),
  INDEX `fk_grant_role1_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `fk_grant_request`
    FOREIGN KEY (`request_type_id`)
    REFERENCES `OUR project`.`request_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_grant_role`
    FOREIGN KEY (`role_id`)
    REFERENCES `OUR project`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OUR project`.`workspace`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OUR project`.`workspace` ;

CREATE TABLE IF NOT EXISTS `OUR project`.`workspace` (
  `id` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(200) NULL DEFAULT NULL,
  `owner_id` BINARY(16) NOT NULL,
  PRIMARY KEY (`id`, `owner_id`),
  INDEX `fk_workspace_user1_idx` (`owner_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `owner_id_UNIQUE` (`owner_id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  CONSTRAINT `fk_workspace_user`
    FOREIGN KEY (`owner_id`)
    REFERENCES `OUR project`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OUR project`.`project`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OUR project`.`project` ;

CREATE TABLE IF NOT EXISTS `OUR project`.`project` (
  `id` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NULL DEFAULT NULL,
  `manager_id` BINARY(16) NOT NULL,
  `workspace_id` BINARY(16) NOT NULL,
  PRIMARY KEY (`manager_id`, `workspace_id`, `id`),
  INDEX `fk_project_user1_idx` (`manager_id` ASC) VISIBLE,
  INDEX `fk_project_workspace1_idx` (`workspace_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_project_user`
    FOREIGN KEY (`manager_id`)
    REFERENCES `OUR project`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_project_workspace`
    FOREIGN KEY (`workspace_id`)
    REFERENCES `OUR project`.`workspace` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OUR project`.`board`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OUR project`.`board` ;

CREATE TABLE IF NOT EXISTS `OUR project`.`board` (
  `id` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(200) NULL,
  `project_id` BINARY(16) NOT NULL,
  PRIMARY KEY (`id`, `project_id`),
  INDEX `fk_board_project1_idx` (`project_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_board_project`
    FOREIGN KEY (`project_id`)
    REFERENCES `OUR project`.`project` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OUR project`.`task`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OUR project`.`task` ;

CREATE TABLE IF NOT EXISTS `imbaza`.`task` (
  `id` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  `title` VARCHAR(45) NOT NULL,
  `description` VARCHAR(200) NULL DEFAULT NULL,
  `photo` VARCHAR(100) NULL DEFAULT NULL,
  `deadline` DATETIME NULL DEFAULT NULL,
  `board_id` BINARY(16) NOT NULL,
  PRIMARY KEY (`id`, `board_id`),
  INDEX `fk_task_board1_idx` (`board_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_task_board`
    FOREIGN KEY (`board_id`)
    REFERENCES `OUR project`.`board` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OUR project`.`status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OUR project`.`status` ;

CREATE TABLE IF NOT EXISTS `OUR project`.`status` (
  `id` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  `name` ENUM('Done', 'BugFound', 'InReview', 'InProgress', 'ToDo', 'BackLog') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OUR project`.`task_status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OUR project`.`task_status` ;

CREATE TABLE IF NOT EXISTS `OUR project`.`task_status` (
  `task_id` BINARY(16) NOT NULL,
  `status_id` BINARY(16) NOT NULL,
  PRIMARY KEY (`task_id`, `status_id`),
  INDEX `fk_task_status_status1_idx` (`status_id` ASC) VISIBLE,
  CONSTRAINT `fk_task_status_task`
    FOREIGN KEY (`task_id`)
    REFERENCES `OUR project`.`task` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_task_status_status`
    FOREIGN KEY (`status_id`)
    REFERENCES `OUR project`.`status` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

```

## RESTfull сервіс для управління даними

```
import fastapi
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import pymysql

app = FastAPI()


class DataBase(object):

    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(DataBase, cls).__new__(cls)
        return cls.instance

    def __init__(self):
        self.connection = None
        self.cursor = None
        self.__connect()


    def __connect(self):
        self.connection = pymysql.connect(
            host='127.0.0.1',
            port=3306,
            user='root',
            password='',
            database='justchill',
        )
        self.cursor = self.connection.cursor(pymysql.cursors.DictCursor)

    def execute(self, command):
        self.cursor.execute(command)
        result = self.cursor.fetchall()
        self.connection.commit()
        return result


@app.get("/api/allusers")
async def get_users():
    db = DataBase()
    return JSONResponse(db.execute('SELECT * FROM User'))


@app.get('/api/user/{id}')
def get_user_by_id(id):
    db = DataBase()
    result = db.execute(f'SELECT * FROM User WHERE id={id}')
    if not result:
        raise fastapi.HTTPException(status_code=404)
    return JSONResponse(result)


@app.post('/api/adduser', status_code=201)
async def add_new_user(req: Request):
    req_dict = await req.json()
    try:
        email = req_dict['email']
        password = req_dict['password']
        nickname = req_dict['nickname']
        id_ban = req_dict['Ban']
        print(req_dict['Ban'])
    except:
        raise fastapi.HTTPException(status_code=400)
    db = DataBase()
    db.execute(f"INSERT INTO `User`(`email`, `password`, `nickname`, `Ban`) VALUES ('{email}','{password}','{nickname}',{id_ban});")
    return {'message': 'New user added!'}


@app.put('/api/updateuser/{id}')
async def update_user(id, req: Request):
    req_dict = await req.json()
    db = DataBase()
    for key in req_dict:
         if not db.execute(f'SELECT * FROM User WHERE id={id}'):
            raise fastapi.HTTPException(status_code=404)
         db.execute(f'UPDATE User SET {key}="{req_dict[key]}" WHERE id={id}')
    return {"message": 'Updated!'}


@app.delete('/api/deleteuser/{id}')
def delete(id):
    db = DataBase()
    if not db.execute(f'SELECT * FROM User WHERE id={id}'):
        raise fastapi.HTTPException(status_code=404)
    db.execute(f'DELETE FROM `User` WHERE id={id}')
    return {'message': f'User with id={id} deleted'}
    ```