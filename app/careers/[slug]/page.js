import { notFound } from "next/navigation";
import Link from "next/link";
import CareerDetailsHeroSection from "@/components/sections/CareerDetailsHeroSection";
import ApplicationForm from "@/components/sections/ApplicationForm";
import CTASection from "@/components/sections/CTASection";

const CAREERS_DATA = [
  {
    slug: "senior-architect",
    title: "Senior Architect",
    location: "Lagos, Nigeria",
    type: "Full-Time",
    requirements: "Requirements: 10+ years experience, Proficiency in Revit and AutoCAD, Lead project delivery across Africa.",
    description: "As a Senior Architect at Pieach, we have specific requirements to ensure that candidates have the necessary skills and qualifications for the role.",
    skills: [
      {
        id: "01",
        title: "ARCON/NIA",
        description: "Registered with ARCON or NIA (or equivalent regional architectural registration body)."
      },
      {
        id: "02",
        title: "Experience",
        description: "10+ years experience in leading project design, execution, and client management."
      },
      {
        id: "03",
        title: "Technical Skills",
        description: "Proficient in Revit, AutoCAD, and Lumion. Knowledge of parametric design tools is a plus."
      },
      {
        id: "04",
        title: "Leadership & Management",
        description: "Experience in managing team workflows and project delivery timelines."
      },
      {
        id: "05",
        title: "Details & Quality",
        description: "Strong details and structural compliance understanding."
      },
      {
        id: "06",
        title: "Knowledge of Building Codes",
        description: "Deep understanding of construction safety standards and building regulations."
      },
      {
        id: "07",
        title: "Professional Communication",
        description: "Strong verbal and written communication skills to handle clients and consultants."
      },
      {
        id: "08",
        title: "Site Management",
        description: "Experience in managing project phases, site inspection, and progress reporting."
      }
    ]
  },
  {
    slug: "interior-designer",
    title: "Interior Designer",
    location: "Cape Town, South Africa",
    type: "Hybrid",
    requirements: "Requirements: 5+ years luxury residential experience, Expertise in material sourcing and FF&E, Strong visualization skills.",
    description: "As an Interior Designer at Pieach, we have specific requirements to ensure that candidates have the necessary skills and qualifications for the role.",
    skills: [
      {
        id: "01",
        title: "Education",
        description: "Degree in Interior Architecture, Interior Design, or related field."
      },
      {
        id: "02",
        title: "Experience",
        description: "5+ years in high-end luxury residential and commercial interior projects."
      },
      {
        id: "03",
        title: "Technical Skills",
        description: "Proficient in Revit, AutoCAD, Photoshop, and SketchUp. Rendering tools is a plus."
      },
      {
        id: "04",
        title: "Material Knowledge",
        description: "Deep understanding of textiles, custom joinery, lighting, and finishes."
      },
      {
        id: "05",
        title: "FF&E Procurement",
        description: "Experience in FF&E sourcing, supplier coordination, and cost estimation."
      },
      {
        id: "06",
        title: "Spatial Logic",
        description: "Strong sense of layout planning, volume scaling, and interior lighting flow."
      },
      {
        id: "07",
        title: "Details & Styling",
        description: "Expertise in soft styling, furniture layout, and custom millwork detailing."
      },
      {
        id: "08",
        title: "Collaboration",
        description: "Ability to collaborate with architectural teams and on-site contractors."
      }
    ]
  },
  {
    slug: "project-architect",
    title: "Project Architect",
    location: "Nairobi, Kenya",
    type: "Full-Time",
    requirements: "Requirements: Registered architect, 7+ years experience, Strong technical detailing and site supervision skills.",
    description: "As a Project Architect at Pieach, we have specific requirements to ensure that candidates have the necessary skills and qualifications for the role.",
    skills: [
      {
        id: "01",
        title: "ARCON/NIA",
        description: "Registered or eligible for registration with ARCON/NIA."
      },
      {
        id: "02",
        title: "Experience",
        description: "5+ years experience in project phase execution and site supervision."
      },
      {
        id: "03",
        title: "Technical Skills",
        description: "Proficient in Revit, AutoCAD, and Microsoft Project."
      },
      {
        id: "04",
        title: "Site Supervision",
        description: "Proven experience conducting site inspections and quality control audits."
      },
      {
        id: "05",
        title: "Structural Compliance",
        description: "Deep knowledge of load-bearing details and structural system integration."
      },
      {
        id: "06",
        title: "Coordination",
        description: "Strong coordination skills to align MEP, structural engineering, and design teams."
      },
      {
        id: "07",
        title: "Document Management",
        description: "Proficient in checking technical construction documents and shop drawings."
      },
      {
        id: "08",
        title: "Problem Solving",
        description: "Ability to resolve technical issues and on-site drawing discrepancies."
      }
    ]
  }
];

