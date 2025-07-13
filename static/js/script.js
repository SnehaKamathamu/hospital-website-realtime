document.getElementById("feedbackForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch("/submit", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "success") {
            alert("✅ Feedback submitted!");
            this.reset();
        } else {
            alert("⚠️ " + data.message);
        }
    })
    .catch(err => {
        console.error("🚨 Error:", err);
        alert("Something went wrong!");
    });
});
