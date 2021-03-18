const path = require('path');
const request = require('request');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const geocode = require('./utility/geocode');
const forecast = require('./utility/forecast');
const hbs = require('hbs');
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../template/views')); //this is used for changing the default folder of views
hbs.registerPartials(path.join(__dirname, '../template/partials'));
// app.set('views', '../views')
app.use(express.static(path.join(__dirname, '../public')))

// app.set('view', path.join(__dirname, '../view'))
app.get('/', (req, res)=>{
    res.render('index',{
        'title': 'Weather App',
        'name': 'Weather',
        'developer': 'kunal'
    })
    // res.send('hell')
})

app.get('/about', (req, res)=>{
    res.render('about', {
        'title': 'Weather App',
        'name': 'About',
        'developer': 'kunal'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        'title': 'Weather App',
        'name': 'Help',
        'developer': 'kunal'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            'error': 'You must provide the address'
        });
    }
    geocode(req.query.address , (error, {latitude, longitude} = {}) => {
        if(error){
            // console.log('error is '+ error);
            return res.send({
                'error': 'Please enter valid location'
            });
        }
        forecast(latitude,longitude, (error,data) =>{
            // console.log("error", error);
            // console.log(data)
            console.log(data)
            // console.log('The location is '+ data.place + ' Current temprature is '+ data.currentTemperature + ' but it feels like '+ data.feelsLikeTemperature+ ' There is '+data.precipitation+ '  % chance of rain')
            res.send({
                'place' : data.place,
                'temperature': data.currentTemperature,
                'feelsLike': data.feelsLikeTemperature,
                'precipitation': data.precipitation,
                'humidity': data.humidity
            })
        })
    })
    // res.send({
    //     'forecast' : 'rain today',
    //     'address': req.query.address,
    //     'location': 'Darbhanga'
    // });
});

app.get('/products', (req,res) =>{
    console.log('hello');
    console.log(req.query);
    res.send({
        'products' : '[]'
    });
});

app.get('/help/*', (req, res)=>{
    res.render('404',{
        'message': 'Help',
        'developer': 'Kunal',
        'name': '404 Page'
    });
});

app.get('*', (req,res)=>{
    res.render('404',{
        'message': 'Page 404! No document found',
        'developer': 'Kunal',
        'name': '404 Page'
    });
});


app.listen(port, ()=>{
    console.log('server has started on '+ port);
})