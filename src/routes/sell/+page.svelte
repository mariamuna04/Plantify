<script lang="ts">
    import {onMount} from "svelte";
    import Navbar from "$components/Navbar.svelte";
    import Footer from "$components/Footer.svelte";
    import Loader from "../Loader.svelte";
    import GatewayTimeout from "$components/GatewayTimeout.svelte";
    import SellCatagory from "./SellCatagory.svelte";
    import SellGrid from "./SellGrid.svelte";
    import {cartArray} from "../../stores";

    let count = 0;
    let cartList = [];
    let key = "";
    let category = "";
    let localCartArray = [];

    let plantList;
    let filteredPlantList;
    let status = 401;

    cartArray.subscribe((value) => {
        localCartArray = value;
    });
    const handleSearch = () => {
        console.log(key);
        filteredPlantList = plantList.filter((i) => {
            return i.product_name.toLowerCase().startsWith(key.toLowerCase()) || i.category.toLowerCase().includes(key.toLowerCase())
        });
    }

    const handleCategory = () => {
        if (category !== "") {
            filteredPlantList = plantList.filter((flower) => {
                // FIXME: Previously: flower.category.toLowerCase().startsWith(category.toLowerCase());
                return flower["category"].toLowerCase().startsWith(category.toLowerCase());
            });
        } else {
            filteredPlantList = plantList;
        }
    };

    const incrementCount = () => {
        //add cartList into cartArray
        cartArray.update((value) => {
            value.push(cartList);
            return value;
        });
        // console.log(localCartArray);
        count++;
    }

    onMount(async () => {
        document.title = "Plantify";
        plantList = await fetch('/api/SellCollection').then((response) => {
            if (response.ok) return response.json();

        }).catch(() => {
            status = 500;
        });
        if (plantList) {
            status = 200;
            filteredPlantList = plantList;
        } else status = 404;

    });

</script>

<main>
    <Navbar bind:searchKey={key} on:searchKeyChange={handleSearch}/>

    <SellCatagory count = {count} bind:selectedValue = {category} on:categoryKeyChange={handleCategory}/>

    {#if status === 401}
        <Loader/>
    {:else if status === 200}
        <SellGrid on:incrementCount={incrementCount} bind:sellList={filteredPlantList} bind:cartList={cartList}/>
    {:else}
        <GatewayTimeout/>
    {/if}

    <Footer/>
</main>
