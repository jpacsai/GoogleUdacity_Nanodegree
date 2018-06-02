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
        articleRequest();
    });

    function addImage() {
        let htmlContent = '';
        let data = JSON.parse(this.responseText);
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

    function addArticles() {
        let htmlContent = '';
        let data = JSON.parse(this.responseText);
        console.log(data);

        if (data.response && data.response.docs && data.response.docs.length > 1) {
            htmlContent = '<ul>' + data.response.docs.map(article => `<li class='article'>
            <h2><a href=${article.web_url}>${article.headline.main}</a></h2>
            <p>${article.snippet}</p>
        </li>`).join('') + '</ul>';
        } else {
            htmlContent = '<div class="error-no-article">No articles available</div>';
        }
        responseContainer.insertAdjacentHTML('beforeend', htmlContent);
    }

    function articleRequest() {
        const nytimesRequest = new XMLHttpRequest();
        nytimesRequest.onload = addArticles;
        nytimesRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=04783637e8264c5eabd5e5a7b5b3a533`);
        nytimesRequest.send();
    }

})();
