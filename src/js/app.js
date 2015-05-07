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
                content: articles
            },
            prevention: {
                title: "Prévention",
                content: articles
            },
            recherche: {
                title: "Recherche",
                content: "Je suis lA RECHERCHE"
            },
            formation: {
                title: "Formation",
                content: "Je suis LA FORMATION"
            },
            contact: {
                title: "Contact",
                content: "Je suis lE CONTACT"
            }
        };            
        var toto ={};
        var templates = [];
        
        var getTemplates = function (templateList) {
            
            console.log('templates: ' + templates);
            
            var templates = [];
            for (var i = 0; i < templateList.length; i++) {
                var templateName = templateList[i];
                $.get("templates/" + templateName + ".tmpl.html", function (template) {
//                    console.log(template);
                    templates[templateName] = template;
//                    console.log(templates);
                });
            }
            return templates;
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
                
                var template = templates[0];
                console.log(template);
                //            var template = templates['article-resume'];
                Mustache.parse(template); // optional, speeds up future uses
                var rendered = Mustache.render(template, stateObj.content);
                contentElement.innerHTML = rendered;
            }
        };
    
       
        // Update the page content when the popstate event is called.
        window.addEventListener('popstate', function (event) {
            console.log(event.state);
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
                var pageData = pages[pageURL.split('.')[0]];
    
                // Update the title and content.
                updateContent(pageData);
                // Create a new history item.
                history.pushState(pageData, pageData.title, pageURL);
            });
        }        
    
        //load templates
        templates = getTemplates(['article-resume']);
    
        // Load initial content.
        updateContent(pages.index);
    
        // Update this history event so that the state object contains the data
        // for the homepage.
        history.replaceState(pages.index, pages.index.title);
    };
    init();
//    window.onload = init;

})(myApp, preventionArticles);