-- DDL.sql file for GROUP 12
-- Leon Ong
-- Jonathan Pham
-- Strength Solutions Supply


SET FOREIGN_KEY_CHECKS = 0;

-- Droppinp tables
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS OrderEquipment;
DROP TABLE IF EXISTS Equipment;
DROP TABLE IF EXISTS ProductType;
DROP TABLE IF EXISTS Reviews;


CREATE TABLE Users (
    userID int AUTO_INCREMENT NOT NULL UNIQUE,
    firstName varchar(50) NOT NULL,
    lastName varchar(50) NOT NULL,
    address varchar(50) NOT NULL,
    phoneNumber varchar(50) NOT NULL,
    email varchar(50) NOT NULL,

    PRIMARY KEY (userID)
);


-- We need to create a nullable relationship
CREATE TABLE Orders(
   
    orderID int AUTO_INCREMENT NOT NULL UNIQUE,
    userID int NULL, 
    orderDate date NOT NULL,
    numItems int NOT NULL,
    totalCost decimal(19,2) NOT NULL,

    PRIMARY KEY (orderID),
    FOREIGN KEY (userID) REFERENCES Users(userID)
        ON DELETE SET NULL

);

-- Set NULL for Equipment, this allows for Equipment to be dissasociated from 
-- an order
CREATE TABLE OrderEquipment(

    orderID int,
    equipmentID int,

    amount int NOT NULL,
    cost decimal(19,2) NOT NULL,

    
    FOREIGN KEY (equipmentID) REFERENCES Equipment(equipmentID)
        ON DELETE CASCADE,
    FOREIGN KEY (orderID) REFERENCES Orders(orderID)
        ON DELETE CASCADE

);

-- Create Trigger
-- Sources: https://docs.oracle.com/cd/E17781_01/appdev.112/e18147/tdddg_triggers.htm#TDDDG50000
-- https://mariadb.com/kb/en/trigger-overview/
-- https://www.w3resource.com/mysql/mysql-triggers.php
-- Used ChatGPT for debugging

-- This source helped me how to handle a update trigger that would trigger another update, which was giving me some issues
-- https://dba.stackexchange.com/questions/20328/trigger-to-update-after-update

-- Update the new Cost, while multiplying the potential changed amount or equipment ID
-- This results in the NEW prefixes for these values

CREATE TRIGGER updateNI
AFTER UPDATE ON OrderEquipment
FOR EACH ROW
UPDATE Orders SET Orders.numItems = (SELECT sum(amount) from OrderEquipment where OrderEquipment.orderID = Orders.orderID) WHERE orderID = Orders.orderID;

-- CREATE TRIGGER insertNI
-- BEFORE INSERT ON OrderEquipment
-- FOR EACH ROW
-- UPDATE Orders SET numItems = 4 where orderID = NEW.orderID;

CREATE TRIGGER deleteNI
AFTER DELETE ON OrderEquipment
FOR EACH ROW
UPDATE Orders SET Orders.numItems = (SELECT sum(amount) from OrderEquipment where OrderEquipment.orderID = Orders.orderID) WHERE orderID = Orders.orderID;

CREATE TRIGGER updateTC
AFTER UPDATE ON OrderEquipment
FOR EACH ROW
UPDATE Orders SET Orders.totalCost = (SELECT sum(cost) from OrderEquipment where OrderEquipment.orderID = Orders.orderID) WHERE orderID = Orders.orderID;

CREATE TRIGGER deleteTC
AFTER DELETE ON OrderEquipment
FOR EACH ROW
UPDATE Orders SET Orders.totalCost = (SELECT sum(cost) from OrderEquipment where OrderEquipment.orderID = Orders.orderID) WHERE orderID = Orders.orderID;



CREATE TRIGGER update_prices_EID
BEFORE UPDATE ON OrderEquipment
FOR EACH ROW
SET NEW.cost = (NEW.amount) * (SELECT equipmentCost FROM Equipment WHERE equipmentID = NEW.equipmentID);


CREATE TABLE Equipment(
    equipmentID int AUTO_INCREMENT NOT NULL UNIQUE,
    equipmentName varchar(50) NOT NULL,
    equipmentDescription varchar(500) NOT NULL,
    equipmentCost decimal(19,2) NOT NULL,
    equipmentStock int NOT NULL,
    productTypeID int,

    PRIMARY KEY (equipmentID),
    FOREIGN KEY (productTypeID) REFERENCES ProductType(productTypeID)
        ON DELETE SET NULL
);

