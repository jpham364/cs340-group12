DROP TABLE IF EXISTS Users;
CREATE TABLE Users(
    userID int(11) AUTO_INCREMENT NOT NULL UNIQUE.
    firstName varchar(50) NOT NULL,
    lastName varchar(50) NOT NULL,
    address varchar(50) NOT NULL,
    phoneNumber varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    PRIMARY KEY (userID)
)

DROP TABLE IF EXISTS Orders;
CREATE TABLE Orders(
    orderID int(11) AUTO_INCREMENT NOT NULL UNIQUE,
    orderDate datetime NOT NULL,
    numItems int AUTO_INCREMENT NOT NULL,
    totalCost decimal(19,2) NOT NULL
    -- userid foreign key
    PRIMARY KEY (orderID)
);

DROP TABLE IF EXISTS OrderEquipment;
CREATE TABLE OrderEquipment(
);

DROP TABLE IF EXISTS Equipment;
CREATE TABLE Equipment(
    equipmentID int AUTO_INCREMENT NOT NULL UNIQUE,
    equipmentName varchar(50) NOT NULL,
    equipmentDescription varchar(50) NOT NULL,
    equipmentCost int NOT NULL,
    equipmentStock int NOT NULL,
    productTypeID int NOT NULL,
    PRIMARY KEY (equipmentID)
    -- foreign key for product type
);

DROP TABLE IF EXISTS ProdcutType;
CREATE TABLE ProductType(
    productTypeID int NOT NULL,
    typeDescription varchar(50) NOT NULL,
    PRIMARY KEY (productTypeID)
);

DROP TABLE IF EXISTS Reviews;
CREATE TABLE Reviews(
    reviewID int AUTO_INCREMENT NOT NULL UNIQUE,
    -- userID foreign key
    -- equipmentID foreign key
    reviewDescription varchar(500) NOT NULL,
    stars int NOT NULL,

);

