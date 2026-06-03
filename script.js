// Mobile Menu Toggle
function toggleMenu(){
    const navLinks = document.getElementById('navLinks');
    const menuIcon = document.getElementById('menuIcon');
    navLinks.classList.toggle('active');
    if(navLinks.classList.contains('active')){
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
}

function closeMenu(){
    const navLinks = document.getElementById('navLinks');
    const menuIcon = document.getElementById('menuIcon');
    navLinks.classList.remove('active');
    menuIcon.classList.remove('fa-times');
    menuIcon.classList.add('fa-bars');
}

// Navbar Scroll Effect
window.addEventListener('scroll',()=>{
    const navbar = document.getElementById('navbar');
    if(window.scrollY > 50){
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Typing Animation
const typingTexts = [
    'Full Stack Developer',
    'Node.js Developer',
    'Problem Solver',
    'Code Enthusiast'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typing');

function type(){
    const currentText = typingTexts[textIndex];
    
    if(isDeleting){
        typingElement.textContent = currentText.substring(0,charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0,charIndex + 1);
        charIndex++;
    }
    
    if(!isDeleting && charIndex === currentText.length){
        isDeleting = true;
        setTimeout(type,2000);
        return;
    }
    
    if(isDeleting && charIndex === 0){
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        setTimeout(type,500);
        return;
    }
    
    setTimeout(type,isDeleting ? 50 : 100);
}

type();

// Scroll Animation (Intersection Observer)
const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }
    });
},{
    threshold:0.1
});

document.querySelectorAll('.fade').forEach(section=>{
    observer.observe(section);
});

// Counter Animation
function animateCounter(element){
    const target = parseInt(element.getAttribute('data-count'));
    let count = 0;
    const speed = target > 10 ? 100 : 500;
    const increment = target / (speed / 16);
    
    const timer = setInterval(()=>{
        count += increment;
        if(count >= target){
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(count) + '+';
        }
    },16);
}

const counterObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.stat-number').forEach(stat=>{
    counterObserver.observe(stat);
});

// Particle System
function createParticles(){
    const container = document.getElementById('particles');
    const particleCount = 25;
    
    for(let i=0;i<particleCount;i++){
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 6 + 4) + 's';
        particle.style.width = Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

createParticles();

// Close menu when clicking outside
document.addEventListener('click',(e)=>{
    const navLinks = document.getElementById('navLinks');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if(!navLinks.contains(e.target) && !menuBtn.contains(e.target) && navLinks.classList.contains('active')){
        closeMenu();
    }
});
// Copy email to clipboard when email link is clicked
document.addEventListener('DOMContentLoaded', function() {
    const emailLink = document.querySelector('a[href^="mailto:"]');
    
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            const email = 'kachhadiyapriya02@gmail.com';
            
            // Copy to clipboard
            navigator.clipboard.writeText(email).then(function() {
                // Optional: show a small notification
                const originalHTML = emailLink.innerHTML;
                emailLink.innerHTML = '<i class="fas fa-check"></i> Copied!';
                
                setTimeout(function() {
                    emailLink.innerHTML = originalHTML;
                }, 2000);
            }).catch(function() {
                // Clipboard failed, but mailto will still work
                console.log('Could not copy to clipboard');
            });
        });
    }
});