import { Button } from "../components";


const links = [
    {
        label: "About",
        href: "#about",
    },
    {
        label: "Projects",
        href: "#projects",
    },
    {
        label: "Services",
        href: "#services",
    }
]

const Footer = () => {
    return (
        <div className="footer">
            <div className="container mx-auto">
                <div className="py-[80px] px-[60px]">
                    <div className="">
                        <h2 className="text-[60px] leading-[108%] text-white font-sans-semibold"> Do you have an idea? </h2>
                        <h2 className="text-[60px] leading-[108%] text-white font-sans-semibold"> Let's Talk!</h2>
                    </div>
                    <div className="divider w-full h-[1px] my-[80px]" />

                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="col-span-1 md:col-span-2">
                            <div className="logo cursor-pointer transition-all duration-300 hover:scale-105">
                                <h4 className="text-white text-2xl font-bold font-mono tracking-tight select-none">
                                    <span className="text-grey opacity-70">{"</"}</span>
                                    <span className="text-white font-semibold">EA10</span>
                                    <span className="text-grey opacity-70">{">"}</span>
                                </h4>
                            </div>

                            <div className="flex items-center gap-4">
                                <a href="https://www.linkedin.com/in/emanuel-anyigor-831562215/" target="_blank" rel="noopener noreferrer">
                                </a>
                            </div>
                        </div>

                        <div className="col-span-1 grid grid-cols-2 gap-4">
                            <div className="">
                                <div className="flex flex-col gap-6">
                                    {links.map((link) => (
                                        <Links 
                                            url={link.href} 
                                            label={link.label} 
                                            key={link.label}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-6">
                                <div className="">
                                    <Button 
                                        title="Contact us"
                                        onClick={() => {}}
                                    />
                                </div>
                                <p className="text-grey text-sm font-medium">Turn your idea into a reality</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

type LinksProps = {
    url: string;
    label: string;
}
const Links = ({ url, label }: LinksProps) => {
    return (
        <a href={url} className="text-white text-sm font-medium w-fit hover:border-b">
            {label}
        </a>
    )
}

export default Footer;