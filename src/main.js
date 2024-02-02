import SlimSelect from 'slim-select';
import 'slim-select/styles';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const catInfo = document.querySelector('.cat-info');
const catSelector = document.querySelector('.breed-select');

const loaderEl = document.createElement('span');
loaderEl.className = 'loader hidden';
document.body.appendChild(loaderEl);

function showLoader() {
  loaderEl.classList.remove('hidden');
}
function hideLoader() {
  loaderEl.classList.add('hidden');
}
function showCatSelector() {
  catSelector.classList.remove('hidden');
}
function hideCatSelector() {
  catSelector.classList.add('hidden');
}
function showCatInfo() {
  catInfo.classList.remove('hidden');
}
function hideCatInfo() {
  catInfo.classList.add('hidden');
}
function catSelectorUpload() {
  showLoader();
  hideCatSelector();
  hideCatInfo();

  fetchBreeds()
    .then(breeds => {
      hideLoader();
      showCatSelector();
      breeds.forEach(({ id, name }) => {
        catSelector.appendChild(new Option(name, id));
      });
      new SlimSelect({
        select: catSelector,
      });
    })
    .catch(error => {
      hideLoader();
      hideCatSelector();
      hideCatInfo();
      iziToast.error({
        title: 'Error',
        message: 'Oops! Something went wrong! Try reloading the page!',
        position: 'bottomCenter',
        timeout: false,
        color: 'yellow',
      });
    });
}

////// drawing image and content
catSelector.addEventListener('change', createMarkup);
function createMarkup() {
  showLoader();
  hideCatSelector();
  hideCatInfo();

  const breedId = catSelector.value;

  fetchCatByBreed(breedId)
    .then(catData => {
      hideLoader();
      hideCatSelector();
      showCatInfo();
      const data = catData[0];
      catInfo.innerHTML = `<img class = "img" src = "${data.url}" alt= "${data.breeds[0].name}" loading="lazy"/>
      <div class = "text-container">
<p class = "h2">${data.breeds[0].name}</p>
<p>${data.breeds[0].description}</p>
<p><span class ="subtitle">Temperament</span> : ${data.breeds[0].temperament}</p>
</div>`;
    })
    .catch(error => {
      hideLoader();
      hideCatSelector();
      hideCatInfo();
      iziToast.error({
        title: 'Error',
        message: 'Oops! Something went wrong! Try reloading the page!',
        position: 'bottomCenter',
        timeout: 5000,
        backgroundColor: 'yellow,',
        color: 'yellow',
      });
    });
}
catSelectorUpload();
