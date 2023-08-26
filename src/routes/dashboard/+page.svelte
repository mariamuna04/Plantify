<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import Greetings from "./Greetings.svelte";
</script>

<main>
    <Navbar/>
    <Greetings/>

    <div class="container mx-auto px-12 md:px-36">
        <div class="grid grid-cols-4 place-items-center">
            <a class="bg-amber-200 w-full py-10 rounded-2xl text-center text-xl font-bold text-amber-950"
               href="/ecommerce/purchase">
                Buy plant
            </a>

            <a href="/community/share-experience">Share Experiences</a>
            <a href="/community/question-answer">Question Answer</a>
            <a href="/plantation-journey">Plantation Journey</a>
            <a href="/competitions">Competitions</a>
        </div>
    </div>

    <section class="my-16"></section>

    <Footer/>
</main>

