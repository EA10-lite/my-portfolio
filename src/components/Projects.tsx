import { IoIosArrowForward } from "react-icons/io";
import { projects } from "../data/projects"

const Projects = () => {
    return (
        <div className="projects mb-20">
            <div className="container mx-auto">
                <div className="py-8 px-4 md:py-[80px] md:px-[60px]">
                    <div className="flex items-center justify-between mb-8">
                        <div className="">
                            <h2 className="text-3xl md:text-4xl lg:text-[44px] leading-[108%] text-white font-sans-semibold mb-4">My Work</h2>
                            <p className="text-base md:text-lg lg:text-2xl leading-[120%] text-grey font-sans-medium">
                                Here are some of the projects I've worked on.
                            </p>
                        </div>

                        <div className="">
                            
                        </div>
                    </div>

                    <div className="projects-lists">
                        <div className="space-y-12">
                            {projects.slice(0, 1).map((project) => (
                                <Project 
                                    key={project.id} 
                                    {...project}
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
}

const Project = ({
    image_url,
    project_url,
    project_name,
    project_description,
    project_short_summary,
    tags,
}: ProjectProps) => {
    return (
        <div className="project">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="project-details w-full md:w-1/2">
                    <div className="max-w-[80%]">
                        <div className="flex items-center gap-4 mb-4">
                            {tags?.map((tag) => (
                                <div className="bg-card rounded-[35px] px-4 py-2">
                                    <span className="text-sm font-sans-medium text-white">{tag}</span>
                                </div>
                            ))}
                        </div>
                        <h3 className="text-3xl md:text-4xl lg:text-[60px] leading-[108%] text-white font-sans-semibold mb-4">{project_short_summary || project_name}</h3>
                        <p className="text-base md:text-lg lg:text-2xl leading-[120%] text-grey font-sans-medium mb-4">{project_description}</p>

                        <a 
                            href={project_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-white text-sm md:text-base font-sans-medium flex items-center gap-2 hover:border-b transition-all w-fit"
                        >
                            <span>Visit Project</span>
                            <IoIosArrowForward className="text-white text-xl" />
                        </a>
                    </div>
                </div>

                <div className="project-thumbnail w-full md:w-1/2">
                    <img 
                        src={image_url} 
                        alt={project_name} 
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default Projects;