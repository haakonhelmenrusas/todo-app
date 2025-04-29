-- File: init.sql

-- Create the todos table
CREATE TABLE IF NOT EXISTS public.todos
(
    id         SERIAL PRIMARY KEY,
    title      VARCHAR(255) NOT NULL,
    completed  BOOLEAN   DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NULL
);

-- Seed the todos table with 10 sample todos
INSERT INTO public.todos (title, completed, created_at)
VALUES ('Empty trash', false, '2023-10-01 10:00:00'),
       ('Do laundry', true, '2023-10-02 11:00:00'),
       ('Grocery shopping', false, '2023-10-03 12:00:00'),
       ('Walk the dog', true, '2023-10-04 13:00:00'),
       ('Read a book', false, '2023-10-05 14:00:00'),
       ('Cook dinner', true, '2023-10-06 15:00:00'),
       ('Exercise', false, '2023-10-07 16:00:00'),
       ('Call mom', true, '2023-10-08 17:00:00'),
       ('Finish project', false, '2023-10-09 18:00:00'),
       ('Plan vacation', true, '2023-10-10 19:00:00');

-- Create a new role
CREATE ROLE psql WITH LOGIN PASSWORD 'password';

-- Grant permissions to the role
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.todos TO psql;
GRANT USAGE, SELECT, UPDATE ON SEQUENCE public.todos_id_seq TO psql;