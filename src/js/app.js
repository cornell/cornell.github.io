/// <reference path="viewHelper.js" />

(function (myApp, articles) {

    myApp.viewHelper.formatterArticles(articles);
   
    function init () {
    
        // Content for the pages.
        // Note: You would probably want to load the page content using AJAX in a 
        // real application.
        var pages = {
            index: {
                title: "Accueil",
                content: articles,
                template: "article-resume"
            },
            prevention: {
                title: "Prévention",
                content: articles,
                template: "article-resume"
            },
            recherche: {
                title: "Recherche",
                content: articles,
                template: "article-resume"
            },
            formation: {
                title: "Formation",
                content: articles,
                template: "article-resume"
            },
            contact: {
                title: "Contact",
                content: articles,
                template: "article-resume"
            }
        };            
        
        var _templates = [];
        var loadTemplates = function (templateList, whenTemplatesLoaded) {
            
            var templates = [];
            for (var i = 0; i < templateList.length; i++) {
                var templateName = templateList[i];
                $.get("templates/" + templateName + ".tmpl.html", function (template) {
                    templates[templateName] = template;
                    whenTemplatesLoaded(templates);
                });
            }
        };        
    
        $(".article").on('click', function () {
            window.location = $('.article-titre').attr('href');
            return false;
        });        
    
        // Update the page content.
        var updateContent = function (stateObj) {
            // Check to make sure that this state object is not null.
            if (stateObj) {
                document.title = stateObj.title;
                titleElement.innerHTML = stateObj.title;
                
                var template = _templates[stateObj.template];
                Mustache.parse(template); // optional, speeds up future uses
                var rendered = Mustache.render(template, stateObj.content);
                contentElement.innerHTML = rendered;
            }
        };
       
        // Update the page content when previous or forward browser keys are clicked.
        window.addEventListener('popstate', function (event) {
            
//            console.log('postate: ' + event.state);
            updateContent(event.state);
        });
        
        // Get references to the page elements.
        var navLinks = document.querySelectorAll('.load-content');
        var titleElement = document.getElementById('title');
        var contentElement = document.getElementById('content');
        
        // Attach click listeners for each of the nav links.
        for (var i = 0; i < navLinks.length; i++) {
            navLinks[i].addEventListener('click', function (e) {
                e.preventDefault();
    
                // Fetch the page data using the URL in the link.
                var pageURL = this.attributes['href'].value;
                var controller = pageURL.split('.')[0];
                var pageData = pages[controller];
                
                // Update the title and content.
                updateContent(pageData);
                // Create a new history item.
                history.pushState(pageData, pageData.title, pageURL);
            });
        }        
        
        var whenTemplatesLoaded = function(templates){
    
            _templates = templates;
            // Load initial content.
            updateContent(pages.index);

            // Update this history event so that the state object contains the data
            // for the homepage.
            history.replaceState(pages.index, pages.index.title);
        };
        
        loadTemplates([pages.index.template], whenTemplatesLoaded);
                
    };
    window.onload = init;

})(myApp, preventionArticles);