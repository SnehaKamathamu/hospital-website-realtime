// navbar toggling
const navbarShowBtn = document.querySelector('.navbar-show-btn');
const navbarCollapseDiv = document.querySelector('.navbar-collapse');
const navbarHideBtn = document.querySelector('.navbar-hide-btn');

navbarShowBtn.addEventListener('click', function(){
    navbarCollapseDiv.classList.add('navbar-show');
});
navbarHideBtn.addEventListener('click', function(){
    navbarCollapseDiv.classList.remove('navbar-show');
});

// changing search icon image on window resize
window.addEventListener('resize', changeSearchIcon);
function changeSearchIcon(){
    let winSize = window.matchMedia("(min-width: 1200px)");
    if(winSize.matches){
        document.querySelector('.search-icon img').src = "images/search-icon.png";
    } else {
        document.querySelector('.search-icon img').src = "images/search-icon-dark.png";
    }
}
changeSearchIcon();

// stopping all animation and transition
let resizeTimer;
window.addEventListener('resize', () =>{
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});


function openForm() {
    document.getElementById("feedbackModal").style.display = "flex";
}

function closeForm() {
    document.getElementById("feedbackModal").style.display = "none";
}


  function togglePopup() {
    const popup = document.getElementById("popup");
    const blur = document.getElementById("blur");

    const isVisible = popup.style.display === "block";
    popup.style.display = isVisible ? "none" : "block";
    blur.style.display = isVisible ? "none" : "block";
  }

// document.getElementById("feedbackForm").addEventListener("submit", function(e) {
//     e.preventDefault();

//     const formData = new FormData(this);

//     fetch("/submit", {
//         method: "POST",
//         body: formData
//     })
//     .then(res => res.json())
//     .then(data => {
//         if (data.status === "success") {
//             alert("✅ Feedback submitted!");
//             this.reset();
//         } else {
//             alert("⚠️ " + data.message);
//         }
//     })
//     .catch(err => {
//         console.error("🚨 Error:", err);
//         alert("Something went wrong!");
//     });
// });






