document.addEventListener("DOMContentLoaded", function () {
    // Sidebar initialization
    var mainSidebar = document.getElementById("main-sidebar");
    var projectsSidebar = document.getElementById("projects-sidebar");
    var aboutSidebar = document.getElementById("about-sidebar");
    var contactSidebar = document.getElementById("contact-sidebar");

    // Functions to show or close sidebars
    function showProjectsSidebar() {
        mainSidebar.style.display = "none";
        projectsSidebar.style.display = "flex";
    }

    function closeProjectsSidebar() {
        mainSidebar.style.display = "flex";
        projectsSidebar.style.display = "none";
    }

    function showAboutSidebar() {
        mainSidebar.style.display = "none";
        aboutSidebar.style.display = "flex";
    }

    function closeAboutSidebar() {
        mainSidebar.style.display = "flex";
        aboutSidebar.style.display = "none";
    }

    function showContactSidebar(){
        mainSidebar.style.display = "none";
        contactSidebar.style.display = "flex";
    }
    
    function closeContactSidebar(){
        mainSidebar.style.display = "flex";
        contactSidebar.style.display = "none"
    }

    // Event listeners for sidebar links
    document.getElementById("projects-link").addEventListener("click", showProjectsSidebar);
    document.getElementById("about-link").addEventListener("click", showAboutSidebar);
    document.getElementById("contact-link").addEventListener("click", showContactSidebar);

    document.getElementById("close-projects").addEventListener("click", closeProjectsSidebar);
    document.getElementById("close-about").addEventListener("click", closeAboutSidebar);
    document.getElementById("close-contact").addEventListener("click", closeContactSidebar);

    animateSkills();
    const projectsContainer = document.getElementById('projects');

    // Container and project data initialization
    const projects = [
        { id: 1, imageSrc: 'cssfiles/static/pizzapp.JPG', link: 'pizzeria.html', name: 'Food Ordering App' },
        { id: 2, imageSrc: 'cssfiles/static/backfauna51.jpeg', link: 'duck.html', name: 'Web Art Gallery'},
        { id: 3, imageSrc: 'cssfiles/static/portproject.png', link: 'portfolio.html', name: 'Portfolio' },
        { id: 4, imageSrc: 'cssfiles/static/drawings/kanek.jpg', link: 'artwork.html', name: 'Artwork' },
        { id: 5, imageSrc: 'cssfiles/static/workinprogress.png', link: '404.html', name: 'Project 4' }
    ];

    // Creating project elements and appending to the container
    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');
        projectElement.innerHTML = `
            <img src="${project.imageSrc}" alt="${project.name}" onclick="navigateToProject('${project.link}')">
            <div class="project-info">${project.name}</div>
        `;
        projectsContainer.appendChild(projectElement);
    });

    document.getElementById("home-link").addEventListener("click", navigateToHome);
});

function navigateToProject(link) {
    window.location.href = link;
}

function navigateToHome() {
    window.location.href = "index.html";
}

document.querySelectorAll('.outcome-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = card.textContent;
        const contentId = card.getAttribute('data-content-id');
        const bodyContent = document.getElementById(contentId).innerHTML; 
        
        // Update the modal's content
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalBody').innerHTML = bodyContent; 
        
        // Display the modal
        document.getElementById('universalModal').style.display = 'block';
    });
});

document.querySelector('.close-button').addEventListener('click', function() {
    document.getElementById('universalModal').style.display = 'none';
});

// Close modal if outside click
window.onclick = function(event) {
    if (event.target === document.getElementById('universalModal')) {
        document.getElementById('universalModal').style.display = 'none';
    }
};

document.querySelectorAll('.stages-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = card.textContent;
        const contentId = card.getAttribute('data-content-id');
        const bodyContent = document.getElementById(contentId).innerHTML; 
        
        // Update the modal's content
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalBody').innerHTML = bodyContent; 
        
        // Display the modal
        document.getElementById('universalModal').style.display = 'block';
    });
});

document.querySelector('.close-button').addEventListener('click', function() {
    document.getElementById('universalModal').style.display = 'none';
});

