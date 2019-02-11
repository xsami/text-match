// This function check if the array is sorted by a given property
const isSortedd = function (arr, propToCompare) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1][propToCompare] > arr[i][propToCompare]) {
            return false;
        }
    }
    return true;
}

// This function sort the array by  given property
const sortByProperty = function (wordsToMatch, propToCompare) {
    wordsToMatch.sort((a, b) => a[propToCompare] > b[propToCompare]);
    return wordsToMatch;
}

// This is an implemetation of the algorithm binary search
// For more reference: https://www.geeksforgeeks.org/binary-search/
const findWord = function (word, wordsToMatch, config) {

    let left = 0;
    let rigth = wordsToMatch.length - 1;
    let mid;
    let currentWord;
    const originalWord = word;
    
    if (config.ignoreCase) {
        word = word.toLowerCase()
    }

    while (left <= rigth) {

        mid = Math.floor(left + (rigth - left) / 2);
        currentWord = wordsToMatch[mid].value;

        if (config.ignoreCase) {
            currentWord = currentWord.toLowerCase();
        }

        if (currentWord === word) {
            return {
                value: originalWord,
                color: wordsToMatch[mid].color,
                occurrences: ++wordsToMatch[mid].occurrences
            };
        }
        if (currentWord < word) {
            left = mid + 1;
        } else {
            rigth = mid - 1;
        }
    }

    return {
        value: '',
        color: '',
        occurrences: 0
    };
}

/**
 * This function convert a text into a new text with highligted tag element.
 * 
 * IMPORTAT: beware thatyou're not removing html tags inserted so any attack of
 * XSS Injection could break the page.
 * 
 * @param {string} text | The input text introduced by the user
 * @param {array<WordMatching>} wordsToMatch | the configuration object for the words that need to match
 * @param {array<{ignoreCase}>} config | ignoreCase object implementation
 */
const getNewText = function (text = '', wordsToMatch = [], config = { ignoreCase: true}) {

    const result = [];
    let dummyContainer = {
        value: '',
        color: '',
        occurrences: 0
    };
    const wordList = text.split(' '); // Split the text (string) into an array of word

    // Check if wordsToMatch is sorted, if not then sort
    if (!isSortedd(wordsToMatch, 'value')) {
        sortByProperty(wordsToMatch, 'value');
    }

    for (let i = 0; i < wordList.length; i++) {
        dummyContainer = findWord(wordList[i], wordsToMatch, config);
        // If could found the word in the array then insert the element as a span with the config color
        if (dummyContainer.value !== '') {
            result.push(
                `<span style='background-color: ${dummyContainer.color}'>${dummyContainer.value}</span>`
            );
        } else {
            result.push(wordList[i]);
        }

    }

    return result.join(' ').trim();
}

// Structure Definition for wordsToMatch
// function WordMatching(value, color, occurrences) {
//     this.value = value; // Word to exclude, ex: Problema
//     this.color = color; // Hexadecimal code, ex: #fff
//     this.occurrences = occurrences; // Starts with 0 and add 1 everytime find a word
// }

export default getNewText;