CREATE TABLE ProductType(
    productTypeID int AUTO_INCREMENT NOT NULL UNIQUE,
    typeDescription varchar(50) NOT NULL,
    PRIMARY KEY (productTypeID)
);


CREATE TABLE Reviews(
    reviewID int AUTO_INCREMENT NOT NULL UNIQUE,
    userID int, 
    equipmentID int,

    reviewDescription varchar(500) NOT NULL,
    stars int NOT NULL,

    PRIMARY KEY(reviewID),
  
    FOREIGN KEY (equipmentID) REFERENCES Equipment(equipmentID)
        ON DELETE CASCADE,
    FOREIGN KEY (userID) REFERENCES Users(userID) 
        ON DELETE CASCADE

);

-- Example Data

INSERT INTO Users (
    firstName,
    lastName,
    address,
    phoneNumber,
    email
)
VALUES
(
    "Jon",
    "Doe",
    "12345 Freeway St.",
    "123-423-2345",
    "jonDo@bye.com"
),
(
    "Steve",
    "Parks",
    "42235 Some Ave.",
    "753-833-2355",
    "steveParks@outlook.com"
),
(
    "Jeff",
    "Bezzels",
    "235 Poly Circle",
    "962-434-5724",
    "jeffBez@amazing.com"
),
(
    "Alvin",
    "Loops",
    "3842 Byte Blvd.",
    "864-246-5723",
    "avlLoops@code.com"
);



INSERT INTO Orders (
    userID,
    orderDate,
    numItems,
    totalCost
)
VALUES
(
    -- Utilzing SUM to calculate the total costs
    -- https://www.w3schools.com/sql/sql_count_avg_sum.asp
    (SELECT userID from Users where firstName = 'Jeff' and lastName = 'Bezzels'),
    '2022-05-23',
    0,
    0

),
(
    (SELECT userID from Users where firstName = 'Jon' and lastName = 'Doe'),
    '2012-10-04',
    0,
    0

),
(
    (SELECT userID from Users where firstName = 'Alvin' and lastName = 'Loops'),
    '2021-08-13',
    0,
    0

),
(

    (SELECT userID from Users where firstName = 'Jeff' and lastName = 'Bezzels'),
    '2021-04-23',
    0,
    0

);


INSERT INTO Equipment (
    equipmentName,
    equipmentDescription,
    equipmentCost,
    equipmentStock,
    productTypeID

)
VALUES
(
    "Squat Rack",
    "A metal rack or cage consisting of support pillars with adjustable bars and hooks",
    450,
    21,
    2
),
(
    "Treadmill",
    "for indoor use that simulates walking, jogging, or running",
    330,
    11,
    3
),
(
    "Yoga Mat",
    "For your yoga classes!",
    20,
    30,
    5
);


INSERT INTO ProductType (
    productTypeID,
    typeDescription
)
VALUES
(
    "1",
    "Weight Machines"
),
(
    "2",
    "Free Weights"
),
(
    "3",
    "Cardio"
),
(
    "4",
    "Home-Gym Systems"
),
(
    "5",
    "Accessories"
);



INSERT INTO Reviews (
    userID,
    equipmentID,
    reviewDescription,
    stars
)
VALUES
(
    (SELECT userID from Users where firstName = 'Jeff' and lastName = 'Bezzels'),
    (SELECT equipmentID from Equipment where equipmentName = "Squat Rack"),
    "This equipment is really amazing and I really love it. I would recommend to others.",
    4
),
(
    (SELECT userID from Users where firstName = 'Jon' and lastName = 'Doe'),
    (SELECT equipmentID from Equipment where equipmentName = "Treadmill"),
    "This equipment is alright. It is just good for running.",
    2
),
(
    (SELECT userID from Users where firstName = 'Alvin' and lastName = 'Loops'),
    (SELECT equipmentID from Equipment where equipmentName = "Yoga Mat"),
    "This equipment is bad. Only good for stretching but you can just stretch on the floor.",
    1
);

