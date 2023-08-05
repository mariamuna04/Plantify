<script lang="ts">
    import Navbar from "$components/Navbar.svelte";
    import Footer from "$components/Footer.svelte";
    import PlantsGrid from "./PlantsGrid.svelte";
    import PlantCategory from "./PlantCategory.svelte";
    import Loader from "./Loader.svelte";
    import GatewayTimeout from "$components/GatewayTimeout.svelte";

    let key = "";
    let category = "";

    let plantList;
    let filteredPlantList;
    let status = 401;


</script>


<main>
    <Navbar bind:searchKey={key} />
    <PlantCategory bind:selectedValue={category} />

    {#if status === 401}
        <Loader/>
    {:else if status === 200}
        <PlantsGrid bind:plantList={filteredPlantList}/>
    {:else}
        <GatewayTimeout/>
    {/if}

    <Footer/>
</main>