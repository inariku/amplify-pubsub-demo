import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

// Amplify Settings
import awsconfig from './aws-exports';
import { Amplify, PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub';
Amplify.configure(awsconfig);

// Amplify UI Vue
import AmplifyVue from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';

const app = createApp(App);
app.config.productionTip = false;
app.use(AmplifyVue);
app.mount('#app');
