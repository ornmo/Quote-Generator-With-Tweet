// Getting Quote from https://type.fit/api/quotes 

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function spinnerLoading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide SpinnerLoading 
function spinnerComplete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show new quote
function newQuote() {
    spinnerLoading();
    // pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    // Check if Author is blank and replace with 'Unknown'
    if(!quote.author) {
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quote.author;
    }

    // Check Quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    spinnerComplete();
}

// Get Quotes from API
async function getQuotes() {
    spinnerLoading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        
    } catch(error) {
        // Catch error here
         getQuote();
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}


// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)


// On load
getQuotes();


// Local method is also possible see Section 3 - video 18 