// Close modal if outside click
window.onclick = function(event) {
    if (event.target === document.getElementById('universalModal')) {
        document.getElementById('universalModal').style.display = 'none';
    }
};

document.addEventListener('DOMContentLoaded', (event) => {
    let slideIndex = 1; 
    showSlides(slideIndex);

    function plusSlides(n) {
      showSlides(slideIndex += n);
    }
  
    function currentSlide(n) {
      showSlides(slideIndex = n);
    }
  
    function showSlides(n) {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("dot");
      
      if (n > slides.length) { slideIndex = 1; }
      if (n < 1) { slideIndex = slides.length; }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex-1].style.display = "block";
      dots[slideIndex-1].className += " active";
    }

    // Add the auto-advance functionality
    let slideInterval = setInterval(function() {
      plusSlides(1);
    }, 4000); // Change slide every 4 seconds

    document.querySelector(".prev").addEventListener('click', function() {
      plusSlides(-1);
      // Reset the interval when user manually changes slides
      clearInterval(slideInterval);
      slideInterval = setInterval(function() {
        plusSlides(1);
      }, 4000);
    });

    document.querySelector(".next").addEventListener('click', function() {
      plusSlides(1);
      // Reset the interval when user manually changes slides
      clearInterval(slideInterval);
      slideInterval = setInterval(function() {
        plusSlides(1);
      }, 4000);
    });
  
    Array.from(document.querySelectorAll(".dot")).forEach((dot, index) => {
      dot.addEventListener('click', function() {
        currentSlide(index + 1);
        // Reset the interval when user manually changes slides
        clearInterval(slideInterval);
        slideInterval = setInterval(function() {
          plusSlides(1);
        }, 4000);
      });
    });
});
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Feedback form submission logic
    var formData = new FormData(this);

    fetch('https://formspree.io/f/xayrnwwo', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert('Thank you for your message!');
            this.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwnProperty.call(data, 'errors')) {
                    alert(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    alert('Oops! There was a problem submitting your form');
                }
            });
        }
    }).catch(error => {
        alert('Oops! There was a problem submitting your form');
    });
});

// Function to show the feedback form
function closeFeedbackForm() {
    document.getElementById('feedback-modal').style.display = 'none';
}

document.getElementById('feedback-modal').querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    var formData = new FormData(this);

    fetch('https://formspree.io/f/xayrnwwo', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert('Thank you for your feedback!');
            this.reset();
            closeFeedbackForm(); 
        } else {
            response.json().then(data => {
                if (Object.hasOwnProperty.call(data, 'errors')) {
                    alert(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    alert('Oops! There was a problem submitting your feedback');
                }
            });
        }
    }).catch(error => {
        alert('Oops! There was a problem submitting your feedback');
    });
});

function showFeedbackForm() {
    document.getElementById("feedback-modal").style.display = "block";
}

function closeFeedbackForm() {
    document.getElementById("feedback-modal").style.display = "none";
}

function animateSkills() {
    let skills = document.querySelectorAll('.skill-per');
    skills.forEach(skill => {
        let width = skill.getAttribute('per');
        skill.style.maxWidth = width;
    });
}

// Slideshow functionality
function initializeSlideshows() {
    var slideshows = document.querySelectorAll('.slideshow-container');
    
    // Initialization of slideshows
    slideshows.forEach(function(slideshow) {
        showSlides(1, slideshow);
    });
}

function plusSlides(n, slideshowContainer) {
    // Logic to navigate through slides
    var slides = slideshowContainer.getElementsByClassName("slide");
    var slideIndex = parseInt(slideshowContainer.getAttribute("data-slide-index")) || 1;
    
    slideIndex += n;
    if (slideIndex > slides.length) { slideIndex = 1; }
    if (slideIndex < 1) { slideIndex = slides.length; }
  
    slideshowContainer.setAttribute("data-slide-index", slideIndex.toString());
    showSlides(slideIndex, slideshowContainer);
}

function showSlides(n, slideshowContainer) {
    // Logic to display specific slide
    var i;
    var slides = slideshowContainer.getElementsByClassName("slide");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[n - 1].style.display = "block";
}

initializeSlideshows();
