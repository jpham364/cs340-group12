SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    userID int AUTO_INCREMENT NOT NULL UNIQUE,
    firstName varchar(50) NOT NULL,
    lastName varchar(50) NOT NULL,
    address varchar(50) NOT NULL,
    phoneNumber varchar(50) NOT NULL,
    email varchar(50) NOT NULL,



    PRIMARY KEY (userID)
);

DROP TABLE IF EXISTS Orders;
CREATE TABLE Orders(
   
    orderID int AUTO_INCREMENT NOT NULL UNIQUE,
    userID int, 
    orderDate date NOT NULL,
    numItems int NOT NULL,
    totalCost decimal(19,2) NOT NULL,

    -- userid foreign key
    FOREIGN KEY (userID) REFERENCES Users(userID),
    PRIMARY KEY (orderID)
);



DROP TABLE IF EXISTS OrderEquipment;
CREATE TABLE OrderEquipment(

    orderID int,
    equipmentID int,

    amount int NOT NULL,
    cost decimal(19,2) NOT NULL,

    FOREIGN KEY (orderID) REFERENCES Orders(orderID),
    FOREIGN KEY (equipmentID) REFERENCES Equipment(equipmentID)



);

DROP TABLE IF EXISTS Equipment;
CREATE TABLE Equipment(
    equipmentID int AUTO_INCREMENT NOT NULL UNIQUE,
    equipmentName varchar(50) NOT NULL,
    equipmentDescription varchar(500) NOT NULL,
    equipmentCost int NOT NULL,
    equipmentStock int NOT NULL,
    productTypeID int NOT NULL,



    PRIMARY KEY (equipmentID),
    FOREIGN KEY (productTypeID) REFERENCES ProductType(productTypeID)
);


DROP TABLE IF EXISTS ProductType;
CREATE TABLE ProductType(
    productTypeID int NOT NULL,
    typeDescription varchar(50) NOT NULL,
    PRIMARY KEY (productTypeID)
);

DROP TABLE IF EXISTS Reviews;
CREATE TABLE Reviews(
    reviewID int AUTO_INCREMENT NOT NULL UNIQUE,
    userID int, 
    equipmentID int,

    reviewDescription varchar(500) NOT NULL,
    stars int NOT NULL,

    PRIMARY KEY(reviewID),
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (equipmentID) REFERENCES Equipment(equipmentID)

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
    "962-434-57243",
    "jeffBez@amazing.com"
),
(
    "Alvin",
    "Loops",
    "3842 Byte Blvd.",
    "864-246-5723",
    "alvLoops@code.com"
);



INSERT INTO Orders (
    userID,
    orderDate,
    numItems,
    totalCost
)
VALUES
(
    (SELECT userID from Users where firstName = 'Jeff' and lastName = 'Bezzels'),
    '2022-05-23',
    "5",
    "850"
),
(
    (SELECT userID from Users where firstName = 'Jon' and lastName = 'Doe'),
    '2012-10-04',
    "7",
    "2500"
),
(
    (SELECT userID from Users where firstName = 'Alvin' and lastName = 'Loops'),
    '2021-08-13',
    "15",
    "6523"
);


INSERT INTO Equipment (
    equipmentName,
    equipmentDescription,
    equipmentCost,
    equipmentStock
    -- productTypeID

)
VALUES
(
    "Squat Rack",
    "A metal rack or cage consisting of support pillars with adjustable bars and hooks",
    "450",
    "21"
),
(
    "Treadmill",
    "for indoor use that simulates walking, jogging, or running",
    "330",
    "11"
),
(
    "Yoga Mat",
    "For your yoga classes!",
    "20",
    "30"
);


-- INSERT INTO ProductType (
--     typeDescription,
-- )
-- VALUES
-- (
--     ""
-- )

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
    "4"
),
(
    (SELECT userID from Users where firstName = 'Jon' and lastName = 'Doe'),
    (SELECT equipmentID from Equipment where equipmentName = "Treadmill"),
    "This equipment is alright. It is just good for running.",
    "2"
),
(
    (SELECT userID from Users where firstName = 'Alvin' and lastName = 'Loops'),
    (SELECT equipmentID from Equipment where equipmentName = "Yoga Mat"),
    "This equipment is bad. Only good for stretching but you can just stretch on the floor.",
    "1"
);

-- Data Results
select * from Users;
select * from Orders;
select * from Equipment;
select * from Reviews;




















