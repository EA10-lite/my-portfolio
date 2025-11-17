import Button from "./Button";
import { projects } from "../data/projects";
import { IoArrowForward } from "react-icons/io5";

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
        <div className="thumbnail py-6">
            <a 
                href={project_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-[520px] block thumbnail-box relative rounded-lg overflow-hidden min-w-[724px]"
            >
                <div className="h-full">
                    <img 
                        src={image_url} 
                        alt={project_name} 
                        className="w-auto h-full object-cover" 
                    />

                    <div className="absolute w-full h-full bottom-0 left-0 right-0 top-0 bg-black/50 z-50" />


                    <div className="absolute bottom-4 left-4 right-4 bg-gray-300 rounded-lg p-4 z-50">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-white px-4 py-1.5 rounded-[35px]">
                                <h4 className="text-sm font-sans-semibold">{project_name}</h4>
                            </div>

                            <IoArrowForward size={20} />
                        </div>

                        <p>{project_description}</p>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default Hero;