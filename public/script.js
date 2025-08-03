//Login Script
function login() {
      const code = document.getElementById('internName').value.trim();
      if (!code) return alert("Enter your name");

      fetch(`https://intern-portal-nt46.onrender.com/api/interns/${code}`)
        .then(res => {
          if (!res.ok) throw new Error("Intern not found");
          return res.json();
        })
        .then(data => {
          sessionStorage.setItem("internName", data.internName);
          window.location.href = "dashboard.html";
        })
        .catch(err => alert(err.message));
    }
    // End Login Script

//signup script
  function signup() {
      const internName = document.getElementById('signupName').value.trim();
      const referralCode = document.getElementById('signupCode').value.trim();

      if (!internName || !referralCode) {
        alert("Please fill all fields");
        return;
      }

      fetch("https://intern-portal-nt46.onrender.com/api/interns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ internName, referralCode })
      })
      .then(res => {
        if (!res.ok) throw new Error(" Name already exists");
        return res.json();
      })
      .then(data => {
        // Store internName in sessionStorage 
        sessionStorage.setItem("internName", data.internName);
        window.location.href = "dashboard.html";
      })
      .catch(err => alert(err.message));
    }
//end signup script

//Dashboard Script
const internName = sessionStorage.getItem("internName");
    // Load intern details
    fetch(`https://intern-portal-nt46.onrender.com/api/interns/${internName}`)
      .then(res => res.json())
      .then(data => {
        document.getElementById("internName").textContent = data.internName;
        document.getElementById("referralCode").textContent = data.referralCode;
        document.getElementById("donationAmount").textContent = data.amountRaised;
      });

    // Load leaderboard
   fetch('https://intern-portal-nt46.onrender.com/api/interns/top')
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector("#leaderboardTable tbody");
    tbody.innerHTML="";
    data.forEach((intern, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${intern.internName}</td>
        <td>${intern.referralCode}</td>
        <td>₹${intern.amountRaised}</td>
      `;
      tbody.appendChild(row);
    });
  });
  
//end Dashboard Script

