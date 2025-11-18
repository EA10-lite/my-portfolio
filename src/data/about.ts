import React from "react";
import { 
  SiReact, 
  SiTypescript, 
  SiJavascript, 
  SiTailwindcss, 
  SiNodedotjs, 
  SiExpress, 
  SiNestjs, 
  SiMongodb, 
  SiPostgresql, 
  SiGit 
} from "react-icons/si";

// Skill type definition with name, icon, and brand color
export type Skill = {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { className?: string }>;
  color: string; // Brand color for the icon
};

export const about = {
    bio: "Hi, I'm Emmanuel Anyigor — a Full-Stack Engineer who builds fast, reliable, and user-focused web and mobile experiences. With 3+ years of working experience, I turn complex product ideas into clean interfaces and scalable backend systems.",
  
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" }, // React cyan
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" }, // TypeScript blue
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" }, // JavaScript yellow
      { name: "React Native", icon: SiReact, color: "#61DAFB" }, // React Native (same as React)
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" }, // Tailwind cyan
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" }, // Node.js green
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" }, // MongoDB green
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" }, // PostgreSQL blue
      { name: "Git", icon: SiGit, color: "#F05032" }, // Git orange-red
    ] as Skill[],
  
    interests: [
      "AI",
      "Web3",
      "Cybersecurity",
    ]
};
  