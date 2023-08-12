<script lang="ts">
    // Import the Dispatcher function
    import {createEventDispatcher} from "svelte";

    // Import the icons
    import category_flower from "$lib/assets/icons/category_flower.svg";
    import category_fruit from "$lib/assets/icons/category_fruit.svg";
    import category_vegetable from "$lib/assets/icons/category_vegetable.svg";
    import category_herbal from "$lib/assets/icons/category_herbal.svg";
    import category_tree from "$lib/assets/icons/category_tree.svg";
    import category_shrub from "$lib/assets/icons/category_shrub.svg";
    import category_succulent from "$lib/assets/icons/category_ succulent.svg";
    import category_vine from "$lib/assets/icons/category_vine.svg";
    import category_aquatic from "$lib/assets/icons/category_aquatic.svg";
    import category_filter from "$lib/assets/icons/category_filter.svg";
    import category_fern from "$lib/assets/icons/category_fern.svg";
    import logo_sm from "$lib/assets/plantify-sm.svg";


    // Create `selectedValue` variable, export it to the parent component
    export let selectedValue = "";

    // Create the dispatcher function
    const dispatch = createEventDispatcher();

    // Create the function to handle the change event.
    // When the value of the radio button changes, the `selectedValue` variable will be updated.
    // And the `handleCategoryKeyChange` event will be dispatched to the parent component.
    const handleCategoryKeyChange = (event: any) => {
        selectedValue = event.target.value;
        dispatch('categoryKeyChange', selectedValue);
    };
</script>


