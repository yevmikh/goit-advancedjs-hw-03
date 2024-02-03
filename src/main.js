import SlimSelect from 'slim-select';
import 'slim-select/styles';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

function hideElement(element, isVisible) {
  element.classList.toggle('hidden', !isVisible);
}

const catInfo = document.querySelector('.cat-info');
const catSelector = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');

function showLoader() {
  loaderEl.classList.remove('hidden');
}

hideElement(catSelector, false);
hideElement(loaderEl, true);
hideElement(catInfo, true);

function catSelectorUpload() {
  hideElement(catSelector, false);
  showLoader();
  hideElement(catInfo, true);
  catInfo.innerHTML = '';
  fetchBreeds()
    .then(breeds => {
      catSelector.style.display = 'flex';
      breeds.forEach(({ id, name }) => {
        catSelector.appendChild(new Option(name, id));
      });
      new SlimSelect({
        select: catSelector,
      });
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: 'Oops! Something went wrong! Try reloading the page!',
        position: 'bottomCenter',
        timeout: false,
        color: 'yellow',
      });
    })
    .finally(() => {
      hideElement(loaderEl, false);
    });
}
catSelectorUpload();
////// drawing image and content
catSelector.addEventListener('change', createMarkup);
function createMarkup() {
  hideElement(catInfo, true);
  showLoader();
  catInfo.innerHTML = '';
  const breedId = catSelector.value;

  fetchCatByBreed(breedId)
    .then(catData => {
      const data = catData[0];
      catInfo.innerHTML = `<img class = "img" src = "${data.url}" alt= "${data.breeds[0].name}" loading="lazy"/>
      <div class = "text-container">
<p class = "h2">${data.breeds[0].name}</p>
<p>${data.breeds[0].description}</p>
<p><span class ="subtitle">Temperament</span> : ${data.breeds[0].temperament}</p>
</div>`;
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: 'Oops! Something went wrong! Try reloading the page!',
        position: 'bottomCenter',
        timeout: 5000,
        backgroundColor: 'yellow,',
        color: 'yellow',
      });
    })
    .finally(() => {
      hideElement(loaderEl, false);
    });
}
