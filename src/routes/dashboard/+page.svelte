<script>
    import {onMount} from "svelte";

    let name;

    onMount(async () => {
        name = 'world';

        await fetch('/api/Test').then((response) => {
            if (response.ok) return response.json();
        }).catch(() => {
            console.log('error');
        });
    });
</script>


<main>
    {#if name}
        <p>Hello {name}!</p>
        <p>{document.cookie.at(0)}</p>
    {:else}
        <p>...loading</p>
    {/if}
</main>
