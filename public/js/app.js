
const weatherForm =  document.querySelector('form');
const search = document.querySelector('input');

let message = document.querySelector('#Message');
let message2 = document.querySelector('#Message-2');


weatherForm.addEventListener('submit', (e)=>{
  e.preventDefault();
   message2.textContent = "";
  message.textContent = "";
  const location = search.value;
  message.textContent = 'Loading ... ';

fetch(`/weather?address=${location}`).then((response)=>{

  response.json().then((data)=>{

    if(data.error){
      message.textContent = data.error;
      message2.textContent = "";
    }else{
      message.textContent = data.place_name;
      message2.textContent = data.forcast;
    }
  })
})
})