<!-- Front End -->
<main class="flex no-scroll overflow-x-scroll shadow-sm gap-x-8 w-full justify-evenly align-middle items-center py-2 px-24 sticky top-20 z-50
bg-gradient-to-tr from-teal-50 to bg-green-50">

    <input class="hidden peer/all" id="all" type="radio" bind:group={selectedValue} name="filter_category" value=""
           on:input={handleCategoryKeyChange}/>
    <label for="all"
           class="transition-all duration-300 ease-in-out flex items-center justify-middle p-2 text-zinc-500 drop-shadow-none
                  border-b-2 border-transparent rounded-sm cursor-pointer peer-checked/all:border-green-600
                  peer-checked/all:text-green-800 hover:text-green-600 peer-checked/all:drop-shadow-lg hover:drop-shadow-lg">
        <span class="flex flex-col justify-center items-center gap-y-2">
            <img class="w-6" alt="The project logo" src={logo_sm}/>
            <span class="text-xs font-semibold">All</span>
        </span>
    </label>

    <input class="hidden peer/flowers" id="flowers" type="radio" bind:group={selectedValue} name="filter_category"
           value="Flowers"
           on:input={handleCategoryKeyChange}/>
    <label for="flowers"
           class=" transition-all duration-300 ease-in-out inline-flex items-center justify-between p-2 text-zinc-500 drop-shadow-none
           border-b-2 border-transparent rounded-sm cursor-pointer peer-checked/flowers:border-green-600
           peer-checked/flowers:text-green-800 hover:text-green-600 peer-checked/flowers:drop-shadow-lg hover:drop-shadow-lg">
        <span class="flex flex-col justify-center items-center gap-y-2">
            <img class="w-6" alt="The project logo" src={category_flower}/>
            <span class="text-xs font-semibold">Flowers</span>
        </span>
    </label>


    <input class="hidden peer/fruits" id="fruits" type="radio" bind:group={selectedValue} name="filter_category"
           value="Fruits"
           on:input={handleCategoryKeyChange}/>
    <label for="fruits"
           class=" transition-all duration-300 ease-in-out flex items-center justify-middle p-2 text-zinc-500 drop-shadow-none
           border-b-2 border-transparent rounded-sm cursor-pointer peer-checked/fruits:border-green-600
           peer-checked/fruits:text-green-800 hover:text-green-600 peer-checked/fruits:drop-shadow-lg hover:drop-shadow-lg">
        <span class="flex flex-col justify-center items-center gap-y-2">
            <img class="w-6" alt="The project logo" src={category_fruit}/>
            <span class="text-xs font-semibold">Fruits</span>
        </span>
    </label>


    <input class="hidden peer/vegetables" id="vegetables" type="radio" bind:group={selectedValue} name="filter_category"
           value="Vegetables"
           on:input={handleCategoryKeyChange}/>
    <label for="vegetables"
           class=" transition-all duration-300 ease-in-out flex items-center justify-middle p-2 text-zinc-500 drop-shadow-none
              border-b-2 border-transparent rounded-sm cursor-pointer peer-checked/vegetables:border-green-600
              peer-checked/vegetables:text-green-800 hover:text-green-600 peer-checked/vegetables:drop-shadow-lg hover:drop-shadow-lg">
        <span class="flex flex-col justify-center items-center gap-y-2">
            <img class="w-6" alt="The project logo" src={category_vegetable}/>
            <span class="text-xs font-semibold">Vegetables</span>
        </span>
    </label>

    <input class="hidden peer/herbs" id="herbs" type="radio" bind:group={selectedValue} name="filter_category"
           value="Herbs"
           on:input={handleCategoryKeyChange}/>
    <label for="herbs"
           class=" transition-all duration-300 ease-in-out flex items-center justify-middle p-2 text-zinc-500 drop-shadow-none
                  border-b-2 border-transparent rounded-sm cursor-pointer peer-checked/herbs:border-green-600
                  peer-checked/herbs:text-green-800 hover:text-green-600 peer-checked/herbs:drop-shadow-lg hover:drop-shadow-lg">
        <span class="flex flex-col justify-center items-center gap-y-2">
            <img class="w-6" alt="The project logo" src={category_herbal}/>
            <span class="text-xs font-semibold">Herbs</span>
        </span>
    </label>

    <input class="hidden peer/trees" id="trees" type="radio" bind:group={selectedValue} name="filter_category"
           value="Trees"
           on:input={handleCategoryKeyChange}/>
    <label for="trees"
           class=" transition-all duration-300 ease-in-out flex items-center justify-middle p-2 text-zinc-500 drop-shadow-none
                  border-b-2 border-transparent rounded-sm cursor-pointer peer-checked/trees:border-green-600
                  peer-checked/trees:text-green-800 hover:text-green-600 peer-checked/trees:drop-shadow-lg hover:drop-shadow-lg">
        <span class="flex flex-col justify-center items-center gap-y-2">
            <img class="w-6" alt="The project logo" src={category_tree}/>
            <span class="text-xs font-semibold">Trees</span>
        </span>
    </label>

    <input class="hidden peer/shrubs" id="shrubs" type="radio" bind:group={selectedValue} name="filter_category"
           value="Shrubs"
           on:input={handleCategoryKeyChange}/>
    <label for="shrubs"
           class=" transition-all duration-300 ease-in-out flex items-center justify-middle p-2 text-zinc-500 drop-shadow-none
                  border-b-2 border-transparent rounded-sm cursor-pointer peer-checked/shrubs:border-green-600
                  peer-checked/shrubs:text-green-800 hover:text-green-600 peer-checked/shrubs:drop-shadow-lg hover:drop-shadow-lg">
        <span class="flex flex-col justify-center items-center gap-y-2">
            <img class="w-6" alt="The project logo" src={category_shrub}/>
            <span class="text-xs font-semibold">Shrubs</span>
        </span>
    </label>

    <input class="hidden peer/succulents" id="succulents" type="radio" bind:group={selectedValue} name="filter_category"
           value="Succulents"
           on:input={handleCategoryKeyChange}/>
    <label for="succulents"
           class=" transition-all duration-300 ease-in-out flex items-center justify-middle p-2 text-zinc-500 drop-shadow-none
                  border-b-2 border-transparent rounded-sm cursor-pointer peer-checked/succulents:border-green-600
                  peer-checked/succulents:text-green-800 hover:text-green-600 peer-checked/succulents:drop-shadow-lg hover:drop-shadow-lg">
        <span class="flex flex-col justify-center items-center gap-y-2">
            <img class="w-6" alt="The project logo" src={category_succulent}/>
            <span class="text-xs font-semibold">Succulents</span>
        </span>
    </label>

    <input class="hidden peer/ferns" id="ferns" type="radio" bind:group={selectedValue} name="filter_category"
           value="Ferns"
           on:input={handleCategoryKeyChange}/>
    <label for="ferns"
           class=" transition-all duration-300 ease-in-out flex items-center justify-middle p-2 text-zinc-500 drop-shadow-none
                  border-b-2 border-transparent rounded-sm cursor-pointer peer-checked/ferns:border-green-600
                  peer-checked/ferns:text-green-800 hover:text-green-600 peer-checked/ferns:drop-shadow-lg hover:drop-shadow-lg">
        <span class="flex flex-col justify-center items-center gap-y-2">
            <img class="w-6" alt="The project logo" src={category_fern}/>
            <span class="text-xs font-semibold">Ferns</span>
        </span>
    </label>

    <input class="hidden peer/vines" id="vines" type="radio" bind:group={selectedValue} name="filter_category"
           value="Vines"
           on:input={handleCategoryKeyChange}/>
    <label for="vines"
           class=" transition-all duration-300 ease-in-out flex items-center justify-middle p-2 text-zinc-500 drop-shadow-none
                  border-b-2 border-transparent rounded-sm cursor-pointer peer-checked/vines:border-green-600
                  peer-checked/vines:text-green-800 hover:text-green-600 peer-checked/vines:drop-shadow-lg hover:drop-shadow-lg">
        <span class="flex flex-col justify-center items-center gap-y-2">
            <img class="w-6" alt="The project logo" src={category_vine}/>
            <span class="text-xs font-semibold">Vines</span>
        </span>
    </label>

    <input class="hidden peer/aquatic" id="aquatic" type="radio" bind:group={selectedValue} name="filter_category"
           value="Aquatic"
           on:input={handleCategoryKeyChange}/>
    <label for="aquatic"
           class=" transition-all duration-300 ease-in-out flex items-center justify-middle p-2 text-zinc-500 drop-shadow-none
                  border-b-2 border-transparent rounded-sm cursor-pointer peer-checked/aquatic:border-green-600
                  peer-checked/aquatic:text-green-800 hover:text-green-600 peer-checked/aquatic:drop-shadow-lg hover:drop-shadow-lg">
        <span class="flex flex-col justify-center items-center gap-y-2">
            <img class="w-6" alt="The project logo" src={category_aquatic}/>
            <span class="text-xs font-semibold">Aquatic</span>
        </span>
    </label>

    <button class=" transition-all duration-300 ease-in-out rounded-full py-2 px-4 bg-white shadow-md">
        <span class="flex justify-center items-center gap-x-2">
            <img class="w-4" alt="The project logo" src={category_filter}/>
            <span class="hidden lg:block text-xs font-semibold">More Filter</span>
        </span>
    </button>


</main>
