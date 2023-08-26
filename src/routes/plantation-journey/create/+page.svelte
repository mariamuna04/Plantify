<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import {Session} from "../../Session";
    import {goto} from "$app/navigation";

    let selectedDuration = "3m";

    const createJourney = async (event: any) => {
        const title = event.target.title.value;
        const location = event.target.location.value;
        const duration = event.target.duration.value;
        let custom_duration;
        if(duration === "custom") {
            custom_duration = event.target.custom_duration.value;
        } else {
            custom_duration = null;
        }
        const tree_goal = event.target.tree_goal.value;
        const tree_species = event.target.tree_species.value;
        const planting_sites = event.target.planting_sites.value;


        const journey:Journey = {
            email: Session.getEmail(),
            title,
            location,
            duration,
            custom_duration,
            tree_goal,
            tree_species,
            planting_sites
        };

        // Send api req
        const response = await fetch("/api/journey/CreateJourney", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(journey)
        });

        if (response.ok) {
            await goto("/plantation-journey");
        } else {
            console.log("Error");
        }


    }
</script>


<Navbar/>
<main class="container mx-auto px-12 md:px-36">
    <h1>Create a journey</h1>


    <div class="container mx-auto py-8">
        <h1 class="text-2xl font-semibold mb-4">Plantation Journey Goal Form</h1>
        <form on:submit|preventDefault={createJourney} method="post" class="bg-white p-6 rounded shadow-md">
            <!-- Personal Information -->
            <div class="mb-4">
                <label for="title" class="block font-medium">Journey Title</label>
                <input type="text" id="title" name="title" class="mt-1 p-2 w-full rounded border" required>
            </div>

            <div class="mb-4">
                <label for="location" class="block font-medium">Location:</label>
                <input type="text" id="location" name="location" class="mt-1 p-2 w-full rounded border" required>
            </div>

            <!-- Plantation Journey Details -->
            <h2 class="text-xl font-semibold mb-4">Plantation Journey Details:</h2>
            <div class="mb-4">
                <label for="duration" class="block font-medium">Duration of Journey:</label>
                <select bind:value={selectedDuration} id="duration" name="duration"
                        class="mt-1 p-2 w-full rounded border" required>
                    <option value="3m">3 months</option>
                    <option value="6m">6 months</option>
                    <option value="1y">1 year</option>
                    <option value="custom">Custom</option>
                </select>
            </div>

            {#if selectedDuration === "custom"}
                <div class="mb-4">
                    <label for="custom-duration" class="block font-medium">Custom Duration:</label>
                    <input type="text" id="custom-duration" name="custom_duration"
                           class="mt-1 p-2 w-full rounded border" value="" required>
                </div>
            {/if}


            <!-- Tree Planting Goals -->
            <h2 class="text-xl font-semibold mb-4">Tree Planting Goals:</h2>
            <div class="mb-4">
                <label for="tree-goal" class="block font-medium">Number of Trees Goal:</label>
                <input type="number" id="tree-goal" name="tree_goal" class="mt-1 p-2 w-full rounded border" required>
            </div>

            <div class="mb-4">
                <label for="tree-species" class="block font-medium">Preferred Tree Species:</label>
                <input type="text" id="tree-species" name="tree_species" class="mt-1 p-2 w-full rounded border">
            </div>

            <div class="mb-4">
                <label for="planting-sites" class="block font-medium">Preferred Planting Sites:</label>
                <input type="text" id="planting-sites" name="planting_sites" class="mt-1 p-2 w-full rounded border">
            </div>

            <div>
                <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer">
                    Submit
                </button>
            </div>
        </form>
    </div>

</main>