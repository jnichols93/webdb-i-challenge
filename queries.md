# Database Queries

## Find all customers with postal code 1010
select * from Customers where PostalCode = 1010
## Find the phone number for the supplier with the id 11
select * from Suppliers where SupplierID = 11
## List first 10 orders ever places, descending by the order date
select * from Orders order by OrderDate DESC limit 10
## Find all customers that live in London, Madrid, or Brazil
select * from Customers where City = 'London' where City = 'Madrid' where City = 'Brazil'
## Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"
select * from Customers order by CustomerID DESC insert into Customers (CustomerName) values ('The Shire') insert into Customers (ContactName) values ('Bilbo Baggins') insert into Customers (Address) values ('1 Hobbit Hole') insert into Customers (City) values ('Bag End') insert into Customers (PostalCode) values ('111') insert into Customers (Country) values ('Middle Earth')
## Update Bilbo Baggins record so that the postal code changes to "11122"
select * from Cutomers --update Customers set PostalCode = '11122' where CustomerID = 92
## (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted
select Cities from Customers count distinct
## (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
