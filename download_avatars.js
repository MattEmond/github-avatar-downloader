var request = require('request')
var secrets = require('./secrets.js')


console.log(`Welcome to GitHub Avatar Downloader`)

// Implement function
function getRepoContributors(repoOwner, repoName, callback) {
  // Add User-Agent header in the request
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "MattEmond",
      'Authorization': secrets.GITHUB_TOKEN
    }
  }

  request(options, function(error, response, body) {

    callback(error, body)
  })
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
