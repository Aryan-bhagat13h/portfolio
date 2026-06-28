/**
 * showPage — hides all .page divs, shows the target one,
 * and updates the active state on the nav buttons.
 *
 * @param {string} id     
 * @param {HTMLElement} [btn] 
 */
function showPage(id, btn) {

  document.querySelectorAll('.page').forEach(function (page) {
    page.classList.remove('active');
  });

  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
  }

  if (btn) {
    document.querySelectorAll('.nav-toggle .nav-button').forEach(function (b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const images = [
    { src: "project2.jpeg",  alt: "Project 2" },
    { src: "project3.jpeg",  alt: "Project 3" },
    { src: "project4.jpeg",  alt: "Project 4" },
    { src: "project5.jpeg",  alt: "Project 5" },
    { src: "project6.jpeg",  alt: "Project 6" },
    { src: "project7.jpeg",  alt: "Project 7" },
    { src: "project8.jpeg",  alt: "Project 8" },
    { src: "project10.jpeg", alt: "Project 10" },
    { src: "project11.jpeg", alt: "Project 11" }
  ];

  const overlay   = document.getElementById("lightbox");
  const modal     = document.getElementById("lightbox-modal");
  const track     = document.getElementById("lightbox-track");
  const dotsWrap  = document.getElementById("lightbox-dots");
  const closeBtn  = document.getElementById("lightbox-close");
  const prevBtn   = document.getElementById("prev-btn");
  const nextBtn   = document.getElementById("next-btn");

  let current = 0;

  images.forEach((img, i) => {
    const el = document.createElement("img");
    el.src = img.src;
    el.alt = img.alt;
    track.appendChild(el);

    const dot = document.createElement("span");
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(index) {
    current = (index + images.length) % images.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    document.querySelectorAll(".lightbox-dots span").forEach((d, i) =>
      d.classList.toggle("active", i === current)
    );
  }

  function openLightbox(index) {
    overlay.classList.add("active");
    goTo(index);
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

 document.querySelectorAll(".project-container img").forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
});

  overlay.addEventListener("click", (e) => {
    if (!modal.contains(e.target)) closeLightbox();
  });

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click",  () => goTo(current - 1));
  nextBtn.addEventListener("click",  () => goTo(current + 1));

  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("active")) return;
    if (e.key === "Escape")     closeLightbox();
    if (e.key === "ArrowLeft")  goTo(current - 1);
    if (e.key === "ArrowRight") goTo(current + 1);
  });

async function send(event) {
  event.preventDefault();
  const btn = event.target.querySelector('.send-message-button');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const res = await fetch("http://localhost:3000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name:    document.getElementById("name").value,
        email:   document.getElementById("email").value,
        message: document.getElementById("message").value,
        topic:   document.getElementById("topic").value
      }),
    });

    const data = await res.json();
    btn.textContent = data.success ? '✅ Sent!' : '❌ Failed';
    if (data.success) event.target.reset();
  } catch (err) {
    btn.textContent = '❌ Error — try again';
    console.error(err);
  } finally {
    setTimeout(() => { btn.textContent = 'Send Message'; btn.disabled = false; }, 3000);
  }
}

// Get elements
const viewProjectButton = document.querySelector('.view-project-button');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.querySelector('.modal-close');

// Open modal
viewProjectButton.addEventListener('click', () => {
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
});

// Close modal when clicking the close button
modalClose.addEventListener('click', () => {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
});

// Close modal when clicking outside (on the overlay)
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Optional: Close with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.view-work-button').addEventListener('click', () => {
    document.getElementById('selected-work').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});