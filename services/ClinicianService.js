var fs = require('fs');
var util = require('util');

var readFile = util.promisify(fs.readFile);

class ClinicianService {
    constructor(datafile) {
        this.datafile = datafile;
    }

    async getNames() {
        var data = await this.getData();

        return data.map(function(clinician) {
            return {name: clinician.name, shortname: clinician.shortname};
        });
    }

    async getData() {
        var data = await readFile(this.datafile, 'utf8');
        if(!data) return [];
        return JSON.parse(data).clinicians;
    }

    async getClinicianShort() {
        var data = await this.getData();
        return data.map(function(clinician) {
            return { 
                name: clinician.name,
                shortname: clinician.shortname,
                image: clinician.image,
                blurb: clinician.blurb,
                ages: clinician.focus.age,
                ageshort: clinician.focus.ageshort,
                modalities: clinician.approach.modalities,
                modshort: clinician.approach.modshort
            };
        });
    }

    async getClinician(shortname) {
        var data = await this.getData();
        var clinician = data.find(function(clinician) {
            return clinician.shortname === shortname;
        });
        if(!clinician) return null;
        return {
            clinician
            // name: clinician.name,
            // shortname: clinician.shortname,
            // description: clinician.description
        }
    }
}

module.exports = ClinicianService;