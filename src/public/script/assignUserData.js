jQuery(document).ready(($) =>{
    let userData = []
    let storage = localStorage.getItem('userData')
    userData = JSON.parse(storage)
    
    $('.display-name_header').text(`${userData[1]}`)
    $('.user-text-header').text(`${userData[1]}`)
    $('.account-avatar_header > img').attr('src',`${userData[2]}`)

});