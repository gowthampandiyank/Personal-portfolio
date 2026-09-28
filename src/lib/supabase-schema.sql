-- =========================================================================
-- GOWTHAM PANDIYAN // DATA ANALYST & VIBE CODER PORTFOLIO SCHEMA
-- Supabase PostgreSQL Schema with Row Level Security (RLS)
-- =========================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'primary',
  name TEXT NOT NULL DEFAULT 'GOWTHAM PANDIYAN',
  professional_title TEXT NOT NULL DEFAULT 'DATA ANALYST & VIBE CODER',
  bio TEXT NOT NULL,
  secondary_bio TEXT,
  email TEXT NOT NULL DEFAULT 'gowthampandiyan7@gmail.com',
  phone TEXT,
  location TEXT DEFAULT 'Tamil Nadu, India',
  linkedin TEXT,
  github TEXT,
  resume_url TEXT,
  status_badge TEXT DEFAULT 'Actively Building & Shipping Projects | Available for Data Analyst & Vibe Coding Roles',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  proficiency_level TEXT DEFAULT 'Proficient',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT NOT NULL,
  live_url TEXT,
  github_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. EXPERIENCE TABLE
CREATE TABLE IF NOT EXISTS public.experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company TEXT NOT NULL,
  job_title TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL DEFAULT 'Present',
  description TEXT NOT NULL,
  skills TEXT[] NOT NULL DEFAULT '{}',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 1. Site Settings Policies
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admin can update site settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');

-- 2. Skills Policies
CREATE POLICY "Public can view skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Admin can modify skills" ON public.skills FOR ALL USING (auth.role() = 'authenticated');

-- 3. Projects Policies
CREATE POLICY "Public can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Admin can modify projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');

-- 4. Experience Policies
CREATE POLICY "Public can view experience" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Admin can modify experience" ON public.experience FOR ALL USING (auth.role() = 'authenticated');

-- 5. Contact Messages Policies
CREATE POLICY "Anyone can submit contact message" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can read and delete messages" ON public.contact_messages FOR ALL USING (auth.role() = 'authenticated');

-- =========================================================================
-- INITIAL SEED DATA
-- =========================================================================

INSERT INTO public.site_settings (id, name, professional_title, bio, secondary_bio, email, location, linkedin, github)
VALUES (
  'primary',
  'GOWTHAM PANDIYAN',
  'DATA ANALYST & VIBE CODER',
  'Data Analyst and Vibe Coder based in Chennai, actively building data analytics pipelines, interactive Power BI intelligence dashboards, and high-performance vibe-coded web applications.',
  'Bridging rapid vibe-coding execution with rigorous data analytical discipline — transforming raw, messy records into structured visual insights, high-speed interactive UI platforms, and automated workflow solutions.',
  'gowthampandiyan7@gmail.com',
  'Tamil Nadu, India',
  'https://linkedin.com/in/gowtham-pandiyan',
  'https://github.com/gowthampandiyan'
) ON CONFLICT (id) DO NOTHING;
