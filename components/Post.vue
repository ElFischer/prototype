    <!-- ./components/Post.vue -->
<script setup>
// import icons
/* import { ChatIcon, PaperAirplaneIcon } from "@heroicons/vue/solid"; */
// define `post` props
defineProps(["case"]);
const {
    public: { strapiURL },
} = useRuntimeConfig();
// helper function to get username from `post` attributes
/* const getUsername = (post) => post?.attributes?.user.data?.attributes?.username; */
// helper to get and display date
const showDateTime = (post) => new Date(post?.attributes?.updatedAt).toDateString() + " | " + new Date(post?.attributes?.updatedAt).toLocaleTimeString();
</script>
<template>
   <!--  <li class="post">
        <header class="post-header">
            <div class="author-cont">
                <div class="avatar">
                    <p>{{ getUsername(post)?.substr(0, 1) }}</p>
                </div>
                <p class="username">{{ getUsername(post) }}</p>
            </div>
        </header>
        <ul class="photos">
            <li v-for="photo in post?.attributes?.photo.data" :key="photo.id" class="photo">
                <div class="img-cont">
                    <img :src="strapiURL + photo?.attributes?.url" :alt="post?.attributes?.caption" />
                </div>
            </li>
        </ul>
        <p class="caption">{{ post?.attributes?.caption }}</p>
        <div class="info-cont text-xs text-gray-600">
            <div class="time">{{ showDateTime(post) }}</div>
        </div>
        <div class="comment-cont">
            ChatIcon
            <form class="comment-form">
                <div class="form-control">
                    <textarea name="comment" id="comment" cols="30" rows="1" class="form-textarea comment-textarea"
                        placeholder="Leave a comment"> </textarea>
                </div>
                <button class="cta submit-btn">
                    PaperAirplaneIcon
                </button>
            </form>
        </div>
    </li> -->
</template>
    
<style scoped>
/* ... */
</style>