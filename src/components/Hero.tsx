import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Button from "./Button";
import { projects } from "../data/projects";
import { IoArrowForward } from "react-icons/io5";

const Hero = () => {
    // Animation variants for text content
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

    const itemVariants = {
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
        <div className="app-hero mt-10 mb-10 md:mb-20">
            <div className="container mx-auto">
                <div className="hero-text-content mb-10 md:mb-[80px]">
                    <div className="py-8 px-4 md:py-[80px] md:px-[60px]">
                        <motion.div 
                            className="flex items-center justify-between flex-wrap gap-8 md:gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div 
                                className="w-full lg:max-w-[65%]"
                                variants={itemVariants}
                            >
                                <p className="text-3xl md:text-4xl lg:text-[60px] leading-[108%] text-white font-sans-semibold">
                                    <span className="framer-text">
                                    Passionate about building intuitive interfaces and solving complex problems with clean, scalable code.
                                    </span>
                                </p>
                            </motion.div>

                            <motion.div 
                                className="flex flex-col gap-4 w-full lg:w-[30%]"
                                variants={itemVariants}
                            >
                                <p className="text-white text-lg md:text-xl leading-base font-sans-medium">Let's make your website stand out</p>
                                <p className="text-base md:text-lg text-grey leading-base font-sans-medium">How can I help you today?</p>
                                <div className="">
                                    <Button 
                                        title="Schedule a meeting" 
                                        onClick={() => {
                                            // Replace 'YOUR_CALENDLY_URL' with your actual Calendly scheduling link
                                            window.open('https://calendly.com/emanuelanyigor/30min', '_blank');
                                        }} 
                                    />
                                </div>
                                <p className="text-grey text-sm md:text-lg leading-base">
                                    Mail me at:{" "} 
                                    <a 
                                        href="mailto:emanuelanyigor@gmail.com" 
                                        className="text-white hover:underline transition-all"
                                    >
                                        emanuelanyigor@gmail.com
                                    </a>
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>

                    <div className="divider w-full h-[1px]" />
                </div>
            </div>

            <div id="projects" className="hero-image-content">
                {/* Mobile Slider - shows one at a time, auto-advances */}
                <div className="mobile-slider-container md:hidden">
                    <MobileSlider />
                </div>

                {/* Desktop Marquee - horizontal infinite scroll */}
                <div className="marquee-container hidden md:block">
                    <div className="marquee-track">
                        {/* First set of thumbnails */}
                        {projects.map((project: ThumbnailProps) => (
                            <Thumbnail 
                                key={project.id} 
                                {...project}
                            />
                        ))}
                        {/* Duplicate set for seamless infinite scroll */}
                        {projects.map((project: ThumbnailProps) => (
                            <Thumbnail 
                                key={`duplicate-${project.id}`} 
                                {...project}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Mobile Slider Component - auto-advancing carousel
const MobileSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance slider every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === projects.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000); // Change slide every 4 seconds

        return () => clearInterval(interval);
    }, []);

    // Animation variants for slide transitions
    const slideVariants = {
        enter: {
            x: '100%',
            opacity: 0,
        },
        center: {
            x: 0,
            opacity: 1,
        },
        exit: {
            x: '-100%',
            opacity: 0,
        },
    };

    return (
        <div className="relative w-full overflow-hidden">
            <div className="relative w-full" style={{ minHeight: '300px' }}>
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentIndex}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "tween", duration: 0.5, ease: "easeInOut" },
                            opacity: { duration: 0.3 },
                        }}
                        className="absolute inset-0 w-full px-4"
                    >
                        <Thumbnail {...projects[currentIndex]} disableAnimations={true} />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-10 hidden">
                {projects.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                            index === currentIndex 
                                ? 'w-8 bg-white' 
                                : 'w-2 bg-white/40'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

type ThumbnailProps = {
    id: number;
    image_url: string;
    project_url: string;
    project_name: string;
    project_description: string;
    disableAnimations?: boolean;
}

export const Thumbnail = ({ 
    image_url, 
    project_url, 
    project_name,
    project_description,
    disableAnimations = false,
}: ThumbnailProps) => {
    const thumbnailContent = (
        <a 
            href={project_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-card h-[300px] md:h-[400px] lg:h-[520px] block thumbnail-box relative rounded-xl overflow-hidden w-full md:min-w-[550px] lg:min-w-[724px]"
        >
            <div className="h-full">
                <img 
                    src={image_url} 
                    alt={project_name} 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                    fetchPriority="high"
                />

                {/* <div className="absolute w-full h-full bottom-0 left-0 right-0 top-0 bg-black/50 z-50" /> */}

                {disableAnimations ? (
                    <div className="absolute bottom-4 left-4 right-4 bg-gray-300 rounded-lg p-3 md:p-4 z-99">
                        <div className="flex items-center justify-between mb-2 md:mb-4">
                            <div className="bg-white px-3 md:px-4 py-1 md:py-1.5 rounded-[35px]">
                                <h4 className="text-xs md:text-sm font-sans-semibold">{project_name}</h4>
                            </div>

                            <IoArrowForward size={18} className="md:w-5 md:h-5" />
                        </div>

                        <p className="text-xs md:text-sm">{project_description}</p>
                    </div>
                ) : (
                    <motion.div 
                        className="absolute bottom-4 left-4 right-4 bg-gray-300 rounded-lg p-3 md:p-4 z-99"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <div className="flex items-center justify-between mb-2 md:mb-4">
                            <div className="bg-white px-3 md:px-4 py-1 md:py-1.5 rounded-[35px]">
                                <h4 className="text-xs md:text-sm font-sans-semibold">{project_name}</h4>
                            </div>

                            <IoArrowForward size={18} className="md:w-5 md:h-5" />
                        </div>

                        <p className="text-xs md:text-sm">{project_description}</p>
                    </motion.div>
                )}
            </div>
        </a>
    );

    if (disableAnimations) {
        return (
            <div className="thumbnail">
                {thumbnailContent}
            </div>
        );
    }

    return (
        <motion.div 
            className="thumbnail"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
        >
            {thumbnailContent}
        </motion.div>
    );
}

export default Hero;