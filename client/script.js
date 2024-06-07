function getBathValue() {
  const uiBathrooms = document.getElementsByName("uiBathrooms");
  for (let i = 0; i < uiBathrooms.length; i++) {
    if (uiBathrooms[i].checked) {
      return parseInt(uiBathrooms[i].value);
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  const uiBHK = document.getElementsByName("uiBHK");
  for (let i = 0; i < uiBHK.length; i++) {
    if (uiBHK[i].checked) {
      return parseInt(uiBHK[i].value);
    }
  }
  return -1; // Invalid Value
}

async function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  const sqft = document.getElementById("uiSqft").value;
  const bhk = getBHKValue();
  const bathrooms = getBathValue();
  const location = document.getElementById("uiLocations").value;
  const estPrice = document.getElementById("uiEstimatedPrice");

  const url = "http://127.0.0.1:5000/api/predict_home_price"; // Update for local development

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      total_sqft: parseFloat(sqft),
      bhk: bhk,
      bath: bathrooms,
      location: location
    })
  });

  if (!response.ok) {
    console.error("Failed to fetch data:", response.statusText);
    return;
  }

  const data = await response.json();
  estPrice.innerHTML = `<h2>${data.estimated_price} Lakh</h2>`;
  console.log(response.status);
}

async function onPageLoad() {
  console.log("document loaded");
  const url = "http://127.0.0.1:5000/api/get_location_names"; // Update for local development

  const response = await fetch(url);
  if (!response.ok) {
    console.error("Failed to fetch locations:", response.statusText);
    return;
  }

  const data = await response.json();
  console.log("got response for get_location_names request");
  if (data) {
    const locations = data.locations;
    const uiLocations = document.getElementById("uiLocations");
    uiLocations.innerHTML = "<option value='' disabled selected>Choose a Location</option>"; // Reset the dropdown
    locations.forEach(location => {
      const opt = new Option(location);
      uiLocations.appendChild(opt);
    });
  }
}

window.onload = onPageLoad;
