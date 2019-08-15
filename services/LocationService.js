var fs = require('fs');
var util = require('util');

var readFile = util.promisify(fs.readFile);

class LocationService {
    constructor(datafile) {
        this.datafile = datafile;
    }

    async getLocationNames() {
        var data = await this.getData();

        return data.map(function(location) {
            return {name: location.name, shortname: location.shortname};
        });
    }

    async getData() {
        var data = await readFile(this.datafile, 'utf8');
        if(!data) return [];
        return JSON.parse(data).locations;
    }

    async getLocationShort() {
        var data = await this.getData();
        return data.map(function(location) {
            return { 
                name: location.name,
                shortname: location.shortname,
                image: location.image,
                blurb: location.blurb,
                address: location.address,
                city: location.city,
                state: location.state,
                zip: location.zip,
                mapURL: location.googleMapsURL
            };
        });
    }

    async getLocation(shortname) {
        var data = await this.getData();
        var location = data.find(function(location) {
            return location.shortname === shortname;
        });
        if(!location) return null;
        return {
            location
        }
    }
}

module.exports = LocationService;