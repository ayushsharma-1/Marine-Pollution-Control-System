var animateButton = function (e) {

  e.preventDefault;
  e.target.classList.remove('animate');
  e.target.classList.add('animate');
  setTimeout(function () {
    e.target.classList.remove('animate');
  }, 700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener('click', animateButton, false);
}



function moveToNext(currentInput) {
  const maxLength = parseInt(currentInput.getAttribute('maxlength'));
  const currentLength = currentInput.value.length;

  if (currentLength === maxLength) {
      const nextInput = currentInput.nextElementSibling;
      if (nextInput) {
          nextInput.focus();
      }
  }
}