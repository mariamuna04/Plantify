<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import {onMount} from "svelte";

    export let data;
    let parsedData = JSON.parse(data.journey);
    let id = data.id;

    onMount(() => {
        console.log(parsedData);
    })

    const createGoal = async () => {
        // @ts-ignore
        const goal = document.getElementById("goal").value;
        console.log(goal, id)
        if(goal === "") return;
        const response = await fetch(`/api/journey/CreateGoal`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                goal: goal,
                id: id,
            }),
        });
    }

    const deleteGoal = async (e:any) => {

        // @ts-ignore
        const goal = e.target.name;

        if(goal === "") return;
        const response = await fetch(`/api/journey/DeleteGoal`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                goal,
                id,
            }),
        });
    }

</script>

<Navbar/>
<main class="container mx-auto px-12 md:px-36">
    <h1>Create goal</h1>

    <input type="text" id="goal" placeholder="Create a goal"
           class="border-2 border-gray-300 rounded-md p-2 w-full mb-4">
    <button class="bg-blue-500 text-white rounded-md p-2" on:click={createGoal}>Create</button>

    <div class="grid grid-cols-2 gap-x-8">
        <div>
            <h2 class="w-full text-center text-2xl font-bold my-6">Current goal</h2>
            <div class="w-full flex flex-col gap-4">
                {#each parsedData.goals as item}
                <div class="border-2 bg-emerald-100 border-green-700 rounded-md px-4 py-6 w-full flex justify-between">
                    <h1 class="text-xl font-bold text-emerald-800">{item}</h1>
                    <button name="{item}" class="text-red-700/80 font-bold  rounded-md"
                    on:click={deleteGoal}>Delete</button>
                </div>
                {/each}
            </div>
        </div>

        <div>
            <h2 class="w-full text-center text-2xl font-bold">Completed goal</h2>
            <div>
                // list
            </div>
        </div>

    </div>
</main>