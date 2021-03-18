const request = require('request');

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=0195b4d9045ebdd2e49bf29568a47d62&query='+latitude+','+longitude + ''
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather stack server', undefined)
        }
        else if(body.error){
            // console.log('i am inside else if')
            callback('Unable to find the place ', undefined)
        }
        else{
            callback(undefined, {
                'currentTemperature' : body.current.temperature,
                'feelsLikeTemperature': body.current.feelslike,
                'place' : body.location.name + ' ' + body.location.region + ',' + body.location.country,
                'precipitation': body.current.precip,
                'humidity' : body.current.humidity
            })
        }
    })
}

module.exports = forecast