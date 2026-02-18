"use client";

import { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Twitter, Linkedin, Github } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: "", email: "", message: "" });

    // Reset success message after 3 seconds
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <>
      <Head>
        <title>Contact Us | Your Brand</title>
        <meta name="description" content="Get in touch with our team" />
      </Head>

      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Let&apos;s <span className="text-blue-600">Connect</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We&apos;d love to hear from you! Whether you have a question,
              feedback, or just want to say hello.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-primary/[.1] dark:bg-primary/[.05] rounded-2xl shadow-xl overflow-hidden p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Send us a message
              </h2>

              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-green-50 rounded-lg flex items-center"
                >
                  <CheckCircle className="text-green-500 text-xl mr-2" />
                  <span className="text-green-700">
                    Your message has been sent successfully!
                  </span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="What would you like to say?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white transition-all ${
                    isSubmitting
                      ? "bg-blue-400"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <div className="space-y-8">
              <motion.div
                whileHover={{ x: 5 }}
                className="bg-primary/[.1] dark:bg-primary/[.05] rounded-2xl shadow-xl p-8"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Mail className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Email
                      </h3>
                      <p className="text-gray-600">hello@yourbrand.com</p>
                      <p className="text-gray-600">support@yourbrand.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <Phone className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Phone
                      </h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-gray-600">Mon-Fri: 9am-5pm</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <MapPin className="text-purple-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Office
                      </h3>
                      <p className="text-gray-600">123 Tech Street</p>
                      <p className="text-gray-600">San Francisco, CA 94107</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Social Media */}
              <motion.div
                whileHover={{ x: 5 }}
                className="bg-primary/[.1] dark:bg-primary/[.05] rounded-2xl shadow-xl p-8"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Follow Us
                </h2>

                <div className="flex space-x-4">
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-50 hover:bg-blue-100 p-4 rounded-full transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="text-blue-400 text-xl" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-50 hover:bg-blue-100 p-4 rounded-full transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="text-blue-600 text-xl" />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-50 hover:bg-gray-100 p-4 rounded-full transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="text-gray-800 text-xl" />
                  </a>
                </div>
              </motion.div>

              {/* Map Placeholder */}
              {/* <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-primary/[.1] dark:bg-primary/[.05] rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="h-64 bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-500">Interactive Map Here</p>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Visit Us
                  </h3>
                  <p className="text-gray-600">Our doors are open for you</p>
                </div>
              </motion.div> */}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Contact;
