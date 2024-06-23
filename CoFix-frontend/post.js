// Initialize the map
const map = L.map('map').setView([17.604461, 78.486784], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let currentMarker;
let issues = JSON.parse(localStorage.getItem('issues')) || [];

// Function to add a marker to the map
function addIssueToMap(issue) {
  const { issueName, description, location, image } = issue;
  L.marker([location.lat, location.lng]).addTo(map)
    .bindPopup(`<b>${issueName}</b><br>${description}<br><img src="${image}" style="width:100px;">`);
}

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
  const issueName = document.getElementById('issue-name').value;
  const description = document.getElementById('activity-description').value;
  const location = JSON.parse(document.getElementById('location').value);
  const image = document.getElementById('photo-preview').src;

  const issue = { issueName, description, location, image };

  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));
  
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
