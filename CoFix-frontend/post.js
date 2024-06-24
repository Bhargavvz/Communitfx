// Initialize the map
const map = L.map('map').setView([17.604461, 78.486784], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let currentMarker;
let issues = JSON.parse(localStorage.getItem('issues_post')) || [];

// Function to add a marker to the map
function addIssueToMap(issue) {
  const { issueName, description, location, image } = issue;
  if (location && location.lat && location.lng) {
    L.marker([location.lat, location.lng]).addTo(map)
      .bindPopup(`<b>${issueName}</b><br>${description}<br><img src="${image}" style="width:100px;">`);
  } else {
    console.warn('Invalid issue location:', issue);
  }
}

// Log each issue before iterating
console.log('Issues:', issues);

// Add existing issues to the map
issues.forEach(issue => {
  addIssueToMap(issue);
});

// Add a marker on map click
map.on('click', function (e) {
  if (currentMarker) {
    map.removeLayer(currentMarker);
  }
  currentMarker = L.marker(e.latlng).addTo(map);
  document.getElementById('location').value = JSON.stringify(e.latlng);
});

// Handle form submission
document.getElementById('post-button').addEventListener('click', function () {

  const email = localStorage.getItem('userEmail');
  const benefitType = "Community Problem";
  const schemeName = "Get from localStorage";
  const issueName = document.getElementById('issue-name').value;
  const description = document.getElementById('activity-description').value;
  console.log("Location log:" , document.getElementById('location').value);
  const location = JSON.parse(document.getElementById('location').value);
  const image = document.getElementById('photo-preview').src;

  const issue = { email,benefitType,issueName, description, location, image };

  // Send issue to the backend
  fetch('http://localhost:8000/api/profile/issues/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(issue)
  })
  .then(response => response.text()) // Updated to handle plain text response
  .then(data => {
    console.log('Success:', data);
    issues.push(issue);
    localStorage.setItem('issues_post', JSON.stringify(issues));
    addIssueToMap(issue);
    alert('Issue added successfully!');
    document.getElementById('issue-name').value = '';
    document.getElementById('activity-description').value = '';
    document.getElementById('location').value = '';
    document.getElementById('photo-preview').src = 'https://via.placeholder.com/100';
    if (currentMarker) {
      map.removeLayer(currentMarker);
      currentMarker = null;
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});

// Handle photo upload
document.getElementById('photo-preview').addEventListener('click', function () {
  document.getElementById('photo-upload').click();
});

document.getElementById('photo-upload').addEventListener('change', function (e) {
  const reader = new FileReader();
  reader.onload = function (event) {
    document.getElementById('photo-preview').src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
});
