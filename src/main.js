import { createApp, defineAsyncComponent } from 'vue';
import App from './App';
import router from './router';
import store from './store';
import BaseCard from './components/ui/BaseCard';
import BaseButton from './components/ui/BaseButton';
import BaseBadge from './components/ui/BaseBadge';
import BaseSpinner from './components/ui/BaseSpinner';

const app = createApp(App);
const BaseDialog = defineAsyncComponent(() => {
  return import('./components/ui/BaseDialog')
})

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.use(router);
app.use(store);

app.mount('#app');
