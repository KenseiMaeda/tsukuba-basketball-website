const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('show');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

const lineModal = document.getElementById('lineModal');
const openLineBtns = document.querySelectorAll('.js-open-line');
const closeLineBtns = document.querySelectorAll('.js-close-line');
const copyLineBtn = document.querySelector('.js-copy-line');
const lineText = document.getElementById('lineText');
const copyMessage = document.getElementById('copyMessage');

function openLineModal() {
  if (!lineModal) return;

  lineModal.classList.add('show');
  lineModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeLineModal() {
  if (!lineModal) return;

  lineModal.classList.remove('show');
  lineModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

function showCopyMessage(text, isError = false) {
  if (!copyMessage) return;

  copyMessage.textContent = text;
  copyMessage.hidden = false;
  copyMessage.classList.toggle('error', isError);

  requestAnimationFrame(() => {
    copyMessage.classList.add('show');
  });

  setTimeout(() => {
    copyMessage.classList.remove('show');

    setTimeout(() => {
      copyMessage.hidden = true;
      copyMessage.classList.remove('error');
    }, 250);
  }, 2500);
}

openLineBtns.forEach(btn => {
  btn.addEventListener('click', openLineModal);
});

closeLineBtns.forEach(btn => {
  btn.addEventListener('click', closeLineModal);
});

if (lineModal) {
  lineModal.addEventListener('click', (e) => {
    if (e.target === lineModal) {
      closeLineModal();
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLineModal();
  }
});

if (copyLineBtn && lineText) {
  copyLineBtn.addEventListener('click', async () => {
    const text = lineText.value;

    try {
      await navigator.clipboard.writeText(text);
      showCopyMessage('コピーしました！LINEに貼り付けて送ってください。');
    } catch {
      lineText.select();
      showCopyMessage('コピーに失敗しました。文章を選択して手動でコピーしてください。', true);
    }
  });
}