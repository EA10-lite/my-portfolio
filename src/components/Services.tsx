import { FaBrain } from "react-icons/fa";

const Services = () => {
    return (
        <div className="services mb-20">
            <div className="container mx-auto">
                <div className="services-content py-8 px-4 md:py-[80px] md:px-[60px]">
                    <div className="max-w-[600px] mx-auto mb-8 text-center">
                        <h2 className="text-3xl md:text-4xl lg:text-[44px] leading-[108%] text-white font-sans-semibold mb-4">
                            What I do ?
                        </h2>
                        <p className="text-base md:text-lg lg:text-2xl leading-[120%] text-grey font-sans-medium">
                            Turning ideas into production-ready apps with clean code and great UX.
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-12">
                        <div className="relative max-w-6xl mx-auto">
                            {/* Connection Lines */}
                            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-white to-transparent transform -translate-y-1/2 z-0"></div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 relative z-10">
                                
                                {/* Step 1 */}
                                <div className="group relative bg-card backdrop-blur-md border border-card rounded-2xl p-4 sm:p-8 text-center hover:scale-105 transition-all duration-500 flex flex-col justify-center items-center min-h-[340px] sm:min-h-[400px] text-white">
                                    {/* Step Number */}
                                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                        <div className="w-12 h-12 bg-card border border-card  rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                            01
                                        </div>
                                    </div>
                                    
                                    {/* Visual Elements */}
                                    <div className="relative mb-6">
                                        <div className="flex flex-col items-center">
                                        {/* Results Dashboard Mockup */}
                                        <div className="w-48 h-32 bg-white/10 rounded-lg border border-white/20 p-3 relative">
                                            {/* Dashboard Content */}
                                            <div className="space-y-2">
                                            {/* Header */}
                                            <div className="h-2 bg-green-500/30 rounded w-1/2"></div>
                                            {/* Stats Row */}
                                            <div className="flex space-x-2">
                                                <div className="h-3 bg-green-500/20 rounded w-8"></div>
                                                <div className="h-3 bg-blue-500/20 rounded w-6"></div>
                                                <div className="h-3 bg-yellow-500/20 rounded w-10"></div>
                                            </div>
                                            {/* Chart Area */}
                                            <div className="h-8 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded"></div>
                                            {/* Action Button */}
                                            <div className="h-4 bg-primary/30 rounded w-3/4"></div>
                                            </div>
                                            
                                            {/* Success Indicators */}
                                            <div className="absolute -top-2 -right-2 flex space-x-1">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-150"></div>
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-300"></div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    
                                    {/* Content */}
                                    <h3 className="text-xl font-semibold  mb-4 transition-colors">
                                        Frontend Development
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm">
                                        Deliver polished, production-ready websites and web apps with responsive, scalable designs that provide real-time performance, seamless UX, and measurable impact.
                                    </p>
                                </div>

                                {/* Step 2 */}
                                <div className="group relative bg-card backdrop-blur-md border border-card rounded-2xl p-4 sm:p-8 text-center hover:scale-105 transition-all duration-500 flex flex-col justify-center items-center min-h-[400px] text-white">
                                    {/* Step Number */}
                                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                        <div className="w-12 h-12 bg-card border border-card  rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                            02
                                        </div>
                                    </div>
                                    
                                    {/* Visual Elements */}
                                    <div className="relative mb-6 flex justify-center">
                                        <div className="flex flex-col items-center space-y-4">
                                        {/* AI Proposal Generation Mockup */}
                                        <div className="w-48 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg border border-white/30 p-3 relative shadow-lg">
                                            {/* Proposal Text Being Generated */}
                                            <div className="space-y-1.5">
                                            <div className="h-1.5 bg-white/30 rounded w-full animate-pulse"></div>
                                            <div className="h-1.5 bg-white/25 rounded w-5/6 animate-pulse delay-150"></div>
                                            <div className="h-1.5 bg-white/20 rounded w-4/5 animate-pulse delay-300"></div>
                                            <div className="h-1.5 bg-white/15 rounded w-3/4 animate-pulse delay-500"></div>
                                            <div className="h-1.5 bg-white/10 rounded w-2/3 animate-pulse delay-700"></div>
                                            </div>
                                            
                                            {/* AI Brain Icon */}
                                            <div className="absolute top-2 right-2">
                                            <FaBrain className="w-4 h-4 text-white animate-pulse" />
                                            </div>
                                            
                                            {/* Typing Cursor */}
                                            <div className="absolute bottom-3 left-3 w-0.5 h-3 bg-primary animate-pulse"></div>
                                            
                                            {/* Sparkle effects */}
                                            <div className="absolute -top-2 -right-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                                            <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping delay-300"></div>
                                            <div className="absolute top-0 -left-2 w-1 h-1 bg-pink-400 rounded-full animate-ping delay-150"></div>
                                        </div>
                                        </div>
                                    </div>
                                    
                                    {/* Content */}
                                    <h3 className="text-xl font-semibold mb-4 transition-colors">
                                        Backend Development
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm">
                                        Build robust, secure, and scalable backend systems that power your applications, streamline workflows, and provide real-time data and actionable insights.
                                    </p>
                                </div>

                                {/* Step 3 */}
                                <div className="group relative bg-card backdrop-blur-md border border-card rounded-2xl p-4 sm:p-8 text-center hover:scale-105 transition-all duration-500 flex flex-col justify-center items-center min-h-[400px] text-white">
                                    {/* Step Number */}
                                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                        <div className="w-12 h-12 bg-card border border-card  rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                            03
                                        </div>
                                    </div>
                                    
                                    {/* Visual Elements */}
                                    <div className="relative mb-6">
                                        <div className="flex flex-col items-center">
                                        {/* Results Dashboard Mockup */}
                                        <div className="w-48 h-32 bg-white/10 rounded-lg border border-white/20 p-3 relative">
                                            {/* Dashboard Content */}
                                            <div className="space-y-2">
                                            {/* Header */}
                                            <div className="h-2 bg-green-500/30 rounded w-1/2"></div>
                                            {/* Stats Row */}
                                            <div className="flex space-x-2">
                                                <div className="h-3 bg-green-500/20 rounded w-8"></div>
                                                <div className="h-3 bg-blue-500/20 rounded w-6"></div>
                                                <div className="h-3 bg-yellow-500/20 rounded w-10"></div>
                                            </div>
                                            {/* Chart Area */}
                                            <div className="h-8 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded"></div>
                                            {/* Action Button */}
                                            <div className="h-4 bg-primary/30 rounded w-3/4"></div>
                                            </div>
                                            
                                            {/* Success Indicators */}
                                            <div className="absolute -top-2 -right-2 flex space-x-1">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-150"></div>
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-300"></div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    
                                    {/* Content */}
                                    <h3 className="text-xl font-semibold mb-4 transition-colors">
                                        Mobile App Development
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm">
                                        Create intuitive, high-performance mobile apps that engage users, deliver smooth experiences, and drive productivity through real-time, reliable functionality.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services;