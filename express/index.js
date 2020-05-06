const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const {PORT} = require('./constants');
const mongodb = require('./app');

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/movies/:search?', async(request, response) => {
  const param = request.params;
  //response.send(limit==null );

  const limit = request.query.limit;
  const metascore= request.query.metascore;
  if(limit>58 || metascore>100)
  {
    response.send("limit can't be higher than 58 and metascore can't be higher than 100");
  }

  if(param.search==null)
  {
    const movies = await mongodb.getrandom();
    response.send(movies);
  }else if(param.search=="search" && limit==null&& metascore==null)
  {
    const movies = await mongodb.getmovie_list(5,0);
    response.send(movies);
  }else if(param.search=="search" && limit!=null&& metascore==null)
  {
    const movies = await mongodb.getmovie_list(limit,0);
    response.send(movies);
  }else if(param.search=="search" && limit!=null&& metascore!=null)
  {
    const movies = await mongodb.getmovie_list(limit,metascore);
    response.send(movies);
  }else if(param.search=="search" && limit==null&& metascore!=null)
  {
    const movies = await mongodb.getmovie_list(5,metascore);
    response.send(movies);
  }else{
    response.send("error in the url")
  }
  
});

app.get('/movies/:id', async(request, response) => {
  const res = request.params.id;
  //const result = await mongodb.getmovie_id(res);
  response.send(res);
});

app.get('/movies/populate/:id', async(request, response) => {
  const res = request.params.id;
  const result = await mongodb.insert(res);
  response.send(result);
});

app.post('/movies/:id',async(request,response)=>{
  const res = request.body;
  const id = request.params.id;
  const resultat = await mongodb.addreview(id,res);
  response.send(resultat);

});



app.listen(PORT);
console.log(`📡 Running on port ${PORT}`);