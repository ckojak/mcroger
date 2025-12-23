-- Migration: Improved schema with validations, indexes and enhanced security
-- Created: 2025-12-23 00:00:00 UTC
-- Description: Adds validations, indexes, users table, and enhanced RLS policies

-- ============================================================================
-- 1. CREATE USERS TABLE (Profile extension)
-- ============================================================================
-- This table extends auth.users with additional profile information
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile"
ON public.users
FOR SELECT
TO authenticated
USING (id = auth.uid());

CREATE POLICY "Users can update their own profile"
ON public.users
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

CREATE POLICY "Admins can view all profiles"
ON public.users
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for users updated_at
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- 2. ADD VALIDATIONS TO PRESS_ARTICLES
-- ============================================================================
-- Add CHECK constraints for URL validations
ALTER TABLE public.press_articles 
ADD CONSTRAINT press_articles_link_format 
CHECK (link ~* '^https?://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(/.*)?$');

ALTER TABLE public.press_articles 
ADD CONSTRAINT press_articles_image_url_format 
CHECK (image_url IS NULL OR image_url ~* '^https?://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(/.*)?$');

-- Add constraint to ensure title is not empty
ALTER TABLE public.press_articles 
ADD CONSTRAINT press_articles_title_not_empty 
CHECK (LENGTH(TRIM(title)) > 0);

ALTER TABLE public.press_articles 
ADD CONSTRAINT press_articles_source_not_empty 
CHECK (LENGTH(TRIM(source)) > 0);

-- ============================================================================
-- 3. ADD VALIDATIONS TO PRESAVES
-- ============================================================================
ALTER TABLE public.presaves 
ADD CONSTRAINT presaves_presave_link_format 
CHECK (presave_link ~* '^https?://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(/.*)?$');

ALTER TABLE public.presaves 
ADD CONSTRAINT presaves_cover_url_format 
CHECK (cover_url IS NULL OR cover_url ~* '^https?://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(/.*)?$');

ALTER TABLE public.presaves 
ADD CONSTRAINT presaves_title_not_empty 
CHECK (LENGTH(TRIM(title)) > 0);

-- ============================================================================
-- 4. ADD VALIDATIONS TO EVENTS
-- ============================================================================
ALTER TABLE public.events 
ADD CONSTRAINT events_ticket_link_format 
CHECK (ticket_link IS NULL OR ticket_link ~* '^https?://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(/.*)?$');

ALTER TABLE public.events 
ADD CONSTRAINT events_title_not_empty 
CHECK (LENGTH(TRIM(title)) > 0);

ALTER TABLE public.events 
ADD CONSTRAINT events_venue_not_empty 
CHECK (LENGTH(TRIM(venue)) > 0);

ALTER TABLE public.events 
ADD CONSTRAINT events_city_not_empty 
CHECK (LENGTH(TRIM(city)) > 0);

-- Ensure event_date is not in the distant past (more than 10 years ago)
ALTER TABLE public.events 
ADD CONSTRAINT events_date_reasonable 
CHECK (event_date >= CURRENT_DATE - INTERVAL '10 years');

-- ============================================================================
-- 5. ADD VALIDATIONS TO RELEASES
-- ============================================================================
ALTER TABLE public.releases 
ADD CONSTRAINT releases_spotify_link_format 
CHECK (spotify_link IS NULL OR spotify_link ~* '^https?://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(/.*)?$');

ALTER TABLE public.releases 
ADD CONSTRAINT releases_youtube_link_format 
CHECK (youtube_link IS NULL OR youtube_link ~* '^https?://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(/.*)?$');

ALTER TABLE public.releases 
ADD CONSTRAINT releases_cover_url_format 
CHECK (cover_url IS NULL OR cover_url ~* '^https?://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(/.*)?$');

ALTER TABLE public.releases 
ADD CONSTRAINT releases_title_not_empty 
CHECK (LENGTH(TRIM(title)) > 0);

-- ============================================================================
-- 6. ADD VALIDATIONS TO MEDIA_ITEMS
-- ============================================================================
ALTER TABLE public.media_items 
ADD CONSTRAINT media_items_url_format 
CHECK (url ~* '^https?://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(/.*)?$');

ALTER TABLE public.media_items 
ADD CONSTRAINT media_items_thumbnail_url_format 
CHECK (thumbnail_url IS NULL OR thumbnail_url ~* '^https?://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(/.*)?$');

ALTER TABLE public.media_items 
ADD CONSTRAINT media_items_drive_link_format 
CHECK (drive_link IS NULL OR drive_link ~* '^https?://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(/.*)?$');

ALTER TABLE public.media_items 
ADD CONSTRAINT media_items_title_not_empty 
CHECK (LENGTH(TRIM(title)) > 0);

ALTER TABLE public.media_items 
ADD CONSTRAINT media_items_display_order_non_negative 
CHECK (display_order >= 0);

