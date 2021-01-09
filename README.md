# Netlify Identity and Git Gateway

Example of how to use Netlify Identity and Git Gateway to save files to Github

## About

Netlify's Git Gateway gives your site's Netlify Identity users access to your connected Github Repo. This allows applications to read from and write files to the repo on your user's behalf. This is perfect for creating a small CMS to power a SPA or Static Site Generator, just like Netlify did with Netlify CMS. This example uses a Github Repo, but I'm sure it can be adjusted to work with Gitlab.

## How to set up?

1. Include the Netlify Identity Widget and Github.js in your project
1. Connect your Github repo to Netlify
1. Enable Netlify Identity for your site (https://app.netlify.com/sites/git-gateway/identity)
1. Enable Git Gateway and generate access token (https://app.netlify.com/sites/git-gateway/settings/identity#services)
1. Done! If you log in with the Netlify Identity Widget, your logged in user will have access to the Github Repo

## Functions

The example consists of two functions:

### getData(path='')

If no parameter is provided, this function lists the contents of the repo. If you provide a path, it lists the contents of that one file.

```
getData('README.md').then(function(result) {
    console.log(result.content)
});
```

### saveData(path, data);

Saves the data to the provided path. If the file already exists, it overwrites it, else it creates a new file.

## Press the :star: button
Don't forget to press the :star: button to let me know I should continue improving this project
