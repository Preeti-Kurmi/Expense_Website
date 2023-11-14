const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const isPremium1=localStorage.getItem("isPremium");
const token=localStorage.getItem('token');
const message=document.getElementById("message");
const expensesPerPage=document.getElementById("expensesPerPage");

let flag = false;
console.log("isperemium",isPremium1);

function showpremiumm() {
    const rbtn=  document.getElementById('razorpaybtn');
      document.getElementById('message').innerHTML = "You are a premium user";
      // Hide the "Activate Premium" button if the user is already a premium user
      rbtn.style.display = "none";
  } 
const razorpaybtn = document.getElementById("razorpaybtn");
//    razorpaybtn.style.display="block";
razorpaybtn.onclick=async function(e){
    
    console.log("I am razor");
    const response=await axios.get('http://localhost:80/premiummembership',{headers:{"Authorization":token}});
    var options={
        "key":response.data.key_id,
        "order_id":response.data.result.id,
        "handler": async function(response){
            await axios.post('http://localhost:80/updatepurchase',{
                order_id:options.order_id,
                paymentid_id:response.razorpay_payment_id,}
                ,{headers:{"Authorization":token}
            })
            
            alert('you are premiumuser')
            localStorage.setItem("isPremium",true);
            
            showpremiumm();
        }
        
    }
    const razorpay=new Razorpay(options);
    razorpay.open();
    e.preventDefault();
    razorpay.on('payment.failed',async()=>{
        await axios.post('http://localhost:80/updatepurchase',{
            order_id:response.data.result.id,
            paymentid_id:null}
            ,{headers:{"Authorization":token}}
    )

    });
    


}
expenseForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const amount = parseFloat(document.getElementById("amount").value);
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const expenseEntry = {
        amount, description, category
    }
        axios.post('http://localhost:80/add-expense',expenseEntry,{headers:{"Authorization":token}} )
            .then(res => {
                console.log(res);
                fetchdata();
            })
            .catch(err => {
                console.log(err);
            });
    

    expenseForm.reset();
});
function displayExpense(data) {
    expenseList.innerHTML = "";
    data.forEach((data) => {
        const expenselist = document.createElement('div');
        expenselist.innerHTML = `
            <div class="card mb-2">
                <div class="card-body">
                    <span class="card-title">Expense Name:&nbsp;${data.description}</span>&nbsp;&nbsp;&nbsp;
                    <span>Expense Category:&nbsp;${data.category}</span>&nbsp;&nbsp;&nbsp;
                    <span>&nbsp;Rs.${data.amount}</span>&nbsp;&nbsp;&nbsp;
                    <button class="btn2 btn-danger delete-button" id="${data.id}">Delete</button>
                   
                </div>
            </div>`;

        const deleteButton = expenselist.querySelector(".delete-button");
        deleteButton.addEventListener("click", function () {
            const id = this.getAttribute("id");
            console.log(id);
            deletedata(id);
        });
        expenseList.appendChild(expenselist);
    });
}
function fetchdata(page) {
    //limit=5;
    const limit=getexpensepages();
    //console.log("given limit",limit)
    
    axios.get(`http://localhost:80/expenses?page=${page}&limit=${limit}`,{headers:{"Authorization":token}})
        .then(res => {
            
            const a=res.data.expense;
            const total=res.data.total;
            showpagination(total)
            
           displayExpense(a);
         
        })
        .catch(err => {
            console.log(err);
        })
}
function deletedata(id) {
    console.log("Delete", id);
    axios.delete(`http://localhost:80/delete/${id}`,{headers:{"Authorization":token}})
        .then(res => {
            console.log(res);
            fetchdata();
        })
        .catch(err => {
            console.log(err);

        })}
        async function download(){

            axios.get('http://localhost:80/downloads',{headers:{"Authorization":token}})
            .then(res => {
                console.log(res);
                console.log(res.data);
                if(res.status=200){
                    const a =document.createElement('a');
                    a.href=res.data;
                    a.click();
                }
              
            })
            .catch(err => {
                console.log(err);
    
            })
        }
        function showpagination(total){
            const totalPages = Math.ceil(total / 5);
            const pagination = document.getElementById('pagination');
            pagination.innerHTML = '';
        
            for (let i = 1; i <= totalPages; i++) {
                const btn = document.createElement('button');
                btn.innerHTML = i;
                btn.addEventListener('click', () => fetchdata(i));
                pagination.appendChild(btn);
            }
          

        }
        function expensepages(){
            const expenseperpagevalue=expensesPerPage.value;
            localStorage.setItem("pagesize",expenseperpagevalue);
            fetchdata();

        }
        function getexpensepages(){
            const pagestoredvalue=localStorage.getItem("pagesize");
            return pagestoredvalue || "5";
        }

            



        
        //pa
       

        document.addEventListener('DOMContentLoaded', () => {
           
        if( isPremium1=="true"){
            showpremiumm();}

            fetchdata();
        });
    