const request = require('request');
const geocode = (address, callback) => {
    // console.log(address)
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoia3VuYWxrcm95IiwiYSI6ImNrbHB6OW41MjE3cDgyb2w2aDQxejFqdTIifQ.PFeUckUgX88tw8XWzkl-2Q&limit=1'
    request( {url, json: true}, (error, {body})=>{
        if(error){
            callback('There is issues to connect with the map server server.', undefined)
        }
        else if(body.features.length == 0){
            callback('Invalid place. Unable to find the place', undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}



module.exports = geocode