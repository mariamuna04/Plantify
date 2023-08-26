<script lang="ts">
    import {cartArray} from "../../../../stores.js";
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";

    let localCartArray: any = [];

    cartArray.subscribe((value) => {
        localCartArray = value;
    });

    const onRemoveClick = (e: any) => {
        console.log(e.target.parentElement.children[0].innerText);
        for (let i = 0; i < localCartArray.length; i++) {
            if (localCartArray[i].name === e.target.parentElement.previousElementSibling.children[0].innerText) {
                if (localCartArray[i].quantity > 1) {
                    localCartArray[i].quantity--;
                } else {
                    localCartArray.splice(i, 1);
                }
                cartArray.set(localCartArray);
            }
        }
    }

    const confirmOrder = () => {
        fetch("/api/ecommerce/ProcessOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(localCartArray)
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                cartArray.set([]);
            }).catch((err) => console.log(err));
    }

    let selectedOption = "card";

    const options = [
        {value: "card", label: "Card"},
        {value: "bkash", label: "BKash"},
        {value: "cod", label: "Cash on Delivery"}
    ];

    let cardInfo = {
        cardNumber: "",
        cardName: "",
        cardExpiry: "",
        cardCvv: ""
    };
    let bkashInfo = {trxId: ""};

    let total = 0;

    $: {
        total = localCartArray.reduce((acc: any, curr: any) => acc + (curr.price * curr.quantity), 0);
        total = Math.round(total * 100) / 100;
    }

</script>


<Navbar/>
<main class="container mx-auto px-8 md:px-32 pb-20 pt-12">
    <div class="grid grid-cols-2 gap-8">
        <div>
            <h1 class="font-bold text-3xl pb-6 text-gray-700 text-center">Added Items</h1>
            <div class="flex flex-col gap-4">
                {#each localCartArray as item}
                    <div class="px-4 py-2 w-full bg-emerald-100 rounded-xl flex justify-between items-center">
                        <div>
                            <h1 class="font-black text-2xl text-emerald-900">{item.name}</h1>
                            <h1 class="font-bold text-zinc-400 group-hover:text-zinc-600">Per item $ {item.price}</h1>
                        </div>

                        <div class="flex gap-6 items-center">
                            <h1 class="font-bold text-green-800/80 group-hover:text-zinc-600">
                                &times; {item.quantity}</h1>
                            <button on:click={onRemoveClick} class="bg-gray-400 px-4 py-2 rounded-lg text-white">
                                Remove
                            </button>
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <div class="place-items-center">
            <h1 class="font-bold text-3xl pb-6 text-gray-700 text-center">Payment Method</h1>
            <div class="bg-white p-6 rounded-md shadow-md max-w-md w-full">
                <h1 class="text-xl font-semibold mb-4">Select Payment Method</h1>

                <div class="space-y-4">
                    <!-- Card Payment Method -->
                    <label class="flex items-center cursor-pointer">
                        <input type="radio" name="paymentMethod" class="hidden">
                        <div class="flex items-center p-2 rounded-md border hover:bg-gray-100">
                            <div class="bg-blue-100 text-blue-600 rounded-md p-2 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M3 4h18a2 2 0 012 2v12a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M3 10h18M3 16h9"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M15 6h2a2 2 0 012 2v8a2 2 0 01-2 2h-2M15 6a2 2 0 00-2-2a2 2 0 00-2 2M15 6a2 2 0 00-2-2a2 2 0 00-2 2"/>
                                </svg>
                            </div>
                            <span>Card Payment</span>
                        </div>
                    </label>

                    <!-- bKash Payment Method -->
                    <label class="flex items-center cursor-pointer">
                        <input type="radio" name="paymentMethod" class="hidden">
                        <div class="flex items-center p-2 rounded-md border hover:bg-gray-100">
                            <div class="bg-green-100 text-green-600 rounded-md p-2 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                                </svg>
                            </div>
                            <span>bKash</span>
                        </div>
                    </label>

                    <!-- Cash on Delivery Payment Method -->
                    <label class="flex items-center cursor-pointer">
                        <input type="radio" name="paymentMethod" class="hidden">
                        <div class="flex items-center p-2 rounded-md border hover:bg-gray-100">
                            <div class="bg-red-100 text-red-600 rounded-md p-2 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                                </svg>
                            </div>
                            <span>Cash on Delivery</span>
                        </div>
                    </label>
                </div>
            </div>
        </div>

        <h1 class=" text-2xl font-black my-12
                                ">
            Total: {total}
        </h1>


        <select bind:value={selectedOption}>
            {#each options as option (option.value)}
                <option value={option.value}>{option.label}</option>
            {/each}
        </select>

        {#if selectedOption === 'card'}
            <div>
                <label for="cardNumber">Card Number</label>
                <input type="text" id="cardNumber" bind:value={cardInfo.cardNumber}/>
                <label for="cardName">Card Name</label>
                <input type="text" id="cardName" bind:value={cardInfo.cardName}/>
                <label for="cardExpiry">Card Expiry</label>
                <input type="text" id="cardExpiry" bind:value={cardInfo.cardExpiry}/>
                <label for="cardCvv">Card CVV</label>
                <input type="text" id="cardCvv" bind:value={cardInfo.cardCvv}/>

                <!-- Add more input fields for card info if needed -->
            </div>
        {/if}

        {#if selectedOption === 'bkash'}
            <div>
                <label for="trxId">Transaction ID</label>
                <input type="text" id="trxId" bind:value={bkashInfo.trxId}/>
            </div>
        {/if}

        <button class="mt-12 " on:click={confirmOrder}>
            Confirm Order
        </button>
    </div>
</main>
<Footer/>