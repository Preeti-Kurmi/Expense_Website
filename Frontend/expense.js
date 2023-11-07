

const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const isPremium1=localStorage.getItem("isPremium");
const token=localStorage.getItem('token');
const message=document.getElementById("message");
let flag = false;

const razorpaybtn = document.getElementById("razorpaybtn");
if(isPremium1!=null && isPremium1==true){
    razorpaybtn.style.display="none";
    


}
console.log(isPremium1!=null && isPremium1==true);



//     razorpaybtn.style.display="block";
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
    // if (flag) {
    //     axios.put(`http://localhost:7000/update/${selectedExpenseId}`, expenseEntry)
    //         .then(res => {
    //             console.log(res);
    //             fetchdata();
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });

    //     flag = false;
    //     selectedExpenseId = null;
    //     document.querySelector("button[type='submit']").textContent = "Add Expense";
    // } else {
       
    //    ,{headers:{"Authorization":token}}
   
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
// function editclick(data) {

//     document.getElementById("amount").value = data.amount;
//     document.getElementById("description").value = data.expensename;
//     document.getElementById("category").value = data.expensetype;
//     selectedExpenseId = data.id;
//     document.querySelector("button[type='submit']").textContent = "Update Expense";
//     flag = true;


// }

function displayExpense(data) {
    expenseList.innerHTML = "";
    data.forEach((data) => {
        const expenselist = document.createElement('div');
        expenselist.innerHTML = `
            <div class="card mb-2">
                <div class="card-body">
                    <span class="card-title">Expense Name:${data.description}</span>
                    <span>Expense Category:${data.category}</span>
                    <span>Rs.${data.amount}</span>
                    <button class="btn2 btn-danger delete-button" id="${data.id}">Delete Expense</button>
                   
                </div>
            </div>`;

        const deleteButton = expenselist.querySelector(".delete-button");
        deleteButton.addEventListener("click", function () {
            const id = this.getAttribute("id");
            console.log(id);
            deletedata(id);
        });

        // const editButton = expenselist.querySelector(".edit-button");
        // // <button class="btn btn-danger edit-button" id="${data.id}">Edit</button>
        // editButton.addEventListener("click", function () {            
        //     const card = this.closest(".card");
        //     card.remove();
        //     editclick(data);

        //     console.log("Edit", id);
        // });

        expenseList.appendChild(expenselist);
    });
}
function fetchdata() {
    axios.get('http://localhost:80/expenses',{headers:{"Authorization":token}})
        .then(res => {
            displayExpense(res.data);
            console.log(res.data);

        })
        .catch(err => {
            console.log(err);
        })
}
function deletedata(id) {
    console.log("Delete", id);
    //displayExpense(id);
    axios.delete(`http://localhost:80/delete/${id}`,{headers:{"Authorization":token}})
        .then(res => {
            console.log(res);
            fetchdata();
        })
        .catch(err => {
            console.log(err);

        })}

   


        document.addEventListener('DOMContentLoaded', () => {
        //     if (isPremium1) {
        //         document.getElementById('message').innerHTML = "You are a premium user";
        //         // Hide the "Activate Premium" button if the user is already a premium user
        //         razorpaybtn.style.display = "none";
        //     } else if(isPremium1=="null" && isPremium1==false){
                
        //         razorpaybtn.style.display = "block";
        //     }
            fetchdata();
        });
