<script lang="ts">

    import {goto} from "$app/navigation";
    import Navbar from "$lib/components/Navbar.svelte";
    import {Session} from "../../Session";

    const onButtonClick = () => {
        // get age and location
        const age = document.getElementById('age')?.value;
        const location = document.getElementById('location')?.value;

        // send json data to server
        // get real time location name
        const competitor = {
            name: Session.getName(),
            email: Session.getEmail(),
            age: age,
            location: location,
        }

        // send to server
        fetch('/api/competitions/Register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(competitor)
        }).then(response => {
            if (response.ok) {
                goto('/competitions');
            } else {
                alert('Error: ' + response)
            }
        });

    }
</script>

<Navbar/>
<main class="container mx-auto px-8 md:px-32 pt-12">
    <h1>Read Terms and Conditions</h1>
    <p>**Tree Planting Website Competition - Terms and Conditions**

        1. **Eligibility:**
        1.1 The Tree Planting Website Competition ("Competition") is open to individuals and teams worldwide, regardless
        of age or location.
        1.2 Employees, affiliates, and immediate family members of the organizers are not eligible to participate.

        2. **Entry Submission:**
        2.1 Entries must be submitted through the designated submission form on the official competition website.
        2.2 Each participant or team may submit only one entry.
        2.3 Entries must be original and not violate any copyright or intellectual property rights.

        3. **Content Guidelines:**
        3.1 Entries should focus on promoting tree planting, conservation, and environmental awareness.
        3.2 Content submitted must be in English or accompanied by a clear translation.
        3.3 Any offensive, inappropriate, or harmful content will result in immediate disqualification.

        4. **Ownership and Rights:**
        4.1 Participants retain ownership of their submitted content, but grant the organizers a non-exclusive,
        worldwide, royalty-free license to use, reproduce, and distribute the content for promotional purposes related
        to the Competition.
        4.2 The organizers will not claim ownership of any submitted content beyond the specified license.

        5. **Judging Criteria:**
        5.1 Entries will be evaluated based on creativity, originality, relevance to the theme, and overall impact.
        5.2 The decision of the judging panel is final and binding.

        6. **Prizes:**
        6.1 Prizes will be announced on the official competition website.
        6.2 Prizes are non-transferable and may not be exchanged for cash.

        7. **Notification of Winners:**
        7.1 Winners will be notified via the contact information provided during submission.
        7.2 If a winner does not respond within a specified period, the organizers may choose an alternative winner.

        8. **Publicity and Promotion:**
        8.1 Winners may be required to participate in promotional activities related to the Competition, including but
        not limited to interviews and public appearances.

        9. **Disqualification:**
        9.1 The organizers reserve the right to disqualify any participant or entry that violates the terms and
        conditions or attempts to manipulate the competition.
        9.2 Disqualified participants will forfeit any prizes awarded.

        10. **Limitation of Liability:**
        10.1 The organizers are not responsible for any technical issues, lost submissions, or other errors that may
        occur during the competition.
        10.2 Participants agree to indemnify and hold the organizers harmless from any claims arising from their
        participation in the competition.

        11. **Changes and Termination:**
        11.1 The organizers reserve the right to modify, suspend, or terminate the competition at their discretion.

        12. **Governing Law:**
        12.1 These terms and conditions are governed by the laws of [Jurisdiction], and any disputes will be subject to
        the exclusive jurisdiction of the courts in [Jurisdiction].

        By participating in the Tree Planting Website Competition, participants agree to abide by these terms and
        conditions in their entirety.

        [Date]

        [Organizer Name]
        [Organizer Contact Information]
        [Competition Website]</p>

    <!--    Age input -->
    <label for="age">Age</label>
    <input type="number" id="age" name="age" min="1" max="100">

    <!--    Location input -->
    <label for="location">Location</label>
    <input type="text" id="location" name="location">

    <button on:click={onButtonClick}>
        Confirm and Continue
    </button>


</main>