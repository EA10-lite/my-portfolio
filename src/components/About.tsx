import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { about } from "../data/about";

const About = () => {
    // Container variants for stagger animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    // Item variants for individual elements
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        },
    };

    // Skill item variants with stagger
    const skillContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.2,
            },
        },
    };

    const skillItemVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        },
    };

    // Divider animation variant
    const dividerVariants = {
        hidden: { scaleX: 0, opacity: 0 },
        visible: {
            scaleX: 1,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        },
    };

    return (
        <motion.div 
            className="about mb-10 md:mb-20" 
            id="about"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
        >
            <div className="container mx-auto">
                <div className="py-8 md:py-16 px-4 md:px-[60px]">
                    {/* Bio Section */}
                    <div className="bio py-8 mb-8">
                        <motion.h4 
                            className="text-2xl font-bold text-white mb-4"
                            variants={itemVariants}
                        >
                            Whoami?
                        </motion.h4>

                        <motion.div 
                            className="w-full lg:max-w-[80%]"
                            variants={itemVariants}
                        >
                            <p className="text-2xl md:text-3xl lg:text-[44px] leading-[120%] text-white font-sans-semibold">
                                <span className="framer-text">
                                {about.bio}
                                </span>
                            </p>
                        </motion.div>
                    </div>

                    {/* Divider */}
                    <motion.div 
                        className="divider w-full h-[1px] my-12 md:my-16"
                        variants={dividerVariants}
                    />

                    {/* Skills Section */}
                    <motion.div 
                        className="skills py-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={skillContainerVariants}
                    >
                        <motion.h4 
                            className="text-2xl font-bold text-white mb-6"
                            variants={itemVariants}
                        >
                            Skills & Technologies
                        </motion.h4>
                        
                        {/* Skills Grid */}
                        <motion.div 
                            className="flex items-center gap-6 flex-wrap"
                            variants={skillContainerVariants}
                        >
                            {about.skills.map((skill, index) => 
                                <SkillItem 
                                    key={`skill-${index}`} 
                                    name={skill.name} 
                                    Icon={skill.icon}
                                    color={skill.color}
                                    variants={skillItemVariants}
                                />
                            )}
                        </motion.div>
                    </motion.div>

                    {/* Divider */}
                    <motion.div 
                        className="divider w-full h-[1px] my-12 md:my-16"
                        variants={dividerVariants}
                    />

                    {/* Experience Section (Hidden) */}
                    <div className="experience hidden">
                        <motion.h4 
                            className="text-2xl font-bold text-white mb-6"
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            My Experience
                        </motion.h4>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};


type SkillItemProps = {
    name: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { className?: string }>;
    color: string;
    variants: Variants;
}

const SkillItem = ({ name, Icon, color, variants }: SkillItemProps) => {
    return (
        <motion.div
            className="skill-item flex items-center justify-center gap-3 min-w-[120px] px-6 py-4 rounded-lg bg-card/30 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300"
            variants={variants}
            whileHover={{ 
                scale: 1.1, 
                y: -5,
                transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
        >
            <motion.div
                whileHover={{ 
                    scale: 1.2,
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 }
                }}
            >
                <Icon 
                    className="text-3xl md:text-4xl transition-colors duration-300" 
                    style={{ color: color }}
                />
            </motion.div>
            <span className="text-sm md:text-base text-white font-medium whitespace-nowrap">
                {name}
            </span>
        </motion.div>
    );

}

export default About;
