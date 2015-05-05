describe('Formatter les données de type date', function () {
    it('formatte la date', function () {
        expect(myApp.viewHelper.formatterDate('20131504')).toEqual('4 avril 2014');
    });
});

describe('Récupérer le résumé d\'un article', function () {
    it('Récupère un résumé de 30 caractères', function () {
        
        var texte = "Table ronde sur les troubles des apprentissages animée par un(e) orthophoniste\n";
        var resume = myApp.viewHelper.getResume(30, texte);
        
        expect('Table ronde sur les troubles d ...').toEqual(resume);
    });
});

describe('Formatter un article', function () {
    it('Récupère un résumé de 30 caractères', function () {
        
        var articles = [{
        "titre": "Fête du livre jeunesse",
        "type": "annonce",
        "dateEvenement": "20150606",
		"departement": "29",
		"ville": "Scrignac",        
        "description": "Table ronde sur les troubles des apprentissages animée par un(e) orthophoniste\nL’association \"Par monts et par livres\" qui organise sa 2° fête du livre jeunesse a sollicité A Propos pour trouver un(e) orthophoniste disposé(e) à animer une table ronde sur les troubles des apprentissages, prévue ce jour là de 15h à 17h\nPublic composé de parents et d’enseignants\nAide logistique fourni par A Propos (préparation, matériel, contrat)\nAlors n’attendez pas, contactez nous !\nRenseignements complémentaires au 06 83 34 73 08",
        "url": "fete_livre_jeunesse_scrignac.html"
    }];
        var articleFormate = myApp.viewHelper.formatterArticles(articles);
        
        expect('4 avril 2014').toEqual(articleFormate.dateEvenement);
    });
});