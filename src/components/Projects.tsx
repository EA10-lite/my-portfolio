import { IoIosArrowForward } from "react-icons/io";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { projects } from "../data/projects"

const Projects = () => {
    // Ref for scroll-triggered animations
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    // Animation variants for the container
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    // Animation variants for header items
    const headerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        },
    };

    return (
        <div className="projects py-16 md:py-24" id="projects" ref={ref}>
            <div className="container mx-auto">
                <div className="py-8 md:py-16 px-4 md:px-[60px]">
                    <motion.div
                        className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-16 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <motion.div className="max-w-2xl" variants={headerVariants}>
                            <h2 className="text-3xl md:text-4xl lg:text-[44px] leading-[108%] text-white font-sans-semibold mb-4">Selected Works</h2>
                            <p className="text-base md:text-lg lg:text-2xl leading-[120%] text-grey font-sans-medium">
                                A collection of projects that showcase my passion for building digital experiences.
                            </p>
                        </motion.div>
                    </motion.div>

                    <div className="projects-grid">
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                        >
                            {projects.map((project, index) => (
                                <Project
                                    key={project.id}
                                    {...project}
                                    index={index}
                                />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

type ProjectProps = {
    image_url: string;
    project_url: string;
    project_name: string;
    project_description: string;
    project_short_summary?: string;
    tags?: string[];
    index: number;
}

const Project = ({
    image_url,
    project_url,
    project_name,
    project_description,
    tags,
    index,
}: ProjectProps) => {
    // Animation variants for project cards
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        },
    };

    return (
        <motion.a
            href={project_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block h-full"
            variants={cardVariants}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <div className="bg-card/30 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden h-full flex flex-col hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                    <motion.img
                        src={image_url}
                        alt={project_name}
                        className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Floating Action Button */}
                    <div className="absolute bottom-4 right-4 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black shadow-lg">
                            <IoIosArrowForward className="text-xl -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4 hidden">
                        {tags?.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="text-xs font-sans-medium text-white/80 bg-white/10 px-3 py-1 rounded-full border border-white/5"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h3 className="text-xl md:text-2xl text-white font-sans-semibold mb-3 transition-colors duration-300">
                        {project_name}
                    </h3>

                    <p className="text-grey text-sm md:text-base leading-relaxed line-clamp-3 mb-4 flex-grow">
                        {project_description}
                    </p>

                    <div className="flex items-center gap-2 text-sm font-sans-medium text-white/60 group-hover:text-white transition-colors mt-auto pt-4 border-t border-white/5">
                        <span>View Project</span>
                        <IoIosArrowForward className="transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                </div>
            </div>
        </motion.a>
    );
};

export default Projects;