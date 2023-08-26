<script lang="ts" xmlns="http://www.w3.org/1999/html">
    import {onMount} from "svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import {Session} from "../../Session";
    import Footer from "$lib/components/Footer.svelte";
    import Review from "./Review.svelte";

    export let data;
    let flower = JSON.parse(data.plant);

    onMount(() => {
        document.title = "Plantify - " + flower.name;
    });

</script>

<Navbar/>
<main>
    <div class="container mx-auto px-12 md:px-36 mb-24">
        <div class="grid grid-cols-3 gap-x-12">
            <div class="flex flex-col gap-2 justify-center col-span-2">
                <svg class="w-full h-fit">
                    <text x="0%" y="90%" class="w-full">
                        {flower.name}
                    </text>
                </svg>
                <div class="flex gap-2 align-middle font-mono font-medium text-zinc-400 animate-fadeIn duration-700">
                    <h1>{flower.species}</h1>
                    <h1>&bull;</h1>
                    <h1>{flower.family}</h1>
                    <h1>&bull;</h1>
                    <h1 class="text-green-700/60">{flower.category}</h1>
                </div>

                <div class="mt-6 flex flex-col mb-10">
                    <h1 class="text-3xl font-black">
                        Origin
                    </h1>
                    <div class="mt-2">
                        {#each flower.origin as origin}
                            <h1 class="text-lg font-medium pl-4"> &dash; {origin}</h1>
                        {/each}
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-2 mt-6 py-12 gap-2">

                <div class="flex flex-col justify-center bg-emerald-200 w-full text-center
                    rounded-3xl py-3">
                    <h1 class="text-green-900 font-black">{flower.averageHeight}</h1>
                    <hr class="border-2 border-white rounded-full my-2">
                    <h1 class="text-green-600 font-black">Height</h1>
                </div>

                <div class="flex flex-col justify-center bg-emerald-200 w-full text-center
                    rounded-3xl py-3">
                    <h1 class="text-green-900 font-black">{flower.bloomSeason}</h1>
                    <hr class="border-2 border-white rounded-full my-2">
                    <h1 class="text-green-600 font-black">Bloom Season</h1>
                </div>

                <div class="flex flex-col justify-center bg-emerald-200 w-full text-center
                    rounded-3xl py-3 col-span-2">
                    <h1 class="text-green-900 font-black">{flower.sunlightRequirements}</h1>
                    <hr class="border-2 border-white rounded-full my-2">
                    <h1 class="text-green-600 font-black">Sunlight Requirements</h1>
                </div>

                <div class="flex flex-col justify-center bg-emerald-200 w-full text-center
                    rounded-3xl py-3">
                    <h1 class="text-green-900 font-black">{flower.fruitType}</h1>
                    <hr class="border-2 border-white rounded-full my-2">
                    <h1 class="text-green-600 font-black">Fruit Type</h1>
                </div>

                <div class="flex flex-col justify-center bg-emerald-200 w-full text-center
                    rounded-3xl py-3">
                    <h1 class="text-green-900 font-black">{flower.growthHabit}</h1>
                    <hr class="border-2 border-white rounded-full my-2">
                    <h1 class="text-green-600 font-black">Growth Havit</h1>
                </div>

                <div class="flex flex-col justify-center bg-emerald-200 w-full text-center
                    rounded-3xl py-3">
                    <h1 class="text-green-900 font-black">{flower.growthHabit}</h1>
                    <hr class="border-2 border-white rounded-full my-2">
                    <h1 class="text-green-600 font-black">Growth Havit</h1>
                </div>
            </div>

            <div class="flex flex-col col-span-2">
                <h1 class="text-3xl font-black">
                    Description
                </h1>
                <div class="mt-2">
                    <h1 class="text-lg font-medium">{flower.description}</h1>
                </div>
            </div>
        </div>
        <div class="col-span-2">
            <div class="mt-6 flex flex-col">
                <h1 class="text-3xl font-black">
                    Care Instructions
                </h1>
                <div class="mt-2">
                    <h1 class="text-lg font-medium">{flower.careInstructions}</h1>
                </div>
            </div>
        </div>
        <hr>

        {#if (Session.getToken() === undefined)}
            <h1 class="text-center text-4xl text-zinc-600 font-bold my-8">
                Sign in for more information and reviews</h1>
        {:else}
            <h1 class="text-3xl font-black  mt-6">
                Additional Information
            </h1>
            <div class="grid grid-cols-4 place-items-center  mt-6">
                <div class="flex flex-col gap-2 bg-emerald-800 w-full h-full text-center
                    px-2 py-4">
                    <h1>{flower.averageHeight}</h1>
                    <h1>{flower.averageHeight}</h1>

                </div>

                <h1>{flower.averageHeight}</h1>
                <h1>{flower.averageHeight}</h1>
                <h1>{flower.averageHeight}</h1>
                <h1>{flower.averageHeight}</h1>
                <h1>{flower.averageHeight}</h1>


            </div>
        {/if}

    </div>

    <Review bind:plant_id={flower._id}/>

    <section class="my-20"> </section>
</main>
<Footer/>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Gochi+Hand&display=swap');

    svg text {
        position: absolute;
        animation: stroke 1.5s forwards;
        stroke-width: 2;
        stroke: #54A262;
        font-size: 4.5rem;
        font-weight: bold;
    }

    @keyframes stroke {
        0% {
            fill: rgba(84, 162, 98, 0);
            stroke: rgba(84, 162, 98, 1);
            stroke-dashoffset: 25%;
            stroke-dasharray: 0 50%;
            stroke-width: 2;
        }

        40% {
            fill: rgba(84, 162, 98, 0);
            stroke: rgba(84, 162, 98, 1);
            stroke-width: 1;
        }
        100% {
            fill: rgba(84, 162, 98, 1);
            stroke: rgba(84, 162, 98, 1);
            stroke-dashoffset: -25%;
            stroke-dasharray: 50% 0;
            stroke-width: 0;
        }
    }

</style>