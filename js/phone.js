const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data
    // console.log(phones);
    displayPhones(phones, isShowAll)
}


const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');

    phoneContainer.textContent = '';

    // Display Show All button > 12 phone
    const showAllContainer = document.getElementById('show-all-container')
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden')
    }

    // Display 1st 12 if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        console.log(phone);
        // Create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
        <img src="${phone.image}" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p></p>
        <div class="card-actions">
          <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">SHOW DETAILS</button>
        </div>
      </div>
      `
        phoneContainer.appendChild(phoneCard);
    });

    // Hide Spinner
    toggleLoadingSpinner(false);
}

// 
const handleShowDetail = async (id) => {
    // Load Single Phone Data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();

    const phone = data.data;

    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
    const phoneName = document.getElementById('show-detail-phone-name')
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
       <img src="${phone.image}" alt="" />
       <p><span>Name:</span>${phone?.name}</p>
       <p><span>Memory:</span>${phone?.others?.GPS || 'No GPS'}</p>
       <p>Thanks For Shopping</p>
    `
    show_details_modal.showModal();
}


const handleSerach = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll)
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}

// Handle Show All
const handleShowAll = () => {
    handleSerach(true);
}

// loadPhone();