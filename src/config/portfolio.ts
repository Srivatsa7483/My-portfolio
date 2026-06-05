export interface Project {
  id: string;
  title: string;
  category: string;
  date: string;
  year: string;
  description: string;
  longDescription: string;
  tags: string[];
  coverImage: string;
  images: string[];
}

export interface SkillGroup {
  id: string;
  title: string;
  skills: string[];
}

export interface Award {
  org: string;
  site: string;
  prize: string;
  date: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  location: string;
  points: string[];
}

export interface Education {
  institution: string;
  degree: string;
  cgpaOrPercentage: string;
  duration: string;
  location: string;
}

export interface PortfolioData {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  location: string;
  tagline: string;
  taglineSecondary: string;
  bioHeadline: string;
  bioSubhead: string;
  email: string;
  phone: string;
  version: string;
  socials: {
    github: string;
    linkedin: string;
    twitter?: string;
  };
  projects: Project[];
  skills: SkillGroup[];
  awards: Award[];
  experiences: Experience[];
  education: Education[];
}

export const portfolioData: PortfolioData = {
  name: "Srivatsa K",
  firstName: "Srivatsa",
  lastName: "K",
  role: "Computer Science & Data Science Engineer",
  location: "Bengaluru, India",
  tagline: "Building robust software and intelligent systems,",
  taglineSecondary: "connecting Web, Mobile & Machine Learning.",
  bioHeadline: "Computer Science & Data Science student at Bangalore Institute of Technology, crafting fluid apps and intelligent models.",
  bioSubhead: "Passionate about full-stack engineering, mobile development, and machine learning pipelines. Combining analytical precision with interactive interface design to build scalable digital solutions.",
  email: "srivatsak26@gmail.com",
  phone: "+91 8660794506",
  version: "V3.0",
  socials: {
    github: "https://github.com/Srivatsa7483?tab=repositories",
    linkedin: "https://linkedin.com/in/srivatsa-k-904853356",
  },
  projects: [
    {
      id: "keliri-app",
      title: "Keliri Mobile App",
      category: "App Development",
      date: "03 2026",
      year: "2026",
      description: "A cross-platform mobile application enabling online ad creation and geo-targeted publishing.",
      longDescription: "Developed a cross-platform mobile app for Keliri enabling online ad creation and geo-targeted publishing. Built and deployed a Next.js backend with RESTful APIs on AWS EC2, integrating an Amazon S3 bucket for scalable media storage. Implemented ad management, targeting, and real-time publishing features for users and advertisers.",
      tags: ["React Native", "Next.js", "Amazon S3", "AWS EC2", "Tailwind CSS"],
      coverImage: "/projects/keliri_app.png",
      images: ["/projects/keliri_app.png", "/projects/keliri_app_details.png", "/projects/keliri_app_otp.png"]
    },
    {
      id: "goodkart-app",
      title: "GoodKart",
      category: "App Development",
      date: "05 2026",
      year: "2026",
      description: "A high-performance e-commerce mobile application featuring stripe checkouts and local database caching.",
      longDescription: "GoodKart is a high-performance cross-platform e-commerce app built to deliver smooth shopping experiences. It integrates secure stripe-based payment handshakes, real-time inventory management, geolocation services for delivery routing, and client-side database caching for offline usage.",
      tags: ["React Native", "Node.js", "MongoDB", "Redux Toolkit", "Stripe API"],
      coverImage: "/projects/goodkart_app.png",
      images: ["/projects/goodkart_app.png", "/projects/goodkart_app.png"]
    },
    {
      id: "keliri-portal",
      title: "Keliri Admin Web Portal",
      category: "Web Development",
      date: "04 2026",
      year: "2026",
      description: "An administrative web portal with role-based access control and dashboard analytics.",
      longDescription: "Developed an admin portal for Keliri with role-based access for Super Admin and Admin users. Built comprehensive management dashboards for ads, publishers, and admins using Spring Boot and Next.js, deployed on AWS EC2. Implemented responsive UI with Tailwind CSS and secure authentication workflows.",
      tags: ["React (Vite)", "Spring Boot", "Next.js", "Tailwind CSS", "AWS EC2"],
      coverImage: "/projects/keliri_portal.png",
      images: ["/projects/keliri_portal.png", "/projects/keliri_portal.png"]
    },
    {
      id: "melacelebrations-web",
      title: "MelaCelebrations",
      category: "Web Development",
      date: "05 2026",
      year: "2026",
      description: "An interactive event management and booking platform featuring collaborative scheduling.",
      longDescription: "MelaCelebrations is a full-featured booking and management platform built for large scale events. It includes real-time booking, interactive seating layout charts, dashboard analytics for organizers, automated email ticketing, and calendar sync (Google Calendar / iCal) for smooth operations.",
      tags: ["Next.js", "PostgreSQL", "Tailwind CSS", "Socket.io", "Prisma ORM"],
      coverImage: "/projects/melacelebrations.png",
      images: ["/projects/melacelebrations.png", "/projects/melacelebrations_details.png"]
    },
    {
      id: "chipzo-web",
      title: "Chipzo",
      category: "Web Development",
      date: "06 2026",
      year: "2026",
      description: "A specialized electronics storefront with dynamic specification filtering and comparisons.",
      longDescription: "Chipzo is an electronics retail web application optimized for fast product comparison and parameter searches. Features include dynamic specs comparison matrices, high-performance search queries with indexing, responsive cart management, and administrative dashboards for product tracking and sales charts.",
      tags: ["React (Vite)", "Express.js", "PostgreSQL", "Chart.js", "Tailwind CSS"],
      coverImage: "/projects/chipzo_web.png",
      images: ["/projects/chipzo_web.png", "/projects/chipzo_web_details.png", "/projects/chipzo_web_modal.png"]
    },
    {
      id: "forensic-cam",
      title: "Camera Model Identification",
      category: "Machine Learning",
      date: "04 2026",
      year: "2026",
      description: "A digital forensic system for camera model identification using CNN device fingerprint classification.",
      longDescription: "Developed a digital forensic system for camera model identification using Sensor Pattern Noise (SPN) and Photo-Response Non-Uniformity (PRNU) noise analysis. Built a deep learning pipeline with CNN-based feature extraction for reliable device fingerprint classification. Implemented signal-processing techniques to improve robustness against compression and metadata tampering.",
      tags: ["Python", "PyTorch", "OpenCV", "NumPy", "SciPy", "Matplotlib"],
      coverImage: "/projects/forensic_cam.png",
      images: ["/projects/forensic_cam.png", "/projects/forensic_cam_details.png"]
    }
  ],
  skills: [
    {
      id: "web-dev",
      title: "Web Development",
      skills: ["React.js", "Next.js", "Node.js", "Express.js", "HTML5", "CSS3", "JavaScript", "TypeScript"]
    },
    {
      id: "app-dev",
      title: "App Development",
      skills: ["React Native", "Android CLI", "iOS Frameworks", "Mobile UI Design"]
    },
    {
      id: "ml-ai",
      title: "Machine Learning & AI",
      skills: ["Python", "PyTorch", "OpenCV", "NumPy", "Pandas", "Scikit-Learn", "Colab", "Streamlit"]
    },
    {
      id: "devops-tools",
      title: "DevOps & Developer Tools",
      skills: ["Docker", "Git", "GitHub", "VS Code", "Postman", "Excel", "Power BI", "Tableau", "AWS EC2", "Amazon S3"]
    }
  ],
  awards: [
    {
      org: "Inc42 AI Summit",
      site: "Inc42 Media",
      prize: "Operations Intern - Selected for high-intensity on-ground execution",
      date: "2026"
    },
    {
      org: "Annual Project Exhibition",
      site: "BIT Bengaluru",
      prize: "2nd Place - AI-based food waste management system (Save Meal)",
      date: "2025"
    },
    {
      org: "Deloitte Data Analytics",
      site: "Deloitte",
      prize: "Completed Professional Data Analytics Job Simulation",
      date: "2025"
    }
  ],
  experiences: [
    {
      role: "App Developer & Full Stack Intern",
      company: "Vinidra Softtech",
      duration: "Feb 2026 – Apr 2026",
      location: "Remote",
      points: [
        "Developed and Deployed the Keliri mobile app and web portal using React Native, React, and Tailwind CSS.",
        "Built Robust Backends with Next.js and Spring Boot to facilitate administrative dashboards and ad management.",
        "Managed Cloud Infrastructure by configuring Amazon S3 for media storage and deploying backend services on AWS EC2."
      ]
    }
  ],
  education: [
    {
      institution: "Bangalore Institute of Technology",
      degree: "Bachelor of Engineering in Computer Science & Data Science",
      cgpaOrPercentage: "CGPA: 8.8",
      duration: "2023 – 2027",
      location: "Bengaluru, Karnataka"
    },
    {
      institution: "Vidyaniketan PU Science College",
      degree: "Karnataka State Board (Class 12)",
      cgpaOrPercentage: "Percentage: 95%",
      duration: "2020 – 2022",
      location: "Hubli, Karnataka"
    },
    {
      institution: "SVEM School",
      degree: "Karnataka State Board (Class 10)",
      cgpaOrPercentage: "Percentage: 98.08%",
      duration: "2019 – 2020",
      location: "Koppal, Karnataka"
    }
  ]
};
