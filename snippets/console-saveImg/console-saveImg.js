(function(console) {

    console.saveImg = function(selector, mimeType) {

        // Variables
        var mimeType = mimeType || 'image/jpeg';
        var imagesArray     = selector || document.querySelectorAll('img');
        var imagesObjArray  = [];

        // Build img data object
        for (var i = 0; i < imagesArray.length; i++) {
            if ( imagesArray[i].getAttribute('src') !== null ) {
                var imgURL   = imagesArray[i].getAttribute('src');
                var fileName = imgURL.split('/');
                fileName = fileName.pop();

                imagesObjArray.push({
                    name: fileName,
                    url: imgURL
                });
            }
        };

        // Download images from array
        for (var i = 0; i < imagesObjArray.length; i++) {
            var imgObj = imagesObjArray[i];

            var e = document.createEvent('MouseEvents')
            var a = document.createElement('a')

            a.download = imgObj.name
            a.href = imgObj.url
            a.dataset.downloadurl =  [mimeType, a.download, a.href].join(':')
            e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
            a.dispatchEvent(e)
        }
    }

})(console);