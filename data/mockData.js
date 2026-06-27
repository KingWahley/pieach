export const projectsData = [
  {
    id: 'p1',
    title: 'Lekki Courtyard Residence',
    subtitle: 'Modern private residence with courtyard living and natural ventilation.',
    description: 'Residential architecture focused on light, privacy, and calm interiors. This project explores the intersection of traditional Nigerian courtyard architecture with modern minimalist aesthetics, utilizing local materials and sustainable cooling strategies.',
    location: 'Lekki, Lagos, Nigeria',
    status: 'Completed',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687940-4923363380e2?w=1200&q=80'
    ],
    date: '2025-10-15',
    galleryCount: 3,
    city: 'Lekki',
    state: 'Lagos',
    country: 'Nigeria',
    additionalFields: [
      { id: 'desc-1', title: 'Design Approach', body: 'The design prioritizes passive cooling through a central courtyard that acts as a thermal chimney, drawing cool air through the living spaces.' },
      { id: 'desc-2', title: 'Key Features', body: 'Features include hand-pressed clay bricks, reclaimed timber screens, and a greywater recycling system for the courtyard gardens.' }
    ]
  },
  {
    id: 'p2',
    title: 'Victoria Island Office Fit-Out',
    subtitle: 'Corporate office redesign with flexible workspaces and executive suites.',
    description: 'Commercial interior project for a growing professional services firm. The design emphasizes transparency and collaboration, using glass partitions and open-plan layouts while maintaining acoustic privacy in meeting zones.',
    location: 'Victoria Island, Lagos, Nigeria',
    status: 'Ongoing',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80'
    ],
    date: '2025-11-20',
    galleryCount: 3,
    city: 'Victoria Island',
    state: 'Lagos',
    country: 'Nigeria',
    additionalFields: [
      { id: 'desc-1', title: 'Design Approach', body: 'An agile workspace philosophy was adopted, providing a variety of "work modes" from deep focus pods to collaborative lounges.' },
      { id: 'desc-2', title: 'Key Features', body: 'Smart lighting systems that adjust based on daylight, modular furniture for future scaling, and integrated biophilic walls.' }
    ]
  },
  {
    id: 'p3',
    title: 'Abuja Mixed-Use Concept',
    subtitle: 'Concept development for retail, office, and residential uses.',
    description: 'Mixed-use proposal awaiting client approval. A landmark development in Maitama that seeks to redefine urban density by blending retail vibrancy with residential serenity through tiered landscaping.',
    location: 'Maitama, Abuja, Nigeria',
    status: 'On Hold',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
      'https://images.unsplash.com/photo-1449156001437-af90bb4257e9?w=1200&q=80',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80'
    ],
    date: '2025-09-05',
    galleryCount: 3,
    city: 'Maitama',
    state: 'Abuja',
    country: 'Nigeria',
    additionalFields: [
      { id: 'desc-1', title: 'Design Approach', body: 'The "Vertical Village" concept utilizes stepped terraces to provide private outdoor space for every residential unit while maximizing views of the Abuja skyline.' },
      { id: 'desc-2', title: 'Key Features', body: 'Sky gardens on every third floor, a rooftop infinity pool, and a semi-public plaza at the base for community interaction.' }
    ]
  },
  {
    id: 'p4',
    title: 'Ikoyi Apartment Renovation',
    subtitle: 'High-end apartment renovation with custom joinery and refined finishes.',
    description: 'Interior renovation combining warm material palettes with modern planning. The project transformed a dated penthouse into a light-filled sanctuary for a private art collector.',
    location: 'Ikoyi, Lagos, Nigeria',
    status: 'Completed',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1200&q=80'
    ],
    date: '2025-08-12',
    galleryCount: 3,
    city: 'Ikoyi',
    state: 'Lagos',
    country: 'Nigeria',
    additionalFields: [
      { id: 'desc-1', title: 'Design Approach', body: 'Minimalist luxury achieved through a restricted palette of Carrara marble, light oak, and brushed brass accents.' },
      { id: 'desc-2', title: 'Key Features', body: 'Custom-built floor-to-ceiling bookshelves, a concealed bar area, and automated smart-home climate and lighting controls.' }
    ]
  }
];

