<script setup lang="ts">
import type { SanitySiteSettings } from '~/types/api/cms/profilSetting'
const SITESETTINGS_QUERY = groq`*[_type == "siteSettings"][0]`

const { data } = await useLazySanityQuery<SanitySiteSettings>(SITESETTINGS_QUERY)

useHead({
  title: data.value?.title ?? 'Titre du site',
  meta :[
    { name: 'description', 
      content: data.value?.description ?? 'Description du site' 
    }
  ]
})
</script>

<template>

  <main class="ly-default" >
    <HeaderPage v-if="data" v-bind="{navigation: data.navigation, logo: data.logo}" />
    <slot />
    <MyFooter v-if="data" v-bind="{navigation: data.navigation, logo: data.logo}"  />
  </main>

</template>