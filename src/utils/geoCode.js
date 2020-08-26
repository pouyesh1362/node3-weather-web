const chalk = require('chalk');
const request = require('request');

const geoCode = (address, callback)=>{

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicG91eWVzaCIsImEiOiJjazl1cnNha2QwNHJyM2VvMW0yeGlsazBwIn0.kumVNP4sdZ6GOaCqQoPLQA&limit=1`;

  request({url , json: true}, (error, {body}={})=>{
    if(error){
      callback(chalk.red(`Can not connect to GEOCODE server!`), undefined);
    }else if(body.message){
      callback(chalk.bgRed (body.message), undefined)
    }else if(body.features.length === 0 ){ 
      callback(chalk.underline.red(`${body.query[0]} `)+ chalk.red(`is not found!! Please retry! `) , undefined);
      }else {
        const data = body.features[0];
        const latitude = data.center[1];
        const longitude = data.center[0];
        const place_name = data.place_name;
        callback(undefined, {
          latitude ,
          longitude ,
          place_name , 
        });
      }
  })
}


module.exports = {
  geoCode,
}