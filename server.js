const express = require('express');
const path = require('path');

const app = express();
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(express.json()); // is this necessary?

//ROUTES
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

//read
app.get('api/movies', async(req, res, next)=> {
    try {
      res.send(await Movie.findAll());
    }
    catch(ex){
      next(ex);
    }
  });

//update
app.put('api/movies/:id', async(req, res, next)=> {
    try {
      const movie = await Movie.findByPk(req.params.id);
      await movie.update(req.body)  
      res.send(movie)
    }
    catch(ex){
      next(ex);
    }
  });

//post
app.post('api/movies', async(req, res, next)=> {
    try {
      res.send(await Movie.create(req.body));
    }
    catch(ex){
      next(ex);
    }
  });

app.post('api/movies', async(req, res, next)=> {
    try {
      res.send(await Movie.createRandom()); // is this "create random" necessary?
    }
    catch(ex){
      next(ex);
    }
});

//delete
app.delete('api/movies/:id', async(req,res,next)=>{
    try{
    if(!Number(req.params.id)){
    return res.sendStatus(400) 
    } 
    const movie = await Movie.findByPk(req.params.id)
    if(!movie){
    return res.sendStatus(404) //must return
    }
    await movie.destroy() 
    res.sendStatus(204)  //return or not return
   }catch(error){
      next(error)
    }
 })

//DATABASE
const Sequelize = require('sequelize');
const {STRING} = require('sequelize');
const db = new Sequelize(
    process.env.DATABASE_URL || 'postgres://localhost/movies',
    {
      logging: false,
    }
  );

// MODELS
const Movie = db.define('movie', {
    name:{
        type: STRING,
        allowNull:false,
        unique: true ,
        validate:{
          notEmpty: true,
          notNull: true
        }
      },
    genre:{
       type: ENUM('STUDENT','TEACHER'),
       allowNull:false,
       defaultValue:'STUDENT'
      },
      //tier 3
    year:{
        type:VIRTUAL,
        get: function(){
          return this.userType==='STUDENT'
        }
      }, 
    runtime:{
        type:VIRTUAL,
        get: function(){
          return this.userType==='STUDENT'
        }
    }, 
})


//SEED
const syncAndSeed = async()=> {
    await conn.sync({ force: true });
    await Promise.all([
      Movie.create({ name: 'milk' }),
      Movie.create({ name: 'eggs' }),
      Movie.create({ name: 'cheeze', purchased: true })
    ]);
  };
  


//INIT; app listening
const init = async()=> {
    try {
      await syncAndSeed();
      const port = process.env.PORT || 3000;
      app.listen(port, ()=> console.log(`listening on port ${port}`));
    }
    catch(ex){
      console.log(ex);
    }
  }; 

init()