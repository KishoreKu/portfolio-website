import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Cpu, Search, Database, FileText, Palette, Car } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'GenAI Multi-Agent Automation',
    description: 'Implemented agent workflows using LangGraph for planning, tool routing, and iterative reasoning with Python-based planner, worker agents, evaluator, and memory state.',
    image: '/project1.jpg',
    icon: Cpu,
    tags: ['Python', 'LangGraph', 'Agentic AI', 'Orchestration'],
  },
  {
    title: 'Enterprise RAG Search Engine',
    description: 'Built embedding pipelines, retrievers, ranking logic, and LLM response generation with LangChain vector stores and Python evaluation scripts.',
    image: '/project2.jpg',
    icon: Search,
    tags: ['RAG', 'LangChain', 'Embeddings', 'Vector DB'],
  },
  {
    title: 'Palantir Foundry AI Platform',
    description: 'Designed and deployed Ontology models for enterprise data integration. Built transformations, Code Workbooks, and operational actions with AIP integration.',
    image: '/project3.jpg',
    icon: Database,
    tags: ['Palantir Foundry', 'Ontology', 'AIP', 'Data Engineering'],
  },
  {
    title: 'Document Intelligence Pipeline',
    description: 'Python microservice with FastAPI exposing summarization and classification LLM APIs with end-to-end orchestration using LangChain.',
    image: '/project4.jpg',
    icon: FileText,
    tags: ['FastAPI', 'LLM', 'Document AI', 'Python'],
  },
  {
    title: 'UI/UX Design System for GenAI',
    description: 'Created a comprehensive design system in Figma for internal GenAI applications with reusable component libraries and interactive prototypes.',
    image: '/project5.jpg',
    icon: Palette,
    tags: ['Figma', 'Design System', 'UI/UX', 'Prototyping'],
  },
  {
    title: 'Autonomous Robotics Rover',
    description: 'Python-based control loops, navigation algorithms, motor drivers, and sensor fusion for autonomous robotics applications.',
    image: '/project6.jpg',
    icon: Car,
    tags: ['Python', 'Robotics', 'Navigation', 'Sensor Fusion'],
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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

      // Cards fan out animation
      const cards = trackRef.current?.querySelectorAll('.project-card');
      if (cards) {
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { rotation: -5, x: 100, opacity: 0 },
            {
              rotation: 0,
              x: 0,
              opacity: 1,
              duration: 1,
              delay: i * 0.1,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-void"
    >
      <div className="section-padding">
        <h2
          ref={headingRef}
          className="font-display text-5xl sm:text-6xl lg:text-7xl text-white mb-16 text-center"
        >
          PROJECTS
        </h2>

        {/* Projects Grid */}
        <div
          ref={trackRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {projects.map((project) => (
            <div
              key={project.title}
              className="project-card group relative bg-charcoal/50 border border-gray/20 rounded-xl overflow-hidden card-hover"
            >
              {/* Image */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent opacity-60" />
                
                {/* Icon */}
                <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-lime/20 backdrop-blur-sm flex items-center justify-center">
                  <project.icon className="w-5 h-5 text-lime" />
                </div>
                
                {/* Links */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-lime/20 transition-colors">
                    <Github className="w-4 h-4 text-white" />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-lime/20 transition-colors">
                    <ExternalLink className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl text-white mb-2 group-hover:text-lime transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-mono text-lime/80 bg-lime/10 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-lime/5 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-40 left-0 w-64 h-64 bg-lime/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 right-0 w-96 h-96 bg-lime/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
