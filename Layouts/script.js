document.getElementById('addCircleBtn').addEventListener('click', function() {
    const rightSection = document.querySelector('.right');
    const newCircle = document.createElement('div');
    newCircle.classList.add('circle');
    
    // Calculate width of section 1 and 2 combined
    const section1 = document.getElementById('box1');
    const section2 = document.getElementById('box2');
    const combinedWidth = section1.offsetWidth + section2.offsetWidth;
    
    // Set the width of the new circle based on the combined width
    newCircle.style.width = `${combinedWidth}px`;
    
    // Optionally add a number to the circle
    newCircle.innerHTML = rightSection.children.length + 1;
    
    // Append the new circle to the right section
    rightSection.appendChild(newCircle);
});
