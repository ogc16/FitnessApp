/*
  # Add posts table and goal-based feed

  1. New Tables
    - `posts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `content` (text)
      - `image_url` (text)
      - `activity_type` (text)
      - `duration` (interval)
      - `distance` (numeric)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `posts` table
    - Add policies for:
      - Users can read posts from users with matching fitness goals
      - Users can create their own posts
      - Users can update/delete their own posts
*/

CREATE TABLE posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content text,
  image_url text,
  activity_type text NOT NULL,
  duration interval,
  distance numeric,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Policy to read posts from users with matching fitness goals
CREATE POLICY "Users can read posts from matching goals"
  ON posts
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles author_profile
      WHERE author_profile.id = posts.user_id
      AND author_profile.fitness_goal = (
        SELECT fitness_goal FROM profiles
        WHERE id = auth.uid()
      )
    )
  );

-- Policy to create own posts
CREATE POLICY "Users can create own posts"
  ON posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy to update own posts
CREATE POLICY "Users can update own posts"
  ON posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy to delete own posts
CREATE POLICY "Users can delete own posts"
  ON posts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);