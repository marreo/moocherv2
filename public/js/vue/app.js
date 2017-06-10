var app = new Vue({
    mounted: function(argument) {
        console.log("app is ready");
    },
    created() {
        this.fetchData()
    },
    el: '#app',
    data: { message: 'Hello Vue!', activities: '' },
    methods: {
        fetchData() {
            this.$http.get('/api/activities/get').then(response => {
                this.activities.concat(response.body);
            });
        }
    }
})