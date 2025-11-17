import { useState, useEffect } from "react";
import { Button, Logo } from "../components";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";


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
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Lock body scroll when sidebar is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        // Cleanup function to restore scroll when component unmounts
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

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

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
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

                {/* Mobile Menu Button */}
                <div
                    onClick={toggleMenu}
                    className="md:hidden text-white text-2xl focus:outline-none"
                    aria-label="Toggle menu"
                >
                    <HiMenu size={28} />
                </div>
            </div>
            </div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/50 z-40 md:hidden"
                            onClick={closeMenu}
                        />

                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full md:max-w-sm bg-primary z-50 md:hidden shadow-2xl"
                        >
                            {/* Sidebar Header */}
                            <div className="flex items-center justify-between p-6 border-b border-grey/20">
                                <Logo />
                                <div
                                    onClick={closeMenu}
                                    className="text-white text-2xl focus:outline-none hover:scale-110 transition-transform"
                                    aria-label="Close menu"
                                >
                                    <HiX size={28} />
                                </div>
                            </div>

                            {/* Sidebar Navigation Links */}
                            <div className="flex flex-col justify-center h-[calc(100%-100px)] px-6">
                                <div className="flex flex-col">
                                    {navLinks.map((link, index) => (
                                        <motion.a
                                            key={link.label}
                                            href={link.href}
                                            onClick={closeMenu}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="text-grey text-[60px] leading-[108%] font-sans-semibold text-left hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </motion.a>
                                    ))}
                                    
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: navLinks.length * 0.1 }}
                                        className="mt-4"
                                    >
                                        <Button 
                                            title="Contact us"
                                            onClick={() => {
                                                closeMenu();
                                            }}
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
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