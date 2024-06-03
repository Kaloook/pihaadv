const summaryName = document.getElementById("summary-name");
const summaryTime= document.getElementById("sumarry-time");
const summaryPeople = document.getElementById("summary-people");
const summaryEmail = document.getElementById("summary-email");
const roominfo = document.querySelectorAll("room");
const formData = document.getElementById("collected-data");
// set  time  for  check-in  and  check-out

const checkInDateInput = document.getElementById('dayin');

const today = new Date();

checkInDateInput.value = today.toISOString().substring(0, 10);

const checkoutDateInput = document.getElementById('dayout');

const tomorrow = new Date(today.getTime() + (1000 * 60 * 60 * 24));

checkoutDateInput.value = tomorrow.toISOString().substring(0, 10);
const roomData =[]
 


// JavaScript reading from XML files

  fetch('information.xml')
  .then(response => response.text())
  .then(xmlString => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    const elements = xmlDoc.getElementsByTagName('room');
  
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const name = element.getElementsByTagName('name')[0].textContent;
      const cost = element.getElementsByTagName('cost')[0].textContent;
      const capacity = element.getElementsByTagName('capacity')[0].textContent;

      if (name && cost && capacity) {
        roomData.push({ name, cost, capacity });
        
      } else {
        console.error('Invalid data in XML file:', element);
      }
    }
    console.log(roomData);
  })
  .catch(error => {
    console.error('Error fetching XML file:', error);
  });
  console.log(roomData);
  //
//get user input deatil 
function getFormData(){
    const  Fname = document.getElementById("fullname").value;
    const  vpeople = document.getElementById("people").value;

//get data information
    const indate = document.getElementById("dayin").value;
    const outdate = document.getElementById("dayout").value;
    const datein = new Date(indate);
    const dateout = new Date(outdate);
    const timeDifference = dateout.getTime() - datein.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); 
    
//get room information  
    // get the room information 
    const room = document.querySelector('input[type="radio"][name="roominfo"]:checked');
    const selectedRoom= room.id
//get the price information

let total = 0;
    if (room.id == "R1") {
      const R1 = roomData[0];
      const pricer1 = daysDifference * R1.cost;
      total = pricer1;
    } 
    if (room.id == "R2") {
      const R1 = roomData[2];
      const pricer1 = daysDifference * R1.cost;
      total = pricer1;
    } 
    if (room.id == "R3") {
      const R1 = roomData[3];
      const pricer1 = daysDifference * R1.cost;
      total = pricer1;
    } 
    if (room.id == "R4") {
      const R1 = roomData[4];
      const pricer1 = daysDifference * R1.cost;
      total = pricer1;
    } 
    if (room.id == "R5") {
      const R1 = roomData[4];
      const pricer1 = daysDifference * R1.cost;
      total = pricer1;
    }
    if (room.id == "R7") {
      const R1 = roomData[7];
      const pricer1 = daysDifference * R1.cost;
      total = pricer1;

    }
    if (room.id == "R8") {
      const R1 = roomData[8];
      const pricer1 = daysDifference * R1.cost;
      total = pricer1;
    }
    if (room.id == "R9") {
      const R1 = roomData[9];
      const pricer1 = daysDifference * R1.cost;
      total = pricer1;
    }
    if (timeDifference < 0) {
      alert('Check out date must be greater than check in date.');
      console.log(total)
      return ;
    }
    else{
      return data ={
        name: Fname,
        people: vpeople,
        daycount: daysDifference,
        dayin: indate,
        dayout : outdate,
        room : selectedRoom,
        price : total
    };
    }

  }
function dateinputcheck(){

  const indate = document.getElementById("dayin").value;
  const outdate = document.getElementById("dayout").value;

  const yesterday = new Date(today.getTime() - (1000 * 60 * 60 * 24)); 
  const datein = new Date(indate);
  const dateout = new Date(outdate);

  console.log(datein)
  console.log(dateout)

  if (indate > outdate) { 
    alert("Check-in date cannot be after check-out date.");
  }
  if (datein < yesterday) {
    alert("Check-in date cannot be before yesterday.");
  }
  else{
    return true
  }

}

function peoplecheck(){
  const room = document.querySelector('input[type="radio"][name="roominfo"]:checked');
  const people = document.getElementById("people").value;
  console.log(people)
if (room.id == "R1") {
    const R1 = 2;
    console.log(R1) 
    if (R1>= people) {
      alert("this room fits your people")
      // Perform actions specific to R1
    } else {
      console.log(R1.Capacity)
      alert("Cannot book a smaller place than the required family size")   
      console.log(R1.Capacity)
    }
}else
if (room.id == "R2") {
  const R2 = 2;
    if (R2>= people) {
      alert("this room fits your people")
      // Perform actions specific to R2
    } else {
      console.log(R2.Capacity)
      alert("Cannot book a smaller place than the required family size")   
      console.log(R2.Capacity)
    }
}else
if (room.id == "R3") {
  const R2 = 2;
  if (R2>= people) {
    alert("this room fits your people")
    // Perform actions specific to R3
  } else {
    console.log(R2.Capacity)
    alert("Cannot book a smaller place than the required family size")   
    console.log(R2.Capacity)
  }
}else
if (room.id == "R4") {
  const R2 = 2;
    if (R2>= people) {
      alert("this room fits your people")
      // Perform actions specific to R4
    } else {
      console.log(R2.Capacity)
      alert("Cannot book a smaller place than the required family size")   
      console.log(R2.Capacity)
    }
}else
if (room.id == "R5") {
  const R2 = 2;
  if (R2>= people) {
    alert("this room fits your people")
    // Perform actions specific to R5
  } else {
    console.log(R2.Capacity)
    alert("Cannot book a smaller place than the required family size")   
    console.log(R2.Capacity)
  }
}else
if (room.id == "R6") {
  const R6 = 4;
    if (R6>= people) {
      alert("this room fits your people")
      // Perform actions specific to R6
    } else {
      console.log(R4.Capacity)
      alert("Cannot book a smaller place than the required family size")   
      console.log(R4.Capacity)
    }
}else
if (room.id == "R7") {
  const R6 = 4;
    if (R6>= people) {
      alert("this room fits your people")
      // Perform actions specific to R7
    } else {
      console.log(R4.Capacity)
      alert("Cannot book a smaller place than the required family size")   
      console.log(R4.Capacity)
    }
}
if (room.id == "R8") {
  const R8 = 6;
    if (R8>= people) {
      alert("this room fits your people")
      // Perform actions specific to R8
    } else {
      alert("Cannot book a smaller place than the required family size")   
    }
}
if (room.id == "R9") {
  const R8 = 6;
  if (R8>= people) {
    alert("this room fits your people")
    // Perform actions specific to R9
  } else {
    alert("Cannot book a smaller place than the required family size")   
  }
}
if (room.id == "R10") {
  console.log(roomData[10])
}
}


