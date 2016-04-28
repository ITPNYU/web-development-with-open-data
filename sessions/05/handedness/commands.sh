npm install -g express-generator # (sudo?)

express --ejs --git handedness/

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


git init

heroku create

git add . # adds everything

git push heroku master # to deploy

heroku addons:create heroku-postgresql:hobby-dev

heroku pg:psql
