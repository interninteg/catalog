import './style.css'
import { PageFlip } from "./page-flip.module.js";

function generateHTML(json) {
    document.querySelector('#app').innerHTML = `
  <div id="app" class="flex items-center justify-center min-h-screen bg-blue-500/50">
    <div id="book">
      <div class="my-page" data-density="hard">
          ${json.page1}
      </div>
      <div class="my-page">
          ${json.page2}
      </div>
      <div class="my-page">
          ${json.page3}
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
}

fetch(`${import.meta.env.BASE_URL}contents.json`)
    .then((response) => response.json())
    .then(json => {
        // confirm the json object (console.debug can help debug)
        console.debug("the is the contents:",json);
        generateHTML(json);
    })

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