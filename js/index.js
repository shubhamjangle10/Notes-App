console.log("hello");
let addBtn = document.querySelector('#addbtn');
let title = document.getElementById('title');
let description = document.getElementById('description');
let searchButton = document.getElementById('searchButton');
let searchInput = document.getElementById('searchInput');


showNotes();
addBtn.addEventListener('submit', () => {
   console.log('clicked')
   let notes = localStorage.getItem('notes')
   if (notes == null) {
      console.log('notes null')
      obj = []
   } else {
      obj = JSON.parse(notes)
   }
   myObj = {
      title: title.value,
      description: description.value
   }
   obj.push(myObj)
   localStorage.setItem('notes', JSON.stringify(obj))
   title.value = ''
   description.value = ''
   showNotes()
})


function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        console.log('notes null')
        obj = [];
    }
    else {
        obj = JSON.parse(notes);
    }

    let html = "";
    obj.forEach((element, index) => {
        html += `
        <div class="todocard card mx-2 my-2" id="box${index}" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text" id="para(this.id)">${element.description}</p>
            <button class="btn btn-success" id="${index}" onclick="done(this.id)">Mark as Done</button>
            <button class="btn btn-danger" id="${index}" onclick="deleteNote(this.id)">Delete</button>                 
            </div>
        </div>
        `;
    });


    let insertNote = document.getElementById('notes');
    if (obj.length != 0) {

        insertNote.innerHTML = html;
    }

    else {
        insertNote.innerHTML = `
        <div id="nothing">
        Nothing to show for now. Add a task and see the tasks here
        </div>
        `;
    }
}



function deleteNote(index) {
    let con = confirm("Are you sure you want to delete ?");

    if (con == true) {

        obj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(obj));
        // del.parentNode.parentNode.classList.add("animate");
        showNotes();
    }

}


function done(index) {
    let doneButton=document.getElementById(index);    
    if(doneButton.innerText=="Mark as Done"){
        doneButton.innerText="✔ Done";
        doneButton.setAttribute('style','background-color:greenyellow;color:black;')
    }
    else{
        doneButton.innerText="Mark as Done";
        doneButton.setAttribute('style','background-color:green;')

    }
}

searchInput.addEventListener('input', function () {
    let todocard = document.getElementsByClassName('todocard');
    Array.from(todocard).forEach(function (element) {
        let heads = element.getElementsByTagName("h5")[0].innerText;
        text = searchInput.value.toLowerCase();
        if (text.includes(heads)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    }
    )

})


