import './style.css'
import { PageFlip } from "./page-flip.module.js";

function generateHTML(json) {
    document.querySelector('#app').innerHTML = `
  <div id="app" class="flex items-center justify-center min-h-screen bg-blue-500/50">
    <div id="book">
      <div class="my-page" data-density="hard">
          ${json.pages.page1}
      </div>
      <div class="my-page">
          ${json.pages.page2}
      </div>
      <div class="my-page">
          ${json.pages.page3}
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

function initPageFlip() {
     const pageFlip = new PageFlip(document.getElementById('book'),
        {
            width: 400, // required parameter - base page width
            height: 600,  // required parameter - base page height
            showCover: true
        });
    pageFlip.loadFromHTML(document.querySelectorAll('.my-page'));
}

fetch(`${import.meta.env.BASE_URL}contents.json`)
    .then((response) => response.json())
    .then(json => {
        generateHTML(json);
        initPageFlip();
    })

