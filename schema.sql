-- ==============================================================================
-- 🎲 D&D 5E NEXUS - PRODUCTION SUPABASE / POSTGRESQL SQL SCHEMA
-- ==============================================================================
-- Paste this script into your Supabase Dashboard: SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Profiles Table (User Accounts)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id_tag TEXT UNIQUE NOT NULL, -- e.g., 'gandalf', 'thorin'
  username TEXT NOT NULL,           -- Display name e.g., 'Ak Gandalf'
  avatar TEXT DEFAULT '🧙‍♂️',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger: Auto-create Profile in public.profiles when User Signs Up via Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, user_id_tag, username, avatar)
  VALUES (
    NEW.id,
    SPLIT_PART(NEW.email, '@', 1),
    COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar', '🧙‍♂️')
  )
  ON CONFLICT (user_id_tag) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Create Campaigns Table (Lobby Matchmaking & DM Rooms)
CREATE TABLE IF NOT EXISTS public.campaigns (
  code TEXT PRIMARY KEY,             -- e.g., 'CAMP-8F92A'
  title TEXT NOT NULL,              -- e.g., 'Phandelver Madenleri'
  dm_id TEXT NOT NULL,              -- Host User ID
  dm_name TEXT NOT NULL,            -- DM Display Name
  dm_avatar TEXT DEFAULT '👑',
  player_count INT DEFAULT 1,
  max_players INT DEFAULT 6,
  status TEXT DEFAULT 'open',        -- 'open' or 'combat'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Characters Table (Cloud Backups & Sheet Sync)
CREATE TABLE IF NOT EXISTS public.characters (
  id TEXT PRIMARY KEY,              -- e.g., 'char-1785532100'
  user_id TEXT NOT NULL,
  campaign_code TEXT REFERENCES public.campaigns(code) ON DELETE CASCADE,
  char_name TEXT NOT NULL,
  character_data JSONB NOT NULL,    -- Complete 5e Character Sheet JSON payload
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create Roll Events Table (Live Roll Feed History)
CREATE TABLE IF NOT EXISTS public.roll_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_code TEXT REFERENCES public.campaigns(code) ON DELETE CASCADE,
  char_name TEXT NOT NULL,
  roll_name TEXT NOT NULL,
  total INT NOT NULL,
  detail_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_characters_campaign_code ON public.characters(campaign_code);
CREATE INDEX IF NOT EXISTS idx_roll_events_campaign_code ON public.roll_events(campaign_code);
CREATE INDEX IF NOT EXISTS idx_campaigns_updated_at ON public.campaigns(updated_at DESC);

-- 7. Trigger Function for Automatic updated_at Timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach Triggers to Tables
DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_campaigns_updated_at ON public.campaigns;
CREATE TRIGGER set_campaigns_updated_at
  BEFORE UPDATE ON public.campaigns
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_characters_updated_at ON public.characters;
CREATE TRIGGER set_characters_updated_at
  BEFORE UPDATE ON public.characters
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 8. Enable Supabase Realtime Publications for Live WebSockets
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'campaigns'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.campaigns;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'characters'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.characters;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'roll_events'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.roll_events;
  END IF;
END $$;

-- 9. Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roll_events ENABLE ROW LEVEL SECURITY;

-- Allow Public Anonymous Read & Write Access for D&D 5e Nexus Client App
CREATE POLICY "Public Read Profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public Insert Profiles" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Profiles" ON public.profiles FOR UPDATE USING (true);

CREATE POLICY "Public Read Campaigns" ON public.campaigns FOR SELECT USING (true);
CREATE POLICY "Public Insert Campaigns" ON public.campaigns FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Campaigns" ON public.campaigns FOR UPDATE USING (true);

CREATE POLICY "Public Read Characters" ON public.characters FOR SELECT USING (true);
CREATE POLICY "Public Insert Characters" ON public.characters FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Characters" ON public.characters FOR UPDATE USING (true);

CREATE POLICY "Public Read Roll Events" ON public.roll_events FOR SELECT USING (true);
CREATE POLICY "Public Insert Roll Events" ON public.roll_events FOR INSERT WITH CHECK (true);

-- ==============================================================================
-- SCHEMA CREATION COMPLETE 🎉
-- ==============================================================================
