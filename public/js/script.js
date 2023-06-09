
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
const maxUploadSize = 104857600;


const uploadFile = async () =>{
    progressContainer.style.display = "block";
    const file = fileInput.files[0];
    const forms = new FormData();
    const appendData = forms.append("MyFile",file);

    progressContainer.style.display = "block";
    
    const showLink = (success) => {
        if (success.file) {
            textBox.value = success.file;
            progressContainer.style.display = "none";
            userLinkSection.style.display = "block";
            mailBox.style.display = "block";
            mailText.style.display = "block";
            EmailForm[2].removeAttribute("disabled")
        } else {
            showToast(`can't upload more then 100 Mb file`);    
            progressContainer.style.display = "none";
        }
        // console.log(success);
    }

    const uploadUrl = `http://localhost:8000/post`
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            showLink(JSON.parse(xhr.response) );
        }
    };
  
    const updateProgress = (e) => {
        const percent = Math.round((e.loaded / e.total)*100);
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

const handlevalidation = () => {    
    if (fileInput.files.length === 1) {
        if (fileInput.files[0].size <= maxUploadSize) {
            uploadFile();
        } else {
            showToast(`can't upload more then 100 Mb file`);            
        }
    }else{
        showToast(`can't upload more them 1 file`);
    }
}

dragZone.addEventListener("drop", (event) => {
    event.preventDefault();
    dragZone.classList.remove("dragged");        
    const files = event.dataTransfer.files;
    fileInput.files = files;  

    handlevalidation()
});


fileInput.addEventListener("change", () => {
    handlevalidation();
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
        emailFrom : EmailForm.elements["YourEmail"].value,
        emailTo : EmailForm.elements["ClientEmail"].value,
    };

    // console.log(forData);

    EmailForm[2].setAttribute("disabled" , "true");

    fetch( `http://localhost:8000/api/user/email`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(forData)
    }).then( (res) => {
       return res.json();
    }).then( (data) => {
        console.log(data);
        // if (success) {
        //     mailBox.style.display = "none";
        //     showToast("Email Send")
        // }
    }).catch( (err) => {
        console.log(err);
    })
})

let tostTimer;
const showToast = (msg) => {
    toast.innerHTML = msg;
    toast.style.display = "block";
    clearTimeout(tostTimer);
    tostTimer = setTimeout(() => { 
        toast.style.display = "none";
    }, 3000);
} 


// const Fetch = () => {
//     fetch("http://localhost:8000/user")
//     .then(res => res.json())
//     .then(data => console.log(data.name))
// }

// Fetch()