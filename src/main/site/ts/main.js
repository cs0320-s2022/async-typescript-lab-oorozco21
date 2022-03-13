"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// select the list element where the suggestions should go, and all three dropdown elements
const suggestionList = document.querySelector('#suggestions');
const sun = document.querySelector('#sun');
const moon = document.querySelector('#moon');
const rising = document.querySelector('#rising');
// Here, when the value of sun is changed, we will call the method postAndUpdate.
// Do the same for moon and rising
let sunVal = sun.value;
let moonVal = moon.value;
let risingVal = rising.value;
setInterval(() => {
    if (sunVal != sun.value || moonVal != moon.value || risingVal != rising.value) {
        sunVal = sun.value;
        moonVal = moon.value;
        risingVal = rising.value;
        postAndUpdate();
    }
}, 100);
function postAndUpdate() {
    // empty the suggestionList (you want new suggestions each time someone types something new)
    suggestionList.innerHTML = "";
    // add a type annotation to make this of type MatchesRequestData
    const postParameters = {
        // get the text inside the input box
        sun: sun.value,
        moon: moon.value,
        rising: rising.value
    };
    console.log(postParameters);
    let matchData = new Array(5);
    //  make a POST request using fetch to the URL to handle this request you set in your Main.java
    //  HINT: check out the POST REQUESTS section of the lab and of the front-end guide.
    //  Make sure you add "Access-Control-Allow-Origin":"*" to your headers.
    //  Remember to add a type annotation for the response data using the Matches type you defined above!
    fetch('http://localhost:4567/results', {
        method: 'post',
        body: JSON.stringify(postParameters),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {
        for (let i = 0; i < matchData.length; i++) {
            matchData[i] = data[i.toLocaleString()].toString();
        }
        updateSuggestions(matchData);
    });
    // Call and fill in the updateSuggestions method in one of the .then statements in the Promise
    //  Parse the JSON in the response object
    //  HINT: remember to get the specific field in the JSON you want to use
}
function updateSuggestions(matches) {
    // for each element in the set of matches, append it to the suggestionList
    //  HINT: use innerHTML += to append to the suggestions list
    //  NOTE: you should use <li> (list item) tags to wrap each element. When you do so,
    //  make sure to add the attribute 'tabindex="0"' (for example: <li tabindex="0">{your element}</li>).
    //  This makes each element selectable via screen reader.
    for (let i = 0; i < matches.length; i++) {
        suggestionList.innerHTML += `<li tabindex="0">Match ${i + 1} - ${matches[i]}</li>`;
    }
}
//  create an event listener to the document (document.addEventListener) that detects "keyup".
//  When a certain key of your choice is clicked, reset the values of sun, moon, and rising to your own
//  values for the sun, moon, and rising using updateValues. Then call postAndUpdate().
//  HINT: the listener callback function should be asynchronous and wait until the values are
//  updated before calling postAndUpdate().
document.addEventListener("keyup", function (event) {
    if (event.key == 'd') {
        updateValues("Capricorn", "Virgo", "Pisces")
            .then(r => {
            postAndUpdate();
            console.log(r);
        });
    }
});
function updateValues(sunval, moonval, risingval) {
    return __awaiter(this, void 0, void 0, function* () {
        // This line asynchronously waits 1 second before updating the values.
        // It's unnecessary here, but it simulates asynchronous behavior you often have to account for.
        yield new Promise(resolve => setTimeout(resolve, 1000));
        sun.value = sunval;
        moon.value = moonval;
        rising.value = risingval;
    });
}