export async function generateStaticParams() {
  return CAREERS_DATA.map((job) => ({
    slug: job.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const job = CAREERS_DATA.find((j) => j.slug === slug);
  
  if (!job) {
    return {
      title: "Position Not Found",
    };
  }

  return {
    title: `${job.title} | Careers | PIEACH Limited`,
    description: job.description,
  };
}

const REQUIRED_SKILLS = [
  {
    iconType: "compass",
    title: "Education",
    description: "Bachelor's or Master's degree in Architecture from an accredited institution. A higher level of education, such as a Master's degree, is preferred."
  },
  {
    iconType: "users",
    title: "Experience",
    description: "Minimum of 8 years of professional experience in architectural design and project management. This should include a proven track record of successfully completing architectural projects from conception to completion."
  },
  {
    iconType: "badge",
    title: "Technical Skills",
    description: "Proficiency in architectural software such as AutoCAD, Revit, and other relevant design and visualization tools. Familiarity with building information modeling (BIM) is highly desirable."
  },
  {
    iconType: "compass",
    title: "Leadership and Management",
    description: "Strong leadership skills and the ability to effectively lead and manage architectural projects. Experience in coordinating with clients, design teams, and contractors to ensure project success and client satisfaction."
  },
  {
    iconType: "users",
    title: "Design Portfolio",
    description: "Excellent communication skills, both verbal and written, with the ability to effectively communicate design concepts and ideas. A collaborative mindset and the ability to work effectively within a team environment."
  },
  {
    iconType: "badge",
    title: "Knowledge of Building Codes and Regulations",
    description: "A solid understanding of local building codes, regulations, and industry standards to ensure compliance in architectural design and construction."
  },
  {
    iconType: "compass",
    title: "Professional Certification",
    description: "Possession of relevant professional certifications, such as licensure from the appropriate architectural board, is preferred but not mandatory."
  },
  {
    iconType: "users",
    title: "Continued Professional Development",
    description: "A commitment to ongoing professional development and staying updated with the latest trends, technologies, and advancements in the field of architecture."
  }
];

export default async function CareerDetailsPage({ params }) {
  const { slug } = await params;
  const job = CAREERS_DATA.find((j) => j.slug === slug);

  if (!job) {
    notFound();
  }

  const relatedJobs = CAREERS_DATA.filter((j) => j.slug !== slug);

  return (
    <div className="bg-white text-neutral-900">
      
      {/* 1. Hero Detail Banner (Sand-Gold/Taupe Background) */}
      <CareerDetailsHeroSection 
        title={job.title}
        location={job.location}
        type={job.type}
        requirements={job.requirements}
      />

      {/* Role Description (Outside Hero to fit 45vh height) */}
      <section className="bg-[#FAF8F5] py-12 border-b border-neutral-200 text-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border border-brand-brown/15 p-8 md:p-10 bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
              <div className="lg:col-span-4">
                <span className="font-serif text-2xl sm:text-3xl text-brand-brown font-normal uppercase tracking-wide block">
                  ROLE DESCRIPTION
                </span>
              </div>
              <div className="lg:col-span-8">
                <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed font-light max-w-4xl">
                  {job.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Required Skills Section */}
      <section className="py-20 lg:py-24 bg-white text-neutral-900 border-b border-neutral-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-4xl text-brand-gold font-medium uppercase tracking-wider">
              REQUIRED SKILLS
            </h2>
          </div>

          {/* 8-Card Grid Layout matching the mockup */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REQUIRED_SKILLS.map((skill, index) => (
              <div 
                key={index}
                className="border border-neutral-200 p-8 space-y-4 rounded-sm hover:border-brand-gold/60 transition duration-300 bg-neutral-50/10"
              >
                {/* SVG Icon */}
                <div className="text-brand-gold">
                  {skill.iconType === "compass" && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM12 4v4M8 19l4-11 4 11M6 21h2M16 21h2M9.5 15h5" />
                    </svg>
                  )}
                  {skill.iconType === "users" && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  )}
                  {skill.iconType === "badge" && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 10 21a3.745 3.745 0 0 1-3.296-1.043 3.746 3.746 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12z" />
                    </svg>
                  )}
                </div>
                
                {/* Title */}
                <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-950">
                  {skill.title}
                </h3>
                
                {/* Description */}
                <p className="font-sans text-neutral-600 text-xs sm:text-sm leading-relaxed font-light">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Join The Studio Form Section */}
      <section id="application-form" className="bg-[#0A0504] text-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-4xl text-white font-normal uppercase tracking-[0.08em] leading-none">
              JOIN THE STUDIO
            </h2>
          </div>

          {/* Render Interactive client component form */}
          <ApplicationForm roleTitle={job.title} />

        </div>
      </section>

      {/* 4. Aligned Info Row */}
      <section className="py-20 lg:py-24 bg-white text-neutral-900 border-b border-neutral-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            {/* Column 1 */}
            <div className="space-y-4">
              <span className="font-sans text-xs font-bold tracking-[0.25em] text-brand-gold uppercase block">IMPACT</span>
              <p className="font-sans text-neutral-800 text-sm leading-relaxed font-light">
                Lead landmark projects that define the future of the continent's urban fabric.
              </p>
            </div>
            {/* Column 2 */}
            <div className="space-y-4">
              <span className="font-sans text-xs font-bold tracking-[0.25em] text-brand-gold uppercase block">GROWTH</span>
              <p className="font-sans text-neutral-800 text-sm leading-relaxed font-light">
                Dedicated professional growth pathways and access to global design conferences.
              </p>
            </div>
            {/* Column 3 */}
            <div className="space-y-4">
              <span className="font-sans text-xs font-bold tracking-[0.25em] text-brand-gold uppercase block">INNOVATION</span>
              <p className="font-sans text-neutral-800 text-sm leading-relaxed font-light">
                Work within a culture that prioritizes R&D and material exploration in every brief.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Selection Journey Section */}
      <section className="py-20 lg:py-24 bg-[#fafafa] text-neutral-900 border-b border-neutral-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-950 uppercase tracking-tight leading-none mb-16">
            Selection Journey
          </h2>

          {/* Timeline Row */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            <div className="absolute top-7 left-[10%] right-[10%] h-[1px] bg-neutral-200 z-0 hidden md:block" />
            
            <div className="relative z-10 flex flex-col items-center space-y-4">
              <div className="w-14 h-14 bg-brand-brown hover:bg-brand-gold text-white flex items-center justify-center font-serif text-lg font-bold rounded-sm shadow-md transition duration-300">
                01
              </div>
              <span className="font-sans font-bold text-[10px] tracking-widest text-neutral-800 uppercase">
                Portfolio Review
              </span>
            </div>

            <div className="relative z-10 flex flex-col items-center space-y-4">
              <div className="w-14 h-14 bg-brand-brown hover:bg-brand-gold text-white flex items-center justify-center font-serif text-lg font-bold rounded-sm shadow-md transition duration-300">
                02
              </div>
              <span className="font-sans font-bold text-[10px] tracking-widest text-neutral-800 uppercase">
                Technical Interview
              </span>
            </div>

            <div className="relative z-10 flex flex-col items-center space-y-4">
              <div className="w-14 h-14 bg-brand-brown hover:bg-brand-gold text-white flex items-center justify-center font-serif text-lg font-bold rounded-sm shadow-md transition duration-300">
                03
              </div>
              <span className="font-sans font-bold text-[10px] tracking-widest text-neutral-800 uppercase">
                Design Task
              </span>
            </div>

            <div className="relative z-10 flex flex-col items-center space-y-4">
              <div className="w-14 h-14 bg-brand-brown hover:bg-brand-gold text-white flex items-center justify-center font-serif text-lg font-bold rounded-sm shadow-md transition duration-300">
                04
              </div>
              <span className="font-sans font-bold text-[10px] tracking-widest text-neutral-800 uppercase">
                Principal Round
              </span>
            </div>

            <div className="relative z-10 flex flex-col items-center space-y-4">
              <div className="w-14 h-14 bg-brand-brown hover:bg-brand-gold text-white flex items-center justify-center font-serif text-lg font-bold rounded-sm shadow-md transition duration-300">
                05
              </div>
              <span className="font-sans font-bold text-[10px] tracking-widest text-neutral-800 uppercase">
                Offer & Onboarding
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Related Openings Section */}
      <section className="py-20 lg:py-24 bg-white text-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10 text-left">
            <h2 className="font-serif text-[11px] font-bold tracking-[0.25em] text-neutral-900 uppercase">
              RELATED OPENINGS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedJobs.map((relatedJob) => {
              const city = relatedJob.location.split(",")[0]?.trim() || relatedJob.location;
              const cleanType = relatedJob.type.replace("-", " ");
              
              return (
                <Link
                  key={relatedJob.slug}
                  href={`/careers/${relatedJob.slug}`}
                  className="group flex items-center justify-between border border-neutral-200/80 p-8 rounded-none hover:border-[#c5a880]/60 transition duration-300 bg-white"
                >
                  <div className="space-y-1.5">
                    <h3 className="font-sans text-lg font-medium text-neutral-950 transition duration-300 group-hover:text-brand-gold">
                      {relatedJob.title}
                    </h3>
                    <p className="font-sans text-sm text-neutral-500">
                      {city} | {cleanType}
                    </p>
                  </div>
                  <div className="text-neutral-950">
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. Life Inside Section */}
      <section className="py-20 lg:py-24 bg-white text-neutral-900 border-t border-neutral-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 relative">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-950 uppercase tracking-tight leading-none">
              Life Inside
            </h2>
            <div className="w-12 h-[2px] bg-brand-gold mx-auto mt-4" />
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100">
                <img
                  src="/assets/team/life inside/1.png"
                  alt="Team designing model"
                  className="absolute inset-0 w-full h-full object-cover transition duration-500"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100">
                <img
                  src="/assets/team/life inside/2.png"
                  alt="Team member smiling"
                  className="absolute inset-0 w-full h-full object-cover transition duration-500"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100">
                <img
                  src="/assets/team/life inside/3.png"
                  alt="Architectural detailing physical model"
                  className="absolute inset-0 w-full h-full object-cover transition duration-500"
                />
              </div>
            </div>

            <div className="relative aspect-[21/9] w-full rounded-sm overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100">
              <img
                src="/assets/team/life inside/4.png"
                alt="Workspace team collaboration"
                className="absolute inset-0 w-full h-full object-cover transition duration-500"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 8. Employee Quotes Section */}
      <section className="py-20 lg:py-24 bg-[#fafafa] border-t border-neutral-100 text-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            <div className="bg-white p-8 sm:p-10 border border-neutral-200/50 border-l-4 border-l-brand-gold rounded-sm shadow-sm flex flex-col justify-between space-y-6">
              <div>
                <span className="font-serif text-3xl text-brand-gold/60 block leading-none mb-2">“</span>
                <blockquote className="font-serif italic text-base sm:text-lg text-neutral-700 leading-relaxed">
                  At PIEACH, I've had the opportunity to lead major commercial builds in Lagos, shaping the cityscape and collaborating with top-tier consultants. The learning curve is steep but rewarding.
                </blockquote>
              </div>
              <cite className="font-sans font-bold text-xs uppercase tracking-wider text-neutral-900 not-italic">
                Adebisi Adeoye, Project Architect
              </cite>
            </div>

            <div className="bg-white p-8 sm:p-10 border border-neutral-200/50 border-l-4 border-l-brand-gold rounded-sm shadow-sm flex flex-col justify-between space-y-6">
              <div>
                <span className="font-serif text-3xl text-brand-gold/60 block leading-none mb-2">“</span>
                <blockquote className="font-serif italic text-base sm:text-lg text-neutral-700 leading-relaxed">
                  The focus on biophilic design and passive energy systems has allowed me to push the boundaries of sustainable architecture. Every project feels like a new research endeavor.
                </blockquote>
              </div>
              <cite className="font-sans font-bold text-xs uppercase tracking-wider text-neutral-900 not-italic">
                Kelvin Nduka, Sustainable Design Lead
              </cite>
            </div>

          </div>
        </div>
      </section>

      {/* 9. CTA Section */}
      <CTASection />

    </div>
  );
}
