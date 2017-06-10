var app = new Vue({
    mounted: function(argument) {
        console.log("app is ready");
    },
    created() {
        this.fetchData()
    },
    el: '#app',
    data: { message: 'Hello Vue!', activities: [] },
    methods: {
        fetchData() {
            this.$http.get('/api/activities/get').then(response => {
                this.$set(this, 'activities', response.body);
            });
        },
        updatePost: function(data) {
            data._csrf = $('meta[name="csrf-token"]').attr('content');
            this.$http.post('/api/activities/changeturn', data)
                .then(function() {
                        this.fetchData();
                    }
                    .bind(this),
                    function() {});

        },
    }
})