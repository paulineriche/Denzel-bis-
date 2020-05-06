
const {MongoClient} = require('mongodb');
const imdb = require('./imdb');

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://paulineriche:Jamaique2!@paulineriche-bu6dy.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        
        await client.connect();
        // const test = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({_id:'10006546'},{space : 1});
        // console.log(test);
        //const movies = await imdb('nm0000243');
        //console.log(movies);
        var result = await client.db("denzel").collection("denzelcollection").find({"metascore":{$gt:70}});
        
        //console.log(movies.length);
        const results = await result.toArray();
        console.log(results[Math.floor(Math.random() * (results.length))]);

    } catch (e) {
      
      if (e.name === 'BulkWriteError')
      {
        console.log("Those values already exist in the database...");
      }
      else
      {
        console.error(e);
      }
        
    }
    finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
    
}


/**
 * Insert to the database all the movies of the actors
 * @param {String} actor
 */
module.exports.insert = async (actor) => {

  const uri = "mongodb+srv://paulineriche:Jamaique2!@paulineriche-bu6dy.mongodb.net/test?retryWrites=true&w=majority";
  let movies;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {      
      await client.connect();
      movies = await imdb(actor);
      await client.db("denzel").collection("denzelcollection").insertMany(movies);
      
  } catch (e) { 
    if (e.name === 'BulkWriteError')
    {
      return("Those values already exist in the database...");
    }
    else
    {
      console.error(e);
    }
      
  }
  finally {
      await client.close();
  }
  return { "total" : movies.length}
}

module.exports.getrandom = async () => {

  const uri = "mongodb+srv://paulineriche:Jamaique2!@paulineriche-bu6dy.mongodb.net/test?retryWrites=true&w=majority";

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  let results
  try {      
    await client.connect();
    var result = await client.db("denzel").collection("denzelcollection").find({"metascore":{$gt:70}});
    
    //console.log(movies.length);
    results = await result.toArray();
  } catch (e) { 
    console.error(e);
      
  }
  finally {
      await client.close();
  }
  return results[Math.floor(Math.random() * (results.length))]
}

/**
 * Insert to the database all the movies of the actors
 * @param {String} id
 */
module.exports.getmovie_id = async (id) => {

  const uri = "mongodb+srv://paulineriche:Jamaique2!@paulineriche-bu6dy.mongodb.net/test?retryWrites=true&w=majority";

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {      
    await client.connect();
    var result = await client.db("denzel").collection("denzelcollection").findOne({_id:id});
    
    //console.log(movies.length);
    
  } catch (e) { 
    console.error(e);
      
  }
  finally {
      await client.close();
  }
  return result
}

/**
 * Insert to the database all the movies of the actors
 * @param {String} id
 */
module.exports.addreview = async (id,updates) => {

  const uri = "mongodb+srv://paulineriche:Jamaique2!@paulineriche-bu6dy.mongodb.net/test?retryWrites=true&w=majority";
  var result;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {      
    await client.connect();
    result = await client.db("denzel").collection("denzelcollection").updateOne({ _id: id }, { $set: updates });
    
  } catch (e) { 
    console.error(e);
      
  }
  finally {
      await client.close();
  }
  return {"_id" : id};
}



module.exports.getmovie_list = async (limit,score) => {

  const uri = "mongodb+srv://paulineriche:Jamaique2!@paulineriche-bu6dy.mongodb.net/test?retryWrites=true&w=majority";

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  let results;
  let res=[];
  try {      
    await client.connect();
    var result = await client.db("denzel").collection("denzelcollection").find({metascore:{$gt:score}}).sort({metascore :-1});
    results = await result.toArray();
    
    //console.log(movies.length);
    
  } catch (e) { 
    console.error(e);
      
  }
  finally {
      await client.close();
  }
  for (let i = 0; i < limit; i++) {
    res.push(results[i]);
  }
  return res;
}

