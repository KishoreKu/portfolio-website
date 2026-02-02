import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Award, Mail, Send, Check, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    degree: 'Master of Science in Computer Vision',
    institution: 'University of Central Florida',
    year: 'Anticipated 2026',
    icon: GraduationCap,
  },
  {
    degree: 'Master of Science in Computer Engineering',
    institution: 'Oklahoma Christian University',
    year: '2018',
    icon: GraduationCap,
  },
  {
    degree: 'PG in Business Analytics & Intelligence',
    institution: 'Illinois Institute of Technology',
    year: '2017',
    icon: GraduationCap,
  },
];

const certifications = [
  { name: 'Architecting Microsoft Azure Solutions', issuer: 'Microsoft' },
  { name: 'Cloudera Certified Administrator for Apache Hadoop (CCAH)', issuer: 'Cloudera' },
  { name: 'Oracle Certified Associate Java SE 7 Programmer', issuer: 'Oracle' },
  { name: 'ITIL V3 Foundation', issuer: 'ITIL' },
];

export default function Education() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eduRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Education list slide up
      const eduItems = eduRef.current?.querySelectorAll('.edu-item');
      if (eduItems) {
        gsap.fromTo(
          eduItems,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: eduRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Form slide left
      gsap.fromTo(
        formRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    
    // Simulate sending
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => {
        setFormState('idle');
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    }, 1500);
  };

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-void"
    >
      <div className="section-padding">
        <h2
          ref={headingRef}
          className="font-display text-5xl sm:text-6xl lg:text-7xl text-white mb-16 text-center"
        >
          EDUCATION & CONTACT
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Education & Certifications */}
          <div ref={eduRef} className="space-y-8">
            {/* Education */}
            <div>
              <h3 className="font-display text-2xl text-lime mb-6 flex items-center gap-3">
                <GraduationCap className="w-6 h-6" />
                EDUCATION
              </h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div
                    key={edu.degree}
                    className="edu-item bg-charcoal/50 border border-gray/20 rounded-xl p-5 card-hover"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-lime/10 flex items-center justify-center flex-shrink-0">
                        <edu.icon className="w-5 h-5 text-lime" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">
                          {edu.degree}
                        </h4>
                        <p className="text-gray-400 text-sm">{edu.institution}</p>
                        <p className="text-lime text-xs font-mono mt-1">{edu.year}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="font-display text-2xl text-lime mb-6 flex items-center gap-3">
                <Award className="w-6 h-6" />
                CERTIFICATIONS
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.name}
                    className="edu-item bg-charcoal/30 border border-gray/20 rounded-lg p-4"
                  >
                    <p className="text-white text-sm font-medium">{cert.name}</p>
                    <p className="text-gray-500 text-xs font-mono mt-1">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="font-display text-2xl text-lime mb-6 flex items-center gap-3">
              <Mail className="w-6 h-6" />
              GET IN TOUCH
            </h3>
            
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-charcoal/50 border border-gray/20 rounded-xl p-6 space-y-4"
            >
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-mono">
                  {'>'} NAME
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-void border border-gray/30 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-lime focus:outline-none input-glow transition-all"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 font-mono">
                  {'>'} EMAIL
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-void border border-gray/30 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-lime focus:outline-none input-glow transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 font-mono">
                  {'>'} MESSAGE
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full bg-void border border-gray/30 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-lime focus:outline-none input-glow transition-all resize-none"
                  placeholder="Enter your message"
                />
              </div>

              <button
                type="submit"
                disabled={formState !== 'idle'}
                className={`w-full btn-primary flex items-center justify-center gap-2 ${
                  formState === 'success' ? 'bg-green-500' : ''
                }`}
              >
                {formState === 'idle' && (
                  <>
                    <Send className="w-4 h-4" />
                    SEND MESSAGE
                  </>
                )}
                {formState === 'sending' && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    SENDING...
                  </>
                )}
                {formState === 'success' && (
                  <>
                    <Check className="w-4 h-4" />
                    MESSAGE SENT!
                  </>
                )}
              </button>
            </form>

            {/* Social Links */}
            <div className="mt-8 flex justify-center gap-4">
              {['LinkedIn', 'GitHub', 'Twitter'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="px-4 py-2 border border-gray/30 rounded-lg text-gray-400 text-sm hover:border-lime hover:text-lime transition-all"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
