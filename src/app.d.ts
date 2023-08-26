declare namespace App {
    type ContactInfo = {
        phone: string;
        address: string;
        facebook: string;
        twitter: string;
        instagram: string;
    };
}

interface Credentials {
    email: string
    password: string
}

interface User {
    name: string
    email: string
    password: string
}

interface UserSession {
    name: string | null | undefined,
    email: string | null | undefined,
    token: string | null | undefined
}

interface Experience {
    _id: string;
    name: string | undefined | null;
    email: string | undefined | null;
    body: string;
    likes: number
}

interface Question {
    _id: string;
    name: string | undefined | null;
    email: string | undefined | null;
    body: string;
}

interface Answer {
    _id: string;
    parentQuestionId: string;
    name: string | undefined | null;
    email: string | undefined | null;
    body: string;
}

interface Plant {
    _id: {
        $oid: string;
    };
    name: string;
    species: string;
    family: string;
    origin: string[];
    description: string;
    careInstructions: string;
    averageHeight: string;
    sunlightRequirements: string;
    wateringNeeds: string;
    soilTypePreferences: string;
    growthHabit: string;
    leafShape: string;
    foliageTexture: string;
    bloomSeason: string;
    pollinationMethod: string;
    fruitType: string;
    edibleParts: string[];
    medicinalProperties: string[];
    fragrance: string;
    temperatureTolerance: string;
    hardinessZone: string;
    growthRate: string;
    propagationMethods: string[];
    pestsAndDiseases: string[];
    lifespan: string;
    droughtTolerance: string;
    humidityRequirements: string;
    pHPreferences: string;
    nutrientRequirements: string;
    pruningNeeds: string;
    toxicity: string;
    wildlifeAttractant: string[];
    companionPlantingRecommendations: string[];
    winterHardiness: string;
    rootSystemType: string;
    propagationDifficultyLevel: string;
    preferredContainerSize: string;
    fallColor: string;
    specialFeatures: string[];
    imageURL: string;
    category: string;
}


type Competitors = {
    email: string;
    name: string;
    likes: number;
    joined: string;
    age: number;
    location: string;
    trees_planted: number;
    contact_info: ContactInfo;
};

type Journey = {
    email: string | undefined | null,
    title: string,
    location: string,
    duration: string,
    custom_duration: string | null,
    tree_goal: number,
    tree_species: string,
    planting_sites: string
}