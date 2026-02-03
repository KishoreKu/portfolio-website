import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '4', label: 'Top Companies' },
  { value: 'GenAI', label: 'Expert' },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image 3D flip reveal
      gsap.fromTo(
        imageRef.current,
        { rotateY: 90, opacity: 0 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Heading slide and mask
      gsap.fromTo(
        headingRef.current,
        { x: -100, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
        {
          x: 0,
          opacity: 1,
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.8,
          delay: 0.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Text word stagger
      const words = textRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.fromTo(
          words,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.02,
            delay: 0.4,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Stats animation
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        gsap.fromTo(
          statItems,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.6,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Parallax tilt on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (imageRef.current) {
            const rotateX = (self.progress - 0.5) * 10;
            const rotateY = (self.progress - 0.5) * 10;
            gsap.to(imageRef.current, {
              rotateX,
              rotateY,
              duration: 0.1,
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    gsap.to(imageRef.current, {
      rotateY: x * 20,
      rotateX: -y * 20,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const description = `Senior / Principal GenAI & Platform Engineer with 10+ years of experience designing and operating production-grade AI, data, and cloud platforms in regulated enterprise environments. Strong expertise in Palantir Foundry, agentic AI, RAG architectures, distributed data systems, and cloud-native platforms across AWS and GCP. Proven ability to build scalable, reliable systems supporting analytics, machine learning, and decision-support use cases. Experienced in UI/UX design with Figma for creating intuitive user interfaces and design systems.`;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-void grid-bg"
    >
      <div className="section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            className="relative perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={imageRef}
              className="relative transform-gpu"
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-lime/20 rounded-2xl blur-3xl transform scale-90" />
                
                {/* Image */}
                <img
                  src="./profile.jpg"
                  alt="Kishore Alajangi"
                  className="relative w-full h-full object-cover rounded-2xl border border-gray/30"
                />
                
                {/* Scanline overlay on hover */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lime/10 to-transparent animate-scan" />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2
              ref={headingRef}
              className="font-display text-5xl sm:text-6xl lg:text-7xl text-white mb-8"
            >
              ABOUT ME
            </h2>

            <div ref={textRef} className="space-y-4 mb-10">
              <p className="text-gray-300 leading-relaxed text-lg">
                {description.split(' ').map((word, i) => (
                  <span key={i} className="word inline-block mr-[0.3em]">
                    {word}
                  </span>
                ))}
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-item text-center lg:text-left">
                  <div className="font-display text-3xl sm:text-4xl text-lime mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 border border-gray/10 rounded-full opacity-50" />
      <div className="absolute bottom-20 left-10 w-20 h-20 border border-lime/20 rounded-full opacity-30" />
    </section>
  );
}