function searchdata(){
  peoplecheck()
  dateinputcheck();
}


//dispaly the iniformation 
  function submitData(){
  
    const data =getFormData();

    const dataRow=document.createElement("tr");
    const cellname=document.createElement("td");
    const celldayin=document.createElement("td");
    const celldyout =document.createElement("td");
    const celltime=document.createElement("td");
    const cellpeople=document.createElement("td");
    const cellroom=document.createElement("td");
   const cellprice = document.createElement("td");

    dataRow.appendChild(cellname);
    dataRow.appendChild(celldayin);
    dataRow.appendChild(celldyout);
    dataRow.appendChild(celltime);
    dataRow.appendChild(cellpeople);
    dataRow.appendChild(cellroom);
    dataRow.appendChild(cellprice);

    cellname.innerHTML=data.name;
    celldayin.innerHTML=data.dayin;
    celldyout.innerHTML=data.dayout;
    celltime.innerHTML=data.daycount;
    cellpeople.innerHTML=data.people;
    cellroom.innerHTML=data.room;
    cellprice.innerHTML=data.price;

    formData.appendChild(dataRow);

    console.log(data.price)
    console.log(cellprice)
  
}

function checkroom(){
const room = document.querySelector('input[type="radio"][name="roominfo"]:checked');

if(room){
  room.disabled = true;
  room.parentElement.style.background = "red"; 
  console.log(room)
} 
else{
  alert("please select a room");
}
}

function callbothfunction(){
  submitData();
  checkroom();
}








/////////
//show room imger 
const roominfo1 = document.getElementById("r1");
const showimage = document.getElementById("2p");
const room1indetial = document.getElementById("r1infor");

roominfo1.addEventListener("mouseover", function() {
  showimage.style.display = "block";
  room1indetial.style.display = "block";
});

roominfo1.addEventListener("mouseout", function() {
showimage.style.display = "none";
room1indetial.style.display = "none";
});

const room2indetial = document.getElementById("r2infor");
const room2info = document.getElementById("r2");
const showimage2 = document.getElementById("3p");

room2info.addEventListener("mouseover", function() {
showimage2.style.display = "block";
room2indetial.style.display = "block";
});

room2info.addEventListener("mouseout", function() {
showimage2.style.display = "none";
room2indetial.style.display = "none";
});

const room4info = document.getElementById("r4");
const showimage4 = document.getElementById("4p");
const room4indetial = document.getElementById("r4infor");

room4info.addEventListener("mouseover", function() {
showimage4.style.display = "block";
room4indetial.style.display = "block";
});

room4info.addEventListener("mouseout", function() {
showimage4.style.display = "none";
room4indetial.style.display = "none";
});

const room5info = document.getElementById("r5");
const showimage5 = document.getElementById("5p");
const room5indetial = document.getElementById("r5infor");

room5info.addEventListener("mouseover", function() {
showimage5.style.display = "block";
room5indetial.style.display = "block";
});

room5info.addEventListener("mouseout", function() {
showimage5.style.display = "none";
room5indetial.style.display = "none";
});

const room7indetial = document.getElementById("r7infor");
const room7info = document.getElementById("r7");
const showimage7 = document.getElementById("7p");

room7info.addEventListener("mouseover", function() {
showimage7.style.display = "block";
room7indetial.style.display = "block";
});

room7info.addEventListener("mouseout", function() {
showimage7.style.display = "none";
room7indetial.style.display = "none";});

const room8indetial = document.getElementById("r8infor");
const room8info = document.getElementById("r8");
const showimage8 = document.getElementById("8p");
room8info.addEventListener("mouseover", function() {
showimage8.style.display = "block";
room8indetial.style.display = "block";});


room8info.addEventListener("mouseout", function() {
showimage8.style.display = "none";
room8indetial.style.display = "none";});

const room9indetial = document.getElementById("r9infor");
const room9info = document.getElementById("r9");
const showimage9 = document.getElementById("9p");
room9info.addEventListener("mouseover", function() {

showimage9.style.display = "block";
room9indetial.style.display = "block";
});

room9info.addEventListener("mouseout", function() {
showimage9.style.display = "none";
room9indetial.style.display = "none";});


//show room 