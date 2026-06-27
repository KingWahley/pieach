-- schema.sql
-- Drop tables if they exist
DROP TABLE IF EXISTS media CASCADE;
DROP TABLE IF EXISTS calendar_settings CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS job_applications CASCADE;
DROP TABLE IF EXISTS vacancies CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS blog_categories CASCADE;
DROP TABLE IF EXISTS team CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS project_categories CASCADE;
DROP TABLE IF EXISTS site_content CASCADE;
DROP TABLE IF EXISTS blog CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS contact_details CASCADE;

-- Enable UUID extension if available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Site Content Table (for static pages copy)
CREATE TABLE site_content (
    key TEXT PRIMARY KEY,
    content JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Project Categories
CREATE TABLE project_categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Projects Table
CREATE TABLE projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT,
    groups TEXT[] DEFAULT '{}',
    image TEXT,
    description TEXT,
    year TEXT,
    location TEXT,
    specs JSONB DEFAULT '{}'::jsonb,
    gallery TEXT[] DEFAULT '{}',
    status TEXT DEFAULT 'Draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Team Members Table
CREATE TABLE team (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    gender TEXT,
    image TEXT,
    bio TEXT[] DEFAULT '{}',
    qualifications JSONB DEFAULT '[]'::jsonb,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. Blog Categories Table
CREATE TABLE blog_categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. Blog Posts Table
CREATE TABLE blog_posts (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT,
    date TEXT,
    read_time TEXT,
    summary TEXT,
    image TEXT,
    content TEXT,
    author TEXT DEFAULT 'Admin',
    status TEXT DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. Vacancies (Careers) Table
CREATE TABLE vacancies (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    department TEXT,
    location TEXT,
    type TEXT,
    status TEXT DEFAULT 'draft',
    deadline DATE,
    date_posted DATE DEFAULT CURRENT_DATE,
    description TEXT,
    skills JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 8. Job Applications Table
CREATE TABLE job_applications (
    id TEXT PRIMARY KEY,
    vacancy_id TEXT REFERENCES vacancies(id) ON DELETE SET NULL,
    applicant_name TEXT NOT NULL,
    applicant_email TEXT NOT NULL,
    role_applied TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    date TEXT,
    cv_file_name TEXT,
    cv_file_url TEXT,
    cover_letter TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 9. Contact Messages Table
CREATE TABLE messages (
    id TEXT PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    phone TEXT,
    subject TEXT,
    body TEXT,
    status TEXT DEFAULT 'unread',
    date TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 10. Appointments Table
CREATE TABLE appointments (
    id TEXT PRIMARY KEY,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT,
    preferred_date TEXT,
    preferred_time TEXT,
    service TEXT,
    message TEXT,
    status TEXT DEFAULT 'Pending',
    date TEXT,
    notes TEXT,
    approved_by TEXT,
    rejected_by TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 11. Calendar Settings Table
CREATE TABLE calendar_settings (
    id TEXT PRIMARY KEY,
    settings JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 12. Media Table
CREATE TABLE media (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    size TEXT,
    type TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE team ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE vacancies ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- 1. Site Content policies
CREATE POLICY "Allow public read access for site_content" ON site_content FOR SELECT USING (true);
CREATE POLICY "Allow all access for authenticated users on site_content" ON site_content TO authenticated USING (true) WITH CHECK (true);

-- 2. Project Categories policies
CREATE POLICY "Allow public read access for project_categories" ON project_categories FOR SELECT USING (true);
CREATE POLICY "Allow all access for authenticated users on project_categories" ON project_categories TO authenticated USING (true) WITH CHECK (true);

-- 3. Projects policies
CREATE POLICY "Allow public read access for projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow all access for authenticated users on projects" ON projects TO authenticated USING (true) WITH CHECK (true);

-- 4. Team policies
CREATE POLICY "Allow public read access for team" ON team FOR SELECT USING (true);
CREATE POLICY "Allow all access for authenticated users on team" ON team TO authenticated USING (true) WITH CHECK (true);

-- 5. Blog Categories policies
CREATE POLICY "Allow public read access for blog_categories" ON blog_categories FOR SELECT USING (true);
CREATE POLICY "Allow all access for authenticated users on blog_categories" ON blog_categories TO authenticated USING (true) WITH CHECK (true);

-- 6. Blog Posts policies
CREATE POLICY "Allow public read access for blog_posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Allow all access for authenticated users on blog_posts" ON blog_posts TO authenticated USING (true) WITH CHECK (true);

-- 7. Vacancies policies
CREATE POLICY "Allow public read access for vacancies" ON vacancies FOR SELECT USING (true);
CREATE POLICY "Allow all access for authenticated users on vacancies" ON vacancies TO authenticated USING (true) WITH CHECK (true);

-- 8. Job Applications policies
CREATE POLICY "Allow public insert access for job_applications" ON job_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all access for authenticated users on job_applications" ON job_applications TO authenticated USING (true) WITH CHECK (true);

-- 9. Messages policies
CREATE POLICY "Allow public insert access for messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all access for authenticated users on messages" ON messages TO authenticated USING (true) WITH CHECK (true);

-- 10. Appointments policies
CREATE POLICY "Allow public insert access for appointments" ON appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all access for authenticated users on appointments" ON appointments TO authenticated USING (true) WITH CHECK (true);

-- 11. Calendar Settings policies
CREATE POLICY "Allow public read access for calendar_settings" ON calendar_settings FOR SELECT USING (true);
CREATE POLICY "Allow all access for authenticated users on calendar_settings" ON calendar_settings TO authenticated USING (true) WITH CHECK (true);

-- 12. Media policies
CREATE POLICY "Allow public read access for media" ON media FOR SELECT USING (true);
CREATE POLICY "Allow all access for authenticated users on media" ON media TO authenticated USING (true) WITH CHECK (true);
