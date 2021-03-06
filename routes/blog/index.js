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
                active: "blog",
                page: 'Our Most Recent Posts',
                pageType: "blog",
                pageNumber: 1,
                postList: results[0].notStickyPostsData,
                stickyList: results[0].stickyPostsData,
                headers: results[0].headerData
            });
        } catch(err) {
            return next(err);
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
                        active: "blog",
                        page: `Blog - Page ${req.params.pageNumber}`,
                        pageType: "blog",
                        pageNumber: req.params.pageNumber,
                        postList: results[0].postsData,
                        headers: results[0].headerData
                    });
                } else {
                    return next();
                }
            } catch(err) {

            }
    });

    router.get('/category', async function(req, res, next) {
        if(req.originalUrl == '/blog/category/' || req.originalUrl == '/blog/category') {
            res.redirect(301, "/blog");
        }
    });

    router.get('/category/:catName', async function(req, res, next) {
        try {
            var promises = [];
            promises.push(blogService.getBlogroll(1,req.params.catName));

            var results = await Promise.all(promises);
            if(results[0].postsData) {
                return res.render('blog', {
                    active: "blog",
                    page: `Blog Category - ${req.params.catName}`,
                    pageType: "category",
                    catSlug: req.params.catName,
                    pageNumber: 1,
                    postList: results[0].notStickyPostsData,
                    stickyList: results[0].stickyPostsData,
                    headers: results[0].headerData
                });
            } else {
                return next();
            }
        } catch(err) {
            return next(err);
        }
    });

    router.get('/category/:catName/page/:pageNumber', async function(req, res, next) {
        try {
            var promises = [];
            promises.push(blogService.getBlogroll(req.params.pageNumber,req.params.catName));

            var results = await Promise.all(promises);
            if(results[0].postsData) {
                return res.render('blog', {
                    active: "blog",
                    page: `Blog Category - ${req.params.catName} Page ${req.params.pageNumber}`,
                    pageType: "category",
                    catSlug: req.params.catName,
                    pageNumber: req.params.pageNumber,
                    postList: results[0].notStickyPostsData,
                    stickyList: results[0].stickyPostsData,
                    headers: results[0].headerData
                });
            } else {
                return next();
            }
        } catch(err) {
            return next(err);
        }
    });

    // *** Author Routes Below

    router.get('/author', async function(req, res, next) {
        if(req.originalUrl == '/blog/author/' || req.originalUrl == '/blog/author') {
            res.redirect(301, "/clinicians");
        }
    });

    router.get('/author/:authName', async function(req, res, next) {
        try {
            var promises = [];
            promises.push(blogService.getBlogroll(1,null,req.params.authName));

            var results = await Promise.all(promises);
            console.log(results[0].headerData)
            if(results[0].postsData) {
                return res.render('blog', {
                    active: "blog",
                    page: `Blog Author - ${req.params.authName}`,
                    pageType: "author",
                    authSlug: req.params.authName,
                    pageNumber: 1,
                    postList: results[0].notStickyPostsData,
                    stickyList: results[0].stickyPostsData,
                    headers: results[0].headerData
                });
            } else {
                return next();
            }
        } catch(err) {
            return next(err);
        }
    });

    router.get('/author/:authName/page/:pageNumber', async function(req, res, next) {
        try {
            var promises = [];
            promises.push(blogService.getBlogroll(req.params.pageNumber,req.params.authName));

            var results = await Promise.all(promises);
            if(results[0].postsData) {
                return res.render('blog', {
                    active: "blog",
                    page: `Blog Author - ${req.params.catName} Page ${req.params.pageNumber}`,
                    pageType: "author",
                    authSlug: req.params.authName,
                    pageNumber: req.params.pageNumber,
                    postList: results[0].notStickyPostsData,
                    stickyList: results[0].stickyPostsData,
                    headers: results[0].headerData
                });
            } else {
                return next();
            }
        } catch(err) {
            return next(err);
        }
    });

    // *** Individual Post Route Below

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