(function() {
    emailjs.init("RqZ65TCmZ8EdJcuhgdDva"); // Reemplaza con tu user ID de EmailJS
  })();

  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtén los valores de los campos del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Envía el correo
    emailjs.send('service_2mee69d', 'template_jqqbudk', {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message
    }).then(function(response) {
      document.getElementById('response-message').innerText = 'Your message has been sent. Thank you!';
      document.getElementById('contact-form').reset(); // Limpia el formulario
    }, function(error) {
      document.getElementById('response-message').innerText = 'Sorry, there was an error sending your message.';
    });
  });