INSERT INTO OrderEquipment(

    orderID,
    equipmentID,

    amount,
    cost

)
VALUES
(
    (SELECT orderID from Orders where (userID = 3 AND orderDate = '2022-05-23')),
    (SELECT equipmentID from Equipment where equipmentName = "Squat Rack"),
    5,
    (SELECT equipmentCost from Equipment where equipmentName = "Squat Rack") * amount
),
(
    (SELECT orderID from Orders where (userID = 3 AND orderDate = '2022-05-23')),
    (SELECT equipmentID from Equipment where equipmentName = "Yoga Mat"),
    1,
    (SELECT equipmentCost from Equipment where equipmentName = "Yoga Mat") * amount

),
(
    (SELECT orderID from Orders where (userID = 4 AND orderDate = '2021-08-13')),
    (SELECT equipmentID from Equipment where equipmentName = "Treadmill"),
    2,
    (SELECT equipmentCost from Equipment where equipmentName = "Treadmill") * amount
),
(
    (SELECT orderID from Orders where (userID = 1 AND orderDate = '2012-10-04')),
    (SELECT equipmentID from Equipment where equipmentName = "Yoga Mat"),
    3,
    (SELECT equipmentCost from Equipment where equipmentName = "Yoga Mat") * amount
),
(
    (SELECT orderID from Orders where (userID = 3 AND orderDate = '2021-04-23')),
    (SELECT equipmentID from Equipment where equipmentName = "Yoga Mat"),
    2,
    (SELECT equipmentCost from Equipment where equipmentName = "Yoga Mat") * amount
)
;


-- https://www.freecodecamp.org/news/sql-subquery-how-to-sub-query-in-select-statement/
-- We after the order is processed, We can update the total number of items 

UPDATE Orders
SET numItems = (select sum(amount) from OrderEquipment where orderID 
                IN (SELECT orderID from Orders where userID = 3 AND orderDate = '2022-05-23'))
WHERE orderID = (SELECT orderID from Orders where (userID = 3 AND orderDate = '2022-05-23'));

UPDATE Orders
SET numItems = (select sum(amount) from OrderEquipment where orderID 
                IN (SELECT orderID from Orders where userID = 1 AND orderDate = '2012-10-04'))
WHERE orderID = (SELECT orderID from Orders where (userID = 1 AND orderDate = '2012-10-04'));

UPDATE Orders
SET numItems = (select sum(amount) from OrderEquipment where orderID 
                IN (SELECT orderID from Orders where userID = 4 AND orderDate = '2021-08-13'))
WHERE orderID = (SELECT orderID from Orders where (userID = 4 AND orderDate = '2021-08-13') );

UPDATE Orders
SET numItems = (select sum(amount) from OrderEquipment where orderID 
                IN (SELECT orderID from Orders where (userID = 3 AND orderDate = '2021-04-23')))
WHERE orderID = (SELECT orderID from Orders where (userID = 3 AND orderDate = '2021-04-23') );

-- Update the total price purchased by each order
UPDATE Orders
SET totalCost = (select sum(cost) from OrderEquipment where orderID 
                IN (SELECT orderID from Orders where (userID = 3 AND orderDate = '2022-05-23')))
WHERE orderID = (SELECT orderID from Orders where (userID = 3 AND orderDate = '2022-05-23'));

UPDATE Orders
SET totalCost = (select sum(cost) from OrderEquipment where orderID 
                IN (SELECT orderID from Orders where (userID = 1 AND orderDate = '2012-10-04')))
WHERE orderID = (SELECT orderID from Orders where (userID = 1 AND orderDate = '2012-10-04'));

UPDATE Orders
SET totalCost = (select sum(cost) from OrderEquipment where orderID 
                IN (SELECT orderID from Orders where (userID = 4 AND orderDate = '2021-08-13')))
WHERE orderID = (SELECT orderID from Orders where (userID = 4 AND orderDate = '2021-08-13'));

UPDATE Orders
SET totalCost = (select sum(cost) from OrderEquipment where orderID 
                IN (SELECT orderID from Orders where (userID = 3 AND orderDate = '2021-04-23')))
WHERE orderID = (SELECT orderID from Orders where (userID = 3 AND orderDate = '2021-04-23') );


CREATE TRIGGER insertNI
AFTER INSERT ON OrderEquipment
FOR EACH ROW
UPDATE Orders SET Orders.numItems = (SELECT sum(amount) from OrderEquipment where OrderEquipment.orderID = Orders.orderID) WHERE orderID = Orders.orderID;

CREATE TRIGGER insertTC
AFTER INSERT ON OrderEquipment
FOR EACH ROW
UPDATE Orders SET Orders.totalCost = (SELECT sum(cost) from OrderEquipment where OrderEquipment.orderID = Orders.orderID) WHERE orderID = Orders.orderID;


SET FOREIGN_KEY_CHECKS = 1;














