This is an app made with Nextjs 13, Typescript, Supabase (frontend & backend), Apache Spark, Python (Dataset creation)
Auth implemented with supabase auth (email/password)
Tables implemented using Tanstack Table
Data created using Apache Spark/Python
Users can search for a movie based on 1) movie name 2) director 3) actor
Users can add a movie to their watchlist - linked to profile

All components are styled with tailwind (No ui library used )


** To create types from supabase db:
    npx supabase login (need an access token)
    npx supabase gen types typescript --project-id <My Reference ID> > lib/database.types.ts