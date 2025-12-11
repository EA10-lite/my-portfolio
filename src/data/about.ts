import React from "react";
import { 
  SiReact, 
  SiTypescript, 
  SiJavascript, 
  SiTailwindcss, 
  SiNodedotjs, 
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
    bio: "Hi, my name is Emmanuel Anyigor, and I’m a Full-Stack Web and Mobile Developer passionate about building fast, reliable, and user-focused digital experiences. With over 3 years of professional experience, I specialize in turning complex product ideas into clean, intuitive interfaces and scalable backend systems. I enjoy working across the entire development lifecycle — from designing and implementing seamless frontends to architecting robust backend services — to create products that are both high-performing and delightful for users.",
  
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
  