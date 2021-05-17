const date= new Date();

function renderCalendar(){ //contains all code to render calendar except for thr date constructor, and event listeners.
  date.setDate(1);
  const monthDays = document.querySelector('.days'); //used to loop through days to generate dynamic html content for each day.
  const lastDay = new Date(date.getFullYear(),date.getMonth() + 1,0).getDate();
   /*using 0 gives the LAST day of current month. getMonth()+1 therefore specifies the NEXT month.
  So first day of NEXT month.
  Then getDate() gives the proper date for that first day  */

  const prevLastDay = new Date(date.getFullYear(),date.getMonth(),0).getDate(); //last day Previous month (30 or 31 or 28 feb)
  console.log("previous last day is " + prevLastDay)
  const firstDayIndex = date.getDay() //gives index 0-6 for Sunday - Sat
  const lastDayIndex = new Date(date.getFullYear(),date.getMonth() + 1, 0).getDay() //gives index 0-6 for day of week of last day of month.
  console.log("last day of current month will be day index: " + lastDayIndex)

  const nextDays = 7 - lastDayIndex -1

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ] ;
  document.querySelector(".date h1").innerHTML = months[date.getMonth()]
  document.querySelector(".date p").innerHTML = new Date().toDateString() //call new Date() again for when we toggle between months, for accurate rendering.

  //Generate dynamic html content for the month's worth of days, 1-31, as well as fill out the weekdays carrtying over from last month, and carrying into next month.

  let days = "";
  /* we wil assign value for days using += operator in the loop, bc the loop will create 1 new div element
  for each new day, and keep adding another one after, the only difference being the number of the day */

  //Set HTML content for last days of current week carrying over from PREVIOUS month
  for(let x=firstDayIndex; x>0; x--){
    days+= `<div class="prev-date">${prevLastDay - x + 1}</div>`
  }
  //Set the html for days for the curr month.
  for(var i = 1; i<=31; i++){
    if(i == new Date().getDate() && date.getMonth() == new Date().getMonth()){
      days+= `<div class="today">${i}</div>`; //if curr day, add with the .today class that gives br color.
    }else{
    days+= `<div>${i}</div>`;
    // monthDays.innerHTML = days;    //moving down to LAST loop, so that next month weekdays are also added
  }
  }

  //Set HTML content for remaining days of the week carrying over into NEXT month
  for(let j = 1; j<=nextDays; j++){
    days += `<div class = "next-date">${j}</div>`
    monthDays.innerHTML = days;
  }
}
//END renderCalendar


//Navigate prev/next month calendar targeting the fa icons for click events
/* Each event listener mirrors the function run on load, which first sets the date, THEN renders
calendar using that date value */
document.querySelector("#previous").addEventListener("click",function(){
  date.setMonth(date.getMonth() - 1)
  renderCalendar()
})

document.querySelector("#next").addEventListener("click",function(){
  date.setMonth(date.getMonth() + 1)
  renderCalendar()
})

//On load:
renderCalendar()
