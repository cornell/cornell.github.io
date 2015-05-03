(function (window) {

    var formatDate = function (date) {
        var year = date.slice(0, 4)
        var month = date.slice(4, 6)
        var day = date.slice(6, 8)
        var hour = date.slice(8, 10)
        var minute = date.slice(10, 12)
        return moment(new Date(year, month, day, hour, minute)).format('LL');
    };
    
    var getResume = function (texte) {
        return texte.slice(0, 295) + " ...";
    };    
    
    window.formatDate = formatDate;
    window.getResume = getResume;
    
})(window);