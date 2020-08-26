const chalk = require('chalk');
const request = require('request');


const forCast = (longitude , latitude, callback)=>{

  const url = `http://api.weatherstack.com/current?access_key=783c929d9315f0d3636513dd576ef4e7&query=${latitude},${longitude}&units=f`;

  request({url , json : true }, (error , {body}={})=>{

    if(error){
      callback(`Cannot connect to the server!!`, undefined);
    }else if(body.error){
      callback(`${body.error.info}`, undefined);
    }else{
      const data = body.current;
      callback(undefined, `${data.weather_descriptions[0]} in ${body.location.name}. it is currently ${data.temperature}  . It fells like  ${data.feelslike}  degress out.`);
    }
  })
}

module.exports = {
  forCast,
}