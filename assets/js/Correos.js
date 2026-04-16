/**
 * EmailJS — formulario de contacto.
 *
 * IMPORTANTE (Gmail / “como si fuera él”):
 * - No es posible (ni seguro) que el “De:” sea el Gmail del visitante; el correo lo envía
 *   tu servicio conectado en EmailJS (tu cuenta o SMTP autorizado).
 * - Sí puedes lograr dos cosas útiles en Gmail:
 *   1) Nombre visible: en la plantilla EmailJS, campo “From name” o equivalente → {{from_name}}
 *      (así en la bandeja verás algo como “María Pérez” junto a tu dirección de envío).
 *   2) Responder al visitante: en la plantilla, “Reply To” / “Reply to email” → {{reply_to}}
 *      (al dar Responder en Gmail, se abre su correo, no el tuyo).
 *
 * Pasos en https://www.emailjs.com/ → Email Templates → tu plantilla:
 * - Reply to email: {{reply_to}}   (o {{from_email}}, mismo valor)
 * - Si existe “From name”: {{from_name}}
 * - Cuerpo: incluye {{from_email}} si quieres verlo siempre a la vista.
 */
(function () {
  'use strict';

  var PUBLIC_KEY = 'p-lUtC-nENAx18hCy';
  var SERVICE_ID = 'service_iuwtifr';
  var TEMPLATE_ID = 'template_jqqbudk';

  function show(el, on) {
    if (!el) return;
    if (on) el.classList.add('d-block');
    else el.classList.remove('d-block');
  }

  function init() {
    if (typeof emailjs === 'undefined') {
      console.warn('EmailJS no está cargado. Revisa el script en contact.html.');
      return;
    }

    emailjs.init(PUBLIC_KEY);

    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var loading = form.querySelector('.loading');
      var err = form.querySelector('.error-message');
      var sent = form.querySelector('.sent-message');

      show(err, false);
      err.textContent = '';
      show(sent, false);
      show(loading, true);

      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var subject = document.getElementById('subject').value.trim();
      var message = document.getElementById('message').value.trim();

      // reply_to + from_email: el visitante recibe tus respuestas al usar “Responder” en Gmail
      // from_name: úsalo en EmailJS como “nombre del remitente” visible en la bandeja
      emailjs
        .send(SERVICE_ID, TEMPLATE_ID, {
          from_name: name,
          from_email: email,
          reply_to: email,
          subject: subject,
          message: message,
          // Alias por si la plantilla usa otro nombre de variable
          user_email: email,
          reply_to_email: email
        })
        .then(function () {
          show(loading, false);
          show(sent, true);
          form.reset();
        })
        .catch(function (error) {
          show(loading, false);
          err.textContent =
            'No se pudo enviar el mensaje. Intenta de nuevo o escribe directamente a lucianoramirezgerald@gmail.com';
          show(err, true);
          console.error(error);
        });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
