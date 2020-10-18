USE employees;

INSERT INTO department (name) VALUES
('Engineering'),
('Marketing'),
('Finance'),
('Admin');


INSERT INTO role (title, salary, department_id) VALUES
('Jr Dev', '50000', 1),
('Sr Dev', '90000', 1),
('Social Media', '50000', 2),
('Copywriting', '60000', 2),
('Receivables', '70000', 3),
('Bookkeeper', '80000', 3),
('Exec Assist', '45000', 4),
('Human Resources', '85000', 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Alexia', 'Bailey', 1, NULL),
('Andrew', 'Howard', 1, NULL),
('Alexia', 'Thompson', 1, NULL),
('Bruce', 'Clark', 2, 1),
('Sienna', 'Myers', 2, 2),
('Oscar', 'Wilson', 2, 3),
('Jacob', 'Douglas', 3, 1),
('James', 'Reed', 3, 2),
('Alford', 'Ellis', 3, 3),
('Cadie', 'Dixon', 4, 1),
('Melissa', 'Foster', 4, 2),
('Adrianna', 'Dixon', 4, 3),
('Maria', 'Clark', 5, 1),
('Ryan', 'Craig', 5, 2),
('Agata', 'Mitchell', 6, 3),
('Kevin', 'Thomas', 6, 1),
('Tess', 'Farrell', 7, 2),
('Justin', 'Taylor', 7, 3),
('Briony', 'Kelley', 8, 1),
('Caroline', 'Elliott', 8, 2)
