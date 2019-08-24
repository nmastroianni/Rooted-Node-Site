var express = require('express');
var router = express.Router();

module.exports = function(param) {
    var {blogService} = param;
    /* GET blogroll  */
    router.get('/', async function(req, res, next) {
        try {
            var promises = [];
            promises.push(blogService.getBlogroll(1));

            var results = await Promise.all(promises);
            return res.render('blog', {
                page: 'Our Most Recent Posts',
                postList: results[0].postsData,
                headers: results[0].headerData
            });
        } catch(err) {

        }
    });

    router.get('/page', async function(req, res, next) {
        if(req.originalUrl == '/blog/page/' || req.originalUrl == '/blog/page') {
            res.redirect(301, "/blog");
        }
    });

     router.get('/page/:pageNumber', async function(req, res, next) {
            try {
                var promises = [];
                promises.push(blogService.getBlogroll(req.params.pageNumber));

                var results = await Promise.all(promises);
                if(results[0].postsData) {
                    return res.render('blog', {
                        page: `Blog - Page ${req.params.pageNumber}`,
                        postList: results[0].postsData,
                        headers: results[0].headerData
                    });
                } else {
                    return next();
                }
            } catch(err) {

            }
    });

    router.get('/:slug', async (req, res, next) => {
        try {
            var promises = [];
            promises.push(blogService.getBlogPost(req.params.slug));
            var results = await Promise.all(promises);
            if(!results[0]) {
                return next();
            }
            return res.render('blog/post', {
                page: results[0][0].title.rendered,
                post: results[0][0]
            });
        }   catch(err) {

        }
    });
    return router;
}