var request = require('request');
var secrets = require('./secrets.js');


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
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
    if (callback) {
        callback(error, JSON.parse(body));
    }
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  if (err) {
    console.log(`We have an error`);
  }
  result.forEach(function(contributor) {
    console.log('-------------');
    console.log("Avatar Name:", contributor.login);
    console.log("Avatar URL:", contributor.avatar_url);
  });

});
