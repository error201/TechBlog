document.querySelector("#login-form").addEventListener("submit", function(e) {
    // Prevent default behavior.
    e.preventDefault();
    const login = {
        username: document.querySelector("#username").value,
        password: document.querySelector("#password").value
    }
    fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(login),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            location.href = "/profile"
        } else {
            alert("Username or password is incorrect.")
        }
    })
});