<script lang="ts">
    import {createEventDispatcher, onMount} from "svelte";
    import category_flower from "$lib/assets/icons/category_flower.svg";
    import category_fruit from "$lib/assets/icons/category_fruit.svg";
    import category_vegetable from "$lib/assets/icons/category_vegetable.svg";
    import category_herbal from "$lib/assets/icons/category_herbal.svg";
    import category_filter from "$lib/assets/icons/category_filter.svg";

    import logo_sm from "$lib/assets/plantify-sm.svg";
    import {cartArray} from "../../../stores";

    export let selectedValue = "";

    const dispatch = createEventDispatcher();

    const handleCategoryKeyChange = (event: any) => {
        selectedValue = event.target.value;
        dispatch('categoryKeyChange', selectedValue);
    };

    let itemNumber: number = 0;

    onMount(() => {
        cartArray.subscribe(value => {
            let sum = 0;
            value.forEach((i: any) => {
                sum += i.quantity;
                itemNumber = sum;
            });
        });
    });

</script>


<main class="flex no-scroll overflow-x-scroll shadow-sm gap-x-8 w-full justify-evenly align-middle items-center py-2 px-24 sticky top-20 z-50
bg-gradient-to-tr from-teal-50 to bg-green-50">

    <input class="hidden peer/all" id="all" type="radio" bind:group={selectedValue} name="scoops" value=""
           on:input={handleCategoryKeyChange}/>
    <label for="all"
           class="transition-all duration-300 ease-in-out flex items-center justify-middle p-2 text-zinc-500 drop-shadow-none
                  border-b-2 border-transparent rounded-sm cursor-pointer peer-checked/all:border-green-600
                  peer-checked/all:text-green-800 hover:text-green-600 peer-checked/all:drop-shadow-lg hover:drop-shadow-lg">
        <div class="flex flex-col justify-center items-center gap-y-2">
            <img class="w-6" alt="The project logo" src={logo_sm}/>
            <div class="text-xs font-semibold">All</div>
        </div>
    </label>

    <input class="hidden peer/flowers" id="flowers" type="radio" bind:group={selectedValue} name="scoops" value="Seeds"
           on:input={handleCategoryKeyChange}/>
    <label for="flowers"
           class=" transition-all duration-300 ease-in-out inline-flex items-center justify-between p-2 text-zinc-500 drop-shadow-none
           border-b-2 border-transparent rounded-sm cursor-pointer peer-checked/flowers:border-green-600
           peer-checked/flowers:text-green-800 hover:text-green-600 peer-checked/flowers:drop-shadow-lg hover:drop-shadow-lg">
        <div class="flex flex-col justify-center items-center gap-y-2">
            <img class="w-6" alt="The project logo" src={category_flower}/>
            <div class="text-xs font-semibold">Seeds</div>
        </div>
    </label>


    <input class="hidden peer/fruits" id="fruits" type="radio" bind:group={selectedValue} name="scoops" value="Fruits"
           on:input={handleCategoryKeyChange}/>
    <label for="fruits"
           class=" transition-all duration-300 ease-in-out flex items-center justify-middle p-2 text-zinc-500 drop-shadow-none
           border-b-2 border-transparent rounded-sm cursor-pointer peer-checked/fruits:border-green-600
           peer-checked/fruits:text-green-800 hover:text-green-600 peer-checked/fruits:drop-shadow-lg hover:drop-shadow-lg">
        <div class="flex flex-col justify-center items-center gap-y-2">
            <img class="w-6" alt="The project logo" src={category_fruit}/>
            <div class="text-xs font-semibold">Plants</div>
        </div>
    </label>


    <input class="hidden peer/vegetables" id="vegetables" type="radio" bind:group={selectedValue} name="scoops"
           value="Gardening Tools"
           on:input={handleCategoryKeyChange}/>
    <label for="vegetables"
           class=" transition-all duration-300 ease-in-out flex items-center justify-middle p-2 text-zinc-500 drop-shadow-none
              border-b-2 border-transparent rounded-sm cursor-pointer peer-checked/vegetables:border-green-600
              peer-checked/vegetables:text-green-800 hover:text-green-600 peer-checked/vegetables:drop-shadow-lg hover:drop-shadow-lg">
        <div class="flex flex-col justify-center items-center gap-y-2">
            <img class="w-6" alt="The project logo" src={category_vegetable}/>
            <div class="text-xs font-semibold">Tools</div>
        </div>
    </label>

    <input class="hidden peer/herbs" id="herbs" type="radio" bind:group={selectedValue} name="scoops"
           value="Fertilizers"
           on:input={handleCategoryKeyChange}/>
    <label for="herbs"
           class=" transition-all duration-300 ease-in-out flex items-center justify-middle p-2 text-zinc-500 drop-shadow-none
                  border-b-2 border-transparent rounded-sm cursor-pointer peer-checked/herbs:border-green-600
                  peer-checked/herbs:text-green-800 hover:text-green-600 peer-checked/herbs:drop-shadow-lg hover:drop-shadow-lg">
        <div class="flex flex-col justify-center items-center gap-y-2">
            <img class="w-6" alt="The project logo" src={category_herbal}/>
            <div class="text-xs font-semibold">Fertilizers</div>
        </div>
    </label>

    <a href="/ecommerce/purchase/cart"
       class=" transition-all duration-300 ease-in-out rounded-full py-2 px-4 bg-white shadow-md">
        <div class="flex justify-center items-center gap-x-2">
            <img class="w-4" alt="The project logo" src={category_filter}/>
            <div class="hidden lg:block text-xs font-semibold">View Cart {itemNumber}</div>
        </div>
    </a>


</main>
