/**********************************/
/* Table Name: members */
/**********************************/
CREATE TABLE members(
		phone VARCHAR(20) NOT NULL,
		password VARCHAR(100) NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

/**********************************/
/* Table Name: products */
/**********************************/
CREATE TABLE products(
		id INT NOT NULL IDENTITY,
		name VARCHAR(100) NOT NULL,
		description OTHER,
		price INT NOT NULL,
		image VARCHAR(200),
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

/**********************************/
/* Table Name: purchases */
/**********************************/
CREATE TABLE purchases(
		id INT NOT NULL IDENTITY,
		members_phone VARCHAR(20) NOT NULL,
		product_id INT NOT NULL,
		purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
		phone VARCHAR(20)
);


ALTER TABLE members ADD CONSTRAINT IDX_members_PK PRIMARY KEY (phone);

ALTER TABLE products ADD CONSTRAINT IDX_products_PK PRIMARY KEY (id);

ALTER TABLE purchases ADD CONSTRAINT IDX_purchases_PK PRIMARY KEY (id);
ALTER TABLE purchases ADD CONSTRAINT IDX_purchases_FK0 FOREIGN KEY (id) REFERENCES products (id);
ALTER TABLE purchases ADD CONSTRAINT IDX_purchases_FK1 FOREIGN KEY (phone) REFERENCES members (phone);

