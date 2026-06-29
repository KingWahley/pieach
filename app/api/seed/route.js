// app/api/seed/route.js
import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { PROJECTS, SERVICES, TEAM_MEMBERS, BLOG_POSTS, PARTNERS } from '@/lib/constants';

export async function GET(request) {
  // Prevent run in non-development unless authorized
  if (process.env.NODE_ENV !== 'development') {
    const { searchParams } = new URL(request.url);
    if (searchParams.get('key') !== process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  const supabase = createAdminClient();

  try {
    // 1. Seed Site Content (CTA, Hero, services, etc.)
    await supabase.from('site_content').upsert([
      {
        key: 'global_cta',
        content: {
          subtitle: "LET'S BUILD TOGETHER",
          title: "Have a vision? Let's make it",
          titleItalic: "real.",
          description: "Every landmark began as a conversation.",
          buttonText: "Book a Consultation",
          buttonLink: "/book-appointment"
        }
      },
      {
        key: 'partners',
        content: PARTNERS
      },
      {
        key: 'services_copy',
        content: SERVICES
      }
    ]);

    // 2. Seed Project Categories
    const categories = [
      { id: 'commercial', name: 'Commercial', description: 'Retail hubs, shopping malls, office buildings' },
      { id: 'residential', name: 'Luxury Residential', description: 'Private residences, villas, apartments' },
      { id: 'hospitality', name: 'Hospitality', description: 'Hotels, resorts, event centers' },
      { id: 'masterplanning', name: 'Masterplanning', description: 'Urban planning and landscape corridors' },
      { id: 'sustainable', name: 'Sustainable', description: 'Eco-friendly and carbon-neutral designs' }
    ];
    await supabase.from('project_categories').upsert(categories);

    // 3. Seed Projects
    // Load dashboard mock data dynamically to avoid import issues before full merge
    const { projectsData } = require('@/data/mockData');
    
    // Map Project A (frontend) projects
    const mappedA = PROJECTS.map(p => ({
      id: String(p.id),
      title: p.title,
      slug: p.slug,
      category: p.category,
      groups: p.groups || [],
      image: p.image,
      description: p.description,
      year: p.year,
      location: p.location,
      specs: p.specs || {},
      gallery: p.gallery || [],
      status: 'Completed'
    }));

    // Map Project B (dashboard) projects
    const mappedB = projectsData.map(p => ({
      id: p.id,
      title: p.title,
      slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category: p.category.toUpperCase(),
      groups: [p.category.toLowerCase()],
      image: p.image,
      description: p.description,
      year: p.date ? p.date.substring(0, 4) : '2025',
      location: p.location,
      specs: {
        projectType: p.subtitle || p.category,
        siteArea: 'N/A',
        builtArea: 'N/A',
        status: p.status,
        leadArchitect: 'Admin Team',
        services: p.category,
        additionalFields: p.additionalFields || []
      },
      gallery: p.gallery || [],
      status: p.status
    }));

    // Combine and upsert
    const allProjects = [...mappedA, ...mappedB];
    await supabase.from('projects').upsert(allProjects);

    // 4. Seed Team Members
    const mappedTeam = TEAM_MEMBERS.map((t, idx) => ({
      id: `t-${idx + 1}`,
      slug: t.slug,
      name: t.name,
      role: t.role,
      gender: t.gender || 'unspecified',
      image: t.image,
      bio: t.bio || [],
      qualifications: t.qualifications || [],
      order_index: idx
    }));
    await supabase.from('team').upsert(mappedTeam);

    // 5. Seed Blog Categories
    const blogCategories = [
      { id: 'sustainability', name: 'Sustainability', slug: 'sustainability' },
      { id: 'interiors', name: 'Interiors', slug: 'interiors' },
      { id: 'practice', name: 'Practice', slug: 'practice' },
      { id: 'urbanplanning', name: 'Urban Planning', slug: 'urban-planning' }
    ];
    await supabase.from('blog_categories').upsert(blogCategories);

    // 6. Seed Blog Posts
    const { blogData } = require('@/data/mockData');
    
    // Map Project A blog posts
    const mappedBlogA = BLOG_POSTS.map((b, idx) => ({
      id: `blog-a-${idx + 1}`,
      slug: b.slug,
      title: b.title,
      category: b.category,
      date: b.date,
      read_time: b.readTime || '8 MIN READ',
      summary: b.summary,
      image: b.image,
      content: b.content,
      author: 'PIEACH Studio',
      status: 'published'
    }));

    // Map Project B blog posts
    const mappedBlogB = blogData.map(b => ({
      id: b.id,
      slug: b.slug || b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: b.title,
      category: b.category.toUpperCase(),
      date: new Date(b.date || b.datePosted).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase(),
      read_time: b.readTime || '8 MIN READ',
      summary: b.summary || b.excerpt || '',
      image: b.image || '/assets/blog_house.png',
      content: b.content || `<p>${b.summary}</p>`,
      author: b.author || 'Admin',
      status: b.status || 'published'
    }));

    const allBlogs = [...mappedBlogA, ...mappedBlogB];
    await supabase.from('blog_posts').upsert(allBlogs);

    // 7. Seed Vacancies (Careers)
    const { vacanciesData } = require('@/data/mockData');
    const mappedVacancies = vacanciesData.map(v => ({
      id: v.id,
      title: v.title,
      department: v.department,
      location: v.location,
      type: v.type,
      status: v.status,
      deadline: v.deadline,
      date_posted: v.datePosted,
      description: v.description,
      skills: v.skills || []
    }));
    await supabase.from('vacancies').upsert(mappedVacancies);

    // 8. Seed Job Applications
    const { jobApplicationsData } = require('@/data/mockData');
    const mappedApplications = jobApplicationsData.map(a => ({
      id: a.id,
      vacancy_id: a.jobId || null,
      applicant_name: a.applicantName,
      applicant_email: a.email || 'applicant@example.com',
      role_applied: a.roleApplied,
      status: a.status,
      date: a.date,
      cv_file_name: a.cvFileName || null,
      cv_file_url: a.cvFileUrl || null,
      cover_letter: a.coverLetter || ''
    }));
    await supabase.from('job_applications').upsert(mappedApplications);

    // 9. Seed Contact Messages
    const { messagesData } = require('@/data/mockData');
    const mappedMessages = messagesData.map(m => ({
      id: m.id,
      first_name: m.firstName,
      last_name: m.lastName,
      email: m.email,
      phone: m.phone || '',
      subject: m.subject,
      body: m.body,
      status: m.status,
      date: m.date
    }));
    await supabase.from('messages').upsert(mappedMessages);

    // 10. Seed Appointments
    const { NEW_MOCK_APPOINTMENTS } = require('@/data/appointments');
    const mappedAppointments = NEW_MOCK_APPOINTMENTS.map(a => ({
      id: a.id,
      client_name: a.clientName || a.client || a.title || 'Client',
      client_email: a.clientEmail || 'client@example.com',
      client_phone: a.clientPhone || '',
      preferred_date: a.preferredDate || a.date,
      preferred_time: a.preferredTime || a.time || '10:00 AM',
      service: a.service || 'General Consultation',
      message: a.message || '',
      status: a.status || 'Pending',
      date: a.date || new Date().toISOString().split('T')[0],
      notes: a.notes || '',
      approved_by: a.approvedBy || null,
      rejected_by: a.rejectedBy || null
    }));
    await supabase.from('appointments').upsert(mappedAppointments);

    // 11. Seed Calendar Settings
    const { initialCalendarSettings } = require('@/data/calendarSettings');
    await supabase.from('calendar_settings').upsert([
      { id: 'default', settings: initialCalendarSettings }
    ]);

    // 12. Seed Media Assets
    const { mediaData } = require('@/data/mockData');
    const mappedMedia = mediaData.map(m => ({
      id: m.id,
      name: m.filename || m.name || 'unnamed',
      url: m.url || '',
      size: m.size || '',
      type: m.type || ''
    }));
    await supabase.from('media').upsert(mappedMedia);

    return NextResponse.json({ success: true, message: 'Database successfully seeded!' });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
