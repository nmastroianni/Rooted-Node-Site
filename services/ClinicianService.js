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
        if(!data) return ['Oops'];
        return JSON.parse(data).clinicians;
    }
}

module.exports = ClinicianService;