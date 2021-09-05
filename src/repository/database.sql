CREATE DATABASE volunteer_database;

CREATE TABLE volunteer_data(
    volunteer_id BIGSERIAL PRIMARY KEY,
    birth_date DATE,
    degree VARCHAR(255),
    career VARCHAR(255),
    general_interest VARCHAR(255),
    city VARCHAR(255),
    country VARCHAR(255),
    description VARCHAR(255)
);