export const projectCategories = [
  { id: 'cat1', name: 'Commercial', slug: 'commercial', status: 'Active', description: 'Office buildings, retail spaces, and corporate campuses.', projectCount: 45 },
  { id: 'cat2', name: 'Residential', slug: 'residential', status: 'Active', description: 'Private homes, apartments, and housing developments.', projectCount: 32 },
  { id: 'cat3', name: 'Civic', slug: 'civic', status: 'Active', description: 'Museums, libraries, and government buildings.', projectCount: 12 },
  { id: 'cat4', name: 'Hospitality', slug: 'hospitality', status: 'Active', description: 'Hotels, resorts, and restaurants.', projectCount: 18 },
  { id: 'cat5', name: 'Masterplanning', slug: 'masterplanning', status: 'Active', description: 'Urban design and large-scale community planning.', projectCount: 8 }
];

export const teamData = [
  {
    id: 't1',
    name: 'Adaora Okeke',
    title: 'Arch.',
    role: 'Principal Architect',
    qualifications: ['M.Arch', 'ARCON'],
    bio: 'Leads concept development, design strategy, and client engagement across residential and commercial projects. With over 15 years of experience in high-end residential architecture, she brings a unique blend of technical expertise and artistic vision to every project, ensuring that each space tells a distinct story of luxury and functionality.',
    email: 'adaora.o@pieach.com',
    phone: '+234 801 234 5678',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
    status: 'active',
    displayOrder: 1,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/adaoraokeke',
      instagram: 'https://instagram.com/adaora_arch'
    }
  },
  {
    id: 't2',
    name: 'Tunde Nwosu',
    title: 'Mr.',
    role: 'Senior Architect',
    qualifications: ['B.Sc Architecture'],
    bio: 'Supports technical drawings, project coordination, site reviews, and documentation for active client projects. Tunde specializes in sustainable building practices and has a keen eye for structural detail, ensuring that aesthetic concepts are translated into viable, long-lasting architectural realities.',
    email: 'tunde.n@pieach.com',
    phone: '+234 802 345 6789',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
    status: 'active',
    displayOrder: 2,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/tundenwosu'
    }
  },
  {
    id: 't3',
    name: 'Chidinma Eze',
    title: 'Mrs.',
    role: 'Interior Designer',
    qualifications: ['BA Interior Design'],
    bio: 'Develops interior concepts, material palettes, furniture layouts, and finishes for residential and office spaces. Chidinma\'s approach focuses on the psychological impact of spaces, using light and texture to create environments that enhance well-being and productivity.',
    email: 'chidinma.e@pieach.com',
    phone: '+234 803 456 7890',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800&q=80',
    status: 'active',
    displayOrder: 3,
    socialLinks: {
      instagram: 'https://instagram.com/chidinma_interiors'
    }
  },
  {
    id: 't4',
    name: 'Kelechi Amadi',
    title: 'Mr.',
    role: 'Project Architect',
    qualifications: ['B.Arch', 'NIA'],
    bio: 'Coordinates project timelines, contractors, site activities, and ensures design compliance with regulations. Kelechi is known for his rigorous project management style and his ability to navigate complex regulatory frameworks without compromising design integrity.',
    email: 'kelechi.a@pieach.com',
    phone: '+234 804 567 8901',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80',
    status: 'active',
    displayOrder: 4,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/kelechiamadi'
    }
  },
  {
    id: 't5',
    name: 'Sarah Johnson',
    title: 'Ms.',
    role: 'Admin Officer',
    qualifications: ['B.Sc Admin'],
    bio: 'Manages office operations, procurement, and front-desk activities for the studio. Sarah ensures that the studio environment remains organized and efficient, supporting the creative team so they can focus entirely on delivering exceptional design.',
    email: 'sarah.j@pieach.com',
    phone: '+234 805 678 9012',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
    status: 'inactive',
    displayOrder: 5
  }
];


