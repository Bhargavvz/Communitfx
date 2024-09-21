// js/config.js

const configs = {
    development: {
        apiBaseUrl: "http://localhost:8000"
    },
    production: {
        apiBaseUrl: "https://cofixrepo-latest.onrender.com"
    }
};

let apiBaseUrl;

function loadConfig(environment) {
    if (configs[environment]) {
        apiBaseUrl = configs[environment].apiBaseUrl;
    } else {
        console.error(`No configuration found for environment: ${environment}`);
    }
}

function getApiBaseUrl() {
    return apiBaseUrl;
}


// Change this to 'production' for production environment

//const environment = 'development'; 
const environment = 'production';
loadConfig(environment);