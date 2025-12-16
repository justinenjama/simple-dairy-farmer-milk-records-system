CREATE DATABASE IF NOT EXISTS dairy_db;
USE dairy_db;

-- TABLE: cow
CREATE TABLE IF NOT EXISTS cow (
                                   id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                   name VARCHAR(100) NOT NULL,
    breed VARCHAR(100) NOT NULL,
    age INT NOT NULL
    );

-- TABLE: milk_record
CREATE TABLE IF NOT EXISTS milk_record (
                                           id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                           cow_id BIGINT NOT NULL,
                                           date DATETIME NOT NULL,
                                           amount DOUBLE NOT NULL,
                                           CONSTRAINT fk_milk_record_cow
                                           FOREIGN KEY (cow_id) REFERENCES cow(id)
    ON DELETE CASCADE
    );

-- TABLE: milk_sales
CREATE TABLE IF NOT EXISTS milk_sales (
                                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                          milk_record_id BIGINT NOT NULL,
                                          amount_sold DOUBLE NOT NULL,
                                          total_price DOUBLE NOT NULL,
                                          sale_date DATETIME NOT NULL,
                                          buyer_name VARCHAR(150) NOT NULL,
    CONSTRAINT fk_milk_sales_record
    FOREIGN KEY (milk_record_id) REFERENCES milk_record(id)
    ON DELETE CASCADE
    );

-- SEED DATA: cow
INSERT INTO cow (name, breed, age) VALUES
                                       ('Bella', 'Friesian', 3),
                                       ('Daisy', 'Jersey', 4),
                                       ('Luna', 'Ayrshire', 2),
                                       ('Molly', 'Guernsey', 5),
                                       ('Rosie', 'Holstein', 3);

-- SEED DATA: milk_record
INSERT INTO milk_record (cow_id, date, amount) VALUES
                                                   (1, '2025-01-10 06:30:00', 12.5),
                                                   (1, '2025-01-11 06:30:00', 13.0),
                                                   (2, '2025-01-10 06:45:00', 11.5),
                                                   (3, '2025-01-12 07:00:00', 14.0),
                                                   (4, '2025-01-13 06:50:00', 10.5),
                                                   (5, '2025-01-14 06:40:00', 15.0),
                                                   (2, '2025-01-15 06:35:00', 12.0),
                                                   (3, '2025-01-16 07:10:00', 13.5),
                                                   (4, '2025-01-17 06:55:00', 11.0),
                                                   (5, '2025-01-18 07:05:00', 14.5);

-- SEED DATA: milk_sales
INSERT INTO milk_sales (milk_record_id, amount_sold, total_price, sale_date, buyer_name) VALUES
                                                                                             (1, 10.0, 1200.0, '2025-01-10 08:00:00', 'Kisii Milk Cooperative'),
                                                                                             (2, 8.0, 960.0, '2025-01-11 09:00:00', 'Local Dairy Supplier'),
                                                                                             (3, 11.0, 1320.0, '2025-01-10 10:00:00', 'Kisii Milk Cooperative'),
                                                                                             (4, 12.5, 1500.0, '2025-01-12 08:30:00', 'Local Dairy Supplier'),
                                                                                             (5, 10.0, 1200.0, '2025-01-13 09:15:00', 'Kisii Milk Cooperative');
