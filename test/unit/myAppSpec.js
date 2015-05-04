describe('Initialisation de l\'appli', function () {
    it('formatte les articles de prévention', function () {
        expect(myApp.formatDate('20131504')).toEqual('4 avril 2014');
    });
});