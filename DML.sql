-- DML.sql file for GROUP 12
-- Leon Ong
-- Jonathan Pham
-- Strength Solutions Supply

-- Note: Will use snake_case for dynamic input variables
-- in this file to improve readability

-- Base table entity displays
SELECT * FROM Users;
SELECT * FROM Orders;
SELECT * FROM Equipment;
SELECT * FROM Reviews;
SELECT * FROM ProductType;
SELECT * FROM OrderEquipment;


-- Select Orders from Each Person





-- -- INSERT STATEMENTS --
-- -- Insert new User
-- INSERT INTO Users(
-- 	firstName, 
-- 	lastName, 
-- 	address, 
-- 	phoneNumber,
-- 	email
-- ) 
-- VALUES 
-- (
-- 	:first_name_input, 
-- 	:last_name_input, 
-- 	:address_input, 
-- 	:phonenumber_input, 
-- 	:email_input
-- );


-- -- Insert Order
-- INSERT INTO Orders(
-- 	userID,
-- 	orderDate, 
-- 	numItems, 
-- 	totalCost
-- ) 
-- VALUES 
-- (
-- 	:userID_dropdown, 
-- 	:order_date_input, 
-- 	0, 
-- 	0
-- );


-- -- Insert Equipment
-- INSERT INTO Equipment
-- (
-- 	equipmentName, 
-- 	equipmentDescription, 
-- 	equipmentCost, 
-- 	equipmentStock, 
-- 	productTypeID
-- )
-- VALUES
-- (

-- 	:equipment_name_input, 
-- 	:equipment_description_input, 
-- 	:equipment_cost_input, 
-- 	:equipment_stock_input, 
-- 	:productTypeID_dropdown

-- );

-- -- Insert Rewiew
-- INSERT INTO Reviews (
--     userID,
--     equipmentID,
--     reviewDescription,
--     stars
-- )
-- VALUES
-- (
--     :userIDDropdown,
--     :equipmentIDDropdown,
--     :reviewDescriptionInput,
--     :starInput
-- )

-- -- Insert Product Type
-- INSERT INTO ProductType (
--     productTypeID,
--     typeDescription
-- )
-- VALUES
-- (
--     :productTypeIDInput,
--     :typeDescriptionInput
-- );

-- --Insert orderEquipment
-- INSERT INTO OrderEquipment(

--     orderID,
--     equipmentID,

--     amount,
--     cost

-- )
-- VALUES
-- (
--     :orderIDDropdown,
--     :equipmentIDDropdown,
--     :amountInput,
--     :equipmentcostTimesAmount
-- );


-- -- delete a user
-- DELETE FROM Users WHERE userID = :UserID_from_user_table;

-- -- delete an equipment
-- DELETE FROM Equipment where equipmentID = :equipmentID_from_equipment_table;

-- -- delete review
-- DELETE FROM Reviews where reviewID = :reviewID_from_review_table;

-- -- dis-associate an equipment from an order (M:N relationship)
-- DELETE FROM equipmentOrders where equipmentID = :equipmentID_from_equipment_table AND userID = UserID_from_user_table;


-- Update Total cost of user's 
-- UPDATE Orders
-- SET numItems = (select sum(amount) from OrderEquipment where orderID 
--                 IN (SELECT orderID from Orders where userID = 4))
-- WHERE orderID = (SELECT orderID from Orders where (userID = 4 AND orderDate = '2021-08-13') );











