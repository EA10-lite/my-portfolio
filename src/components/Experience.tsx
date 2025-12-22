import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    ReactFlow,
    ReactFlowProvider,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    MarkerType,
} from '@xyflow/react';
import type {
    Node,
    Edge,
    NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { IoCheckmarkCircle, IoCloseCircle, IoTimeOutline } from 'react-icons/io5';

/**
 * Experience Component
 * 
 * Displays a professional experience/workflow flowchart using React Flow.
 * Shows career progression, projects, or workflow steps in a read-only diagram.
 * 
 * Features:
 * - Read-only flowchart visualization (non-editable)
 * - Custom styled nodes matching project theme
 * - Animated transitions with Framer Motion
 * - Responsive design for mobile and desktop
 * - Dark theme integration with project colors
 * - Zoom and pan controls for navigation
 */

// Custom node data type for experience/workflow items
type ExperienceNodeData = {
    label: string;
    title: string;
    description?: string;
    duration?: string;
    status?: 'success' | 'pending' | 'skipped' | 'in-progress';
    icon?: React.ReactNode;
};

// Custom Node Component - styled to match project theme
const ExperienceNode = ({ data }: { data: ExperienceNodeData }) => {
    const getStatusIcon = () => {
        switch (data.status) {
            case 'success':
                return <IoCheckmarkCircle className="text-green-500" size={20} />;
            case 'pending':
                return <IoTimeOutline className="text-yellow-500" size={20} />;
            case 'skipped':
                return <IoCloseCircle className="text-grey" size={20} />;
            case 'in-progress':
                return <IoTimeOutline className="text-blue-500" size={20} />;
            default:
                return null;
        }
    };

    const getStatusColor = () => {
        switch (data.status) {
            case 'success':
                return 'border-green-500/50';
            case 'pending':
                return 'border-yellow-500/50';
            case 'skipped':
                return 'border-grey/30';
            case 'in-progress':
                return 'border-blue-500/50';
            default:
                return 'border-white/20';
        }
    };

    return (
        <motion.div
            className={`bg-card/40 backdrop-blur-sm rounded-xl border border-dashed ${getStatusColor()} p-4 min-w-[200px] max-w-[250px] shadow-lg`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        >
            {/* Header with status icon */}
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-sans-semibold text-sm md:text-base">
                    {data.title}
                </h3>
                {getStatusIcon()}
            </div>

            {/* Description */}
            {data.description && (
                <p className="text-grey text-xs md:text-sm mb-2 leading-relaxed">
                    {data.description}
                </p>
            )}

            {/* Duration */}
            {data.duration && (
                <p className="text-grey text-xs mt-2 pt-2 border-t border-white/10">
                    Duration: {data.duration}
                </p>
            )}

            {/* Custom icon if provided */}
            {data.icon && (
                <div className="mt-2 flex justify-center">
                    {data.icon}
                </div>
            )}
        </motion.div>
    );
};

// Node types configuration for React Flow
const nodeTypes: NodeTypes = {
    experience: ExperienceNode,
};

const Experience = () => {
    // Initial nodes configuration - represents experience/workflow steps
    // You can customize these nodes to represent your actual experience
    const initialNodes: Node<ExperienceNodeData>[] = useMemo(() => [
        {
            id: '1',
            type: 'experience',
            position: { x: 250, y: 0 },
            data: {
                label: 'Start',
                title: 'Deploy to Production',
                description: 'On every merge to main branch',
                status: 'success',
            },
        },
        {
            id: '2',
            type: 'experience',
            position: { x: 100, y: 150 },
            data: {
                label: 'Build iOS',
                title: 'Build iOS',
                description: 'iOS application build process',
                duration: '5m 42s',
                status: 'success',
            },
        },
        {
            id: '3',
            type: 'experience',
            position: { x: 100, y: 300 },
            data: {
                label: 'Submit iOS',
                title: 'Submit to App Store',
                description: 'Automated submission to Apple App Store',
                duration: '5m 42s',
                status: 'success',
            },
        },
        {
            id: '4',
            type: 'experience',
            position: { x: 400, y: 150 },
            data: {
                label: 'Build Android',
                title: 'Build Android',
                description: 'Android application build process',
                duration: '9m 54s',
                status: 'success',
            },
        },
        {
            id: '5',
            type: 'experience',
            position: { x: 400, y: 300 },
            data: {
                label: 'Submit Android',
                title: 'Submit to Google Play',
                description: 'Automated submission to Google Play Store',
                duration: '9m 54s',
                status: 'success',
            },
        },
        {
            id: '6',
            type: 'experience',
            position: { x: 250, y: 450 },
            data: {
                label: 'OTA Update',
                title: 'Send Over-the-Air Update',
                description: 'Push updates to existing app installations',
                status: 'skipped',
            },
        },
    ], []);

    // Initial edges configuration - connects the nodes
    const initialEdges: Edge[] = useMemo(() => [
        {
            id: 'e1-2',
            source: '1',
            target: '2',
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#9999a1', strokeWidth: 2 },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: '#9999a1',
            },
        },
        {
            id: 'e1-4',
            source: '1',
            target: '4',
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#9999a1', strokeWidth: 2 },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: '#9999a1',
            },
        },
        {
            id: 'e1-6',
            source: '1',
            target: '6',
            type: 'smoothstep',
            animated: false,
            style: { stroke: '#9999a1', strokeWidth: 2, strokeDasharray: '5,5' },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: '#9999a1',
            },
        },
        {
            id: 'e2-3',
            source: '2',
            target: '3',
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#9999a1', strokeWidth: 2 },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: '#9999a1',
            },
        },
        {
            id: 'e4-5',
            source: '4',
            target: '5',
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#9999a1', strokeWidth: 2 },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: '#9999a1',
            },
        },
    ], []);

    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);

    // Animation variants for the container
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    return (
        <motion.div
            className="experience mb-10 md:mb-20"
            id="experience"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
        >
            <div className="container mx-auto">
                <div className="py-8 md:py-16 px-4 md:px-[60px]">
                    {/* Section Header */}
                    <motion.div
                        className="mb-8 md:mb-12"
                        variants={containerVariants}
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans-semibold text-white mb-4">
                            Experience & Workflow
                        </h2>
                        <p className="text-grey text-base md:text-lg max-w-2xl">
                            Explore my professional journey and automated workflows
                        </p>
                    </motion.div>

                    {/* React Flow Container */}
                    <motion.div
                        className="border border-dashed border-white/30 rounded-2xl bg-card/30 p-4 md:p-8 overflow-hidden"
                        variants={containerVariants}
                    >
                        <div className="w-full h-[500px] md:h-[600px] lg:h-[700px]">
                            <ReactFlowProvider>
                                <ReactFlow
                                    nodes={nodes}
                                    edges={edges}
                                    onNodesChange={onNodesChange}
                                    onEdgesChange={onEdgesChange}
                                    nodeTypes={nodeTypes}
                                    // Disable all editing features - make it read-only flowchart
                                    nodesDraggable={false}
                                    nodesConnectable={false}
                                    elementsSelectable={false}
                                    panOnDrag={true}
                                    zoomOnScroll={true}
                                    zoomOnPinch={true}
                                    zoomOnDoubleClick={false}
                                    selectNodesOnDrag={false}
                                    fitView
                                    fitViewOptions={{
                                        padding: 0.2,
                                        maxZoom: 1.5,
                                    }}
                                    // Customize flow appearance to match theme
                                    style={{
                                        background: 'transparent',
                                    }}
                                    // Disable default controls styling
                                    className="react-flow-container"
                                >
                                    {/* Background grid - subtle to match theme */}
                                    <Background
                                        color="#9999a1"
                                        gap={20}
                                        size={1}
                                    />
                                    
                                    {/* Mini map for navigation */}
                                    <MiniMap
                                        nodeColor={(node) => {
                                            if (node.type === 'experience') {
                                                const status = (node.data as ExperienceNodeData).status;
                                                if (status === 'success') return '#10b981';
                                                if (status === 'pending') return '#f59e0b';
                                                if (status === 'skipped') return '#9999a1';
                                                return '#3b82f6';
                                            }
                                            return '#6e6f7a';
                                        }}
                                        maskColor="rgba(5, 6, 26, 0.8)"
                                        style={{
                                            backgroundColor: 'rgba(5, 6, 26, 0.5)',
                                            border: '1px dashed rgba(253, 253, 253, 0.3)',
                                        }}
                                    />
                                    
                                    {/* Controls for zoom and pan */}
                                    <Controls />
                                </ReactFlow>
                            </ReactFlowProvider>
                        </div>
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                        className="divider w-full h-[1px] mt-12 md:mt-16"
                        variants={containerVariants}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default Experience;
