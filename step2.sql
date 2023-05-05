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
    equipmentDescription varchar(50) NOT NULL,
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

