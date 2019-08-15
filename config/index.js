var path = require('path');

module.exports = {
    siteName: "Rooted Psychotherapy & Counseling",
    data: {
        clinicians: path.join(__dirname, "../data/clinicians.json"),
        locations: path.join(__dirname, "../data/locations.json")
    }
}