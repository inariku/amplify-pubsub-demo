<template>
  <div class="container">
    <h3>Topic: {{ topic }}</h3>
    <div class="buttons">
      <label class="label" for="topic">Topic:</label>
      <input class="input" type="text" id="topic" v-model="topic" />
      <button class="button" v-if="!subscribed" @click="subscribe">Subscribe</button>
      <button class="button" v-else @click="unsubscribe">Unsubscribe</button>
    </div>
    <h3>Message: {{ message }}</h3>
    <form class="form" @submit.prevent="publish">
      <label class="label" for="message">Message:</label>
      <input class="input" type="text" id="message" v-model="message" />
      <button class="button" type="submit">Publish</button>
    </form>
  </div>
</template>

<script>
import { Amplify, PubSub, Auth } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub';
import { ref } from 'vue';

Auth.currentCredentials().then((info) => {
  const cognitoIdentityId = info.identityId;
  console.log('cognitoIdentityId:', cognitoIdentityId);
});

Amplify.register(PubSub);

// Apply plugin with configuration
Amplify.addPluggable(
  new AWSIoTProvider({
    aws_pubsub_region: 'ap-northeast-1',
    aws_pubsub_endpoint: 'wss://a1lhj5d10oefe4-ats.iot.ap-northeast-1.amazonaws.com/mqtt',
  })
);

export default {
  setup() {
    const message = ref();
    const topic = ref();
    const subscribed = ref(false);
    let subscription;

    const subscribe = async () => {
      subscription = PubSub.subscribe(topic.value).subscribe({
        next: (data) => console.log('Message received', data),
        error: (error) => console.error(error),
        complete: () => console.log('Done'),
      });
      console.log('subscribed');
      subscribed.value = true;
    };

    const unsubscribe = async () => {
      subscription.unsubscribe();
      console.log('unsbscribed');
      subscribed.value = false;
    };

    const publish = async () => {
      console.log(PubSub.configure());
      if (!message.value | !topic.value) {
        return;
      }
      try {
        const res = await PubSub.publish(topic.value, { msg: message.value });
        console.log('Message published:', res);
      } catch (error) {
        console.log('Message published:', error);
      }
    };

    return {
      message,
      publish,
      subscribe,
      unsubscribe,
      subscribed,
      topic,
    };
  },
};
</script>
