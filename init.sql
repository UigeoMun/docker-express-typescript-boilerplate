CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(45) NOT NULL UNIQUE
);

CREATE TABLE crew (
    id SERIAL PRIMARY KEY,
    name_en VARCHAR(45) NOT NULL,
    name_kr VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    phone VARCHAR(45) NOT NULL,
    department VARCHAR(45) NOT NULL,
    position VARCHAR(45) NOT NULL,
    employment BOOLEAN NOT NULL,
    profile TEXT
);

CREATE TABLE visit_purpose (
    id SERIAL PRIMARY KEY,
    purpose VARCHAR(45) NOT NULL
);

CREATE TABLE contract (
    id SERIAL PRIMARY KEY,
    version VARCHAR(45) NOT NULL,
    language VARCHAR(45) NOT NULL,
    content TEXT NOT NULL
);