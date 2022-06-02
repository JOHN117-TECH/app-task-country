<template>
  <p class="cursor" :class="isActived && 'active'" @click="search">
    {{ props.countryName }}({{ props.countryCode }})
  </p>
</template>

<script>
import useCountry from 'src/composable/useCountry';
import { ref } from 'vue';
import { watch } from 'vue';
export default {
  name: 'SectionCountry',
  props: {
    countryCode: {
      default: String,
      required: true,
    },
    countryName: {
      default: String,
      required: true,
    },
  },
  setup(props) {
    const { obtainPublicHolidays, getCountryCode } = useCountry();
    const isActived = ref(false);
    watch(getCountryCode, (CountryCodeValue) => {
      if (CountryCodeValue === props.countryCode) {
        isActived.value = true;
      } else {
        isActived.value = false;
      }
    });
    const search = () => {
      obtainPublicHolidays(props.countryCode, props.countryName);
    };
    return {
      props,
      getCountryCode,
      isActived,
      search,
    };
  },
};
</script>

<style lang="scss" scoped>
.active {
  color: $secondary;
  font-weight: bolder;
}
.cursor {
  cursor: pointer;
  &:hover {
    color: $positive;
    transition: all 0.3s ease;
  }
}
</style>