export const jobApplicationsData = [
  {
    id: 'app1',
    jobId: 'v2',
    applicantName: 'Michael Chen',
    roleApplied: 'Junior Architect',
    date: '2026-05-04',
    status: 'new',
    email: 'm.chen.arch@email.com',
    phone: '+1 555-0198',
    experience: '2 years',
    portfolioUrl: 'https://portfolio.mchen.design',
    coverLetter: 'I have followed Pieach CMS work for years and am deeply inspired by your sustainable approach to urban residential projects.',
    cvFileName: 'M_Chen_Resume_2026.pdf'
  },
  {
    id: 'app2',
    jobId: 'v4',
    applicantName: 'Sarah Jenkins',
    roleApplied: 'Interior Designer',
    date: '2026-05-02',
    status: 'shortlisted',
    email: 'sarah.j.designs@email.com',
    phone: '+44 7700 900123',
    experience: '5 years',
    portfolioUrl: 'https://sarahj.artstation.com',
    coverLetter: 'My background in biophilic design aligns perfectly with your upcoming Lumina Residences project.',
    cvFileName: 'S_Jenkins_CV.pdf'
  },
  {
    id: 'app3',
    jobId: 'v1',
    applicantName: 'Robert Adebayo',
    roleApplied: 'Senior Project Manager',
    date: '2026-04-28',
    status: 'rejected',
    email: 'robert.adebayo@email.com',
    phone: '+234 805 678 9012',
    experience: '12 years',
    portfolioUrl: null,
    coverLetter: 'Enclosed is my application for the Senior Project Manager position. I have overseen $500M+ in commercial developments.',
    cvFileName: 'RAdebayo_Resume.pdf'
  },
  {
    id: 'app4',
    jobId: 'v2', // Another one for Junior Architect or 3D Visualizer?
    applicantName: 'Elena Rostova',
    roleApplied: '3D Visualizer',
    date: '2026-04-25',
    status: 'interview',
    email: 'elena.rostova.3d@email.com',
    phone: '+1 555-0456',
    experience: '4 years',
    portfolioUrl: 'https://behance.net/elenarostova',
    coverLetter: 'I specialize in photorealistic architectural renderings using Unreal Engine 5 and V-Ray.',
    cvFileName: 'E_Rostova_Visuals.pdf'
  }
];

export const messagesData = [
  {
    id: 'msg1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@email.com',
    phone: '+234 800 000 0000',
    subject: 'Inquiry regarding Commercial Tower project',
    date: '2026-05-05T14:30:00Z',
    status: 'unread',
    body: 'I need consultation for a residential project and would like to understand your process.',
  },
  {
    id: 'msg2',
    firstName: 'Ada',
    lastName: 'Obi',
    email: 'ada@email.com',
    phone: '+234 900 000 0000',
    subject: 'Permit updates for Oasis Cultural Center',
    date: '2026-05-04T09:15:00Z',
    status: 'read',
    body: 'Interested in interior design services for a short-let apartment in Lagos.',
  },
  {
    id: 'msg3',
    firstName: 'Linda',
    lastName: 'Nwosu',
    email: 'linda@email.com',
    phone: '+234 801 234 5678',
    subject: 'Feature: Echo Valley Estate',
    date: '2026-05-01T11:45:00Z',
    status: 'unread',
    body: 'Please share your availability for a commercial office redesign consultation.',
  }
];

export const vacanciesData = [
  {
    id: 'v1',
    title: 'Senior Project Manager',
    department: 'Management',
    location: 'Lagos, Nigeria',
    type: 'Full-time',
    status: 'published',
    applicantsCount: 14,
    datePosted: '2026-04-15',
    deadline: '2026-06-30',
    description: 'We are looking for an experienced Project Manager to oversee our high-end residential projects.',
    skills: [
      { title: 'Project Management', description: 'Lead complex architectural projects from concept to completion.' },
      { title: 'Stakeholder Communication', description: 'Liaise with clients, contractors, and regulatory bodies.' }
    ]
  },
  {
    id: 'v2',
    title: 'Junior Architect',
    department: 'Design',
    location: 'Lagos, Nigeria',
    type: 'Full-time',
    status: 'published',
    applicantsCount: 42,
    datePosted: '2026-04-20',
    deadline: '2026-07-15',
    description: 'Join our design team as a Junior Architect to work on innovative concepts.',
    skills: [
      { title: 'Revit & BIM', description: 'Strong proficiency in Revit for architectural documentation.' },
      { title: 'Concept Design', description: 'Ability to translate ideas into compelling visual concepts.' }
    ]
  },
  {
    id: 'v3',
    title: '3D Visualizer',
    department: 'Visualization',
    location: 'Remote',
    type: 'Contract',
    status: 'draft',
    applicantsCount: 0,
    datePosted: '2026-05-01',
    deadline: '2026-08-01',
    description: 'Create stunning 3D visualizations and walk-throughs for our architectural projects.',
    skills: [
      { title: '3ds Max / V-Ray', description: 'Expertise in high-end architectural rendering.' },
      { title: 'Unreal Engine 5', description: 'Experience with real-time architectural visualization.' }
    ]
  },
  {
    id: 'v4',
    title: 'Interior Designer',
    department: 'Design',
    location: 'Lagos, Nigeria',
    type: 'Full-time',
    status: 'published',
    applicantsCount: 8,
    datePosted: '2026-05-02',
    deadline: '2026-08-15',
    description: 'We are seeking a creative Interior Designer to lead high-end residential interiors.',
    skills: [
      { title: 'Interior Styling', description: 'Curating materials, finishes, and furniture.' },
      { title: 'AutoCAD', description: 'Precision technical drafting for interior layouts.' }
    ]
  }
];

