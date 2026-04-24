document.addEventListener('DOMContentLoaded', () => {
  const text = "Tesekkurler! Ozel davet icin tesekkur ederim. Hadi tanisalim!";
  const typedSpan = document.querySelector('.typed');
  const cursor = document.querySelector('.cursor');
  let index = 0;
  
  function type() {
    if (index < text.length) {
      typedSpan.textContent += text.charAt(index);
      index++;
      setTimeout(type, 80 + Math.random() * 50);
    }
  }
  
  setTimeout(type, 500);
});