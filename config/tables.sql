CREATE TABLE users (
  id serial PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  password text NOT NULL,
  image text NOT NULL,
  "createdAt" timestamp DEFAULT NOW()
);

CREATE TABLE sessions (
  id serial PRIMARY KEY,
  "userId" integer NOT NULL REFERENCES "users"("id"),
  token text NOT NULL,
  "createdAt" timestamp DEFAULT NOW()
);

CREATE TABLE posts (
  id serial PRIMARY KEY,
  "userId" integer NOT NULL REFERENCES "users"("id"),
  link text NOT NULL,
  description text,
  "createdAt" timestamp DEFAULT NOW()
);

CREATE TABLE "postLike" (
  id serial PRIMARY KEY,
  "userId" integer NOT NULL REFERENCES "users"("id"),
  "postId" integer NOT NULL REFERENCES "posts"("id")
);

CREATE TABLE comments (
  id serial PRIMARY KEY,
  "userId" integer NOT NULL REFERENCES "users"("id"),
  "postId" integer NOT NULL REFERENCES "posts"("id"),
  comment text NOT NULL
);

CREATE TABLE hashtags (
  id serial PRIMARY KEY,
  name text NOT NULL,
  "createdAt" timestamp DEFAULT NOW()
);

CREATE TABLE "postHashtag" (
  id serial PRIMARY KEY,
  "postId" integer NOT NULL REFERENCES "posts"("id"),
  "hashtagId" integer NOT NULL REFERENCES "hashtags"("id")
);

CREATE TABLE follows (
    id serial PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES "users"("id"),
    "followId" INTEGER NOT NULL REFERENCES "users"("id"),
    "createdAt" timestamp DEFAULT NOW()
);