
 function getUserData(){
    let url = `${location.origin}/api/users`
    fetch(url)
        .then (data => data.json())
        .then (data => {
            var userInfo = [data.id, data.displayName, data.photos[0].value, data.emails[0].value];
            localStorage.setItem('userData', JSON.stringify(userInfo));
        })
}
    getUserData()


