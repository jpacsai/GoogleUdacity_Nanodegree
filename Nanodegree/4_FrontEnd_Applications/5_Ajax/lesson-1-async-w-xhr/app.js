(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText = 'hippos';
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        imgRequest();
    });

    function addImage() {
        let htmlContent = '';
        const data = JSON.parse(this.responseText);
        const firstImage = data.results[0];

        if (data && data.results && data.results[0]) {
            htmlContent = `<figure>
                <img src=${firstImage.urls.regular} alt='${searchedForText}'>
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`;
        } else {
            htmlContent = '<div class="error-no-image">No images available</div>';
        }
        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }

    function imgRequest() {
        const unsplashRequest = new XMLHttpRequest();

        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.onload = addImage;
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID ee3405648f48ea0a6bda1043547588b5f43ef4d611d5853eca705d5e8a7f60ea');
        unsplashRequest.send();
    }

})();
