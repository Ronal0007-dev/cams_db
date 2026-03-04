const labels = document.querySelectorAll(".form-control label");

function createWaveLabel(text) {
    return text
        .split("")
        .map(
            (letter, idx) =>
                `<span style="transition-delay:${idx * 50}ms">${letter}</span>`
        )
        .join("");
}

labels.forEach((label) => {
    label.innerHTML = createWaveLabel(label.innerText);
});


const myDiv = document.getElementById('notification');

// Use setTimeout to call a function after a delay
setTimeout(function() {
    // Set the element's style.display property to 'none' to hide it
    myDiv.style.display = 'none';
}, 5000); // 5000 milliseconds = 5 seconds