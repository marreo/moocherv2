var app = new Vue({
    mounted: function(argument) {
        console.log("app is ready");
    },
    created() {
        this.fetchData()
    },
    el: '#app',
    data: { message: 'Hello Vue!', activities: [], searchEmail: '', emailSearchStatus: '', emailSearchStatusGroup: '', actDesc: '', showDescForm: 'hidden' },
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
        findUser: function() {
            var data = {};
            data._csrf = $('meta[name="csrf-token"]').attr('content');
            data.email = this.searchEmail;
            this.$http.post('/api/user/find', data)
                .then(function(response) {
                        var userSearchStatus = JSON.stringify(response.body);
                        console.log('s: ' + userSearchStatus == 'true');
                        if (userSearchStatus == 'true') {
                            this.emailSearchStatus = 'form-control-success';
                            this.emailSearchStatusGroup = 'has-success';
                            this.showDescForm = '';
                        } else {
                            this.emailSearchStatus = 'form-control-error';
                            this.emailSearchStatusGroup = 'has-error';
                        }
                    }
                    .bind(this),
                    function() {});
        },
        newActivity: function() {
            this.$http.post('/api/activities/create', {
                    email: this.searchEmail,
                    desc: this.actDesc,
                    _csrf: $('meta[name="csrf-token"]').attr('content')
                })
                .then(function(response) {
                        this.actDesc = '';
                        this.searchEmail = '';
                        this.showDescForm = 'hidden';
                        this.fetchData();
                    }.bind(this),
                    function() {});
        }
    }
})