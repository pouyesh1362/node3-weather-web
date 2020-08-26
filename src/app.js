const geoCode = require('./utils/geoCode')
const forcast = require('./utils/forcast');

const path = require('path');
const express = require('express');

const hbs = require('hbs');
const { title } = require('process');

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views'); 
const partialPath = path.join(__dirname,'../template/partials');
const app = express();

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);
app.use(express.static(publicDirectoryPath))


app.get('', (req, res)=>{
  res.render('index', {
    title: 'Weather Homepage',
    name: 'Pouyesh',
    age : 36,
  });
})

app.get('/about', (req, res)=>{
  res.render('about', {
    name: 'Pouyesh',
    age: 36,
    title: 'Weather About'
  })
} )

app.get('/help', (req, res)=>{
  res.render('help', {
    name: 'Pouyesh',
    title: ' Weather Help',
  })
})

app.get('/products',(req, res)=>{

  if(!req.query.search){
    return res.send('there is no item in search!!!');
  }
  console.log(req.query.search);
  res.send({
    products:[],
  });
})

app.get('/weather', (req, res)=>{

  if(!req.query.address){

    return res.send({
      error:'Please enter the address',
    })
  }

  geoCode.geoCode(req.query.address,(error, {latitude, longitude, place_name} = {})=>{

    forcast.forCast(longitude, latitude ,(error,forcast)=>{

      if(!error){
       return res.send({
          place_name,
          longitude,
          latitude,
          forcast,
        })
      }
      res.send({
        error: error
      })
    })
  })
})

app.get('/help/*', (req, res)=>{

  res.render('404', {
    name: 'Pouyesh',
    title: 'help',
    errorMessage: 'help extetion not exist',
  })

})

app.get('*', (req, res)=>{
  res.render('404',{
    name: 'Pouyesh',
    title: 'weather',
    errorMessage: 'extention not exist',
  });
})


app.listen(3000,()=>{
  console.log(`server is out on port 3000...`);
})
