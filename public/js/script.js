const submit = document.getElementById("submit");
const input = document.getElementById("input");
const rand = document.getElementById("rand")
const tableAll = document.getElementById("tableAll");
const tableRand = document.getElementById("tableRand");

const url = "http://localhost:3000";

submit.addEventListener("click", (e)=>{
    e.preventDefault()
    let data = {
        project: input.value,
        finished: 0
    }
    input.value = "";
    newProject(data);
    seeProjects();
});

async function newProject(data) {
    try {
        const response = await fetch(`${url}/post`,{
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(data) 
        });
        const info = await response.json();
        if(response.status!==200){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Something went wrong! ${info.title}`,
            })
        }
        else{
            Swal.fire(
                'Ok!',
                `${info.title}`,
                'success'
            )
        }
    } catch (error) {
        console.log(error);
    }
}

async function seeProjects() {
    try {
        const response = await fetch(`${url}/get`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        clearProjects();
        tableAll.appendChild(document.createElement("ol"))
        for (let i = 0; i < data.length; i++) {
            let projects = data[i].project;
            Projects(projects); 
        }
    } catch (error) {
        console.log(error);
    }
}

function clearProjects() {
    tableAll.innerHTML="";
}

function Projects(project) {
    document.querySelector("ol").innerHTML += `
        <li>
            ${project}
            <input type="checkbox" value="${project}" onchange="updateProject()" id="checked">
        </li>
    `;
}



async function randProjects(){
    try {
        const response = await fetch(`${url}/get/one`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json();
        const project = data[0].project;
        clearRandProjects()
        randProject(project)
    } catch (error) {
        console.log(error)
    }
}

function clearRandProjects() {
    document.querySelector(".table2").innerHTML="";
}

function randProject(project) {
    document.querySelector(".table2").innerHTML += `  
        <ul>
            <li>
                ${project}
            </li>      
        </ul>
    `;
}



async function updateProject() {
    const checked = document.querySelector("input[type=checkbox]:checked");
    let project = checked.value;
    const data = {
        finished: 1
    }
    const response = await fetch(`${url}/update/${project}`,{
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    seeProjects();
}