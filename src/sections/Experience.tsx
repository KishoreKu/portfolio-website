import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: 'JPMorgan Chase',
    role: 'GenAI & Platform Engineer',
    period: 'Oct 2024 - Dec 2025',
    description: [
      'Designed and deployed Python + LangChain + LangGraph workflows for RAG search, summarization, and document intelligence',
      'Built MCP-style server architecture to securely expose enterprise tools to GenAI agents with RBAC and audit logging',
      'Created UI/UX designs in Figma for internal GenAI tool interfaces and design systems',
      'Developed Python-based evaluation harnesses for retrieval ranking and hallucination detection',
    ],
  },
  {
    company: 'Shieldify',
    role: 'Principal GenAI & Platform Engineer',
    period: 'Mar 2023 - Oct 2024',
    description: [
      'Led design and delivery of production-grade GenAI and data platforms using Palantir Foundry',
      'Designed and implemented Ontology models, transformations, and Code Workbooks in Palantir Foundry',
      'Built agentic AI systems using RAG pipelines, LangGraph orchestration, and enterprise chatbots',
      'Delivered GCP-based marketing analytics platform for telecom client using Kafka and Dataflow',
    ],
  },
  {
    company: 'Cisco',
    role: 'Data & Software Engineer',
    period: 'Jan 2016 - Mar 2023',
    description: [
      'Built end-to-end Python ETL pipelines, automation scripts, PySpark jobs, and ML workflows',
      'Developed ML models for anomaly detection, clustering, forecasting, and optimization',
      'Created internal API services using FastAPI for ML inference and data operations',
      'Designed user interfaces and dashboards using Figma for internal data tools',
    ],
  },
  {
    company: 'Palantir',
    role: 'Big Data Engineer / Foundry Engineer',
    period: 'Jun 2014 - May 2015',
    description: [
      'Worked on early Palantir Foundry platform components and ontology modeling capabilities',
      'Developed ETL pipelines using HDFS, MapReduce, Hive, Pig for large-scale data processing',
      'Collaborated across engineering teams to deliver analytics-ready data and establish governance',
      'Contributed to internal accelerators and modular data capabilities for enterprise deployments',
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
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

      // Timeline line draw
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { attr: { y2: 0 } },
          {
            attr: { y2: '100%' },
            duration: 1.5,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Experience cards
      const cards = timelineRef.current?.querySelectorAll('.experience-card');
      const nodes = timelineRef.current?.querySelectorAll('.timeline-node');

      if (cards && nodes) {
        cards.forEach((card, i) => {
          const isLeft = i % 2 === 0;
          
          gsap.fromTo(
            card,
            { x: isLeft ? -100 : 100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              delay: i * 0.2,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          gsap.fromTo(
            nodes[i],
            { scale: 0 },
            {
              scale: 1,
              duration: 0.4,
              delay: i * 0.2,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
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
      id="experience"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-void"
    >
      <div className="section-padding">
        <h2
          ref={headingRef}
          className="font-display text-5xl sm:text-6xl lg:text-7xl text-white mb-16 text-center"
        >
          EXPERIENCE
        </h2>

        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Timeline Line SVG */}
          <svg
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 hidden lg:block"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c5fb67" stopOpacity="0" />
                <stop offset="10%" stopColor="#c5fb67" stopOpacity="1" />
                <stop offset="90%" stopColor="#c5fb67" stopOpacity="1" />
                <stop offset="100%" stopColor="#c5fb67" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line
              ref={lineRef}
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              stroke="url(#lineGradient)"
              strokeWidth="2"
            />
          </svg>

          {/* Mobile Timeline Line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-lime/50 to-transparent lg:hidden" />

          {/* Experience Cards */}
          <div className="space-y-12 lg:space-y-0">
            {experiences.map((exp, index) => (
              <div
                key={exp.company}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-8 ${
                  index !== experiences.length - 1 ? 'lg:pb-16' : ''
                }`}
              >
                {/* Timeline Node */}
                <div
                  className={`timeline-node absolute left-4 lg:left-1/2 w-4 h-4 bg-lime rounded-full -translate-x-1/2 top-2 z-10 animate-pulse-glow ${
                    index % 2 === 0 ? 'lg:translate-x-1/2' : 'lg:-translate-x-1/2'
                  }`}
                />

                {/* Card */}
                <div
                  className={`experience-card ml-12 lg:ml-0 ${
                    index % 2 === 0
                      ? 'lg:pr-16 lg:text-right'
                      : 'lg:col-start-2 lg:pl-16'
                  }`}
                >
                  <div className="card-hover bg-charcoal/50 border border-gray/20 rounded-xl p-6 backdrop-blur-sm">
                    {/* Header */}
                    <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                      <div className="w-10 h-10 rounded-lg bg-lime/10 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-lime" />
                      </div>
                      <div className={index % 2 === 0 ? 'lg:text-right' : ''}>
                        <h3 className="font-semibold text-white text-lg">
                          {exp.company}
                        </h3>
                        <p className="text-lime text-sm">{exp.role}</p>
                      </div>
                    </div>

                    {/* Period */}
                    <div className={`flex items-center gap-2 text-gray-500 text-sm mb-4 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                      <Calendar className="w-4 h-4" />
                      <span className="font-mono">{exp.period}</span>
                    </div>

                    {/* Description */}
                    <ul className={`space-y-2 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                      {exp.description.map((item, i) => (
                        <li
                          key={i}
                          className="text-gray-400 text-sm leading-relaxed"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
