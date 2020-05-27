function getData(mypath = '') {

    let user = netlifyIdentity.currentUser()
    console.log(user)
    let token = user.token.access_token

    var url = "/.netlify/git/github/contents/" + mypath;
    var bearer = 'Bearer ' + token;
    return fetch(url, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            }
        }).then(resp => {
            return resp.json();
        }).then(data => {

            if (data.code == 200) {

                netlifyIdentity.refresh().then(function(token) {
                    getData(mypath);
                })

            } else {
                return data
            }
        })
        .catch(error => {
            return error
        });

}

function saveData(mypath, data) {

    getData(mypath).then(function(curfile) {

        let user = netlifyIdentity.currentUser()
        let token = user.token.access_token

        let opts = {
            path: mypath,
            message: "initial commit",
            content: btoa(data),
            branch: "master",
            committer: { name: "Dashpilot", email: "support@dashpilot.com" },
        }

        if (typeof curfile !== 'undefined') {
            opts.sha = curfile.sha
        }

        var url = "/.netlify/git/github/contents/" + mypath;
        var bearer = 'Bearer ' + token;
        fetch(url, {
                body: JSON.stringify(opts),
                method: 'PUT',
                withCredentials: true,
                credentials: 'include',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                }
            }).then(resp => {
                return resp.json();
            }).then(data => {
                console.log(data)
            })
            .catch(error => this.setState({
                message: 'Error: ' + error
            }));

    });

}