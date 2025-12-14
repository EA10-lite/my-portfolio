

type ProjectProps = {
    id: number;
    image_url: string;
    project_url: string;
    project_name: string;
    project_description: string;
    project_short_summary?: string;
    tags?: string[];
}

export const projects: ProjectProps[] = [
    {
        id: 1,
        tags: ["Frontend", "Backend", "MongoDB"],
        project_name: "Factpointer",
        project_short_summary: "Verify facts with Factpointer",
        project_description: "Factpointer is a fact verifying platform that allows you to find the truth about anything.",
        project_url: "https://factpointer-five.vercel.app/",
        image_url: "/images/factpointer.jpg",
    },
    {
        id: 2,
        project_name: "ProposelyAI",
        project_short_summary: "Win More Upwork Projects with AI",
        tags: ["Frontend", "Backend", "Supabase"],
        project_description: "Generate compelling, personalized proposals in seconds using our fine-tuned AI model trained on thousands of successful Upwork proposals.",
        project_url: "https://proposelyai.com/",
        image_url: "/images/proposely.jpg",
    },
    {
        id: 3,
        project_name: "Binatec Agency",
        project_short_summary: "Digital Marketing Agency",
        tags: ["Frontend"],
        project_description: "Binatec is a premier digital agency dedicated to helping businesses succeed in the ever-evolving world of digital marketing.",
        project_url: "https://binatecagency.com/",
        image_url: "/images/binatec.jpg",
    },
    {
        id: 4,
        project_name: "EcoHotels",
        tags: ["NextJS", "TailwindCSS", "RESTAPI"],
        project_description: "EcoHotels.com helps you book eco-friendly hotels around the world. Travel sustainably—every booking plants a tree.",
        project_url: "https://ecohotels.com/",
        image_url: "/images/ecohotels.jpg",
    },
    {
        id: 5,
        project_name: "360Comms",
        tags: ["React vite"],
        project_description: "360 Comms specializes in the production of Advertisements, Corporates, Documentary films, TV Commercials and Social Media.",
        project_url: "https://360comms.network/",
        image_url: "/images/360comms.jpg",
    },
    {
        id: 6,
        project_name: "Coralstone Capitals",
        tags: ["NextJS"],
        project_description: "Coralstone Capitals is a company that offers an array of high-yield investment products which deliver great returns.",
        project_url: "https://coralstone.capital/",
        image_url: "/images/coralstone.jpg",
    },
    {
        id: 7,
        project_name: "Wearable",
        tags: ["React Vite", "TailwindCSS", "NodeJS", "Express", "MongoDB"],
        project_description: "An e-commerce platform for buying and selling clothing items.",
        project_url: "https://wearable-amber.vercel.app/",
        image_url: "/images/wearable.jpg",
    },
    {
        id: 8,
        project_name: "Wearable Admin",
        tags: ["React Vite", "TailwindCSS", "NodeJS", "Express", "MongoDB"],
        project_description: "An admin dashboard for the Wearable e-commerce platform.",
        project_url: "",
        image_url: "/images/wearable-admin.jpg",
    },
]