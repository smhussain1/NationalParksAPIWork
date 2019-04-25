/*
Requirements:
The user must be able to search for parks in one or more states.
The user must be able to set the max number of results, with a default of 10.
The search must trigger a call to NPS's API.
The parks in the given state must be displayed on the page. Include at least:
    Full name
    Description
    Website URL
The user must be able to make multiple searches and see only the results for the current search.
As a stretch goal, try adding the park's address to the results.
*/

//const startUrl = 'https://';
//const extentionUrl = '@developer.nps.gov/api/v1/parks';
//    console.log(key);


'use strict';

const key = "ha8eO1B6b3yBeBy0HIzbrkdkusBUYTI3Hb0Xmsse";
const baseUrl = 'https://developer.nps.gov/api/v1/parks';

function userSearch() {
    // grabs the name of the park(s) in the state that the user wants to see
    $('.entry-form').submit(function(event) {  
        event.preventDefault();
        let state = $("#state-entry").val();
        let maxResults = $('#input-max-results').val();
        maxResults = parseInt(maxResults, 10);
        console.log(typeof maxResults);
        console.log(state, maxResults);
        callApi(state, key, maxResults);
        }
      )

}

function callApi(state, key, maxResults) {
    // exeuctes call to the API and gets the data
    //first submit API:
    // let searchUrl = startUrl + key + extentionUrl + "?" + stateCode;
    // console.log(searchUrl);
    let stateCode = "stateCode=" + state;
    let apiKey = "api_key=" + key;
    let searchUrl = baseUrl + "?" + stateCode + "&" + apiKey;
    fetch(searchUrl)
        .then(response=>{
            //console.log(response)
          if (response.ok) {
              //console.log(response.ok);
              //console.log(response.json());
            return response.json(); // not getting past here
          }
            //console.log('throwing an error');
            throw new Error(response.statusText);
        }) 
        .then(responseJson =>
          displayResults(responseJson, maxResults)) 
        //.catch(error=>alert('Sorry - that State Park was not found!', error));
}
 
function displayResults(responseJson, maxResults) {
    // displays final results to users, after clearing out previous results
    // displays Full Name of Park, Description, URL and Address
    // handles any errors with search
            $('.display-results').empty();
            console.log('test');
            let newHTML = " ";
            console.log(responseJson.data.length);
            console.log(maxResults);
            for(let i=0; i<responseJson.data.length & i < maxResults; i++) { // do i need to iterate thru 'reponseJson.data?
            console.log('testing loop');
            newHTML +=
              `<div class="display-resultsJson"> 
              <P>${responseJson.data[i].fullName}</p>
              <p>${responseJson.data[i].description}</P>
              <a href='${responseJson.data[i].url}'>Website</a>     
              </div> 
              `;
            }
            //console.log(responseJson[i].data[i]);
            if (newHTML == " ") {
                alert('This State has no Parks');
            } else {
            $('.display-results').html(newHTML);
            $('.parks-results').removeClass('hidden');
            }
            // console.log(newHTML);
}

$(function() {
    console.log('App loaded! Waiting for submit!');
    userSearch();
  }
);