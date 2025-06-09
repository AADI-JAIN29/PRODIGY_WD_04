document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message!');
    this.reset();
});

document.querySelector('.cta-button').addEventListener('click', function(e) {
    const cvPath = this.getAttribute('href');
    
    // Check if file exists
    fetch(cvPath)
        .then(response => {
            if (!response.ok) {
                e.preventDefault();
                alert('Sorry, the CV file is not available at the moment.');
            }
        })
        .catch(error => {
            e.preventDefault();
            console.error('Error:', error);
            alert('Sorry, there was an error downloading the CV.');
        });
});

document.getElementById('cv-download').addEventListener('click', function(e) {
    e.preventDefault();
    const statusElement = document.getElementById('download-status');
    const cvPath = this.getAttribute('href');
    
    // Show loading status
    statusElement.style.display = 'block';
    statusElement.textContent = 'Preparing download...';

    fetch(cvPath)
        .then(response => {
            if (response.ok) {
                statusElement.textContent = 'Starting download...';
                window.location.href = cvPath;
                setTimeout(() => {
                    statusElement.style.display = 'none';
                }, 3000);
            } else {
                throw new Error('File not found');
            }
        })
        .catch(error => {
            console.error('Download error:', error);
            statusElement.textContent = 'Sorry, CV is currently unavailable. Please try again later.';
            statusElement.style.color = '#ff4444';
        });
});