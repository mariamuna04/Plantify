<script lang="ts">
    import {onMount} from "svelte";

    export let data;
    let parsedData = JSON.parse(data.plant);

    onMount(() => {
        document.title = "Plantify - " + parsedData.name;
    });

</script>

<p>{parsedData}</p>
<p>{parsedData.name}</p>
<p>{parsedData.species}</p>
<p>{parsedData.family}</p>
<p>{parsedData.origin}</p>
<p>{parsedData.description}</p>
<p>{parsedData.careInstructions}</p>
<p>{parsedData.averageHeight}</p>
<p>{parsedData.sunlightRequirements}</p>
<p>{parsedData.wateringNeeds}</p>
<p>{parsedData.soilTypePreferences}</p>
<p>{parsedData.growthHabit}</p>
<p>{parsedData.flowerColor}</p>
<p>{parsedData.leafShape}</p>
<p>{parsedData.foliageTexture}</p>