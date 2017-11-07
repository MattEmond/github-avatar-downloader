var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs')

console.log(`Welcome to GitHub Avatar Downloader`);

// Implement function
function getRepoContributors(repoOwner, repoName, callback) {
  // Add User-Agent header in the request
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "MattEmond",
      'Authorization': secrets.GITHUB_TOKEN
    }
  };

  request(options, function(error, response, body) {
    if (callback) {
        callback(error, JSON.parse(body));
    }
  });
}


function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function(err) {
    console.log("We have a problem");
    throw err;
  })

  .pipe(fs.createWriteStream("./Avatars/"+filePath+".jpg"));
}

var repoOwner = process.argv[2];
var repoName = process.argv[3];

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







