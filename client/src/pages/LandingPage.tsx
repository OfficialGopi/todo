import { motion } from "framer-motion";
import {
  CheckCircle,
  Users,
  Zap,
  Shield,
  ArrowRight,
  TrendingUp,
  Clock,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Smart Task Management",
      description:
        "Intelligent task organization with AI-powered prioritization and smart categorization.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description:
        "Real-time collaboration with role-based access control and seamless communication.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description:
        "Optimized performance with instant updates and smooth animations throughout.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description:
        "Bank-level security with end-to-end encryption and compliance standards.",
    },
  ];

  const stats = [
    {
      number: "10K+",
      label: "Active Users",
      icon: <Users className="w-5 h-5" />,
    },
    {
      number: "50K+",
      label: "Tasks Completed",
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      number: "99.9%",
      label: "Uptime",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    { number: "24/7", label: "Support", icon: <Clock className="w-5 h-5" /> },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 
                    dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 
                    transition-all duration-500"
    >
      {/* Navigation */}
      <nav
        className="relative z-50 px-6 py-4 backdrop-blur-md bg-white/80 dark:bg-neutral-900/80 
                     border-b border-neutral-200/50 dark:border-neutral-700/50"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <div
              className="w-10 h-10 bg-gradient-to-br from-neutral-600 to-neutral-800 
                          dark:from-neutral-400 dark:to-neutral-200 rounded-xl flex items-center justify-center
                          shadow-lg"
            >
              <span className="text-white dark:text-neutral-900 font-bold text-xl">
                T
              </span>
            </div>
            <span className="text-2xl font-display font-bold text-gradient">
              TODOISH
            </span>
          </motion.div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 
                           dark:hover:text-neutral-100 transition-colors duration-300"
              >
                Sign In
              </motion.button>
            </Link>
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Get Started
              </motion.button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-display font-bold text-neutral-900 dark:text-neutral-100 
                         leading-tight"
            >
              Organize Tasks,
              <span className="block text-gradient">Amplify Results</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto 
                         leading-relaxed"
            >
              Transform your productivity with our intelligent task management
              platform. Collaborate seamlessly, track progress effortlessly, and
              achieve more than ever before.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-accent text-lg px-8 py-4 group"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-8 py-4"
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-neutral-200/20 to-neutral-300/20 
                     dark:from-neutral-700/20 dark:to-neutral-600/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-neutral-300/20 to-neutral-400/20 
                     dark:from-neutral-600/20 dark:to-neutral-500/20 rounded-full blur-xl"
        />
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-neutral-100/50 dark:bg-neutral-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              Why Choose TODOISH?
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Built with modern technology and user experience in mind, TODOISH
              delivers everything you need to stay organized and productive.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="card-glass text-center p-8 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-gradient-to-br from-neutral-600 to-neutral-700 
                             dark:from-neutral-400 dark:to-neutral-500 rounded-2xl flex items-center 
                             justify-center mx-auto mb-6 text-white dark:text-neutral-900
                             shadow-lg group-hover:shadow-xl transition-all duration-300"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-20 h-20 bg-gradient-to-br from-neutral-200 to-neutral-300 
                             dark:from-neutral-700 dark:to-neutral-600 rounded-2xl flex items-center 
                             justify-center mx-auto mb-4 text-neutral-600 dark:text-neutral-400
                             group-hover:shadow-lg transition-all duration-300"
                >
                  {stat.icon}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl md:text-4xl font-display font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-neutral-600 dark:text-neutral-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-neutral-800 to-neutral-900 dark:from-neutral-200 dark:to-neutral-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white dark:text-neutral-900">
              Ready to Transform Your Productivity?
            </h2>
            <p className="text-xl text-neutral-300 dark:text-neutral-700 max-w-2xl mx-auto">
              Join thousands of users who have already revolutionized their
              workflow with TODOISH. Start your free trial today and experience
              the difference.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/signup">
                <button
                  className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white 
                                     hover:bg-neutral-100 dark:hover:bg-neutral-800 font-semibold 
                                     px-8 py-4 rounded-lg transition-all duration-300 
                                     shadow-xl hover:shadow-2xl"
                >
                  Get Started Now
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-neutral-900 dark:bg-neutral-100 text-neutral-400 dark:text-neutral-600">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div
              className="w-8 h-8 bg-gradient-to-br from-neutral-600 to-neutral-800 
                          dark:from-neutral-400 dark:to-neutral-200 rounded-lg flex items-center justify-center"
            >
              <span className="text-white dark:text-neutral-900 font-bold text-sm">
                T
              </span>
            </div>
            <span className="text-xl font-display font-bold text-neutral-300 dark:text-neutral-700">
              TODOISH
            </span>
          </div>
          <p className="text-sm">
            © 2024 TODOISH. All rights reserved. Built with ❤️ using modern web
            technologies.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
