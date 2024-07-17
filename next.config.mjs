/** @type {import('next').NextConfig} */

const nextConfig = {
	images: {
		// dont allow others to use your next js server to optimise images
		remotePatterns: [{ hostname: "res.cloudinary.com" }],
	},
};

export default nextConfig;
