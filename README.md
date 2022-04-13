# Heroku deploy

## Instrucciones

.env

```
PGUSER=postgres
PGHOST=localhost
PGPASSWORD=root
PGDATABASE=prueba
PGPORT=5432
```

```sh
git init
git add .
git commit -m "commit"
heroku git:remote -a dexter-555
git push heroku master
heroku run npm run migrate
```

Ver y eliminar git remote

```sh
git remote -v
git remote rm heroku
```
