<script lang="ts">
import Navbar from "$lib/components/Navbar.svelte";
import Footer from "$lib/components/Footer.svelte";
import {Session} from "../Session";
</script>

<main>
    <Navbar />
    <h1>Welcome {Session.getName()}, dashboard</h1>
    <a href="/sell">Buy plant</a>
    <a href="/share-experience">Share Experiences</a>
    <a href="/question-answer">Question Answer</a>
    <Footer/>
</main>
