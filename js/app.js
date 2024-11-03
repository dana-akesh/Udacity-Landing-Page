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
        //Find a value that works best, but 150 seems to be a good start.
        if (box.top <= VALUE && box.bottom >= VALUE) {
            section.classList.add('active');
            // change the heading color
            const heading = section.querySelector('h2');
            heading.style.color = '#000000';
        } else {
            section.classList.remove('active');
            // change the heading color
            const heading = section.querySelector('h2');
            heading.style.color = '#ffffff';
        }
    }
}

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

