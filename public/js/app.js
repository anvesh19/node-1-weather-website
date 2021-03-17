// console.log('client side javascript file loaded');

// fetch('http://localhost:3000/weather?address=!').then((response) =>{
//     response.json().then((data) =>{ 
//         if(data.error){
//             console.log(data.error)
//         }
//         console.log(data);
//     })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const para1 = document.querySelector('#para-1');
const para2 = document.querySelector('#para-2');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    para1.textContent = 'Loading...'
    para2.textContent = ''
    fetch('/weather?address='+search.value).then((response) =>{
    response.json().then((data) =>{ 
        if(data.error){
            console.log(para1)
            para1.innerHTML= data.error
            return
        }
        console.log(data)
        para1.textContent = data.place;
        para2.textContent = 'The current temprature is '+data.temperature+' but it appears to be '+data.feelsLike+' and there is '+data.precipitation +'% chance of rain.'
    })
});
});