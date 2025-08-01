const nav = document.querySelector('nav');

window.addEventListener('scroll', function () {
  if (window.scrollY >= 50) {
    nav.classList.add('scroll');
    document.querySelector('.r_2').classList.add('visually-hidden');
    document.querySelector('.r_3').classList.remove('visually-hidden');
  } else {
    nav.classList.remove('scroll');
    document.querySelector('.r_2').classList.remove('visually-hidden');
    document.querySelector('.r_3').classList.add('visually-hidden');
  }
});
const url = '/raz-auto/assets/php/mail.php';
var modal = new bootstrap.Modal(document.getElementById('modal'));
const form = document.querySelector('#form-mail');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  sendMail();
});

async function sendMail() {
  const data = {
    nom: document.getElementById('nom').value,
    prenom: document.getElementById('prenom').value,
    tel: document.getElementById('tel').value,
    type: document.getElementById('type').value,
    message: document.getElementById('message').value
  };
  const bodyModal = document.querySelector('.modal-body');
  bodyModal.innerHTML = '';
  const p = document.createElement('p');
  p.classList.add('h3');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      p.textContent = 'Le message a été envoyé';
      p.classList.add('text-success');
    } else {
      p.textContent = "Le message n'a pas été envoyé";
      p.classList.add('text-danger');
    }
    bodyModal.append(p);
    modal.show();
  } catch (error) {
    p.textContent = 'Erreur de connexion au serveur';
    p.classList.add('text-danger');
    bodyModal.append(p);
    modal.show();
  }
}
