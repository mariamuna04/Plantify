<script lang="ts">
    import {onMount} from "svelte";

    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import GatewayTimeout from "$lib/components/GatewayTimeout.svelte";

    import PlantsGrid from "./PlantsGrid.svelte";
    import PlantCategory from "./PlantCategory.svelte";
    import Loader from "./Loader.svelte";
    import {Session} from "./Session";

    // Search key and category key
    let searchKey: string = "";
    let category: string = "";

    // Plant list
    // Initial plant list is the list of plants fetched from the server
    // Filtered plant list is the list of plants filtered by category
    // Final plant list is the list of plants filtered by category and search key
    let initialPlantList: Array<Plant>;
    let filteredPlantList: Array<Plant>;
    let finalPlantList: Array<Plant>;

    // Status code for loading and error
    let status: number = 401;

    // Fetch the list of plants from the server (GET request)
    onMount(async () => {

        console.log("Token: ", Session.getToken());

        // Set the title of the page
        document.title = "Plantify";

        // Fetch the list of plants from the server and store it in the initial plant list
        initialPlantList = await fetch('/api/PlantsCollection').then((response) => {
            if (response.ok) return response.json();
            else return null;
        }).catch(() => {
            status = 500;
        });

        // If the initial plant list is not null, set the status code to 200 and handle the category
        // because user might have selected a category before the plants were fetched
        if (initialPlantList) {
            status = 200;
            handleCategory();
        } else status = 404;
    });

    // Handle the category
    const handleCategory = () => {
        // If the category is not empty, filter the initial plant list by category
        // Else set the filtered plant list to the initial plant list
        if (category !== "") {
            filteredPlantList = initialPlantList.filter((flower: any) => {
                return flower["category"].toLowerCase().startsWith(category.toLowerCase());
            });
        } else {
            filteredPlantList = initialPlantList;
        }
        // Call the handle search function because the category might have changed before the search key
        handleSearch();
    };

    // Handle the search key
    const handleSearch = () => {
        // If the search key is empty, set the final plant list to the filtered plant list
        // Else filter the filtered plant list by search key
        if (searchKey === "") {
            finalPlantList = filteredPlantList;
        } else {
            finalPlantList = filteredPlantList.filter((flower: any) => {
                return flower.name.toLowerCase().startsWith(searchKey.toLowerCase());
            });
        }
    }

</script>

<main>
    <Navbar bind:searchKey={searchKey} on:searchKeyChange={handleSearch}/>

    <PlantCategory bind:selectedValue={category} on:categoryKeyChange={handleCategory}/>

    {#if status === 401}
        <Loader/>
    {:else if status === 200}
        <PlantsGrid bind:plantList={finalPlantList}/>
    {:else}
        <GatewayTimeout/>
    {/if}

    <Footer/>
</main>

