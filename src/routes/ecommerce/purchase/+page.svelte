<script lang="ts">
    import {onMount} from "svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import Loader from "../../community/share-experience/Loader.svelte";
    import GatewayTimeout from "$lib/components/GatewayTimeout.svelte";
    import SellCatagory from "./SellCatagory.svelte";
    import SellGrid from "./SellGrid.svelte";
    import {cartArray} from "../../../stores";

    let count = 0;
    let cartList: any = [];
    let key = "";
    let category = "";
    let localCartArray:any = [];

    let plantList: any;
    let filteredPlantList: any;
    let status = 401;

    cartArray.subscribe((value) => {
        localCartArray = value;
    });

    const handleSearch = () => {
        console.log(key);
        filteredPlantList = plantList.filter((i: any) => {
            return i.product_name.toLowerCase().startsWith(key.toLowerCase()) || i.category.toLowerCase().includes(key.toLowerCase())
        });
    }

    const handleCategory = () => {
        if (category !== "") {
            filteredPlantList = plantList.filter((flower: any) => {
                // FIXME: Previously: flower.category.toLowerCase().startsWith(category.toLowerCase());
                return flower["category"].toLowerCase().startsWith(category.toLowerCase());
            });
        } else {
            filteredPlantList = plantList;
        }
    };

    const incrementCount = () => {
        // dispatched cartList from SellGrid.svelte, if localCartArray contains the cartlist then increment the count
        if (localCartArray.some((i: any) => i.name === cartList.name)) {
            cartArray.update((value) => {
                value.forEach((i: any) => {
                    if (i.name === cartList.name) {
                        i.quantity++;
                    }
                });
                return value;
            });
        } else {
            // else add item to cart
            cartArray.update((value) => {
                value.push(cartList);
                return value;
            });
        }
        count++;
    }

    $: console.log(localCartArray);

    onMount(async () => {
        document.title = "Plantify";
        plantList = await fetch('/api/ecommerce/SellCollection').then((response) => {
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

    <SellCatagory bind:selectedValue={category} on:categoryKeyChange={handleCategory}/>

    {#if status === 401}
        <Loader/>
    {:else if status === 200}
        <SellGrid on:incrementCount={incrementCount} bind:sellList={filteredPlantList} bind:cartList={cartList}/>
    {:else}
        <GatewayTimeout/>
    {/if}

    <Footer/>
</main>
