-- Create the books table if it doesn't exist
CREATE TABLE IF NOT EXISTS books (
    ID SERIAL PRIMARY KEY,
    title TEXT,
    author TEXT,
    publication_date TEXT,
    description TEXT,
    genre TEXT,
    price NUMERIC
);

-- Insert sample books into the books table
INSERT INTO books (title, description, author, publication_date, genre, price)
VALUES
    ('The House on Mango Street', 'A series of interconnected vignettes narrated by a young Latina girl growing up in Chicago, reflecting on her community and her own identity.', 'Sandra Cisneros', '1991-04-03', 'Fiction', 8.99),
    ('Half of a Yellow Sun', 'A gripping novel set in Nigeria during the Biafran War, weaving together the lives of multiple characters affected by the conflict.', 'Chimamanda Ngozi Adichie', '2007-09-04', 'Historical Fiction', 12.99),
    ('Home Fire', 'A contemporary reimagining of Sophocles Antigone, set in present-day London and dealing with themes of love, family, and extremism.', 'Kamila Shamsie', '2017-08-15', 'Drama', 12.99),
    ('The Girl with the Louding Voice', 'A powerful tale of a young Nigerian girls fight for education and self-determination in a society where girls are often devalued.', 'Abi Daré', '2020-02-04', 'Drama', 14.99),
    ('The Moors Account', 'A historical novel based on the true story of Mustafa al-Zamori, a Moroccan slave who was part of Cabeza de Vacas expedition to America in the 16th century.', 'Laila Lalami', '2014-09-09', 'Historical Fiction', 11.99),
    ('An Unnecessary Woman', 'A novel about an elderly Lebanese woman who has spent her life translating Western literature into Arabic and reflects on her past, her loves, and her city, Beirut.', 'Rabih Alameddine', '2014-02-04', 'Literary Fiction', 13.99),
    ('The Architects Apprentice', 'A captivating historical novel set in 16th-century Istanbul, following the life of Jahan, a young Indian boy brought to the Ottoman Empire as a gift to the Sultans chief architect.', 'Elif Shafak', '2015-03-31', 'Historical Fiction', 11.99),
    ('Their Eyes Were Watching God', 'The story of Janie Crawfords journey to self-discovery and independence as an African-American woman in the early 20th century.', 'Zora Neale Hurston', '2006-01-03', 'Fiction', 11.99);