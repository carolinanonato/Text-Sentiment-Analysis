
const api_url = 'https://japerk-text-processing.p.rapidapi.com/sentiment/';


const request_headers = {
    'content-type': 'application/x-www-form-urlencoded',
    'x-rapidapi-host': 'japerk-text-processing.p.rapidapi.com',
    'x-rapidapi-key': 'c94bdc0f9bmshbc7236941db8b8dp1307a5jsn3c7dc13612af'
};


const checkSentiment = () => {

    const commentElement = document.getElementById('comment');

    const comment = commentElement.value.trim();

    if (!comment) {
        return emptyComment();
    }

    return checkComment(comment, Showresults);
};

const emptyComment = () => {
    const resultArea = document.getElementById('result-area');
    resultArea.classList.add('hide');
    return alert('Please insert a comment');
};



const checkComment = (comment, callback) => {

    const data = {
        text: comment,
        language: 'english'
    };

    const newData = Qs.stringify(data);

    axios.post(api_url, newData, { headers: request_headers })
        .then(response => {
            const data = response.data;
            console.log(data)

            callback(data)
        })
        .catch(error => console.error('The API is not working', error))
};



const Showresults = solution => {

    const resultArea = document.getElementById('result-area');
    resultArea.classList.remove('hide');


    const label = solution.label;
    const resultEl = document.getElementById('solution');
    resultEl.setAttribute('class', label);
    let resultText = '';


    switch (label) {
        case 'pos':
            resultText = `This comment is <span class="positive">positive!</span>`;
            break;
        case 'neg':
            resultText = `This comment is <span class="negative">negative!</span>`;
            break;
        case 'neutral':
            resultText = `This comment is <span class="positive">neutral</span>`;
            break;
        default:
            resultText = `Unfortunately it was not possible to analyze this comment`;
    }


    resultEl.innerHTML = resultText;
};