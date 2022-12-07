    <!-- ./components/Pagination.vue -->
    
<script setup>
defineProps(["pagination"]);
// helper function to create pagination
const getPagination = ({ page, pageSize, total, pageCount }) => {
    // Get previous page number with `1` as the lowest
    let prev = Math.abs(page - 1) > 0 ? Math.abs(page - 1) : 1;
    // Get next page with number of total pages as highest
    let next = page + 1 < pageCount ? page + 1 : pageCount;
    // console.log({ pages, prev, next });
    return {
        pageCount, page, pageSize, total, prev, next,
    };
};
</script>
<template>
    <div class="pagination">
        <v-pagination v-model="page" :length="pagination?.pageCount" :total-visible="7"
            @click="handlePageChange()"></v-pagination>
        <!-- <ul class="list">
          <li>
            <a :href="`?page=` + getPagination(pagination).prev">
              <button class="cta">Previous</button>
            </a>
          </li>
          <li v-for="n in getPagination(pagination).pageCount" :key="n">
            <a :href="`?page=${n}`">
              <button class="cta">
                {{ n }}
              </button>
            </a>
          </li>
          <li>
            <a :href="`?page=` + getPagination(pagination).next">
              <button class="cta">Next</button>
            </a>
          </li>
        </ul> -->
    </div>
</template>

<script>
export default {
    data () {
        return {
            page: 1,
        }
    },
    methods: {
        handlePageChange () {
            /* console.log(this.$route.fullPath)
            this.$router.go(`/?page=2`) */
            this.$router.push(`?page=${this.page}`)
            /* this.$emit('pageChange', this.page) */
            
            /* this.currentPage = value; */
        }
    }
}
</script>