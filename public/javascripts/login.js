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

//setTimeout for notification
setTimeout(() => {
  const flashMessage = document.querySelector('.alert');
  if (flashMessage) {
    flashMessage.classList.add('fade-out');
    // Remove element from DOM after transition
    setTimeout(() => flashMessage.remove(), 500); 
  }
}, 3000); // 3 seconds delay
