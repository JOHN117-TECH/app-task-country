<template>
  <div class="q-pa-md row items-start">
    <q-card class="my-card bg-grey-3 text-black">
      <q-card-section>
        <div class="text-h5">
          <strong>{{ props.country.name }}</strong>
        </div>
      </q-card-section>
      <q-separator color="blue" />
      <q-card-section>
        <p><strong>Name:</strong> {{ props.country.name }}</p>
        <p><strong>LocalName:</strong> {{ props.country.localName }}</p>
        <p :class="props.country.global ? 'Active' : 'Deactive'">
          <q-icon
            name="circle"
            :color="props.country.global ? 'positive' : 'negative'"
          />{{ ' Global ' }}
        </p>
        <p v-show="validation">
          {{
            props.country.counties !== null
              ? 'Counties: ' + props.country.counties[0]
              : ''
          }}
        </p>
        <p><strong>Types:</strong> {{ props.country.types[0] }}</p>
      </q-card-section>
      <q-separator color="blue" />
      <q-card-section>
        <p><strong>Date:</strong> {{ props.country.date }}</p>
        <p v-show="props.country.launchYear != null">
          <strong>LaunchYear:</strong> {{ props.country.launchYear }}
        </p>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'CardCountry',
  props: {
    country: {
      default: Object,
      required: true,
    },
  },
  setup(props) {
    const validation = (props) => {
      props.country.counties != null ? true : false;
    };
    validation(props);
    return {
      props,
      validation,
    };
  },
};
</script>

<style lang="scss" scoped>
.my-card {
  height: 100%;
  width: 100%;
}
.Active {
  color: $positive;
}
.Deactive {
  color: $negative;
}
</style>
