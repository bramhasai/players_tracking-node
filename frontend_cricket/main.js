import axios from 'axios';

let allNote=document.querySelector(".allNotes");
let notes=[];

let form_sec=document.querySelector('section');

//display on screen
function render(note,unique_id){
  const noteDiv=document.createElement("div");
  const id=`note_${unique_id}`;
  noteDiv.classList.add("note",id);

  const title=document.createElement("h4");
  title.innerText=`Name: ${note.first_name} ${note.last_name}`;
  const role=document.createElement('p');
  role.innerText=`Role: ${note.role}`
  const dob=document.createElement("p");
  dob.innerText = `DOB: ${new Date(note.dob).toLocaleDateString()}`;
  const email=document.createElement('p');
  email.innerText=`Email: ${note.email}`;
  const phone=document.createElement('p');
  phone.innerText=`Phone: ${note.phone}`;
  const availability=document.createElement('p');
  availability.innerText=`Available: ${note.available?"Yes":"No"}`

  const Delete=document.createElement("button");
  Delete.id="deleteNote"
  Delete.innerText="Delete"

  const edit=document.createElement("button");
  edit.id="edit"
  edit.innerText="Update"

  noteDiv.appendChild(title);
  noteDiv.appendChild(dob);
  noteDiv.appendChild(role);
  noteDiv.appendChild(email);
  noteDiv.appendChild(phone);
  noteDiv.appendChild(availability);
  noteDiv.appendChild(Delete);
  noteDiv.appendChild(edit)
  allNote.append(noteDiv);

  //delete note
  Delete.addEventListener("click",()=>{
    deleteNotebyId(unique_id);
  })

  edit.addEventListener("click",async()=>{
    updatePlayer(note,unique_id);
  })
}


//add player details
let addPlayer=document.querySelector('.addPlayer');
addPlayer.addEventListener('click',()=>{
  allNote.style.display="none";
  form_sec.style.display='flex';
  document.querySelector("#create_button").innerText='Submit';
})

let updating_id=null
document.querySelector("#create_button").addEventListener('click',async(e)=>{
  e.preventDefault();
  const first_name = document.getElementById('first_name').value.trim();
  const last_name = document.getElementById('last_name').value.trim();
  const dob = document.getElementById('DOB').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const role = document.getElementById('role').value.trim();
  const available = document.querySelector('input[name="available"]:checked') ? 
                    document.querySelector('input[name="available"]:checked').value : '';

  // Validate fields
  if (!first_name || !last_name || !dob || !email || !phone || !role || !available) {
    document.querySelector("#warning").innerText="All field are required";
    return;
  }
  document.querySelector("#warning").innerText="";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return; // Stop form submission if email is invalid
  }

  // Phone validation regex (basic example)
  const phoneRegex = /^\d{10}$/; // Adjust this regex based on your phone number format
  if (!phoneRegex.test(phone)) {
    alert('Please enter a valid phone number.');
    return; // Stop form submission if phone number is invalid
  }

  let body={first_name,last_name,dob,email,phone,role,available};
  if(updating_id){
    let result=await axios.put(`http://localhost:5000/api/v1/players/update-player/${updating_id}`,body);
    updating_id=null;
    document.querySelector("#create_button").innerText='Submit';
  }else{
    let res = await axios.post('http://localhost:5000/api/v1/players/add-players',body);
  }

  document.getElementById('first_name').value='';
  document.getElementById('last_name').value='';
  document.getElementById('DOB').value='';
  document.getElementById('email').value='';
  document.getElementById('phone').value='';
  document.getElementById('role').value='';

  const availableRadios = document.querySelectorAll('input[name="available"]');
  availableRadios.forEach(radio => {
    radio.checked = false;
  });
  form_sec.style.display='none';
  allNote.style.display="grid";
  renderafterRefresh();
})

document.querySelector('#cancel_button').addEventListener('click',()=>{
  form_sec.style.display='none';
  allNote.style.display="grid";
  document.querySelector("#warning").innerText="";
})
//delete player details
async function deleteNotebyId(unique_id){
  console.log(unique_id);
  let res= await axios.delete(`http://localhost:5000/api/v1/players/delete-player/${unique_id}`);
  console.log(res);
  document.querySelector(".note_"+`${unique_id}`).remove();
  renderafterRefresh();
}

//update player details
async function updatePlayer(note,unique_id){
  allNote.style.display="none";
  form_sec.style.display="flex";
  document.getElementById('first_name').value=note.first_name;
  document.getElementById('last_name').value=note.last_name;
  document.getElementById('DOB').value=new Date(note.dob).toISOString().split('T')[0];
  document.getElementById('email').value=note.email;
  document.getElementById('phone').value=note.phone;
  document.getElementById('role').value=note.role;
  note.available?document.getElementById('role_yes').checked=true:
  document.getElementById('role_no').checked=true;

  updating_id=unique_id;
  document.querySelector("#create_button").innerText="Update"
}



// render after refresh
async function renderafterRefresh() {
  allNote.innerHTML=''
  form_sec.style.display = 'none';
  allNote.style.display = 'none';
  try{
    let players = await axios.get('http://localhost:5000/api/v1/players/get-players');
    notes=players.data.data
    if(notes.length>0){
      form_sec.style.display="none"
      allNote.style.display="grid"
      notes.forEach((note) => {
        render(note, note._id);
      });
    }
    else{
      form_sec.style.display="flex";
    }
  }catch(err){
    console.log("Error while fetching the data:",err);
  }
}


renderafterRefresh();