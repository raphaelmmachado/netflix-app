/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: [
      "api.themoviedb.org",
      "image.tmdb.org",
      "assets.nflxext.com/",
      "lh3.googleusercontent.com",
      "genotipia.com",
      "flagcdn.com",
      "https://placeholderimage.dev/",
    ],
  },
};

module.exports = nextConfig;
