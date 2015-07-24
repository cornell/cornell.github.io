require('harmonize')();
var metalsmith = require('metalsmith'),
	  markdown   = require('metalsmith-markdown'),
      layouts  = require('metalsmith-layouts'),
   browserSync = require('browser-sync');

// metalsmith(__dirname)
//     .use(markdown())
//     .use(layouts({ engine: 'hogan' }))
//     .destination('./dist')
//     .build(function(err) {
// 	    if (err) throw err;
// 	  })
    
browserSync({
    server     : "dist",
    files      : ["src/*.md", "layouts/*.tmpl.html"],
    middleware : function (req, res, next) {
        build(next);
    }
});

function build (callback) {
    metalsmith(__dirname)
        .use(markdown())
        .use(layouts({ engine: 'hogan' }))
        .destination('./dist')
        .build(function (err) {
                   var message = err ? err : 'Build complete';
                   console.log(message);
                   callback();
               });
}