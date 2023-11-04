


const leaderboardBtn = document.getElementById("leaderboardBtn");
const leaderboardContainer = document.getElementById("leaderboardContainer");
const leaderboardTable = document.getElementById("leaderboardTable1");
const exitBtn = document.getElementById("exitBtn");
const isPremium=localStorage.getItem("isPremium");

    // razorpaybtn.style.visibility="hidden";
    if(isPremium=="null"){
leaderboardBtn.style.display="none";
    }
leaderboardBtn.addEventListener("click", async () => {
    const leaderboardpost = await axios.get('http://localhost:80/premiummembership/leaderboard', {
        headers: { "Authorization": token }
    });

    console.log("leadercontent", leaderboardpost.data);

    // Clear existing table rows
    leaderboardTable.querySelector("tbody").innerHTML = "";

    // Populate the leaderboard table with data
    leaderboardpost.data.Users.forEach((user) => {
        const row = leaderboardTable.insertRow(-1);
        const idCell = row.insertCell(0);
        const nameCell = row.insertCell(1);
        const totalCostCell = row.insertCell(2);

        idCell.textContent = user.id;
        nameCell.textContent = user.name;
        totalCostCell.textContent = user.totalcost;
    });
    

    // Show the leaderboard container
    leaderboardContainer.style.display = "block";
});
exitBtn.addEventListener("click", () => {
    // Hide the leaderboard container
    leaderboardContainer.style.display = "none";
});