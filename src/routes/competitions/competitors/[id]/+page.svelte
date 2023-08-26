<script lang="ts">

    export let data;
    let images = JSON.parse(data.images);
    let id = data.id;
    let likes:number;
    $: {
        fetch('/api/competitions/GetLikes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({_id: id})
        }).then(res => res.json()).then(data => {
            likes= data
        }).catch(err => console.log(err));
    }

    const clickedLike = () => {
        // Post req to server
        fetch('/api/competitions/IncrementLike', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({_id: id})
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => console.log(err));

        likes++;

    }
</script>


<div class="flex flex-col gap-8 ">
    {#each images as image}
        <div>
            <img src={image.data} alt="demo"/>
            <h1 class="text-sm">{image.description}</h1>
            <h1>c</h1>
            <button on:click={clickedLike}>
                Like
            </button>
        </div>
    {/each}
</div>
