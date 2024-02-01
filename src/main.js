import SlimSelect from 'slim-select';
import 'slim-select/styles';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const catInfo = document.querySelector('.cat-info');
const catSelector = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');

const loaderEl = document.createElement('span');
loaderEl.className = 'loader';
document.body.appendChild(loaderEl);
catInfo.innerHTML = '';
catInfo.appendChild(loaderEl);
loaderEl.style.display = 'block';

function catSelectorUpload() {
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
      catSelector.style.display = 'none';
    })
    .finally(() => {
      loaderEl.style.display = 'block';
    });
}

////// drawing image and content
catSelector.addEventListener('change', createMarkup);
function createMarkup() {
  catInfo.innerHTML = '';
  catInfo.appendChild(loaderEl);
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
      loaderEl.style.display = 'block';
    });
}

catSelectorUpload();
