// const MyFile = require("../../models/uploadFiles");

const dragZone = document.querySelector(".dragZone");
const fileInput = document.querySelector("#fileInput");
const browse = document.querySelector(".browse");

const uploadFile = async () =>{
    const file = fileInput.files[0];
    const ma = "ram";
    const forms = new FormData();
    const appendData = forms.append("MyFile",file);
    

    // console.log(forms.get("myfile"));
    
    await fetch("http://localhost:8000/post", {
        "method" : "POST",
        "body" : forms,
    })   
    .then((res) => {
        res.json();
    }).then((data) => {
        console.log(data);
    }).catch((err) => {
        console.log(err);
    })
    
    // const res = await send.json();
    // const data = 
    
}

dragZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    if (!dragZone.classList.contains("dragged")) {
        dragZone.classList.add("dragged");        
    }
});

dragZone.addEventListener("dragleave", (event) => {
    dragZone.classList.remove("dragged");        
});

dragZone.addEventListener("drop", (event) => {
    event.preventDefault();
    dragZone.classList.remove("dragged");        
    const files = event.dataTransfer.files;
    if (files.length) {
        fileInput.files = files;        
        // console.log(fileInput.files);
    }
    
    uploadFile()
});


browse.addEventListener("click", (event) => {
    fileInput.click();
    const files = event.dataTransfer.files;
    if (files.length) {
        fileInput.files = files;        
        console.log(fileInput.files);
    }
    
    // uploadFile()
});



