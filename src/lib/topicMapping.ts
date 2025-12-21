/**
 * Topic name mapping for consistent display across the application
 * Maps database topic names to user-friendly display names
 */

export const topicDisplayNames: Record<string, string> = {
    // Mathematics topics
    "Algebra & Calculus": "Algebra and Calculus",
    "Functions": "Functions and Relations",
    "Geometry": "Geometry",
    "Sets and Inequalities": "Sets, Logic and Inequalities",

    // Physics topics (for future use)
    "Mechanics": "Mechanics",
    "Thermodynamics": "Thermodynamics",
    "Optics": "Optics and Waves",
    "Electricity": "Electricity and Magnetism",

    // Chemistry topics (for future use)
    "Organic Chemistry": "Organic Chemistry",
    "Inorganic Chemistry": "Inorganic Chemistry",
    "Physical Chemistry": "Physical Chemistry",
    "Analytical Chemistry": "Analytical Chemistry"
};

/**
 * Get the display-friendly name for a topic
 * @param dbTopic - The topic name as stored in the database
 * @returns The formatted display name
 */
export function getDisplayTopicName(dbTopic: string): string {
    return topicDisplayNames[dbTopic] || dbTopic;
}

/**
 * Get all unique display topic names for a given subject
 * @param topics - Array of database topic names
 * @returns Array of unique display names
 */
export function getUniqueDisplayTopics(topics: string[]): string[] {
    const displayNames = topics.map(getDisplayTopicName);
    return Array.from(new Set(displayNames));
}
