<template>
    <div class="text-wrapper d-flex flex-column justify-content-center">
        <div class="title text-center">
            <span style="font-size: 8rem; color:#006064">404</span> <br>NOT FOUND
        </div>
        <div class="subtitle">
            Oops, the page you were looking for does not exist or might have been removed or is temporarily unavailable.
        </div>
        <router-link class="button" to="/admin"><v-btn variant="elevated" color="blue-grey-darken-2"
                class="mt-4">Go to Home Page</v-btn></router-link>

    </div>
</template>
<style scoped>
.text-wrapper {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.title {
    font-size: 5em;
    font-weight: 700;
    /* color: #EE4B5E; */
}

.subtitle {
    font-size: 20px;
    font-weight: 300;
    color: #0e1213;
}
</style>