-- ============================================================================
-- 7. CREATE PERFORMANCE INDEXES
-- ============================================================================
-- Indexes for press_articles
CREATE INDEX IF NOT EXISTS idx_press_articles_is_active ON public.press_articles(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_press_articles_published_at ON public.press_articles(published_at DESC) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_press_articles_created_at ON public.press_articles(created_at DESC);

-- Indexes for events
CREATE INDEX IF NOT EXISTS idx_events_is_active ON public.events(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_events_event_date ON public.events(event_date DESC) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_events_city ON public.events(city) WHERE is_active = true;

-- Indexes for presaves
CREATE INDEX IF NOT EXISTS idx_presaves_is_active ON public.presaves(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_presaves_release_date ON public.presaves(release_date DESC) WHERE is_active = true;

-- Indexes for releases
CREATE INDEX IF NOT EXISTS idx_releases_is_active ON public.releases(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_releases_release_date ON public.releases(release_date DESC) WHERE is_active = true;

-- Indexes for media_items
CREATE INDEX IF NOT EXISTS idx_media_items_category ON public.media_items(category) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_media_items_display_order ON public.media_items(category, display_order) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_media_items_is_active ON public.media_items(is_active) WHERE is_active = true;

-- Indexes for user_roles
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);

-- Indexes for users
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- Indexes for site_visits
CREATE INDEX IF NOT EXISTS idx_site_visits_visited_at ON public.site_visits(visited_at DESC);
CREATE INDEX IF NOT EXISTS idx_site_visits_page ON public.site_visits(page);

-- ============================================================================
-- 8. ENHANCED RLS POLICIES
-- ============================================================================
-- Add policy to allow users to insert their own profile on signup
CREATE POLICY "Users can insert their own profile"
ON public.users
FOR INSERT
TO authenticated
WITH CHECK (id = auth.uid());

-- Enhanced policy for press_articles - allow unauthenticated read
DROP POLICY IF EXISTS "Anyone can view active articles" ON public.press_articles;
CREATE POLICY "Anyone can view active articles"
ON public.press_articles
FOR SELECT
TO public
USING (is_active = true);

-- Enhanced policy for events - allow unauthenticated read
DROP POLICY IF EXISTS "Anyone can view active events" ON public.events;
CREATE POLICY "Anyone can view active events"
ON public.events
FOR SELECT
TO public
USING (is_active = true);

-- Enhanced policy for presaves - allow unauthenticated read
DROP POLICY IF EXISTS "Anyone can view active presaves" ON public.presaves;
CREATE POLICY "Anyone can view active presaves"
ON public.presaves
FOR SELECT
TO public
USING (is_active = true);

-- Enhanced policy for releases - allow unauthenticated read
DROP POLICY IF EXISTS "Anyone can view active releases" ON public.releases;
CREATE POLICY "Anyone can view active releases"
ON public.releases
FOR SELECT
TO public
USING (is_active = true);

-- Enhanced policy for media_items - allow unauthenticated read
DROP POLICY IF EXISTS "Anyone can view active media" ON public.media_items;
CREATE POLICY "Anyone can view active media"
ON public.media_items
FOR SELECT
TO public
USING (is_active = true);

-- ============================================================================
-- 9. HELPER FUNCTIONS
-- ============================================================================
-- Function to get user email from auth.users
CREATE OR REPLACE FUNCTION public.get_user_email(_user_id UUID)
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, auth
AS $$
  SELECT email FROM auth.users WHERE id = _user_id
$$;

-- Function to check if user has any role (returns all roles for a user)
CREATE OR REPLACE FUNCTION public.get_user_roles(_user_id UUID)
RETURNS TABLE(role public.app_role)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.user_roles WHERE user_id = _user_id
$$;

-- ============================================================================
-- 10. COMMENTS FOR DOCUMENTATION
-- ============================================================================
COMMENT ON TABLE public.users IS 'User profiles extending auth.users with additional information';
COMMENT ON TABLE public.user_roles IS 'User role assignments for authorization';
COMMENT ON TABLE public.press_articles IS 'Press articles and media coverage';
COMMENT ON TABLE public.events IS 'Upcoming and past events';
COMMENT ON TABLE public.presaves IS 'Music pre-save campaigns';
COMMENT ON TABLE public.releases IS 'Music releases';
COMMENT ON TABLE public.media_items IS 'Media items including photos, videos, logos, and rider documents';
COMMENT ON TABLE public.site_visits IS 'Analytics for site visits';

COMMENT ON FUNCTION public.has_role IS 'Check if a user has a specific role';
COMMENT ON FUNCTION public.get_user_email IS 'Get user email from auth.users by user ID';
COMMENT ON FUNCTION public.get_user_roles IS 'Get all roles assigned to a user';
COMMENT ON FUNCTION public.update_updated_at_column IS 'Automatically update updated_at timestamp on row update';
