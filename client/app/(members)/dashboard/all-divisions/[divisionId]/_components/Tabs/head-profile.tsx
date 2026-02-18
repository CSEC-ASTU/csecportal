/*   */
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  Github,
  Twitter,
  BookOpen,
  Shield,
  Calendar,
} from "lucide-react";

export default function HeadProfile() {
  const headData = {
    _id: "681fa055aee4b0213409e5cb",
    freeName: "Reyan Abdulmelik",
    email: "reyuabdulmelik@gmail.com",
    studentId: "UGR/30835/15",
    contact: "+251970599643",
    fieldOfStudy: "Electronic and Communication Engineering",
    githubProfile: "github.com/zizu",
    supportHandle: "@zizu",
    skills: [
      "Networking",
      "Operating Systems",
      "Threat Detection",
      "Cryptography",
      "Ethical Hacking",
      "Programming",
      "Cloud Security",
    ],
    status: "Active",
    createdAt: "2025-05-10T18:52:05.465Z",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="size-full p-6 space-y-8"
    >
      <HeadProfileUpper headData={headData} />
      <HeadProfileLower headData={headData} />
    </motion.div>
  );
}

const HeadProfileUpper = function ({ headData }: { headData: any }) {
  return (
    <motion.div
      className="w-full flex flex-col md:flex-row gap-8 items-start"
      initial={{ y: -20 }}
      animate={{ y: 0 }}
    >
      <div className="relative w-full md:w-1/3 aspect-square max-w-[300px]">
        <Image
          src="/profile.jpg"
          alt="head profile image"
          fill
          className="rounded-2xl object-cover border-4 border-gray-200 dark:border-gray-800 shadow-lg"
        />
      </div>

      <div className="flex-1 space-y-4">
        <div className="space-y-2">
          <motion.h2
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {headData.freeName}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 flex-wrap"
          >
            <Badge variant="default" className="px-3 py-1 text-sm">
              <Shield className="h-4 w-4 mr-2" />
              Division Head
            </Badge>
            <Badge variant="secondary" className="px-3 py-1 text-sm">
              {headData.studentId}
            </Badge>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <Mail className="h-5 w-5 text-blue-500" />
            <a href={`mailto:${headData.email}`} className="hover:underline">
              {headData.email}
            </a>
          </div>

          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <Phone className="h-5 w-5 text-green-500" />
            <a href={`tel:${headData.contact}`} className="hover:underline">
              {headData.contact}
            </a>
          </div>

          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <Github className="h-5 w-5 text-purple-500" />
            <a
              href={`https://${headData.githubProfile}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {headData.githubProfile}
            </a>
          </div>

          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <Twitter className="h-5 w-5 text-sky-500" />
            <span>{headData.supportHandle}</span>
          </div>
        </motion.div>

        <motion.p
          className="text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {headData.fieldOfStudy} professional with expertise in security
          systems and network architecture. Leading the division with a focus on
          innovation and technical excellence.
        </motion.p>
      </div>
    </motion.div>
  );
};

const HeadProfileLower = function ({ headData }: { headData: any }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="w-full space-y-6"
    >
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-orange-500" />
          Skills & Expertise
        </h3>
        <div className="flex flex-wrap gap-2">
          {headData.skills.map((skill: string, index: number) => (
            <Badge
              key={index}
              variant="outline"
              className="px-3 py-1 text-sm font-normal"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Division Member Since
          </h4>
          <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <Calendar className="h-4 w-4 text-blue-500" />
            {new Date(headData.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Current Status
          </h4>
          <Badge variant="default" className="capitalize">
            {headData.status.toLowerCase()}
          </Badge>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Leadership Tenure
          </h4>
          <p className="text-gray-900 dark:text-gray-100">1 year, 4 months</p>
        </div>
      </div>
    </motion.div>
  );
};
