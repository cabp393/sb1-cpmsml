-- Create enum for bay status
CREATE TYPE bay_status AS ENUM ('empty', 'loading', 'available', 'used');

-- Create bays table with RLS enabled
CREATE TABLE bays (
  id TEXT PRIMARY KEY,
  status bay_status NOT NULL DEFAULT 'empty',
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_bays_updated_at
  BEFORE UPDATE ON bays
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE bays ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow users to select their own bays
CREATE POLICY "Users can view their own bays"
  ON bays FOR SELECT
  USING (auth.uid() = user_id);

-- Allow users to insert their own bays
CREATE POLICY "Users can insert their own bays"
  ON bays FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own bays
CREATE POLICY "Users can update their own bays"
  ON bays FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own bays
CREATE POLICY "Users can delete their own bays"
  ON bays FOR DELETE
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX bays_user_id_idx ON bays(user_id);