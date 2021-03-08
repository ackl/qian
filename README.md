![](https://i.imgur.com/CNZDYND.png)

deploy yahoofinanceapiproxy to some server `gunicorn --workers 3 --bind unix:<socket-name>.sock -m 007 wsgi:app` and then point to url in env variable

TODO migrate flask app to vercel hosted 'serverless' function
