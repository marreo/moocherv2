var app = new Vue({
    mounted: function (argument) {
        console.log("app is ready");
    },
    created() {
        this.fetchData();
        this.updateTheme();
    },
    el: '#app',
    data: {
        message: 'Hello Vue!',
        activities: [],
        showNewForm: 'm-fadeOut',
        currUser: '',
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
                this.$set(this, 'activities', response.body.activities);
                this.$set(this, 'currUser', response.body.currUser);
            });
        },
        updateTheme: function () {
            this.$http.get('/api/user/get').then(response => {
                var theme = response.body.profile.theme;
                switch (theme) {
                    case 1:
                        this.theme = 'theme-light';
                    case 2:
                        this.theme = 'theme-dark';
                    case 3:
                        this.theme = 'theme-color';
                    default:
                        this.theme = 'theme-light';
                }
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
                    this.showNewForm = 'm-fadeOut';
                    this.fetchData();
                }.bind(this),
                function () { });
        },
        getProfileImage: function (user) {
            if (user.profile !== "undefined")
                return user.profile.picture;
            else
                // Twitter only, if FB then other implementation is needed.
                return "";
        },
        getOtherUsers: function (activity) {
            var currUser = this.currUser;
            var otherUser = activity.users.filter(function (user) {
                return user._id != currUser;
            });
            return otherUser[0].profile.name;
        },
        isItYourTurn: function (activity) {
            // console.log(activity.turn._id);
            // console.log(this.currUser);
            return activity.turn._id === this.currUser ? "It's your turn!" : "It's not your turn.";
        },
        toggleNewForm: function () {
            this.showNewForm = 'm-fadeIn';
        }
    }
})