document.querySelector("#login-form").addEventListener("submit", e => {
    // Prevent default behavior.
    e.preventDefault();
    const loginObj = {
        username: document.querySelector("#username").value,
        password: document.querySelector("#password").value
    }
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
});