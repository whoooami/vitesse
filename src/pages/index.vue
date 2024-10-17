<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
const user = useUserStore()
const name = ref(user.savedName)

const authStore = useAuthStore();
console.log(".authStore.token:", authStore.token);


const router = useRouter()
function go() {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}

const initStore = useInitStore();
const testLS = () => {
  console.log("testLS: ", initStore.sd_id);
  
  initStore.setSd({id: (Math.random()*(100-1)+1), name:"a", age: 10});
}

onMounted(() => {
  console.log("init.", initStore.sd);
})

const { t } = useI18n()
</script>

<template>
  <div>
    <div text-4xl>
      <div i-carbon-campsite inline-block />
    </div>
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">
        Vitesse
      </a>
    </p>
    <p>
      <em text-sm opacity-75>{{ t('intro.desc') }}</em>
    </p>

    <div py-4 />

    <TheInput
      v-model="name"
      :placeholder="t('intro.whats-your-name')"
      autocomplete="false"
      @keydown.enter="go"
    />
    <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>

    <div>
      <button
        m-3 text-sm btn
        :disabled="!name"
        @click="go"
      >
        {{ t('button.go') }}
      </button>
      <button
        m-3 text-sm btn
        @click="testLS"
      >
        test LS
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
