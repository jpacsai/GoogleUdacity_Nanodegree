(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
            headers: {
                Authorization: 'Client-ID ee3405648f48ea0a6bda1043547588b5f43ef4d611d5853eca705d5e8a7f60ea'
            }
        })
            .then((response) => response.json())
            .then(addImage)
            .catch(requestError(e, 'image'));

        fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=04783637e8264c5eabd5e5a7b5b3a533`
        )
            .then((response) => response.json())
            .then(addArticles)
            .catch(requestError(e, 'articles'));
    });

    function addImage(data) {
        let htmlContent = '';
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

    function addArticles(data) {
        let htmlContent = '';

        if (data.response && data.response.docs && data.response.docs.length > 1) {
            htmlContent = '<ul>' + data.response.docs.map(article => `<li class='article'>
            <h2><a href=${article.web_url}>${article.headline.main}</a></h2>
            <p>${article.snippet}</p>
        </li>`).join('') + '</ul>';
        }
        responseContainer.insertAdjacentHTML('beforeend', htmlContent);
    }

    function requestError(e, part) {
        console.log(e);
        responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
    }
})();
