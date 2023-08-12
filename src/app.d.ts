declare namespace App {

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
