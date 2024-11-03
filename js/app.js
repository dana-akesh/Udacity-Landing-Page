/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */


// global variables for the navigation bar and the sections
const navBar = document.getElementById('navbar__list');
const pageSections = document.querySelectorAll('section');

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const navBuilder = () => {
    let navUI = document.createDocumentFragment(); // Create a fragment to improve performance
    pageSections.forEach(section => {
        const sectionID = section.id;
        const sectionDataNav = section.dataset.nav;

        // Create each list item
        const createList = document.createElement('li');
        createList.innerHTML = `<a class="menu__link" href="#${sectionID}">${sectionDataNav}</a>`;

        // Append the list item to the fragment
        navUI.appendChild(createList);
    });

    // Append the fragment to the navBar after the loop
    navBar.appendChild(navUI);
};

// call the function to build the nav
navBuilder();

// Add class 'active' to section when near top of viewport
const VALUE = 150;

function makeActive() {
    for (const section of pageSections) {
        const box = section.getBoundingClientRect();
        // Find a value that works best, but 150 seems to be a good start.
        if (box.top <= VALUE && box.bottom >= VALUE) {
            section.classList.add('active');

            // change the heading color
            const heading = section.querySelector('h2');
            heading.style.color = '#000000';

            // change the background color
            section.style.background = "linear-gradient(0deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)";
            section.style.backdropFilter = "blur(10px)";
            section.style.border = "1px solid rgba(255, 255, 255, 0.3)";
            section.style.borderRadius = "10px";

            // highlight the active link in the navigation bar with style
            const navLinks = document.querySelectorAll('.menu__link');
            for (const link of navLinks) {
                if (link.hash === `#${section.id}`) {
                    link.style.color = '#4eac85';
                    link.style.fontWeight = 'bold';
                } else {
                    link.style.color = '#000000';
                    link.style.fontWeight = 'normal';
                }
            }
        } else {
            section.classList.remove('active');

            // change the heading color
            const heading = section.querySelector('h2');
            heading.style.color = '#ffffff';

            // change the background color
            section.style.background = "linear-gradient(0deg, rgba(136,203,171,1) 0%, rgba(0,13,60,1) 100%)";
        }
    }
}

// Set sections as active
document.addEventListener('scroll', function () {
        makeActive();
    }
);

// Scroll to anchor ID using scrollTO event
function scrollToClick() {
    navBar.addEventListener('click', function (event) {
        event.preventDefault();
        if (event.target.nodeName === 'A') {
            const clickedSection = document.querySelector(event.target.hash);
            clickedSection.scrollIntoView({behavior: "smooth"});
        }
    });
}

// Scroll to section on link click
scrollToClick();
