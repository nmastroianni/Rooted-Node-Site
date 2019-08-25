const axios = require('axios');

class BlogService {

    async getBlogroll(page) {
        var url = `https://admin.rootedpsychotherapy.org/wp-json/wp/v2/posts?page=${page}&_embed=true`;
        try {
            function isSticky(post) {
                return post.sticky === true;
            }
            function isNotSticky(post) {
                return post.sticky === false;
            }
            const response = await axios.get(url);
            const postsData = response.data;
            const stickyPostsData = postsData.filter(isSticky);
            const notStickyPostsData = postsData.filter(isNotSticky);
            const headerData = response.headers;
            const returnData = {
                postsData,
                stickyPostsData,
                notStickyPostsData,
                headerData
            }
            return returnData;
        } catch(err) {
            return [];
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