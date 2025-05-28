const decreaseBtn=document.getElementById("decreaseBtn");
const resetBtn=document.getElementById("resetBtn");
const increaseBtn=document.getElementById("increaseBtn");
const constLabel=document.getElementById("constLabel");
let count = 0 ;

increaseBtn.onclick=function(){
    count++;
    countLabel.textContent=count;

}
decreaseBtn.onclick=function(){
    count--;
    countLabel.textContent=count;
}
resetBtn.onclick=function(){
    count = 0;
    countLabel.textContent=count; 
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Form submission handling
const contactForm = document.querySelector('#contact form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';

    try {
        const response = await fetch('https://formspree.io/f/xblovnvp', { // Replace with your Formspree ID
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            alert('Message sent successfully!');
            contactForm.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        alert('Error sending message: ' + error.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Submit';
    }
});

// Dynamic copyright year
document.querySelector('.copyright p').innerHTML = 
    `CopyRight <i class="fa-solid fa-copyright"></i> ${new Date().getFullYear()} Mike. Made with <i class="fa-solid fa-heart"></i> by Easy Tutorials`;

// Portfolio item hover effects
document.querySelectorAll('.work').forEach(work => {
    work.addEventListener('mouseover', () => {
        work.querySelector('.layer').style.transform = 'translateY(0)';
    });
    
    work.addEventListener('mouseout', () => {
        work.querySelector('.layer').style.transform = 'translateY(100%)';
    });
});

// Fix for tab switching function
function opentab(tabname, event) {  // Added event parameter
    const tablinks = document.getElementsByClassName("tab-links");
    const tabcontents = document.getElementsByClassName("tab-contents");

    for(let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for(let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// Mobile menu improvements
const sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = '0';
    document.body.style.overflow = 'hidden';
}

function closemenu() {
    sidemenu.style.right = "-200px";
    document.body.style.overflow = 'auto';
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!sidemenu.contains(e.target) && !e.target.matches('.fa-bars')) {
        closemenu();
    }
});

// CV download tracking
document.querySelector('.btn2[download]').addEventListener('click', () => {
    console.log('CV downloaded'); // Add analytics tracking here
});