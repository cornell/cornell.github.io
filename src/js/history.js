window.onload = function () {

    // Content for the pages.
    // Note: You would probably want to load the page content using AJAX in a 
    // real application.
    var pages = {
        accueil: {
            title: "Accueil",
            content: "Je suis l'ACCUEIL"
        },
        prevention: {
            title: "Prévention",
            content: "prevention"
        },
        recherche: {
            title: "Recherche",
            content: "Je suis lA RECHERCHE"
        },
        formation: {
            title: "Formation",
            content: "Je suis LA FORMAION"
        },
        contact: {
            title: "Contact",
            content: "Je suis lE CONTACT"
        }
    };

    var templates = [];
    var loadTemplates = function(templateList) {

        for (var i = 0; i < templateList.length; i++) {
            var templateName = templateList[i];
            $.get("templates/" + templateName + ".tmpl.html", function (template) {
                templates[templateName] = template;
            });
        }
    };
    loadTemplates(['article-resume']);
    
    $(".article").on('click', function () {
        window.location = $('.article-titre').attr('href');
        return false;
    });

    // Get references to the page elements.
    var navLinks = document.querySelectorAll('.load-content');
    var titleElement = document.getElementById('title');
    var contentElement = document.getElementById('content');


    // Update the page content.
    var updateContent = function (stateObj) {
        // Check to make sure that this state object is not null.
            
        if (stateObj) {
            document.title = stateObj.title;
            titleElement.innerHTML = stateObj.title;
            
            var template = $('#tmpl-article').html();
//            var template = templates['article-resume'];
            Mustache.parse(template); // optional, speeds up future uses
            var rendered = Mustache.render(template, stateObj.content);
            contentElement.innerHTML = rendered;
        }
    };


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


    // Update the page content when the popstate event is called.
    window.addEventListener('popstate', function (event) {
        console.log(event.state);
        updateContent(event.state)
    });


    // Load initial content.
    updateContent(pages.accueil);

    // Update this history event so that the state object contains the data
    // for the homepage.
    history.replaceState(pages.accueil, pages.accueil.title);

};