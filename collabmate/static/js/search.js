// function searchSkill() {

//     const skill = document.getElementById("skill").value;

//     fetch("/search", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ skill: skill })
//     })

//     .then(response => response.json())
//     .then(data => {

//         let html = "";

//         if(data.length === 0){
//             html = "<p class='no-results'>No collaborators found.</p>";
//         }

//         data.forEach(user => {

//             let skills = "";

//             if(user.skills){
//                 user.skills.split(",").forEach(skill => {
//                     skills += `<span class="skill-tag">${skill.trim()}</span>`;
//                 });
//             }

//             const profileImage = user.profile_image 
//                 ? user.profile_image 
//                 : `https://ui-avatars.com/api/?name=${user.name}&background=random`;

//             html += `
//             <div class="mentor-card">

//                 <div class="mentor-header">

//                     <img class="mentor-img" src="${profileImage}" />

//                     <div class="mentor-info">
//                         <div class="mentor-name">${user.name}</div>
//                         <div class="mentor-role">Collaborator</div>

//                         <div class="mentor-rating">
//                             ⭐ 4.8 <span>(45)</span>
//                             <span class="status available">available</span>
//                         </div>
//                     </div>

//                 </div>

//                 <p class="mentor-desc">
//                     Passionate developer experienced in ${user.skills}.
//                 </p>

//                 <div class="skills">
//                     ${skills}
//                 </div>

//                 <div class="mentor-footer">

//                     <div class="mentor-exp">
//                         ⏱ 3+ years exp
//                     </div>

//                     <a class="linkedin-btn" href="${user.linkedin}" target="_blank">
//                         LinkedIn ↗
//                     </a>

//                 </div>

//             </div>
//             `;

//         });

//         document.getElementById("results").innerHTML = html;

//     })

//     .catch(error => {
//         console.error("Error:", error);
//     });

// }




function renderResults(data){

    let html = "";

    if(data.length === 0){
        html = "<p class='no-results'>No collaborators found.</p>";
    }

    data.forEach(user => {

        let skills = "";

        if(user.skills){
            user.skills.split(",").forEach(skill => {
                skills += `<span class="skill-tag">${skill.trim()}</span>`;
            });
        }

        const profileImage = user.profile_image
            ? user.profile_image
            : `https://ui-avatars.com/api/?name=${user.name}&background=random`;

        html += `
<div class="mentor-card-new">

    <div class="mentor-top">

        <div class="mentor-avatar">
            <img src="${profileImage}">
        </div>

        <div class="mentor-title">
            <h2>${user.name}</h2>
            <p class="mentor-role">Collaborator</p>
        </div>

    </div>

    <div class="mentor-skill-box">

        <p class="skill-heading">EXPERTISE</p>

        <div class="skills">
            ${skills}
        </div>

    </div>

    <div class="mentor-desc">
        Passionate developer experienced in ${user.skills}.
    </div>

    <div class="mentor-buttons">

        <div class="exp-btn">
            ⏱ ${user.experience || "3+ years"} Experience
        </div>

        <a class="linkedin-connect" href="${user.linkedin}" target="_blank">
            Linkedin ↗
        </a>

    </div>

</div>
`;
    });

    document.getElementById("results").innerHTML = html;
}


function searchSkill(){

    const skill = document.getElementById("skill").value;
    fetchResults(skill);

}


function searchCategory(category, element){

    // remove highlight from all category items
    const items = document.querySelectorAll(".sidebar ul li");
    items.forEach(item => item.classList.remove("active"));

    // add highlight to clicked item
    element.classList.add("active");

    document.getElementById("skill").value = category;

    fetchResults(category);

}


function fetchResults(skill){

    fetch("/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ skill: skill })
    })

    .then(response => response.json())
    .then(data => {
        renderResults(data);
    })

    .catch(error => {
        console.error("Error:", error);
    });

}