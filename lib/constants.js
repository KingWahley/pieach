export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Team", href: "/team" },
  { name: "Projects", href: "/projects" },
  { name: "Careers", href: "/careers" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export const SERVICES = [
  {
    id: "01",
    title: "Architectural Design",
    description: "With over 100 built projects spanning more than 20 years, Pieach is evolving in its building languages to remain at the forefront of architecture in Nigeria",
    iconName: "architecture",
  },
  {
    id: "02",
    title: "Interior Architecture",
    description: "Our approach to interior design is collaborative and combined with discerning artistry, technique and meticulous attention to detail.",
    iconName: "interior",
  },
  {
    id: "03",
    title: "Landscape Design",
    description: "The art of adapting the natural environment to create a sense of well-being and order is the foundation of our landscape philosophy.",
    iconName: "landscape",
  },
  {
    id: "04",
    title: "Project Management",
    description: "A management team that is constantly available, and knowledgeable about innovation.",
    iconName: "project-management",
  },
];

export const PROJECTS = [
  {
    id: 1,
    title: "Abeokuta Shopping Center",
    slug: "abeokuta-shopping-center",
    category: "COMMERCIAL",
    groups: ["commercial"],
    image: "/assets/our work/Abeokuta Shopping Center.png",
    description: "A sprawling retail hub integrated into the urban fabric with advanced logistics pathways, designed to act as a catalyst for local commerce.",
    year: "2024",
    location: "Abeokuta, Ogun State, Nigeria",
    specs: {
      projectType: "Commercial Retail",
      siteArea: "15,000 sqm",
      builtArea: "45,000 sqm",
      status: "Completed",
      leadArchitect: "Arch. Olusegun Adetokunbo",
      services: "Masterplanning, Landscape, Architecture",
    },
    gallery: [
      "/assets/our work/Abeokuta Shopping Center.png",
      "/assets/our work/Falomo Shopping Centre.png",
      "/assets/our work/Landmark EcoFriendlyOffice.png",
      "/assets/our work/Temple Road.png",
      "/assets/our work/Avenue Cadwell.png",
    ],
  },
  {
    id: 2,
    title: "Avenue Cadwell",
    slug: "avenue-cadwell",
    category: "LUXURY RESIDENTIAL",
    groups: ["residential", "masterplanning"],
    image: "/assets/our work/Avenue Cadwell.png",
    description: "An elite residential development in Ikoyi connecting high-end units with active landscape corridors, balancing privacy and visual community interaction.",
    year: "2025",
    location: "Ikoyi, Lagos, Nigeria",
    specs: {
      projectType: "Mixed-Use Residential",
      siteArea: "6,000 sqm",
      builtArea: "24,000 sqm",
      status: "Completed",
      leadArchitect: "Arch. Olusegun Adetokunbo",
      services: "Architecture, Masterplanning, Interior",
    },
    gallery: [
      "/assets/our work/Avenue Cadwell.png",
      "/assets/our work/Cuddle Bourdillion.png",
      "/assets/our work/Cesca Manor.png",
      "/assets/our work/The Gilgal.png",
      "/assets/our work/Maitama Abuja.png",
    ],
  },
  {
    id: 3,
    title: "Cesca Manor",
    slug: "cesca-manor",
    category: "LUXURY RESIDENTIAL",
    groups: ["residential"],
    image: "/assets/our work/Cesca Manor.png",
    description: "A luxury residential manor house characterized by elegant, classical proportions integrated with state-of-the-art home automation systems.",
    year: "2024",
    location: "Lagos, Nigeria",
    specs: {
      projectType: "Private Residence",
      siteArea: "3,200 sqm",
      builtArea: "2,100 sqm",
      status: "Completed",
      leadArchitect: "Arch. Jaderola Adeboye",
      services: "Architecture, Interior Design",
    },
    gallery: [
      "/assets/our work/Cesca Manor.png",
      "/assets/our work/The Gilgal.png",
      "/assets/our work/Cuddle Bourdillion.png",
      "/assets/our work/Maitama Abuja.png",
      "/assets/our work/Avenue Cadwell.png",
    ],
  },
  {
    id: 4,
    title: "Cuddle Bourdillion",
    slug: "cuddle-bourdillion",
    category: "LUXURY RESIDENTIAL",
    groups: ["residential"],
    image: "/assets/our work/Cuddle Bourdillion.png",
    description: "A modern residential masterpiece offering panoramic views of the Lagos lagoon, boasting natural ventilation systems and premium open-plan layouts.",
    year: "2025",
    location: "Bourdillon, Ikoyi, Lagos, Nigeria",
    specs: {
      projectType: "Luxury Condominiums",
      siteArea: "4,800 sqm",
      builtArea: "18,500 sqm",
      status: "Completed",
      leadArchitect: "Arch. Chinedu Nduka",
      services: "Architecture, Interior Architecture",
    },
    gallery: [
      "/assets/our work/Cuddle Bourdillion.png",
      "/assets/our work/Avenue Cadwell.png",
      "/assets/our work/Cesca Manor.png",
      "/assets/our work/Maitama Abuja.png",
      "/assets/our work/The Gilgal.png",
    ],
  },
  {
    id: 5,
    title: "Falomo Shopping Centre",
    slug: "falomo-shopping-centre",
    category: "COMMERCIAL",
    groups: ["commercial", "masterplanning"],
    image: "/assets/our work/Falomo Shopping Centre.png",
    description: "A premium commercial retail hub in Ikoyi. The design features a light-filled central atrium, modern circulation pathways, and integration with public transit corridors.",
    year: "2024",
    location: "Ikoyi, Lagos, Nigeria",
    specs: {
      projectType: "Commercial Retail",
      siteArea: "18,000 sqm",
      builtArea: "52,000 sqm",
      status: "Completed",
      leadArchitect: "Arch. Adetola Victoria Haffner",
      services: "Architecture, Masterplanning",
    },
    gallery: [
      "/assets/our work/Falomo Shopping Centre.png",
      "/assets/our work/Abeokuta Shopping Center.png",
      "/assets/our work/Landmark EcoFriendlyOffice.png",
      "/assets/our work/Temple Road.png",
      "/assets/our work/Avenue Cadwell.png",
    ],
  },
  {
    id: 6,
    title: "Landmark EcoFriendlyOffice",
    slug: "landmark-ecofriendlyoffice",
    category: "COMMERCIAL OFFICE",
    groups: ["commercial", "sustainable"],
    image: "/assets/our work/Landmark EcoFriendlyOffice.png",
    description: "A state-of-the-art office building featuring sustainable daylighting systems, carbon-capturing materials, and dynamic passive cooling facades.",
    year: "2025",
    location: "Victoria Island, Lagos, Nigeria",
    specs: {
      projectType: "Sustainable Office",
      siteArea: "5,200 sqm",
      builtArea: "22,000 sqm",
      status: "Completed",
      leadArchitect: "Arch. Olusegun Adetokunbo",
      services: "Architecture, Sustainable Design",
    },
    gallery: [
      "/assets/our work/Landmark EcoFriendlyOffice.png",
      "/assets/our work/Abeokuta Shopping Center.png",
      "/assets/our work/Falomo Shopping Centre.png",
      "/assets/our work/Temple Road.png",
      "/assets/our work/Cuddle Bourdillion.png",
    ],
  },
  {
    id: 7,
    title: "Maitama Abuja",
    slug: "maitama-abuja",
    category: "LUXURY RESIDENTIAL",
    groups: ["residential"],
    image: "/assets/our work/Maitama Abuja.png",
    description: "A luxurious private estate set in the prestigious Maitama district, featuring expansive gardens, natural stone finishes, and floor-to-ceiling glass connections.",
    year: "2024",
    location: "Maitama, Abuja, Nigeria",
    specs: {
      projectType: "Luxury Villa",
      siteArea: "4,000 sqm",
      builtArea: "2,800 sqm",
      status: "Completed",
      leadArchitect: "Arch. Jaderola Adeboye",
      services: "Architecture, Landscape Design",
    },
    gallery: [
      "/assets/our work/Maitama Abuja.png",
      "/assets/our work/The Gilgal.png",
      "/assets/our work/Cesca Manor.png",
      "/assets/our work/Cuddle Bourdillion.png",
      "/assets/our work/Avenue Cadwell.png",
    ],
  },
  {
    id: 8,
    title: "Temple Road",
    slug: "temple-road",
    category: "LUXURY RESIDENTIAL",
    groups: ["residential", "sustainable"],
    image: "/assets/our work/Temple Road.png",
    description: "A prestigious residential development on Temple Road, combining modern concrete framing, solar energy integration, and private pool pavilions.",
    year: "2025",
    location: "Ikoyi, Lagos, Nigeria",
    specs: {
      projectType: "Luxury Residential",
      siteArea: "2,800 sqm",
      builtArea: "1,900 sqm",
      status: "Completed",
      leadArchitect: "Arch. Chinedu Nduka",
      services: "Architecture, Interior, Landscape",
    },
    gallery: [
      "/assets/our work/Temple Road.png",
      "/assets/our work/Landmark EcoFriendlyOffice.png",
      "/assets/our work/Cuddle Bourdillion.png",
      "/assets/our work/Abeokuta Shopping Center.png",
      "/assets/our work/Avenue Cadwell.png",
    ],
  },
  {
    id: 9,
    title: "The Gilgal",
    slug: "the-gilgal",
    category: "LUXURY RESIDENTIAL",
    groups: ["residential"],
    image: "/assets/our work/The Gilgal.png",
    description: "A landmark gated residential estate. The architecture features modern geometric volumes, warm exterior lighting schemes, and highly functional private layouts.",
    year: "2025",
    location: "Lekki Phase 1, Lagos, Nigeria",
    specs: {
      projectType: "Gated Estate",
      siteArea: "7,500 sqm",
      builtArea: "5,600 sqm",
      status: "Completed",
      leadArchitect: "Arch. Jaderola Adeboye",
      services: "Architecture, Landscape",
    },
    gallery: [
      "/assets/our work/The Gilgal.png",
      "/assets/our work/Maitama Abuja.png",
      "/assets/our work/Cesca Manor.png",
      "/assets/our work/Cuddle Bourdillion.png",
      "/assets/our work/Avenue Cadwell.png",
    ],
  },
];

export const PARTNERS = [
  { name: "Airtel", logoSrc: "/assets/logo/airtellogo.png" },
  { name: "CADWELL", logoSrc: "/assets/logo/Cadwelllogo.png" },
  { name: "Chrome Group", logoSrc: "/assets/logo/Chrome-logo.png" },
  { name: "Transcorp Hotels", logoSrc: "/assets/logo/Transcorp-Hotels.png" },
  { name: "UBA", logoSrc: "/assets/logo/ubalogo.png" },
  { name: "Ogun State", logoSrc: "/assets/logo/ogun-state.png" },
];

export const BLOG_POSTS = [
  {
    slug: "future-of-minimalist-living-sustainable-architecture-2026",
    title: "The Future of Minimalist Living: Sustainable Architecture in 2026",
    category: "SUSTAINABILITY",
    date: "OCT 12, 2026",
    readTime: "10 MIN READ",
    summary: "Explore how emerging green technologies and minimalist design principles are converging to create the next generation of eco-conscious...",
    image: "/assets/blog_house.png",
    content: `
      <p>Architecture is undergoing a silent revolution. As we move deeper into 2026, the intersection of minimalist design and sustainable engineering has become the new benchmark for high-end residential projects.</p>
      
      <h3>The Core Pillars of Sustainable Minimalism</h3>
      <p>Sustainable minimalism is not just about having fewer walls or clean lines. It represents a holistic approach to building design that prioritizes circular economy, energy efficiency, and material authenticity. Firmly rooted in research, this approach addresses the lifecycle of every component used.</p>
      
      <ul>
        <li><strong>Passive Design Strategies:</strong> Maximizing natural heating, cooling, and lighting to reduce operational energy use.</li>
        <li><strong>Low-Carbon Materials:</strong> Prioritizing rammed earth, engineered timber, and low-emission concrete alternatives.</li>
        <li><strong>Water Circularity:</strong> Implementing advanced greywater recycling systems and rainwater harvesting seamlessly into the landscape.</li>
      </ul>

      <blockquote>
        "We shape our buildings; thereafter they shape us. In 2026, this means designing spaces that respect the earth while elevating the human spirit."
      </blockquote>

      <h3>Redefining Spatial Elegance</h3>
      <p>By stripping away the superficial, we reveal the raw beauty of structural forms. Raw concrete, textured wood, and copper details are left to age naturally, creating a sense of timeless elegance. This architecture connects occupants back to the rhythms of nature through cross-ventilation and visual frames of the outdoors.</p>
    `,
  },
  {
    slug: "psychology-of-open-plan-residential-design",
    title: "The Psychology of Open-Plan Residential Design",
    category: "INTERIOR",
    date: "SEP 28, 2026",
    readTime: "8 MIN READ",
    summary: "How the strategic use of natural light and fluid transitions between spaces can dramatically improve mental well-being and daily productivity.",
    image: "/assets/blog_interior.png",
    content: `
      <p>How we design our homes directly influences how we feel. The open-plan layout, long a staple of modern architecture, is being re-evaluated through the lens of environmental psychology in 2026.</p>
      
      <h3>Social Connectivity vs. Acoustic Privacy</h3>
      <p>While open-plan layouts encourage family interaction and visual connectivity, they can also lead to sensory overload due to noise travel. Modern residential design solves this by introducing "broken-plan" layouts—using pocket doors, glass partitions, and level changes to divide space without building opaque walls.</p>
      
      <h3>Natural light and Mental Well-being</h3>
      <p>Allowing light to penetrate deep into the floor plan is one of the primary benefits of open-plan living. Exposure to natural light regulates circadian rhythms, reduces stress levels, and enhances focus, turning residential spaces into true sanctuaries.</p>
    `,
  },
  {
    slug: "new-concepts-shaping-modern-urban-landscapes",
    title: "How Concrete is Shaping Modern Urban Landscapes",
    category: "URBANISM",
    date: "SEP 15, 2026",
    readTime: "12 MIN READ",
    summary: "A look at the resurgence of raw material honesty and structural expressionism in contemporary commercial and public architecture.",
    image: "/assets/blog_skyscrapers.png",
    content: `
      <p>Urban density is one of the greatest design challenges of our generation. As cities grow, the role of architects shifts from designing individual buildings to master planning vertical communities.</p>
      
      <h3>The Vertical Neighborhood</h3>
      <p>Skyscrapers are no longer just vertical offices or high-end residential towers. The modern skyscraper integrates public parks, grocery stores, fitness centers, and workspace hubs inside its structure. This vertical integration reduces the necessity for car travel and fosters localized community networks.</p>
      
      <h3>Biophilic Integration at Scale</h3>
      <p>Integrating nature into urban skyscrapers—often referred to as vertical forests—helps mitigate the urban heat island effect, improves air quality, and provides essential psychological relief to residents in dense concrete jungles.</p>
    `,
  },
];

export const TEAM_MEMBERS = [
  {
    slug: "olusegun-adetokunbo",
    name: "Arch. Olusegun Adetokunbo",
    role: "Principal Architect",
    gender: "female",
    image: "/assets/team/Abiddun Opt 1.png",
    bio: [
      "Segun Adetokunbo is a West African-based Architect and the founder of PIEACH Limited, a prominent architectural firm.",
      "She holds memberships in both the Royal Institute of British Architects and the Nigerian Institute of Architects. Segun earned her master's degree in Architecture from Obafemi Awolowo University, Ile-Ife.",
      "In 1997, she established PIEACH Ltd, an architectural and research firm known for its diverse portfolio encompassing residential, commercial, religious, institutional, and mixed-use projects. Her career took a turn in 2011 when she ventured into public service as a Special Adviser and later Commissioner for Housing in Ogun State, Nigeria. During her tenure, she played a pivotal role in driving developmental changes in the state, including urban planning initiatives for sustainable city growth.",
      "Segun's architectural philosophy revolves around the idea that architects possess the capability to enhance and dignify spaces, ultimately improving people's quality of life. Her practice is dedicated to exploring innovative approaches while maintaining a profound connection between architecture, individuals, and the environment."
    ],
    qualifications: [
      { title: "M.ARCH ARCHITECTURE", detail: "Obafemi Awolowo University" },
      { title: "B.ARCH (HONS)", detail: "Obafemi Awolowo University" },
      { title: "SUSTAINABLE LEADERSHIP", detail: "RIBA Certified | 2013" },
      { title: "FELLOW OF NIA", detail: "Nigerian Institute of Architects" }
    ]
  },
  {
    slug: "jaderola-adeboye",
    name: "Arch. Jaderola Adeboye",
    role: "Project Architect",
    gender: "female",
    image: "/assets/team/Jadesola Opt 1.png",
    bio: [
      "Jaderola Adeboye is a dedicated Project Architect specializing in residential developments and space optimization.",
      "She joined PIEACH in 2018 after completing her studies in architectural design and has since led several landmark residential projects.",
      "Her design style focuses on biophilic integration, spatial flow, and the clean detailing of interior-exterior transitions."
    ],
    qualifications: [
      { title: "M.ARCH ARCHITECTURE", detail: "University of Lagos | 2016" },
      { title: "B.ARCH (HONS)", detail: "University of Lagos | 2014" },
      { title: "BIOPHILIC CERTIFICATION", detail: "LEED Green Associate | 2019" },
      { title: "MEMBER OF NIA", detail: "Nigerian Institute of Architects" }
    ]
  },
  {
    slug: "chinedu-nduka",
    name: "Arch. Chinedu Nduka",
    role: "Project Architect",
    gender: "male",
    image: "/assets/team/Chinedu Opt 1.png",
    bio: [
      "Chinedu Nduka leads the technical implementation and structural compliance of PIEACH's projects.",
      "With a strong background in structural engineering and architectural systems, he ensures that design concepts translate accurately into stable, buildable structures.",
      "He collaborates closely on-site with contractors and engineering consultants to maintain quality control and budget guidelines."
    ],
    qualifications: [
      { title: "M.ARCH ARCHITECTURE", detail: "University of Nigeria | 2015" },
      { title: "B.ARCH (HONS)", detail: "University of Nigeria | 2013" },
      { title: "STRUCTURAL COMPLIANCE", detail: "ARCON Certified | 2017" },
      { title: "MEMBER OF NIA", detail: "Nigerian Institute of Architects" }
    ]
  },
  {
    slug: "adetola-haffner",
    name: "Arch. Adetola Victoria Haffner",
    role: "Project Architect",
    gender: "female",
    image: "/assets/team/Tola Opt 1.png",
    bio: [
      "Adetola Haffner is an architect and interior design specialist focusing on corporate workspaces and commercial builds.",
      "She brings 6 years of experience in project layout planning, materials selection, and construction coordination.",
      "Her work aims to optimize natural lighting and ergonomic well-being for high-performance office environments."
    ],
    qualifications: [
      { title: "M.ARCH ARCHITECTURE", detail: "Covenant University | 2018" },
      { title: "B.ARCH (HONS)", detail: "Covenant University | 2016" },
      { title: "WORKSPACE ERGONOMICS", detail: "IFMA Certified | 2021" },
      { title: "MEMBER OF NIA", detail: "Nigerian Institute of Architects" }
    ]
  }
];

