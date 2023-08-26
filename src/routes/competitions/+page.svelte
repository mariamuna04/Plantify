<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import {onMount} from "svelte";
    import {Session} from "../Session";

    export let data: any;
    export let isParticipant: boolean | null = null;

    onMount(async () => {
        let response = await fetch("/api/competitions/GetAllParticipants");
        data = await response.json();

        response = await fetch('/api/competitions/IsParticipated', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: Session.getEmail()})
        });

        isParticipant = response.status === 200;
    });

    data = JSON.stringify(data);

</script>

<Navbar/>
<main class="container mx-auto px-8 md:px-32 pt-12">
    <h1>Dashboard</h1>
    {#if isParticipant}
        <a href="/competitions/your-participation/">Add info</a>
    {:else}
        <a href="/competitions/register">Register a Competition</a>
    {/if}
    <div>
        {#each data as competitor}
            <a href="/competitions/competitors/{competitor._id}">

                <h1>{competitor.name}</h1>
                <h2>{competitor.email}</h2>
                <h3>{competitor.likes}</h3>
                <h3>{competitor.joined}</h3>
                <h3>{competitor.location}</h3>
                <h3>{competitor.trees_planted}</h3>
            </a>
        {/each}
    </div>
</main>