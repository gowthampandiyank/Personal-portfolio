export type SkillCategory = 'Data Analytics & BI' | 'Web Development' | 'UI / UX & Tools' | string;

export type UserRole = 'admin' | 'developer' | 'viewer' | string;

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  is_verified: boolean;
  mfa_enabled?: boolean;
  last_login?: string;
  avatar_url?: string;
  created_at?: string;
}

export interface SecuritySession {
  token: string;
  user: UserAccount;
  ip: string;
  device: string;
  otp_verified: boolean;
  login_time?: string;
  created_at?: string;
  expires_at?: string;
  [key: string]: any;
}

export interface PermissionSettings {
  allowPublicComments?: boolean;
  requireAdminOtp?: boolean;
  enableTelemetry?: boolean;
  maintenanceMode?: boolean;
}

export interface EmbroideredApparel {
  id: string;
  title: string;
  category?: string;
  franchise?: string;
  price?: number;
  image_url: string;
  description?: string;
  [key: string]: any;
}

export interface AttachedFile {
  id?: string;
  name: string;
  type: 'image' | 'video' | 'pdf' | 'doc' | string;
  size: string;
  url: string;
  description?: string;
  uploaded_at?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency_level?: string;
  display_order: number;
  files?: AttachedFile[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectDocument {
  name?: string;
  title?: string;
  type?: 'pdf' | 'csv' | 'sql' | 'spec' | 'data-dictionary' | 'video' | 'image' | 'doc' | 'sheet' | 'code' | string;
  size: string;
  url?: string;
  description?: string;
  file_type?: string;
}

export interface ProjectMedia {
  type: 'image' | 'video';
  title: string;
  url: string;
  caption?: string;
}

export interface ProjectDocumentation {
  summary: string;
  architecture?: string[];
  pipelineSteps?: string[];
  sqlFormulas?: string[];
  keyOutcomes?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  long_description?: string;
  category: string;
  technologies: string[];
  image_url: string;
  images?: string[];
  live_url?: string;
  github_url?: string;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  metrics?: ProjectMetric[];
  key_features?: string[];
  architecture?: string;
  video_url?: string;
  documents?: ProjectDocument[];
  gallery?: ProjectMedia[];
  video_demo_url?: string;
  documentation?: ProjectDocumentation;
  files?: AttachedFile[];
  links?: any;
  [key: string]: any;
}

export interface ExperienceItem {
  id: string;
  company: string;
  job_title: string;
  start_date: string;
  end_date: string;
  description: string;
  skills: string[];
  display_order: number;
  files?: AttachedFile[];
}

export interface ContactAttachment {
  name: string;
  size: string;
  type: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
  inquiry_type?: string;
  attachments?: ContactAttachment[];
  preferred_call?: boolean;
  confirmation_sent?: boolean;
}

export interface SiteSettings {
  name: string;
  professional_title: string;
  bio: string;
  secondary_bio: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  resume_url: string;
  status_badge: string;
}

