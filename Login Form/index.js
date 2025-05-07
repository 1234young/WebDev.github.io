const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function(event) {
    // Prevent the default form submission
    event.preventDefault();

    // In a real application, you would collect the data here
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Username/Email:', username);
    console.log('Password:', password);

    // Here you would typically send the data to a server for authentication
    // For this example, we'll just show an alert
    alert('Form submitted! (Check console for values)');

    // You could also reset the form after submission
    // loginForm.reset();
});
