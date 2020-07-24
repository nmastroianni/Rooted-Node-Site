var fs = require('fs');
var util = require('util');
const axios = require('axios');


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

    async getDataApi() {
        var url = 'https://admin.rootedpsychotherapy.org/wp-json/wp/v2/clinicians?_embed=true';
        try {
            const response = await axios.get(url);
            const data = response.data;
            return data;
        } catch(err) {
            console.log(err);
        }
    }
    
    async getNamesApi() {
        var data = await this.getDataApi();

        return data.map(function(clinician) {
            return {name: clinician.title.rendered, shortname: clinician.slug};
        });
    }

    async getClinicianShortApi() {
        var data = await this.getDataApi();
        data.reverse();
        return data.map(function(clinician) {
            return { 
                name:       clinician.title.rendered,
                shortname:  clinician.slug,
                image:      clinician._embedded['wp:featuredmedia'],
                blurb:      clinician.excerpt.rendered,
                ages:       clinician._embedded['wp:term'][1],
                modalities: clinician._embedded['wp:term'][0]
            };
        });
    }

    async getClinicianApi(shortname) {
        var data = await this.getDataApi();
        var modalitiesArr,agesArr,issuesArr;
        var clinician = data.find(function(clinician) {
            return clinician.slug === shortname;
        });
        //If clinician not found, return 404 
        if(!clinician) return null;
        agesArr         = clinician._embedded['wp:term'][1];
        issuesArr       = clinician._embedded['wp:term'][2];
        modalitiesArr   = clinician._embedded['wp:term'][0];
        let ages = agesArr.map((val,i,arr) => {
            return val.slug
        });
        let issues = issuesArr.map((val,i,arr) => {
            return val.name
        });
        let modalities = modalitiesArr.map((val,i,arr) => {
            return val.name
        });
        if(!clinician) return null;
        return {
            clinician,
            ages,
            issues,
            modalities
        }
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
        console.log(clinician);
        return {
            clinician
        }
    }
}

module.exports = ClinicianService;