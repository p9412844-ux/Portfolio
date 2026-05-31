document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");
    const submitBtn = document.getElementById("submitBtn");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Page ko reload hone se rokega

            // Button ko disable karna taaki user baar baar click na kare
            submitBtn.disabled = true;
            submitBtn.innerText = "Sending...";
            status.style.color = "#f3a30f";
            status.innerText = "Apka message bheja ja raha hai...";

            // Form ka data jama karna
            const formData = new FormData(form);

            // Backend API (Formspree) ko data bhejna
            fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Success Message
                    status.style.color = "#2ecc71"; // Green color
                    status.innerText = "Shukriya! Aapka message kamyabi se bhej diya gaya hai.";
                    form.reset(); // Form ke inputs khali karne ke liye
                } else {
                    // Server Error
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            status.innerText = data.errors.map(error => error.message).join(", ");
                        } else {
                            status.innerText = "Oops! Koi masla hua hai, dobara koshish karein.";
                        }
                    });
                }
            })
            .catch(error => {
                // Network Error
                status.style.color = "#e74c3c"; // Red color
                status.innerText = "Internet ka masla hai. Koshish karein ke aapka net chal raha ho.";
            })
            .finally(() => {
                // Button ko dobara normal karna
                submitBtn.disabled = false;
                submitBtn.innerText = "Send Message";
            });
        });
    }
});