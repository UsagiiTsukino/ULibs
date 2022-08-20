
 function getUserData(){
    let url = `${location.origin}/api/users`
    fetch(url)
        .then (data => data.json())
        .then (data => {
            var userInfo = [data.id, data.displayName, data.avatar_img, data.email];
            localStorage.setItem('userData', JSON.stringify(userInfo));
        })
}
    getUserData()


