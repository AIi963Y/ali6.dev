document.addEventListener('DOMContentLoaded', () => {
  // Typing animation function
  function startTyping() {
    const text = "Ogrenmeyi seviyorum. Her fırsatı değerlendiririm. Bilgi geleceğime yatırımdır. Şu anda dünyada öğrenecek çok şey var!";
    const typedSpan = document.querySelector('.typed');
    if (!typedSpan) return;
    
    let index = 0;
    function type() {
      if (index < text.length) {
        typedSpan.textContent += text.charAt(index);
        index++;
        setTimeout(type, 80 + Math.random() * 50);
      }
    }
    
    setTimeout(type, 500);
  }


  

  // Envelope logic
  const overlay = document.getElementById('envelope-overlay');
  const swipeZone = document.getElementById('env-swipe-zone');
  const textElem = document.getElementById('env-text');
  
  if (overlay && swipeZone && textElem) {
    let isDragging = false;
    let startX = 0;
    let hasOpened = false;

    const handleStart = (e) => {
      if (hasOpened) return;
      isDragging = true;
      startX = e.clientX || (e.touches && e.touches[0].clientX);
    };

    const handleMove = (e) => {
      if (!isDragging || hasOpened) return;
      const currentX = e.clientX || (e.touches && e.touches[0].clientX);
      const diff = Math.abs(currentX - startX);
      
      // If swiped more than 80px horizontally, trigger open
      if (diff > 80) {
        hasOpened = true;
        isDragging = false;
        
        // Show welcome message
        textElem.innerHTML = "Hoş geldiniz! Sayfama hoş geldiniz";
        textElem.classList.add('opened');
        
        // Wait 1.5s to read the welcome text, then open envelope
        setTimeout(() => {
          overlay.classList.add('is-open');

          // Start the typing animation only AFTER the envelope opens
          setTimeout(() => {
            overlay.style.display = 'none';
            startTyping();
          }, 1200); // Wait for envelope split animation
        }, 1500);
      }
    };

    const handleEnd = () => {
      isDragging = false;
    };

    // Attach listeners
    swipeZone.addEventListener('mousedown', handleStart);
    swipeZone.addEventListener('touchstart', handleStart);
    
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchend', handleEnd);
  } else {
    // Fallback if no envelope
    startTyping();
  }


});