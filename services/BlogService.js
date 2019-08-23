const axios = require('axios');

class BlogService {
    

    async getBlogroll(page) {
        var url = `https://admin.rootedpsychotherapy.org/wp-json/wp/v2/posts?page=${page}&_embed=true`;
        try {
            const response = await axios.get(url);
            const postsData = response.data;
            const headerData = response.headers;
            const returnData = {
                postsData,
                headerData
            }
            return returnData;
        } catch(err) {
            return err;
        }
    }

    async getBlogPost(slug) {
        var url = `https://admin.rootedpsychotherapy.org/wp-json/wp/v2/posts?slug=${slug}&_embed=true`;
        try {
            const response = await axios.get(url);
            const data = response.data;
            return data;
        } catch(err) {
            return err;
        }
    }
}

module.exports = BlogService;