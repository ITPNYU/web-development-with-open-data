npm install -g express-generator # (sudo?)

npm start

npm install -g nodemon

# ACTUALLY START the PostgreSQL server before attempting
psql -h localhost

nodemon start


CREATE DATABASE handedness;
psql -d handedness
DROP TABLE itp_students;
SELECT * FROM itp_students;

INSERT INTO itp_students (name, handedness) VALUES ('serena', 'Right')

npm install pg --save

npm install dotenv --save
