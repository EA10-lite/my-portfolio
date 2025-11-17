import Button from "./Button";
import { projects } from "../data/projects";

const Hero = () => {
    return (
        <div className="app-hero">
            <div className="container mx-auto">
                <div className="hero-text-content mb-[80px]">
                    <div className="py-[80px] px-[60px]">
                        <div className="flex items-center justify-between flex-wrap">
                            <div className="w-full lg:max-w-[65%]">
                                <p className="text-[60px] leading-[108%] text-white font-sans-semibold">
                                    <span className="framer-text">
                                    Passionate about building intuitive interfaces and solving complex problems with clean, scalable code.
                                    </span>
                                </p>
                            </div>

                            <div className="flex flex-col gap-4 w-full lg:w-[30%]">
                                <p className="text-white text-xl leading-base font-sans-medium">Let's make your website stand out</p>
                                <p className="text-lg text-grey leading-base font-sans-medium">How can we help you today?</p>
                                <div className="">
                                    <Button title="Schedule a meeting" onClick={() => {}} />
                                </div>
                                <p className="text-grey text-lg leading-base">
                                    Mail me at:{" "} 
                                    <a 
                                        href="mailto:emanuelanyigor@gmail.com" 
                                        className="text-white"
                                    >
                                        emanuelanyigor@gmail.com
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="divider w-full h-[1px]" />
                </div>
            </div>

            <div className="hero-image-content">
                <div className="marquee-container">
                    <div className="marquee-track">
                        {/* First set of thumbnails */}
                        {projects.map((project: ThumbnailProps) => (
                            <Thumbnail 
                                key={project.id} 
                                {...project}
                            />
                        ))}
                        {/* Duplicate set for seamless loop */}
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

type ThumbnailProps = {
    id: number;
    image_url: string;
    project_url: string;
    project_name: string;
    project_description: string;
}

const Thumbnail = ({ 
    image_url, 
    project_url, 
    project_name,
    project_description,
    
}: ThumbnailProps) => {
    return (
        <div className="thumbnail">
            <a 
                href={project_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-[520px] block thumbnail-box relative rounded-lg overflow-hidden w-[600px] border-grey border"
            >
            </a>
        </div>
    )
}

export default Hero;