export const blogData = [
  {
    id: 'b1',
    title: 'Designing Homes That Breathe',
    excerpt: 'A comprehensive guide to natural ventilation, daylighting, and spatial comfort in modern residential architecture.',
    category: 'Architecture',
    author: 'Admin',
    date: '2026-05-05',
    status: 'published',
    reads: 1240,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    content: `Architecture is as much about what you don't see as what you do. While the visual impact of a building is undeniable, the true measure of its success lies in how it feels to inhabit. Designing homes that "breathe" is a philosophy that prioritizes the health and comfort of the occupants through passive strategies.

The first pillar of this approach is natural ventilation. In our tropical climate, relying solely on mechanical cooling is neither sustainable nor ideal for human health. By strategically placing openings to capture prevailing breezes and utilizing the stack effect—where warm air rises and escapes through high-level vents—we can create a continuous flow of fresh air. This not only keeps the home cool but also reduces the accumulation of indoor pollutants.

Daylighting is the second pillar. A well-lit space feels larger, more welcoming, and significantly more vibrant. However, the challenge lies in bringing in light without the heat. We achieve this through deep overhangs, light shelves, and high-performance glazing. The goal is to flood the interiors with soft, diffused light that changes beautifully throughout the day, connecting the indoors with the natural rhythm of the outside world.

Finally, spatial comfort is about the relationship between scale and movement. It's about creating a sequence of spaces that offer both openness for social interaction and intimacy for quiet reflection. When these elements—air, light, and space—work in harmony, a house becomes more than just a structure; it becomes a living, breathing sanctuary.`,
    tags: ['Architecture', 'Sustainability', 'Design'],
    seoTitle: 'Designing Homes That Breathe | Pieach CMS',
    metaDescription: 'A guide to natural ventilation and spatial comfort in modern residential design.',
    slug: 'designing-homes-that-breathe'
  },
  {
    id: 'b2',
    title: 'Choosing Materials for Warm Minimalist Interiors',
    excerpt: 'Practical notes on texture, lighting, and finishes for creating refined yet welcoming interior spaces.',
    category: 'Interior Design',
    author: 'Admin',
    date: '2026-05-02',
    status: 'draft',
    reads: 890,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    content: `Minimalism often gets a bad reputation for being cold or clinical. However, when executed with a "warm" approach, it becomes one of the most inviting and sophisticated design styles. The key lies almost entirely in the selection of materials.

Start with the foundation: wood. Not the cold, highly polished veneers, but timber that celebrates its natural grain and imperfections. Light oak, ash, or even reclaimed teak provide a tactile warmth that instantly softens a minimalist layout. Whether used for flooring, cabinetry, or simple furniture, wood acts as the primary grounding element.

Next, introduce texture through stone and textiles. A honed limestone or a textured travertine backsplash adds a layer of quiet luxury that a flat tile simply cannot replicate. Complement these hard surfaces with soft linens, wool rugs, and bouclé upholstery. The contrast between the rigid lines of the architecture and the softness of the fabrics creates a balanced, lived-in feel.

Lighting is the final "material." In warm minimalism, we treat light as a physical element. Avoid harsh overhead fixtures. Instead, use layered lighting—soft sconces that wash over textured walls, floor lamps that create pools of light, and recessed LEDs that highlight architectural details. By focusing on how light interacts with your chosen materials, you can transform a simple room into a rich, sensory experience.`,
    tags: ['Interior Design', 'Minimalism', 'Materials'],
    seoTitle: 'Warm Minimalist Interior Materials | Pieach CMS',
    metaDescription: 'Practical notes on texture, lighting, and finishes for refined interior spaces.',
    slug: 'warm-minimalist-interiors'
  },
  {
    id: 'b3',
    title: 'Behind the Design: Lekki Courtyard Residence',
    excerpt: 'A project insight article on the planning, privacy strategies, and courtyard living of our latest Ikoyi project.',
    category: 'Project Insights',
    author: 'Admin',
    date: '2026-05-10',
    status: 'scheduled',
    reads: 0,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
    content: `The Lekki Courtyard Residence was born out of a specific challenge: how to provide an oasis of calm and privacy in one of Lagos's most densely populated neighborhoods. The solution was to look inward.

By flipping the traditional residential layout, we placed a lush, central courtyard at the heart of the home. This "void" became the primary focus around which all other spaces revolve. The ground floor living areas are wrapped in floor-to-ceiling glass, allowing the garden to feel like an extension of the interior. This creates an immediate sense of openness while the outer masonry walls provide total security and acoustic isolation from the street.

The courtyard also serves a vital environmental function. It acts as a thermal buffer, regulating the temperature of the surrounding rooms. The water feature within the courtyard provides evaporative cooling, which is further enhanced by the strategic placement of local vegetation. On the upper floors, private balconies look down into the courtyard, maintaining a connection to the family's private outdoor space from every level.

Materials were chosen for their durability and local relevance. Hand-pressed clay bricks provide a beautiful, rhythmic texture to the exterior, while internal finishes remain light and airy. The result is a home that feels perfectly suited to its environment—a modern sanctuary that respects both the climate and the need for familial privacy.`,
    tags: ['Project Insights', 'Courtyard Residence', 'Lekki'],
    seoTitle: 'Behind the Design: Lekki Courtyard | Pieach CMS',
    metaDescription: 'An inside look at the planning and design of the Lekki Courtyard Residence.',
    slug: 'lekki-courtyard-residence'
  },
  {
    id: 'b4',
    title: 'The Future of Sustainable Urbanism in West Africa',
    excerpt: 'Exploring how rapidly growing cities like Lagos and Accra can transition towards greener, more resilient infrastructure.',
    category: 'Urban Planning',
    author: 'Adaora Okeke',
    date: '2026-05-12',
    status: 'published',
    reads: 3200,
    image: 'https://images.unsplash.com/photo-1449156001437-af90bb4257e9?w=1200&q=80',
    content: `West African cities are currently undergoing one of the fastest urban transformations in history. As Lagos, Accra, and Abidjan continue to expand at unprecedented rates, the traditional models of urban planning are being pushed to their limits. The question is no longer just about managing growth, but about how to make that growth sustainable and resilient.

One of the most promising avenues is the integration of green-blue infrastructure. By incorporating natural drainage systems, urban wetlands, and tree canopies into the city fabric, we can mitigate the effects of urban heat islands and reduce the risk of flooding—a major challenge in coastal cities. This isn't just about aesthetics; it's about survival and the long-term economic viability of our urban centers.

Furthermore, we must rethink our approach to transportation. The reliance on private vehicles in cities with millions of residents is simply not scalable. The transition towards high-capacity transit systems, combined with "walkable" neighborhood designs, is essential. When we design cities for people rather than cars, we unlock a massive potential for social cohesion and economic opportunity.

Finally, decentralized energy and water systems represent a significant leap forward. Off-grid solar solutions and localized water treatment can provide reliable utilities to underserved areas without the massive capital expenditure of traditional centralized grids. By embracing these innovative strategies, West African cities can leapfrog the mistakes of the 20th-century urban models and become global leaders in sustainable urbanism.`,
    tags: ['Urbanism', 'Sustainability', 'Infrastructure'],
    seoTitle: 'Sustainable Urbanism in West Africa | Pieach CMS',
    metaDescription: 'Strategies for greener, more resilient urban growth in West African cities.',
    slug: 'sustainable-urbanism-west-africa'
  },
  {
    id: 'b5',
    title: 'Smart Homes: Beyond Gadgets and Automation',
    excerpt: 'Moving past the hype to understand how intelligent design can truly enhance the human experience at home.',
    category: 'Technology',
    author: 'Tunde Nwosu',
    date: '2026-05-15',
    status: 'draft',
    reads: 0,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&q=80',
    content: `For many, the term "smart home" conjures up images of talking speakers and color-changing lightbulbs. While these gadgets are impressive, they only scratch the surface of what a truly intelligent home can be. At its core, smart technology should be invisible, acting as a seamless layer that anticipates and supports the needs of the inhabitants.

The real power of a smart home lies in environmental optimization. Imagine a system that doesn't just turn on the AC, but adjusts the window shades and activates passive cooling vents based on the sun's position and current humidity. This type of proactive management reduces energy consumption significantly while maintaining a constant level of comfort that mechanical systems alone can't achieve.

Another critical aspect is security and well-being. Modern systems can monitor air quality, detect water leaks before they cause damage, and even analyze sleep patterns to adjust lighting and temperature for better rest. These features provide a sense of security and health that transcends simple convenience.

As we move forward, the focus will shift from "smart gadgets" to "integrated ecosystems." The goal is a home where the architecture and technology work in tandem. When the building's envelope, its mechanical systems, and its digital intelligence are designed as one, the home becomes a responsive environment that genuinely enhances our quality of life. This is the future we are building—one where technology serves humanity in the most intimate of spaces: the home.`,
    tags: ['Smart Home', 'Technology', 'Innovation'],
    seoTitle: 'The Future of Smart Homes | Pieach CMS',
    metaDescription: 'How intelligent home design goes beyond gadgets to improve quality of life.',
    slug: 'future-of-smart-homes'
  }
];

