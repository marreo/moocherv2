var app = new Vue({
    mounted: function (argument) {
        console.log("app is ready");
    },
    created() {
        this.fetchData()
    },
    el: '#app',
    data: { message: 'Hello Vue!', activities: [], searchEmail: '', emailSearchStatus: '', emailSearchStatusGroup: '', actDesc: '', showDescForm: 'hidden', errorMessage: '' },
    methods: {
        fetchData() {
            this.$http.get('/api/activities/get').then(response => {
                this.$set(this, 'activities', response.body);
            });
        },
        updatePost: function (data) {
            data._csrf = $('meta[name="csrf-token"]').attr('content');
            this.$http.post('/api/activities/changeturn', data)
                .then(function () {
                    this.fetchData();
                }
                    .bind(this),
                function () { });

        },
        findUser: function () {
            this.errorMessage = '';
            var data = {};
            data._csrf = $('meta[name="csrf-token"]').attr('content');
            data.email = this.searchEmail;
            this.$http.post('/api/user/find', data).then(response => {
                var userSearchStatus = JSON.stringify(response.body);
                if (userSearchStatus == 'true') {
                    this.emailSearchStatus = 'form-control-success';
                    this.emailSearchStatusGroup = 'has-success';
                    this.showDescForm = '';
                } else {
                    this.emailSearchStatus = 'form-control-error';
                    this.emailSearchStatusGroup = 'has-error';
                    this.errorMessage = "Couldn't find that Moocher, want to send an invite?";
                }
            }, response => {
                console.log('error? ' + response);
                    this.errorMessage = response.body.replace('"', '');
            }).bind(this),
                function () { };
        },
        newActivity: function () {
            this.$http.post('/api/activities/create', {
                email: this.searchEmail,
                desc: this.actDesc,
                _csrf: $('meta[name="csrf-token"]').attr('content')
            })
                .then(function (response) {
                    this.actDesc = '';
                    this.searchEmail = '';
                    this.showDescForm = 'hidden';
                    this.fetchData();
                }.bind(this),
                function () { });
        },
        getSymbol: function(activity) {
            if(activity.symbolId === 1){
                return "fa fa-car fa-6";
            }

            return "fa fa-car fa-6";
        },
        getProfileImage: function(activity) {
            if (activity.turn.profile !== "undefined")
                return activity.turn.profile.picture;
            else
            // Twitter only, if FB then other implementation is needed.
                return "";
        }
    }
})