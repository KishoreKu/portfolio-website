import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    name: 'Palantir Foundry',
    skills: [
      'Ontology Design & Modeling',
      'Transformations',
      'Code Workbooks',
      'Operational Actions',
      'Workflow Orchestration',
      'Object Explorer',
      'Lineage Tracking',
      'AIP (AI Platform)',
      'Pipeline Builder',
      'Workshop',
      'Slate',
    ],
  },
  {
    name: 'GenAI & Agentic AI',
    skills: [
      'RAG Pipelines',
      'Embeddings',
      'Vector Databases',
      'LangChain',
      'LangGraph',
      'Agent Orchestration',
      'Tool Routing',
      'Prompt Engineering',
      'Hallucination Mitigation',
      'LLM Integration',
      'Evaluation',
    ],
  },
  {
    name: 'Programming & APIs',
    skills: [
      'Python',
      'SQL',
      'PySpark',
      'FastAPI',
      'REST APIs',
      'Async Programming',
      'TypeScript',
      'JavaScript',
    ],
  },
  {
    name: 'Cloud & Platforms',
    skills: [
      'AWS (S3, ECS, Fargate, Lambda)',
      'GCP (Dataflow, BigQuery)',
      'Databricks',
      'Snowflake',
      'Containerized Services',
      'CI/CD',
      'Kafka/MSK',
    ],
  },
  {
    name: 'UI/UX & Design',
    skills: [
      'Figma',
      'Wireframing',
      'Prototyping',
      'Design Systems',
      'User Interface Design',
      'User Experience Optimization',
      'Component Libraries',
      'Design Handoff',
    ],
  },
  {
    name: 'Data Architecture',
    skills: [
      'Medallion Architecture',
      'Data Vault Modeling',
      'Dimensional Modeling',
      'Apache Spark',
      'Batch & Streaming Pipelines',
      'Observability',
      'SLAs/SLOs',
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const [, setMousePos] = useState({ x: 0, y: 0 });

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

      // Skills cloud rotation
      gsap.fromTo(
        cloudRef.current,
        { rotateY: 180, opacity: 0 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Individual skill tags
      const tags = cloudRef.current?.querySelectorAll('.skill-tag-3d');
      if (tags) {
        gsap.fromTo(
          tags,
          { scale: 0, z: -500 },
          {
            scale: 1,
            z: 0,
            duration: 0.8,
            stagger: 0.02,
            delay: 0.3,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse tracking for cloud rotation
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cloudRef.current) return;
    
    const rect = cloudRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setMousePos({ x, y });
    
    gsap.to(cloudRef.current, {
      rotateY: x * 15,
      rotateX: -y * 15,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!cloudRef.current) return;
    gsap.to(cloudRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-void overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      <div className="section-padding relative z-10">
        <h2
          ref={headingRef}
          className="font-display text-5xl sm:text-6xl lg:text-7xl text-white mb-16 text-center"
        >
          SKILLS
        </h2>

        {/* 3D Skills Cloud */}
        <div
          className="perspective-1000 max-w-6xl mx-auto"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={cloudRef}
            className="transform-gpu"
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px',
            }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories.map((category, catIndex) => (
                <div
                  key={category.name}
                  className="skill-tag-3d bg-charcoal/50 border border-gray/20 rounded-xl p-6 backdrop-blur-sm card-hover"
                  style={{
                    transform: `translateZ(${Math.sin(catIndex * 0.5) * 20}px)`,
                  }}
                >
                  <h3 className="font-display text-2xl text-lime mb-4">
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="skill-tag text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating skill orbs decoration */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-lime/30 rounded-full animate-float" />
        <div className="absolute bottom-20 right-10 w-6 h-6 bg-lime/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-5 w-3 h-3 bg-lime/40 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>
    </section>
  );
}
