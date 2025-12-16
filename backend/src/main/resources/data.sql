-- Seed data for Cow table
INSERT INTO cow (name, breed, age) VALUES ('Bella', 'Friesian', 3);
INSERT INTO cow (name, breed, age) VALUES ('Daisy', 'Jersey', 4);
INSERT INTO cow (name, breed, age) VALUES ('Luna', 'Ayrshire', 2);
INSERT INTO cow (name, breed, age) VALUES ('Molly', 'Guernsey', 5);
INSERT INTO cow (name, breed, age) VALUES ('Rosie', 'Holstein', 3);

-- Seed data for MilkRecord table
INSERT INTO milk_record (cow_id, date, amount) VALUES (1, '2025-01-10 06:30:00', 12.5);
INSERT INTO milk_record (cow_id, date, amount) VALUES (1, '2025-01-11 06:30:00', 13.0);
INSERT INTO milk_record (cow_id, date, amount) VALUES (2, '2025-01-10 06:45:00', 11.5);
INSERT INTO milk_record (cow_id, date, amount) VALUES (3, '2025-01-12 07:00:00', 14.0);
INSERT INTO milk_record (cow_id, date, amount) VALUES (4, '2025-01-13 06:50:00', 10.5);
INSERT INTO milk_record (cow_id, date, amount) VALUES (5, '2025-01-14 06:40:00', 15.0);
INSERT INTO milk_record (cow_id, date, amount) VALUES (2, '2025-01-15 06:35:00', 12.0);
INSERT INTO milk_record (cow_id, date, amount) VALUES (3, '2025-01-16 07:10:00', 13.5);
INSERT INTO milk_record (cow_id, date, amount) VALUES (4, '2025-01-17 06:55:00', 11.0);
INSERT INTO milk_record (cow_id, date, amount) VALUES (5, '2025-01-18 07:05:00', 14.5);

-- Seed data for MilkSales table
INSERT INTO milk_sales (milk_record_id, amount_sold, total_price, sale_date, buyer_name)
VALUES (1, 10.0, 1200.0, '2025-01-10 08:00:00', 'Kisii Milk Cooperative');

INSERT INTO milk_sales (milk_record_id, amount_sold, total_price, sale_date, buyer_name)
VALUES (2, 8.0, 960.0, '2025-01-11 09:00:00', 'Local Dairy Supplier');

INSERT INTO milk_sales (milk_record_id, amount_sold, total_price, sale_date, buyer_name)
VALUES (3, 11.0, 1320.0, '2025-01-10 10:00:00', 'Kisii Milk Cooperative');

INSERT INTO milk_sales (milk_record_id, amount_sold, total_price, sale_date, buyer_name)
VALUES (4, 12.5, 1500.0, '2025-01-12 08:30:00', 'Local Dairy Supplier');

INSERT INTO milk_sales (milk_record_id, amount_sold, total_price, sale_date, buyer_name)
VALUES (5, 10.0, 1200.0, '2025-01-13 09:15:00', 'Kisii Milk Cooperative');
