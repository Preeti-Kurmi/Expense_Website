const forgettbtn=document.getElementById('forgetpassword');
const forgetsumbit=document.getElementById('forget');
forgettbtn.addEventListener('click',function (event) {
    event.preventDefault();
    axios.post('http://localhost:80/forgetpassword')
    window.location.href = './emailform.html';
});

