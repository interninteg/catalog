import './style.css'
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

document.querySelector('#app').innerHTML = `
  <div>
    <h1 class="text-3xl font-bold underline">    Hello world!  </h1>
  <div id="book">
        <div class="my-page" data-density="hard">
            Page Cover
        </div>
        <div class="my-page">
            Page one
        </div>
        <div class="my-page">
            Page two
        </div>
        <div class="my-page">
            Page three
        </div>
        <div class="my-page">
            Page four
        </div>
        <div class="my-page" data-density="hard">
            Last page
        </div>
    </div>
  </div>
`