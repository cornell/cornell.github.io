describe('Formatter les données de type date', function () {
    it('formatte la date', function () {
        expect(myApp.formatDate('20131504')).toEqual('4 avril 2014');
    });
});

describe('Récupérer le résumé d\'un article', function () {
    it('Récupère un résumé de 30 caractères', function () {
        
        var texte = "Table ronde sur les troubles des apprentissages animée par un(e) orthophoniste\n";
        var resume = myApp.getResume(30, texte);
        
        expect('Table ronde sur les troubles d ...').toEqual(resume);
    });
});