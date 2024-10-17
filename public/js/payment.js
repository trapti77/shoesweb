/*document.addEventListener("DOMContentLoaded", () => {
  const countrySelect = document.getElementById("country");

  // Fetch country data from REST API
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((countries) => {
      // Sort countries alphabetically
      countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

      // Create an option for each country and append to the select
      countries.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.name.common;
        option.textContent = country.name.common;
        countrySelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching countries:", error);
    });
});*/

//------------------------------------------
const sameAsShippingCheckbox = document.getElementById("sameAsShipping");
const billingAddressFields = document.getElementById("billingAddressFields");

sameAsShippingCheckbox.addEventListener("change", function () {
  if (this.checked) {
    billingAddressFields.style.display = "none";
  } else {
    billingAddressFields.style.display = "block";
  }
});

sameAsShippingCheckbox.dispatchEvent(new Event("change"));
