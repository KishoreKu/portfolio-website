import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      connections: number;
    }> = [];

    const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
    const connectionDistance = 150;
    const mouseRadius = 200;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        connections: 0,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        // Mouse attraction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < mouseRadius) {
          const force = (mouseRadius - dist) / mouseRadius;
          particle.vx += (dx / dist) * force * 0.02;
          particle.vy += (dy / dist) * force * 0.02;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Boundary wrap
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#c5fb67';
        ctx.fill();

        // Draw connections
        particle.connections = 0;
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const cdx = particle.x - other.x;
          const cdy = particle.y - other.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < connectionDistance && particle.connections < 3) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(197, 251, 103, ${0.2 * (1 - cdist / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            particle.connections++;
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        const chars = titleRef.current.textContent?.split('') || [];
        titleRef.current.innerHTML = chars
          .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
          .join('');

        gsap.fromTo(
          titleRef.current.querySelectorAll('span'),
          { 
            rotateX: 90, 
            opacity: 0,
            y: 50 
          },
          {
            rotateX: 0,
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.03,
            delay: 0.3,
            ease: 'expo.out',
          }
        );
      }

      // Subtitle decoder effect
      if (subtitleRef.current) {
        const finalText = subtitleRef.current.textContent || '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let iteration = 0;
        
        gsap.delayedCall(1.0, () => {
          const interval = setInterval(() => {
            if (subtitleRef.current) {
              subtitleRef.current.textContent = finalText
                .split('')
                .map((char, index) => {
                  if (char === ' ') return ' ';
                  if (index < iteration) return finalText[index];
                  return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
              
              iteration += 1 / 2;
              if (iteration >= finalText.length) {
                clearInterval(interval);
                subtitleRef.current.textContent = finalText;
              }
            }
          }, 30);
        });
      }

      // Description fade in
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.8, ease: 'expo.out' }
      );

      // Scroll indicator
      gsap.fromTo(
        '.scroll-indicator',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 2.2, ease: 'expo.out' }
      );

      // Scroll-based parallax
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (titleRef.current) {
            gsap.to(titleRef.current, {
              y: -self.progress * 200,
              letterSpacing: `${self.progress * 30}px`,
              duration: 0.1,
            });
          }
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Content */}
      <div className="relative z-10 text-center section-padding">
        <h1
          ref={titleRef}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-wider mb-6"
          style={{ perspective: '1000px' }}
        >
          KISHORE ALAJANGI
        </h1>
        
        <p
          ref={subtitleRef}
          className="font-mono text-lg sm:text-xl md:text-2xl text-lime mb-4 tracking-widest"
        >
          SENIOR GENAI & PLATFORM ENGINEER
        </p>
        
        <p
          ref={descRef}
          className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto"
        >
          Palantir Foundry Specialist | UI/UX Designer
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-2 text-gray-500 hover:text-lime transition-colors"
        >
          <span className="text-xs font-mono tracking-wider">SCROLL</span>
          <ChevronDown className="animate-bounce" size={20} />
        </a>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent z-10 pointer-events-none" />
    </section>
  );
}
