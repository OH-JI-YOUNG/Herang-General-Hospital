function random(low, high) {
    return Math.random() * (high - low) + low;
  }
  
  class Visual {
    constructor() {
      this.canvas = document.querySelector('#canvas');
      this.context = this.canvas.getContext('2d');
      this.canvasWidth = 0;
      this.canvasHeight = 0;
      this.particleLength = 150;
      this.particles = [];
      this.particleMaxRadius = 8;
  
      this.handleMouseMoveBind = this.handleMouseMove.bind(this);
      this.handleClickBind = this.handleClick.bind(this);
      this.handleResizeBind = this.handleResize.bind(this);
  
      this.initialize();
      this.render();
    }
  
    initialize() {
      this.resizeCanvas();
      for (let i = 0; i < this.particleLength; i++) {
        this.particles.push(this.createParticle(i));
      }
      this.bind();
    }
  
    bind() {
      document.body.addEventListener('mousemove', this.handleMouseMoveBind, false);
      document.body.addEventListener('click', this.handleClickBind, false);
      window.addEventListener('resize', this.handleResizeBind, false);
    }
    
    unbind() {
      document.body.removeEventListener('mousemove', this.handleMouseMoveBind, false);
      document.body.removeEventListener('click', this.handleClickBind, false);
      window.removeEventListener('resize', this.handleResizeBind, false);
    }
    handleMouseMove(e) {
      const rect = this.canvas.getBoundingClientRect(); // 캔버스의 위치와 크기 정보 가져오기
      const hoverRadius = 100; // 호버 반경
      const hoverX = e.clientX - rect.left; // 캔버스 내 마우스의 X 좌표
      const hoverY = e.clientY - rect.top; // 캔버스 내 마우스의 Y 좌표
    
      this.particles.forEach(particle => {
          const distance = Math.hypot(particle.x - hoverX, particle.y - hoverY);
            
          if (distance <= hoverRadius) {
              const scaling = (hoverRadius - distance) / 1.5;
              TweenMax.to(particle, 0.5, {
                  radius: particle.defaultRadius + scaling,
                  ease: Power2.easeOut
              });
          } else {
              TweenMax.to(particle, 0.5, {
                  radius: particle.defaultRadius,
                  ease: Power2.easeOut
              });
          }
      });
  }
  
    handleClick(e) {
      this.burstParticle(e.clientX, e.clientY);
    }
  
    handleResize() {
      this.resizeCanvas();
    }
  
    resizeCanvas() {
      this.canvasWidth = this.canvas.clientWidth; // 현재 캔버스 요소의 너비
      this.canvasHeight = this.canvas.clientHeight; // 현재 캔버스 요소의 높이
      const dpr = window.devicePixelRatio || 1; // 디바이스 픽셀 비율 가져오기
      this.canvas.width = this.canvasWidth * dpr;
      this.canvas.height = this.canvasHeight * dpr;
      this.context.scale(dpr, dpr); // 캔버스 컨텍스트에도 스케일 적용
  }
      
    createParticle(id, isRecreate) {
      const radius = random(1, this.particleMaxRadius);
      const x = isRecreate ? -radius - random(0, this.canvasWidth) : random(0, this.canvasWidth);
      let y = random(this.canvasHeight / 2 - 150, this.canvasHeight / 2 + 150);
      y += random(-100, 100);
      const alpha = random(0.05, 1);
  
      return {
        id: id,
        x: x,
        y: y,
        startY: y,
        radius: radius,
        defaultRadius: radius,
        startAngle: 0,
        endAngle: Math.PI * 2,
        alpha: alpha,
        color: { r: random(0, 100), g: random(0, 100), b: 255 },
        speed: alpha + 1,
        amplitude: random(50, 200),
        isBurst: false
      };
    }
  
    drawParticles() {
      this.particles.forEach(particle => {
        // 位置情報更新
        this.moveParticle(particle);
  
        // particle描画
        this.context.beginPath();
        this.context.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.alpha})`;
        this.context.arc(particle.x, particle.y, particle.radius, particle.startAngle, particle.endAngle);
        this.context.fill();
      });
    }
  
    moveParticle(particle) {
      particle.x += particle.speed;
      particle.y = particle.startY + particle.amplitude * Math.sin(((particle.x / 5) * Math.PI) / 180);
    }
  
    enlargeParticle(clientX, clientY) {
      this.particles.forEach(particle => {
        if (particle.isBurst) return;
  
        const distance = Math.hypot(particle.x - clientX, particle.y - clientY);
  
        if (distance <= 100) {
          const scaling = (100 - distance) / 1.5;
          TweenMax.to(particle, 0.5, {
            radius: particle.defaultRadius + scaling,
            ease: Power2.easeOut
          });
        } else {
          TweenMax.to(particle, 0.5, {
            radius: particle.defaultRadius,
            ease: Power2.easeOut
          });
        }
      });
    }
  
    burstParticle(clientX, clientY) {
      this.particles.forEach(particle => {
        const distance = Math.hypot(particle.x - clientX, particle.y - clientY);
  
        if (distance <= 100) {
          particle.isBurst = true;
          TweenMax.to(particle, 0.5, {
            radius: particle.defaultRadius + 200,
            alpha: 0,
            ease: Power2.easeOut,
            onComplete: () => {
              this.particles[particle.id] = this.createParticle(particle.id, true);
            }
          });
        }
      });
    }
  
    render() {
      // canvas初期化
      this.context.clearRect(0, 0, this.canvasWidth + this.particleMaxRadius * 2, this.canvasHeight);
  
      // particleを描画
      this.drawParticles();
  
      // 画面から消えたら新しいparticleに差し替え
      this.particles.forEach(particle => {
        if (particle.x - particle.radius >= this.canvasWidth) {
          this.particles[particle.id] = this.createParticle(particle.id, true);
        }
      });
  
      requestAnimationFrame(this.render.bind(this));
    }
  }
  
  new Visual();



$(function(){
    /*.gnb>li에 마우스를 올리면 내가 마우스를 올린 li 안에 있는 .sub가 슬라이드되어 내려온다.
    .gnb>li에서 마우스가 나가면 내가 마우스를 내린 li 안에 있는 .sub가 슬라이드되어 올라간다.
    */
   $(".gnb>li").mouseenter(function(){
    $(this).children(".sub").stop().slideDown();
   });
   $(".gnb>li").mouseleave(function(){
    $(this).children(".sub").stop().slideUp();
   });
  });

  