<script>
    import { jsPDF } from jsPDF;;
    import { onMount } from 'svelte';
    import Layout from './Layout.svelte';
    let pdf;
    const options = {
        layout: Layout,
    };

    onMount(() => {
        pdf.pageNow();
    });
</script>


<div>
    <PdfDocument bind:this={pdf} {options} style="A4">
        <h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex voluptatum inventore, hic sint iure soluta aliquid error exercitationem minima eligendi aperiam amet explicabo non earum distinctio odit ut iste obcaecati!</p>
            <p>Vel, porro est soluta facere quidem ab velit praesentium accusantium quas distinctio quae error sapiente possimus. Aspernatur reprehenderit eum cum blanditiis, consequuntur praesentium possimus quae debitis, autem dolor quia nostrum!</p>
            <p>Voluptates sed qui nemo ut unde dolor tempore sit nulla soluta doloribus sequi odit, voluptate consequatur optio placeat saepe magni velit, maxime fugiat ratione perferendis obcaecati? Aperiam fugiat earum molestiae!</p>
        </h1>
    </PdfDocument>
</div>