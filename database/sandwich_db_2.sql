/**********************************/
/* Table Name: members */
/**********************************/
CREATE TABLE members(
		phone VARCHAR(20) NOT NULL,
		password VARCHAR(100) NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL IDENTITY
);

/**********************************/
/* Table Name: purchases */
/**********************************/
CREATE TABLE (
		 INT NOT NULL IDENTITY,
		 VARCHAR(20) NOT NULL,
		 INT NOT NULL,
		 INT NOT NULL,
		 TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

/**********************************/
/* Table Name: products */
/**********************************/
CREATE TABLE products(
		 INT NOT NULL IDENTITY,
		 VARCHAR(100) NOT NULL,
		 INT NOT NULL IDENTITY,
		 OTHER NOT NULL,
		 INT,
		 VARCHAR(200) NOT NULL,
		 TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 NOT NULL
);


ALTER TABLE members ADD CONSTRAINT IDX_members_PK PRIMARY KEY (phone);

ALTER TABLE  ADD CONSTRAINT IDX__PK PRIMARY KEY ();

ALTER TABLE products ADD CONSTRAINT IDX_products_PK PRIMARY KEY ();
ALTER TABLE products ADD CONSTRAINT IDX_products_FK0 FOREIGN KEY () REFERENCES  ();

