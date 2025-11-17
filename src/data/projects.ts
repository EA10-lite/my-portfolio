

type ProjectProps = {
    id: number;
    image_url: string;
    project_url: string;
    project_name: string;
    project_description: string;
}

export const projects: ProjectProps[] = [
    {
        id: 1,
        project_name: "Factpointer",
        project_description: "Factpointer is a fact verifying platform that allows you to find the truth about anything.",
        project_url: "https://factpointer-five.vercel.app/",
        image_url: "/images/factpointer-thumbnail.png",
    },
    {
        id: 2, 
        project_name: "ProposelyAI",
        project_description: "Generate compelling, personalized proposals in seconds using our fine-tuned AI model trained on thousands of successful Upwork proposals.",
        project_url: "https://proposelyai.com/",
        image_url: "/images/proposelyai-thumbnail.png",
    },
    {
        id: 3, 
        project_name: "Binatec Agency",
        project_description: "Binatec is a premier digital agency dedicated to helping businesses succeed in the ever-evolving world of digital marketing.",
        project_url: "https://binatecagency.com/",
        image_url: "/images/binatec-thumbnail.png",
    },
    {
        id: 4,
        project_name: "EcoHotels",
        project_description: "EcoHotels.com helps you book eco-friendly hotels around the world. Travel sustainably—every booking plants a tree.",
        project_url: "https://ecohotels.com/",
        image_url: "/images/ecohotels-thumbnail.png",
    },
    {
        id: 5, 
        project_name: "360Comms",
        project_description: "360 Comms specializes in the production of Advertisements, Corporates, Documentary films, TV Commercials and Social Media.",
        project_url: "https://360comms.network/",
        image_url: "/images/360comms-thumbnail.png",
    },
]