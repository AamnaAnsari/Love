let highestZ = 1;

class Paper {
  holdingPaper = false;
  rotating = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  currentPaperX = 0;
  currentPaperY = 0;
  rotation = Math.random() * 30 - 15; 

  init(paper) {
    // Mouse and Touch Move Event
    const onMove = (e) => {
      if (!this.holdingPaper) return;

      const isTouch = e.type === 'touchmove';
      const clientX = isTouch ? e.touches[0].clientX : e.clientX;
      const clientY = isTouch ? e.touches[0].clientY : e.clientY;

      const dirX = clientX - this.mouseTouchX;
      const dirY = clientY - this.mouseTouchY;

      if (this.rotating) {
      
        const angle = Math.atan2(dirY, dirX);
        this.rotation = (360 + Math.round((180 * angle) / Math.PI)) % 360;
      } else {
        // Drag functionality
        this.currentPaperX += dirX;
        this.currentPaperY += dirY;
        this.mouseTouchX = clientX;
        this.mouseTouchY = clientY;
      }

      paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
    };

    
    const onStart = (e) => {
      e.preventDefault();
      this.holdingPaper = true;

      paper.style.zIndex = ++highestZ;

      const isTouch = e.type === 'touchstart';
      this.mouseTouchX = isTouch ? e.touches[0].clientX : e.clientX;
      this.mouseTouchY = isTouch ? e.touches[0].clientY : e.clientY;

   
      if (!isTouch && e.button === 2) {
        this.rotating = true;
      }
    };

    // Mouse and Touch Up Event
    const onEnd = () => {
      this.holdingPaper = false;
      this.rotating = false;
    };

    // Add event listeners for mouse and touch
    paper.addEventListener('mousedown', onStart);
    paper.addEventListener('touchstart', onStart, { passive: false });

    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchend', onEnd);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove, { passive: false });

    // Prevent context menu on right-click for rotation
    paper.addEventListener('contextmenu', (e) => e.preventDefault());
  }
}

//////////Paper///////
const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
