import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

const populateBreedsSelect = async () => {
  try {
    const breeds = await fetchBreeds();
    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.text = breed.name;
      breedSelect.add(option);
    });
  } catch (error) {
    showError();
  } finally {
    hideLoader();
  }
};

const showCatInfo = async (breedId) => {
  try {
    const catData = await fetchCatByBreed(breedId);
    const cat = catData[0];
    const catInfoHTML = `
      <div class="cat-info-container">
        <img src="${cat.url}" alt="${cat.breeds[0].name}" class="cat-image">
        <div class="cat-text">
          <p><strong>Breed:</strong> ${cat.breeds[0].name}</p>
          <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
          <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
        </div>
      </div>
    `;
    catInfo.innerHTML = catInfoHTML;

    setCatInfoStyles();
    hideError();
  } catch (error) {
    showError();
  } finally {
    hideLoader();
  }
};

const setCatInfoStyles = () => {
  const catInfoContainer = document.querySelector(".cat-info-container");
  const catImage = catInfoContainer.querySelector(".cat-image");
  const catText = catInfoContainer.querySelector(".cat-text");

  breedSelect.style.marginBottom = "10px";
  catInfoContainer.style.display = "flex";
  catInfoContainer.style.flexWrap = "wrap";

  catImage.style.maxWidth = "400px";
  catImage.style.marginRight = "20px";

  catText.style.flex = "1";
};

const showLoader = () => {
  loader.style.display = "block";
  breedSelect.style.display = "none";
  catInfo.style.display = "none";
  hideError();
};

const hideLoader = () => {
  loader.style.display = "none";
  breedSelect.style.display = "block";
  catInfo.style.display = "block";
};

const showError = () => {
  error.style.display = "block";
  breedSelect.style.display = "none";
  catInfo.style.display = "none";
  catInfo.innerHTML = "";
};

const hideError = () => {
  error.style.display = "none";
};

breedSelect.addEventListener("change", async (event) => {
  const selectedBreedId = event.target.value;
  showLoader();
  hideError();
  await showCatInfo(selectedBreedId);
});

document.addEventListener("DOMContentLoaded", () => {
  showLoader();
  hideError();
  populateBreedsSelect();
});