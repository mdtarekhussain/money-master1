const lodePhone = async (searchText = "13", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  //   console.log(phones);
  displayPhone(phones, isShowAll);
};
const displayPhone = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";
  //   display show all  button if there are  more then 12 phone
  const showAllButton = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllButton.classList.remove("hidden");
  } else {
    showAllButton.classList.add("hidden");
  }
  // console.log("is show all", isShowAll);
  //   display  only firs 10 phons
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  phones.forEach((phone) => {
    // console.log(phone);
    //  2 create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 p-4 shadow-xl`;
    // 3 set a inner html
    phoneCard.innerHTML = `
      <figure>
              <img
                src="${phone.image}"
                alt="Shoes"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-center">
                <button onclick ="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
              </div>
            </div>
    `;
    //  4 append child
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false);
};
//
const handleShowDetail = async (id) => {
  console.log(" Show All Details ");
  //  lode  single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  // console.log(data);
  const phone = data.data;
  showPhoneDetails(phone);
};
// // show the model
const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById("show-details-phone-name");
  phoneName.innerText = phone.name;
  const showDetailsContainer = document.getElementById(
    "show-details-container"
  );
  showDetailsContainer.innerHTML = `
  <img src  ="${phone.image}" alt=""/>
  <p class="mt-1"> <span> Storage:</span> ${phone?.mainFeatures?.storage} </p>
  <p class="mt-1"> <span> displaySize
:</span> ${phone?.mainFeatures?.displaySize} </p>
  <p class="mt-1"> <span> Sensors
:</span> ${phone?.mainFeatures?.sensors} </p>
  <p class="mt-1"> <span> Memory
:</span> ${phone?.mainFeatures?.memory} </p>
  <p class="mt-1"> <span> ReleaseDate:
</span> ${phone?.mainFeatures?.releaseDate || "No ReleaseDate available"} </p>
  <p class="mt-1"> <span> GPS:
</span> ${phone?.others?.GPS || "No Gps available"} </p>
  `;
  show_details_modal.showModal();
};
//  handle search
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);
  lodePhone(searchText, isShowAll);
};
// const handleSearch2 = () => {
//   toggleLoadingSpinner(true);
//   const searchField = document.getElementById("search-field2");
//   const searchText = searchField.value;
//   lodePhone(searchText);
// };
const toggleLoadingSpinner = (isLoading) => {
  loadingPinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingPinner.classList.remove("hidden");
  } else {
    loadingPinner.classList.add("hidden");
  }
};
const handleShowAll = () => {
  handleSearch(true);
};
lodePhone();
