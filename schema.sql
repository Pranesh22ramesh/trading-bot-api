-- School Management Database Schema
-- Run this file once to initialize the database and table

CREATE DATABASE IF NOT EXISTS school_management;

USE school_management;

CREATE TABLE IF NOT EXISTS schools (
  id          INT           NOT NULL AUTO_INCREMENT,
  name        VARCHAR(255)  NOT NULL,
  address     VARCHAR(500)  NOT NULL,
  latitude    FLOAT         NOT NULL,
  longitude   FLOAT         NOT NULL,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users (
  id          INT           NOT NULL AUTO_INCREMENT,
  email       VARCHAR(255)  NOT NULL UNIQUE,
  password    VARCHAR(255)  NOT NULL,
  role        ENUM('admin', 'user') DEFAULT 'admin',
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
