function ageChange(e) {
    const age = Number(e.target.value);
    if (age < 5) {
        document.querySelector("button").disabled = true;
        document.getElementById("errors-holder").textContent =
            "You need to be atleast 5 years old to participate";
    } else {
        document.querySelector("button").disabled = false;
        document.getElementById("errors-holder").textContent = "";
    }
}

function handleSubmit(e) {
    document.getElementById("errors-holder").textContent = "";
    e.prevent.default();
    const age = document.getElementById("q_age").value;
    if (age == 0) {
        document.getElementById("errors-holder").textContent = "Please choose age";
        return;
    }
    const check = document.getElementById("q_owns_phone").checked;
    if (check) {
        if (age < 13) {
            document.getElementById("result-holder").textContent =
                "You are too young to have a phone";
        } else {
            document.getElementById("result-holder").textContent =
                "Use your phone in moderation";
        }
    } else {
        if (age < 13) {
            document.getElementById("result-holder").textContent =
                "You will get a phone soon";
        } else {
            document.getElementById("result-holder").textContent =
                "You should get a phone";
        }
    }
}
