let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  touchMoveX = 0;
  touchMoveY = 0;
  touchEndX = 0;
  touchEndY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    const handleMove = (x, y) => {
      const dirX = x - this.touchStartX;
      const dirY = y - this.touchStartY;

      if (this.rotating) {
        
        const angle = Math.atan2(dirY, dirX);
        this.rotation = (360 + Math.round((180 * angle) / Math.PI)) % 360;
      } else {
        // Drag logic
        this.velX = x - this.prevTouchX;
        this.velY = y - this.prevTouchY;
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;
      }

      this.prevTouchX = x;
      this.prevTouchY = y;

      paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
    };

    const handleStart = (x, y) => {
      this.holdingPaper = true;
      paper.style.zIndex = ++highestZ;

      this.touchStartX = x;
      this.touchStartY = y;
      this.prevTouchX = x;
      this.prevTouchY = y;
    };

    const handleEnd = () => {
      this.holdingPaper = false;
      this.rotating = false;
    };

    paper.addEventListener("mousedown", (e) => handleStart(e.clientX, e.clientY));
    document.addEventListener("mousemove", (e) => {
      if (this.holdingPaper) handleMove(e.clientX, e.clientY);
    });
    window.addEventListener("mouseup", handleEnd);

    // Touch events for mobile
    paper.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
    });
    paper.addEventListener("touchmove", (e) => {
      e.preventDefault(); 
      const touch = e.touches[0];
      if (this.holdingPaper) handleMove(touch.clientX, touch.clientY);
    });
    paper.addEventListener("touchend", handleEnd);

   
    paper.addEventListener("gesturestart", (e) => {
      e.preventDefault();
      this.rotating = true;
    });
    paper.addEventListener("gestureend", handleEnd);
  }
}

// Apply to all elements with the "paper" class
const papers = Array.from(document.querySelectorAll(".paper"));
papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});

// Responsive ///
const style = document.createElement("style");
style.innerHTML = `
  @media (max-width: 768px) {
    .paper {
      width: 80%;
      height: auto;
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    .paper {
      width: 100%;
      font-size: 12px;
    }
  }
`;
document.head.appendChild(style);
