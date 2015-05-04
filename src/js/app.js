(function (myApp, articles) {

    for (var i  = 0; i < articles.length; i++) {
        var article = articles[i];
        article.dateEvenement = myApp.formatDate(article.dateEvenement);
        article.resume = myApp.getResume(article.description);        
    }
    
})(myApp, preventionArticleList);