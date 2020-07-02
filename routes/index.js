var express = require('express');
var router = express.Router();
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

router.get('/', function(req, res, next) {
  next();
});

router.get('/api/read', function(req, res, next) {
  if(myCache.keys().length > 0){ //when db has stored records
    value = myCache.mget(myCache.keys());
    console.log(value);
    res.send(value);
  }
  else res.status(204).end();
});

router.post('/api/create',function(req, res, next) { 
  key = myCache.keys().length;
  value = {"title":req.body.title,"body":req.body.body,"time":req.body.time};
  if(myCache.set(key,value))
    {res.status(200).end();
    }
  else res.send('Failed to insert into database')
});

module.exports = router;

