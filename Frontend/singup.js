
const btn1 = document.querySelector('.btn');
const warning = document.getElementById('warning');

btn1.addEventListener('click', () => {
    const Name = document.getElementById('Name').value;
    const Email = document.getElementById('Email').value;
    const Password = document.getElementById('Password').value;

    // Create an object to send in the POST request
    const collect = {
        Name: Name,
        Email: Email,
        Password: Password
    };

    axios.post('http://localhost:80/signup', collect)
        .then((res) => {
            if(res){
                window.location.href = './loginpage.html';
            }
            

        
        })
        .catch(err => {
            const warning = document.getElementById('warning');
            warning.innerHTML = `<p>${err.response.data.error}</p>`;
            console.log(err.response.data.error);
        });
});
