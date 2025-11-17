import { IoIosArrowForward } from "react-icons/io";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { projects } from "../data/projects"

const Projects = () => {
    // Ref for scroll-triggered animations
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    // Animation variants for the container
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
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
        <div className="projects mb-20" ref={ref}>
            <div className="container mx-auto">
                <div className="py-8 px-4 md:py-[80px] md:px-[60px]">
                    <motion.div 
                        className="flex items-center justify-between mb-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <motion.div className="" variants={headerVariants}>
                            <h2 className="text-3xl md:text-4xl lg:text-[44px] leading-[108%] text-white font-sans-semibold mb-4">My Work</h2>
                            <p className="text-base md:text-lg lg:text-2xl leading-[120%] text-grey font-sans-medium">
                                Here are some of the projects I've worked on.
                            </p>
                        </motion.div>

                        <div className="">
                            
                        </div>
                    </motion.div>

                    <div className="projects-lists">
                        <div className="space-y-12">
                            {projects.slice(0, 1).map((project, index) => (
                                <Project 
                                    key={project.id} 
                                    {...project}
                                    index={index}
                                    isInView={isInView}
                                />
                            ))}
                        </div>
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
    isInView: boolean;
}

const Project = ({
    image_url,
    project_url,
    project_name,
    project_description,
    project_short_summary,
    tags,
    index,
    isInView,
}: ProjectProps) => {
    // Animation variants for project items
    const projectVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                delay: index * 0.2,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        },
    };

    // Animation variants for tags
    const tagVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: (i: number) => ({
            opacity: 1,
            scale: 1,
            transition: {
                delay: index * 0.2 + i * 0.1,
                duration: 0.4,
            },
        }),
    };

    // Animation variants for image
    const imageVariants = {
        hidden: { opacity: 0, x: 40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.7,
                delay: index * 0.2 + 0.3,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        },
    };

    return (
        <motion.div 
            className="project"
            variants={projectVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <motion.div 
                    className="project-details w-full md:w-1/2"
                    variants={projectVariants}
                >
                    <div className="max-w-[80%]">
                        <div className="flex items-center gap-4 mb-4 flex-wrap">
                            {tags?.map((tag, i) => (
                                <motion.div 
                                    key={tag}
                                    className="bg-card rounded-[35px] px-4 py-2"
                                    custom={i}
                                    variants={tagVariants}
                                    initial="hidden"
                                    animate={isInView ? "visible" : "hidden"}
                                >
                                    <span className="text-sm font-sans-medium text-white">{tag}</span>
                                </motion.div>
                            ))}
                        </div>
                        <h3 className="text-3xl md:text-4xl lg:text-[60px] leading-[108%] text-white font-sans-semibold mb-4">{project_short_summary || project_name}</h3>
                        <p className="text-base md:text-lg lg:text-2xl leading-[120%] text-grey font-sans-medium mb-4">{project_description}</p>

                        <motion.a 
                            href={project_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-white text-sm md:text-base font-sans-medium flex items-center gap-2 hover:border-b transition-all w-fit"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <span>Visit Project</span>
                            <IoIosArrowForward className="text-white text-xl" />
                        </motion.a>
                    </div>
                </motion.div>

                <motion.div 
                    className="project-thumbnail w-full md:w-1/2"
                    variants={imageVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                >
                    <img 
                        src={image_url} 
                        alt={project_name} 
                        className="w-full h-full object-cover rounded-lg"
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Projects;