export const blogCategoriesData = [
  { id: 'bc1', name: 'Architecture Trends', slug: 'architecture-trends', status: 'Active', description: 'Latest movements and concepts shaping modern architecture.', postCount: 12 },
  { id: 'bc2', name: 'Interior Design', slug: 'interior-design', status: 'Active', description: 'Insights into creating beautiful, functional interior spaces.', postCount: 8 },
  { id: 'bc3', name: 'Industry News', slug: 'industry-news', status: 'Active', description: 'Updates from the world of construction and design.', postCount: 5 },
  { id: 'bc4', name: 'Sustainable Building', slug: 'sustainable-building', status: 'Active', description: 'Eco-friendly materials, practices, and certifications.', postCount: 15 }
];

export const mediaData = [
  {
    id: 'm1',
    filename: 'vertex-tower-render-01.jpg',
    type: 'image/jpeg',
    size: '4.2 MB',
    dateAdded: '2026-05-02',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'
  },
  {
    id: 'm2',
    filename: 'lumina-interior-lobby.png',
    type: 'image/png',
    size: '8.1 MB',
    dateAdded: '2026-05-01',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'
  },
  {
    id: 'm3',
    filename: 'oasis-center-blueprints.pdf',
    type: 'application/pdf',
    size: '12.5 MB',
    dateAdded: '2026-04-28',
    url: ''
  }
];

