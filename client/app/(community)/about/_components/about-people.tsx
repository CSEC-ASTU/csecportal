import Image from "next/image";
import React from "react";
// import { motion } from "framer-motion";

const leaders = [
  {
    name: "Selam Tesfaye",
    role: "President",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Selam is the visionary behind our club's growth, leading with compassion and confidence. Her mission is to empower every member to reach their full potential.",
    funFact: "🌍 Has visited 15 countries and speaks 4 languages",
  },
  {
    name: "Dawit Mulugeta",
    role: "Vice President",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
    bio: "Dawit ensures that our activities run smoothly and members stay engaged. He's known for his leadership, consistency, and dedication to collaboration.",
    funFact: "🏆 Former national chess champion",
  },
  {
    name: "Ruth Abebe",
    role: "Secretary",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    bio: "Organized, detail-oriented, and always on time, Ruth keeps our club structured and efficient. She also leads our documentation and communications.",
    funFact: "📚 Reads 50+ books every year",
  },
  {
    name: "Biniam Tadesse",
    role: "Technical Lead",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    bio: "Biniam is the brain behind all our tech. From managing our systems to mentoring fellow coders, he brings passion and innovation to everything we build.",
    funFact: "💻 Built his first app at age 14",
  },
  {
    name: "Lidya Alemayehu",
    role: "Community Manager",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    bio: "Lidya leads with empathy and creates strong bonds between members. She is the bridge that connects our club to the wider community.",
    funFact: "🎤 Secret karaoke superstar",
  },
];

export default function AboutLeaderShips() {
  return (
    <section className="w-full py-6">
      <div className="w-full mx-auto">
        <div
          //   initial={{ opacity: 0, y: 20 }}
          //   animate={{ opacity: 1, y: 0 }}
          //   transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Meet Our <span className="text-indigo-600">Leadership</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The passionate individuals who guide our community with vision,
            dedication, and a touch of magic ✨
          </p>
        </div>

        <div
          //   variants={containerVariants}
          //   initial="hidden"
          //   animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8"
        >
          {leaders.map((leader, index) => (
            <div
              key={index}
              //   variants={cardVariants}
              //   whileHover="hover"
              className="rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="relative h-40 w-40">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="rounded-full object-cover border-4 border-indigo-100"
                    />
                    <div className="absolute inset-0 rounded-full border-2 border-transparent hover:border-indigo-300 transition-all duration-300" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center text-gray-900 mb-1">
                  {leader.name}
                </h3>
                <p className="text-indigo-600 font-semibold text-center mb-3">
                  {leader.role}
                </p>
                {/* <p className="text-gray-600 text-center mb-4">{leader.bio}</p> */}
              </div>
            </div>
          ))}
        </div>

        <div
          //   initial={{ opacity: 0 }}
          //   animate={{ opacity: 1 }}
          //   transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600">
            Our leaders bring diverse talents and perspectives to create an
            inclusive, dynamic community.
          </p>
        </div>
      </div>
    </section>
  );
}
