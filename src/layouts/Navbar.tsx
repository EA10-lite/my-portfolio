import { Button } from "../components";


const navLinks = [
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

const Navbar = () => {
    return (
        <div className="header">
            <div className="container mx-auto p-4">
            <div className="flex items-center justify-between">
                <div className="logo cursor-pointer transition-all duration-300 hover:scale-105">
                    <h4 className="text-white text-2xl font-bold font-mono tracking-tight select-none">
                        <span className="text-grey opacity-70">{"</"}</span>
                        <span className="text-white font-semibold">EA10</span>
                        <span className="text-grey opacity-70">{">"}</span>
                    </h4>
                </div>

                <div className="flex items-center gap-8">
                    {navLinks.map((link) => (
                        <NavLinks 
                            url={link.href} 
                            label={link.label} 
                            key={link.label}
                        />
                    ))}

                    <Button 
                        title="Contact us"
                        onClick={() => {}}
                    />
                </div>
            </div>
            </div>
      </div>
    )
}


type NavLinksProps = {
    url: string;
    label: string;
}
const NavLinks = ({ url, label }: NavLinksProps) => {
    return (
        <a href={url} className="text-white text-sm font-medium hover:border-b">
            {label}
        </a>
    )
}

export default Navbar;