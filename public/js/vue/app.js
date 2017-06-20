var app = new Vue({
    mounted: function (argument) {
        console.log("app is ready");
    },
    created() {        
        this.fetchData();        
        this.$http.get('/api/user/get').then(response => {
            console.log('Theme: ' + response.body.profile.theme);
            this.theme = this.updateTheme(response.body.profile.theme);
        });
    },
    el: '#app',
    data: {
        message: 'Hello Vue!',
        activities: [],
        searchEmail: '',
        emailSearchStatus: '',
        emailSearchStatusGroup: '',
        actDesc: '',
        showDescForm: 'm-fadeOut',
        errorMessage: '',
        symbolPath: '',
        theme: '',
        options: [
            { text: 'Hamburger', value: '/svg/hamburger.svg' },
            { text: 'Beer', value: '/svg/pint.svg' },
            { text: 'Resturant', value: '/svg/restaurant.svg' },
            { text: 'Taxi', value: '/svg/taxi.svg' },
            { text: 'Movie', value: '/svg/clapperboard.svg' },
            { text: 'Cocktail', value: '/svg/cocktail.svg' },
            { text: 'Coffee', value: '/svg/coffee-cup.svg' },
            { text: 'Steak', value: '/svg/food.svg' },
            { text: 'Drink', value: '/svg/glass.svg' },
            { text: 'Taco', value: '/svg/taco.svg' },
            { text: 'Tickets', value: '/svg/tickets.svg' },
            { text: 'Train', value: '/svg/train.svg' },
            { text: 'Travel', value: '/svg/luggage.svg' }
        ]
    },
    methods: {
        fetchData() {
            this.$http.get('/api/activities/get').then(response => {
                this.$set(this, 'activities', response.body);
            });
        },
        updateTheme: function (theme) {
            switch(theme) {
                case 1:
                    return 'theme-light';
                case 2:
                    return 'theme-dark';
                case 3:
                    return 'theme-color';
                default:
                    return 'theme-light';
            }
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
                    this.showDescForm = 'm-fadeIn';
                } else {
                    this.emailSearchStatus = 'form-control-danger';
                    this.emailSearchStatusGroup = 'has-danger';
                    this.showDescForm = 'm-fadeOut';
                    this.errorMessage = "Couldn't find that Moocher, want to send an invite?";
                }
            }, response => {
                this.emailSearchStatus = 'form-control-danger';
                this.showDescForm = 'm-fadeOut';
                this.emailSearchStatusGroup = 'has-danger';
                this.errorMessage = response.body.replace('"', '');
            }).bind(this),
                function () { };
        },
        newActivity: function () {
            this.$http.post('/api/activities/create', {
                email: this.searchEmail,
                desc: this.actDesc,
                symbolPath: this.symbolPath,
                _csrf: $('meta[name="csrf-token"]').attr('content')
            })
                .then(function (response) {
                    this.actDesc = '';
                    this.searchEmail = '';
                    this.showDescForm = 'm-fadeOut';
                    this.fetchData();
                }.bind(this),
                function () { });
        },
        getProfileImage: function (activity) {
            if (activity.turn.profile !== "undefined")
                return activity.turn.profile.picture;
            else
                // Twitter only, if FB then other implementation is needed.
                return "";
        }
    }
})