var request = require('request');
require('dotenv').config()
// var secrets = require('./secrets.js');
var fs = require('fs')

console.log(`Welcome to GitHub Avatar Downloader`);

// Implement function
function getRepoContributors(repoOwner, repoName, callback) {
  // Add User-Agent header in the request.  Gives the URL of where to look + my GitHub name and token (which is in a different file).
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": process.env.DB_USER,
      'Authorization': process.env.DB_TOKEN
    }
  };
  //  Request function to check if there is any info being bassed to the callbacl.  If there is, we need to parse the body being returned.
  request(options, function(error, response, body) {
    if (callback) {
        callback(error, JSON.parse(body));
    }
  });
}


function downloadImageByURL(url, filePath) {
  // Request to pull the source URL.
  request.get(url)
  .on('error', function(err) {
    console.log("We have a problem");
    throw err;
  })
  //  Write images to new folder
  .pipe(fs.createWriteStream("./Avatars/"+filePath+".jpg"));
}

var repoOwner = process.argv[2];
var repoName = process.argv[3];


//  Callback function  used to provide info on what is being downloaded.
function repoCallback(err, result) {
  if (err) {
    console.log(`We have an error`);
  }
  result.forEach(function(contributor) {
    console.log('-------------');
    console.log("Avatar Name:", contributor.login);
    console.log("Avatar URL:", contributor.avatar_url);
    downloadImageByURL(contributor.avatar_url, contributor.login);
  });
}


getRepoContributors(repoOwner, repoName, repoCallback);







