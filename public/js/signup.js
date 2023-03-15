document.querySelector("#signup-form").addEventListener("submit", e => {
    e.preventDefault();
    const signupObj = {
        username: document.querySelector("#signupUsername").value,
        password: document.querySelector("#signupPassword").value
    }
    console.log(signupObj)
    fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(signupObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            location.href = "/profile"
        } else {
            alert("Error with creating your account")
        }
    })
})