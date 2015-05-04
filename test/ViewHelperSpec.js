describe('Helper pour les données json', function () {
    it('formatte la date', function () {
        expect(myApp.formatDate('20131504')).toEqual('4 avril 2014');
    });
});