export const calendarData = [
  {
    id: 'c1',
    title: 'Initial Concept Review - Vertex',
    type: 'Client Meeting',
    date: '2026-05-06',
    time: '10:00 AM',
    participants: 'Eleanor Vance, Jonathan Davis'
  },
  {
    id: 'c2',
    title: 'Site Visit - Lumina Residences',
    type: 'Site Visit',
    date: '2026-05-06',
    time: '02:00 PM',
    participants: 'David Okafor, Marcus Thorne'
  },
  {
    id: 'c3',
    title: 'Zoning Board Hearing',
    type: 'Regulatory',
    date: '2026-05-08',
    time: '09:00 AM',
    participants: 'Eleanor Vance'
  }
];

export const MOCK_APPOINTMENTS = [
  {
    id: 'a1',
    client: 'Jonathan Davis',
    email: 'jdavis@vertexcorp.com',
    date: '2026-05-06',
    time: '10:00 AM',
    type: 'Consultation',
    status: 'Confirmed',
    notes: 'Initial discussion for a new commercial tower project in downtown.'
  },
  {
    id: 'a2',
    client: 'Amanda Lewis',
    email: 'alewis@cityplanning.gov',
    date: '2026-05-06',
    time: '02:00 PM',
    type: 'Review',
    status: 'Pending',
    notes: 'Review of zoning permits for Oasis Cultural Center.'
  },
  {
    id: 'a3',
    client: 'Rachel Green',
    email: 'rgreen@example.com',
    date: '2026-05-08',
    time: '11:30 AM',
    type: 'Consultation',
    status: 'Cancelled',
    notes: 'Client requested to reschedule for next week.'
  },
  {
    id: 'a4',
    client: 'Tom Hanks',
    email: 'thanks@example.com',
    date: '2026-05-09',
    time: '03:00 PM',
    type: 'Site Visit',
    status: 'Confirmed',
    notes: 'Site visit for the new residential complex.'
  }
];

