(function (window) {
    
    var formatterDate = function (date) {
        var year = date.slice(0, 4)
        var month = date.slice(4, 6)
        var day = date.slice(6, 8)
        var hour = date.slice(8, 10)
        var minute = date.slice(10, 12)
        return moment(new Date(year, month, day, hour, minute)).format('LL');
    };

    var getResume = function (longueur, texte) {
        return texte.slice(0, longueur) + " ...";
    };

    var formatterArticles = function (articles) {
     
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            console.log(article);
            article.dateEvenement = formatterDate(article.dateEvenement);
            article.resume = getResume(295, article.description);
        }
    };

    var myApp = window.myApp || {};
    window.myApp = myApp;
    myApp.viewHelper = {
        formatterDate : formatterDate,
        getResume : getResume,
        formatterArticles : formatterArticles
    };
    
})(window);