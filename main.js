import {PageFlip} from "./page-flip.module.js";

document.addEventListener("DOMContentLoaded", (event) => { 
    console.log('DOM fully loaded and parsed');
    const pageFlip = new PageFlip(document.getElementById('book'),
    {
        width: 400, // required parameter - base page width
        height: 600,  // required parameter - base page height
        showCover: true
    });
    pageFlip.loadFromHTML(document.querySelectorAll('.my-page'));
    
});

