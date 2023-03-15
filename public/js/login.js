document.querySelector("#login-form").addEventListener("submit", e => {
    e.preventDefault();
    const loginObj = {
        username: document.querySelector("#loginUsername").value,
        password: document.querySelector("#loginPassword").value
    }
    console.log(loginObj)
    fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(loginObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            location.href = "/profile"
        } else {
            alert("Invalid Login")
        }
    })
})