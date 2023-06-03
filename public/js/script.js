// const { json } = require("express");

const dragZone = document.querySelector(".dragZone");
const fileInput = document.querySelector("#fileInput");
const browse = document.querySelector(".browse");
const progressBar = document.querySelector(".progressBar");
const parcent = document.querySelector(".parcent");
const blueBar = document.querySelector(".blueBar");
const progressContainer = document.querySelector(".progressContainer");
const userLinkSection = document.querySelector(".userLinkSection");
const copyIcon = document.querySelector("#copyIcon");
const textBox = document.querySelector("#textBox");
const mailBox = document.querySelector(".mailBox");
const mailText = document.querySelector(".mailText");
const EmailForm = document.querySelector("#EmailForm");
const toast = document.querySelector(".toast");

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
    progressContainer.style.display = "block";
    
    const showLink = (success) => {
        // console.log(json.parse(success.success));
        progressContainer.style.display = "none";
        userLinkSection.style.display = "block";
        mailBox.style.display = "block";
        mailText.style.display = "block";
        EmailForm[2].removeAttribute("disabled")

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

    xhr.upload.onerror = () => {
        fileInput.value = "";
        showToast(`Error in upload : ${xhr.statusText}`)
    }

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


copyIcon.addEventListener("click", () => {
    textBox.select();
    document.execCommand("copy");  // for copy value of textBox
    showToast("Link Copied")
})

EmailForm.addEventListener ("submit", (e) => {
    e.preventDefault();
    const url = textBox.value;
    const forData = {
        uuid : url.split("/").splice(-1 , 1)[0],
        emailTo : EmailForm.elements["YourEmail"].value,
        emailFrom : EmailForm.elements["ClientEmail"].value,
    };

    EmailForm[2].setAttribute("disabled" , "true");

    fetch( `http://localhost:8000/post/gmail`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(forData)
    }).then( (res) => {
        res.json();
    }).then( ({success}) => {
        if (success) {
            mailBox.style.display = "none";
            showToast("Email Send")
        }
    }).catch( (err) => {
        console.log(err);
    })
})

let tostTimer;
const showToast = (msg) => {
    toast.innerHTML = msg;
    toast.style.transform = "translate(-50%,0px)";
    clearTimeout(tostTimer);
    tostTimer = setTimeout(() => {
        toast.style.transform = "translate(-50%, 60px)";        
    }, 3000);
} 