// const { json } = require("express");

const dragZone = document.querySelector(".dragZone");
const fileInput = document.querySelector("#fileInput");
const browse = document.querySelector(".browse");
const progressBar = document.querySelector(".progressBar");
const parcent = document.querySelector(".parcent");
const blueBar = document.querySelector(".blueBar");
const progressContainer = document.querySelector(".progressContainer");
const userLinkSection = document.querySelector(".userLinkSection");

// progressContainer.style.display = "none";


const uploadFile = async () =>{
    progressContainer.style.display = "block";
    const file = fileInput.files[0];
    const forms = new FormData();
    const appendData = forms.append("MyFile",file);
    
    // const sendData = await fetch("http://localhost:8000/post", {
    //     "method" : "POST",
    //     "body" : forms,
    // })   
    // .then((res) => {
    //     res.json();
    // }).then((data) => {
    //     console.log(data);
    // }).catch((err) => {
    //     console.log(err);
    // })

    const showLink = (success) => {
        // console.log(json.parse(success.success));
        progressContainer.style.display = "block";
        userLinkSection.style.display = "block";

    }

    const uploadUrl = `http://localhost:8000/post`
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            // console.log(xhr.response);
            showLink(xhr.response);
        }
    };
  
    const updateProgress = (e) => {
        const percent = Math.round((e.loaded / e.total)*100);
        // console.log(percent);
        progressBar.style.width = `${percent}%`;
        blueBar.style.width = `${percent}%`;
        parcent.innerHTML = percent;
    }

    xhr.upload.onprogress = updateProgress;

    xhr.open("POST", uploadUrl);
    xhr.send(forms)


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
    }
    
    uploadFile()
});


fileInput.addEventListener("change", () => {
    uploadFile()
})

browse.addEventListener("click", (event) => {
    fileInput.click();   
});



