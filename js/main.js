let apikey = "25e5b0af6ea5418ead091506252206";
let row = document.querySelector("#row11");
let searchinput = document.querySelector("#searchinput");
searchinput.addEventListener("input" , searchcountry );


if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
} else {
  console.log("browser not support geolocation ");
}


async function successCallback(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let userlocation = `${latitude},${longitude}`
  let res = await fetch (`https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${userlocation}&days=3`)  
  res = await res.json()


 
 displaywea(res)


}

async function errorCallback(error) {
  let res = await fetch (`https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=Alexandria&days=3`)  
  res = await res.json()


 displaywea(res)

}



async function displaywea(arr) {
  
let apiDate1 =  arr.forecast.forecastday[0].date;
let dateObj = new Date(apiDate1);
let dayName = dateObj.toLocaleDateString('en-GB', { weekday: 'long' });
let formattedDate = dateObj.toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long'
});

let apidate2 =  arr.forecast.forecastday[1].date;
let dateObj2 = new Date(apidate2);
let dayName2 = dateObj2.toLocaleDateString('en-GB', { weekday: 'long' });
;



let apiDate3 = arr.forecast.forecastday[2].date;
let dateObj3 = new Date(apiDate3);
let dayName3 = dateObj3.toLocaleDateString('en-GB', { weekday: 'long' });

  

  

    let cartoona = ""
    
        cartoona += ` 
         <div class="col-lg-4 px-lg-0  ">
          <div class="card card-1 ">
            <div class="card-header ps-2 pe-2 d-flex align-items-center justify-content-between">
             <p class="mb-0">${dayName}</p>
             <p class="mb-0">${formattedDate}</p>
            </div>
            <div class="card-body py-3">
              <h5 class="card-subtitle mb-2 ">${arr.location.name}</h5>
              <div class=" card-we d-flex flex-column flex-md-row flex-lg-column justify-content-between align-items-start">
                <p class="card-text mb-0 text-white fw-bold percent-card">${arr.current.temp_c}°C</p>
                <img class="img-current"  src="${arr.current.condition.icon}" alt="">
              </div>
              <p class="text-primary">${arr.current.condition.text}</p>
              <ul class="list-unstyled d-flex">
                <li class="me-4"><img class="me-1"  src="./imgs/icon-umberella.png" alt=""> 20%</li>
                <li class="me-4"><img class="me-1"  src="./imgs/icon-wind.png" alt=""> ${arr.current.wind_kph} km/h</li>
                <li><img class="me-1"  src="./imgs/icon-compass.png" alt=""> ${arr.current.wind_dir}</li>
              </ul>
              
            </div>
          </div>
          </div>
          </div>
          
        

           <div class="col-lg-4 px-lg-0">
          <div class="card rounded-start-0 rounded-end-0 card-2">
            <div class="card-header ps-2 pe-2 ">
             <p class="mb-0 text-center">${dayName2}</p>
             
            </div>
            <div class="card-body card-2-body p-5  text-center ">
              <img src="${arr.forecast.forecastday[1].day.condition.icon}" alt="">
              <p class="card-text text-white fs-3 mb-0 percent-card">${arr.forecast.forecastday[1].day.maxtemp_c}°C</p>
              <p class="card-text  fs-6 percent-card-2">${arr.forecast.forecastday[1].day.mintemp_c}°</p>
              <p class="text-primary">${arr.forecast.forecastday[1].day.condition.text}</p>
              
              
            </div>
          </div>
        </div>
        <div class="col-lg-4 px-lg-0">
          <div class="card  card-3 ">
            <div class="card-header ps-2 pe-2 ">
             <p class="mb-0 text-center">${dayName3}</p>
             
            </div>
            <div class="card-body card-2-body p-5  text-center ">
               <img src="${arr.forecast.forecastday[2].day.condition.icon}" alt="">
              <p class="card-text text-white fs-3 mb-0 percent-card">${arr.forecast.forecastday[2].day.maxtemp_c}°C</p>
              <p class="card-text  fs-6 percent-card-2">${arr.forecast.forecastday[2].day.mintemp_c}°</p>
              <p class="text-primary">${arr.forecast.forecastday[2].day.condition.text}</p>
              
              
            </div>
          </div>
        </div>





          `
        
    
    row.innerHTML = cartoona
}




async function searchcountry() {
  let usersear = searchinput.value.trim();
  if (!usersear) return;

  try {
    let sear = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${usersear}&days=3`);
    if (!sear.ok) return;

    let data = await sear.json();

    if (!data.forecast || !data.forecast.forecastday) return;

    displaywea(data);
  } catch (err) {
    
  }
}



