<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import logo from "$lib/assets/plantify.svg"
    import logo_sm from "$lib/assets/plantify-sm.svg"

    export let searchKey = "";
    const dispatch = createEventDispatcher();

    const handleSearchKeyChange = (event) => {
        searchKey = event.target.value;
        dispatch('searchKeyChange', searchKey);
    };

</script>

<nav class="top-0 sticky grid grid-cols-2 md:grid-cols-3 mx-auto gap-x-6 py-5 px-20 border-b border-b-zinc-100 z-50
justify-between sm:justify-between align-middle items-center font-semibold text-teal-800 shadow-sm bg-white bg-gradient-to-bl
to-emerald-100 from-green-50">
    <a href="/">
        <img class="h-8 hidden sm:flex md:hidden" alt="The project logo" src={logo_sm}/>
        <img class="h-8 hidden md:flex" alt="The project logo" src={logo}/>
    </a>

    <form class="place-self-center">
        <input type="text" placeholder="Search Anything"
               class="px-4 py-2 border border-gray-300 rounded-full
               focus:outline-none focus:ring-2 focus:ring-teal-600 text-center
               focus:border-transparent hover:shadow-md duration-300 transition-all focus:placeholder-white"
               bind:value={searchKey} on:input={handleSearchKeyChange}
        />
    </form>


    <div class="flex gap-4 place-self-end">
        <a class="mx-4 my-2" href="/login">Login</a>
        <a class="px-4 py-2 text-white bg-teal-700 rounded-full" href="/sign-up">Get Started</a>
    </div>

</nav>