"use client";

import React, { useState, useRef, useEffect } from "react";
import {
    motion,
    useAnimation,
    useInView,
    AnimatePresence,
} from "framer-motion";
import { Zap } from "lucide-react";
import { Badge } from "@/components/Badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/Tooltip";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { allProjects } from "../page";
import { Button } from "@/components/Button";
import { ExternalLink, Github } from "lucide-react";
import { ArrowRight } from "lucide-react";

const allTags = [
    "All",
    "Django",
    "Django Rest Framework",
    "PostgreSQL",
    "MySQL",
    "Docker",
    "React",
    "jQuery",
    "VanillaJS",
    "OpenAI API",
    "WhatsApp API",
    "Stripe API",
    "Python",
    "Django Channels",
    "RabbitMQ",
    "Celery",
    "Redis",
];

const SkillBadge = ({ skill, onClick, isActive }) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Badge
                        variant="secondary"
                        className={`mr-2 mb-2 cursor-pointer ${
                            isActive
                                ? "bg-primary text-primary-foreground hover:bg-primary/20"
                                : "bg-primary/10 text-primary hover:bg-primary/20"
                        }`}
                        onClick={onClick}
                    >
                        {skill}
                    </Badge>
                </motion.div>
            </TooltipTrigger>
            <TooltipContent>
                <p>Filter by {skill}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
);

export function Projects() {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [selectedTags, setSelectedTags] = useState(["All"]);
    const [filteredProjects, setFilteredProjects] = useState(allProjects);

    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    // Toggle tag
    const toggleTag = (tag) => {
        if (tag === "All") {
            setSelectedTags(["All"]);
        } else {
            const newTags = selectedTags.includes(tag)
                ? selectedTags.filter((t) => t !== tag)
                : [...selectedTags.filter((t) => t !== "All"), tag];
            setSelectedTags(newTags);
        }
    };

    // Filter projects when selected tags change
    useEffect(() => {
        if (selectedTags.includes("All")) {
            setFilteredProjects(allProjects);
        } else {
            setFilteredProjects(
                allProjects.filter((project) =>
                    selectedTags.every((tag) => project.skills.includes(tag))
                )
            );
        }
    }, [selectedTags]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-600 to-black text-white overflow-hidden transition-all duration-500">
            <main className="relative z-10 pt-32 pb-16" ref={containerRef}>
                <div className="container mx-auto px-4 max-w-6xl">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            delay: 0.2,
                        }}
                    >
                        <motion.h1
                            className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            Latest Works & Innovations.
                        </motion.h1>
                        <motion.p
                            className="text-xl text-gray-200 mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            A deep dive into design strategies, development
                            insights,
                            <br className="hidden md:inline" />
                            and some of the most recent projects I&apos;m
                            working on.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="flex flex-wrap justify-center gap-2 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        {allTags.map((tag) => (
                            <SkillBadge
                                key={tag}
                                skill={tag}
                                onClick={() => toggleTag(tag)}
                                isActive={selectedTags.includes(tag)}
                            />
                        ))}
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-12"
                        variants={containerVariants}
                        initial="hidden"
                        animate={controls}
                    >
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className="relative group"
                                onHoverStart={() => setHoveredIndex(index)}
                                onHoverEnd={() => setHoveredIndex(null)}
                            >
                                <motion.div
                                    className="relative overflow-hidden rounded-3xl shadow-lg"
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        width={850}
                                        height={700}  // Increased height from 650 to 700
                                        className="w-full h-72 object-cover transition-transform duration-500 ease-out group-hover:scale-110"  // Adjusted height class from h-64 to h-72
                                    />
                                    <motion.div
                                        className={`absolute inset-0 opacity-70 transition-opacity duration-300 group-hover:opacity-90 bg-gradient-to-br ${project.color}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.7 }}
                                        whileHover={{ opacity: 0.9 }}
                                    />
                                    <motion.div className="absolute inset-0 flex flex-col justify-end p-6">
                                        <h2 className="text-2xl font-bold mb-2 text-gray-200">
                                            <Link
                                                href={`/projects/${project.title}`}
                                            >
                                                {project.title}
                                            </Link>
                                        </h2>
                                        <p className="text-sm mb-4 text-gray-200">
                                            {project.description}
                                        </p>
                                        <div className="mb-4 flex flex-wrap">
                                            {project.skills.map(
                                                (skill, skillIndex) => (
                                                    <Badge
                                                        key={skillIndex}
                                                        variant="secondary"
                                                        className="mr-2 mb-2 bg-gray-200/20 text-gray-200"
                                                    >
                                                        {skill}
                                                    </Badge>
                                                )
                                            )}
                                        </div>
                                        <div className="flex space-x-4">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="bg-gray-200/40 text-gray-200 hover:bg-gray-200 hover:text-black transition-colors duration-300"
                                                asChild
                                            >
                                                <Link
                                                    href={`/projects/${project.title}`}
                                                >
                                                    Learn More
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </Link>
                                            </Button>
                                            {project.demo_link && (
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                className="bg-gray-200/40 text-gray-200 hover:bg-gray-200 hover:text-black transition-colors duration-300"
                                                asChild
                                            >
                                                <a
                                                    href={project.demo_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Live Demo
                                                    <ExternalLink className="ml-2 h-4 w-4" />
                                                </a>
                                            </Button>
                                            )}
                                        </div>
                                    </motion.div>
                                </motion.div>
                                <AnimatePresence>
                                    {hoveredIndex === index && (
                                        <motion.div
                                            className="absolute -top-2 -right-2 bg-gray-200 rounded-full p-2 shadow-lg"
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            exit={{ scale: 0, rotate: 180 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 260,
                                                damping: 20,
                                            }}
                                        >
                                            <Zap className="h-6 w-6 text-black" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
