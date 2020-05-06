# Denzel database

how to access the Express.js endpoints:

```sh
curl https://paulinerichedenzel.netlify.com/.netlify/functions/server/movies
curl https://paulinerichedenzel.netlify.com/.netlify/functions/server/movies/:id
curl https://paulinerichedenzel.netlify.com/.netlify/functions/server/movies/populate/:id
curl https://paulinerichedenzel.netlify.com/.netlify/functions/server/movies/search
curl --header "Content-Type: application/json" --request POST --data '{"json":"POST"}' https://paulinerichedenzel.netlify.com/.netlify/functions/server/movies/:id

```
