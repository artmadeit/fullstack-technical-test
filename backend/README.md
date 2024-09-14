# Backend

## Installation

First create an empty database, you could use the docker, to do that: `docker compose up -d`

```
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```


If you want to create a superuser, run this command: 
`python manage.py createsuperuser`
