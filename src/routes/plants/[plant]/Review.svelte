<script lang="ts">
    import {Session} from "../../Session";

    let review:string = ""

    export let plant_id: string;

    const submit = () => {
        const email = Session.getEmail();
        console.log({review, email, plant_id});
        const response = fetch("/api/plants/SubmitReview", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({review, email, plant_id})
        });
    }

</script>

<div class="container mx-auto px-8 md:px-64  pt-12">
    <div class="flex-col flex gap-6 mt-10 justify-end items-end">
        <h1 class="w-full text-center font-extrabold text-3xl">Write a review</h1>
        <textarea rows="5" class="bg-zinc-100 shadow-xl rounded-2xl w-full p-4" placeholder="Write your story here"
                  bind:value={review}></textarea>
        <button class="font-bold text-white bg-green-900 py-2 px-4 w-fit rounded-full items-end" on:click={submit}>
            Submit
        </button>
    </div>
</div>