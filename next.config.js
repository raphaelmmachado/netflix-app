/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "api.themoviedb.org",
      "image.tmdb.org",
      "assets.nflxext.com/",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
