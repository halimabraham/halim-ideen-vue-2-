import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#1d2a25',
                accent: '#1d2a25',
                secondary: '#049b35',
                text: '#f2f4f7',
                third: '#140904'
            }
        }
    }
});
