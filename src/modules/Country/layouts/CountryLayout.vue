<template>
  <div class="row">
    <h3 class="container col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <div class="row q-px-md">
        <p class="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-xs-12">
          {{
            nameCountry != '' && nameCountryCode != ''
              ? nameCountry + '' + ` (${nameCountryCode}) - ${getYear}`
              : nameCountry != ''
              ? nameCountry + `- ${getYear}`
              : nameCountryCode != ''
              ? nameCountryCode + `- ${getYear}`
              : 'Country'
          }}
        </p>
        <div class="center col-xl-2 col-lg-2 col-md-12 col-sm-12 col-xs-12">
          <q-btn icon="info" color="grey" @click="toolbar = true">
            <q-tooltip
              anchor="bottom middle"
              self="top middle"
              :offset="[10, 10]"
            >
              you can see the countries available to search
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </h3>
    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12 q-mb-md center">
      <q-input
        maxlength="2"
        v-model="searchValue"
        label="Search Exm:(CO) &crarr;"
        @keyup.enter="search"
      />
    </div>
    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12 q-mb-md center">
      <q-input
        type="number"
        filled
        v-model="yearValue"
        color="blue"
        label="Year Exm:(2021)"
      >
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-input>
    </div>
  </div>
  <q-dialog v-model="toolbar">
    <q-card>
      <q-card-section class="row">
        <div class="text-h6 col-10">List Countrys Available</div>
        <div class="container-btn q-px-sm col-2">
          <q-btn flat icon="clear" color="negative" v-close-popup />
        </div>
      </q-card-section>
      <q-card-section class="row">
        <q-input
          class="col-9"
          outlined
          v-model="searchCountryAvailable"
          :label="
            changeFilter
              ? 'Filter for countrycode (CO)'
              : 'Filter for name of Country (Colombia)'
          "
        />

        <div class="col-3 center">
          <q-checkbox v-model="changeFilter" />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 70vh" class="scroll row">
        <div v-if="isActiveFilter" class="col-12 column-center">
          <div
            class="q-pa-sm"
            v-for="country in getFilterCountriesAVailable"
            :key="country.name"
          >
            <SectionCountry
              :countryCode="country.countryCode"
              :countryName="country.name"
            />
          </div>
        </div>
        <div
          v-else
          class="
            q-pa-sm
            text-center
            col-xl-12 col-lg-3 col-md-3 col-sm-4 col-xs-6
          "
          v-for="country in getCountriesToUse"
          :key="country.name"
        >
          <SectionCountry
            :countryCode="country.countryCode"
            :countryName="country.name"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <div v-if="getLoading" class="center q-ma-xl">
    <q-spinner-gears color="cyan" size="15em" />
  </div>
  <div v-else class="row">
    <div
      class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6"
      v-for="country in getHolidaysCountry"
      :key="country.countryCode"
    >
      <CardCountry :country="country" />
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import CardCountry from '../components/CardCountry.vue';
import SectionCountry from '../components/SectionCountry.vue';
import useCountry from '../../../composable/useCountry';
export default {
  name: 'CountryLayout',
  components: {
    CardCountry,
    SectionCountry,
  },
  setup() {
    const {
      togglefilter,
      obtainCountriesAvailable,
      obtainPublicHolidays,
      getCountriesToUse,
      getHolidaysCountry,
      getLoading,
      getYear,
      getCountryCode,
      getCountryName,
      getFilterCountriesAVailable,
    } = useCountry();

    const toolbar = ref(false);
    const searchValue = ref('');
    const nameCountry = ref('');
    const nameCountryCode = ref('');
    const searchCountryAvailable = ref('');
    const isActiveFilter = ref(false);
    const changeFilter = ref(false);
    const yearValue = ref('');

    watch(searchCountryAvailable, (CountryValue) => {
      CountryValue.length != 0
        ? validationCountryValue(CountryValue)
        : (isActiveFilter.value = false);
    });

    watch(getLoading, (loadingValue) => {
      loadingValue &&
        setTimeout(() => {
          toolbar.value = false;
          isActiveFilter.value = false;
          searchValue.value = '';
          yearValue.value = '';
          searchCountryAvailable.value = '';
          changeFilter.value = false;
        }, 2000);
    });
    watch(yearValue, (valueYear) => {
      searchValue.value.length > 0 &&
        valueYear.length === 4 &&
        obtainPublicHolidays(searchValue.value.toUpperCase(), '', valueYear);
    });

    watch(getCountryCode, (countryCodeValue) => {
      const data = getCountriesToUse.value.filter(
        (country) => country.countryCode === countryCodeValue
      );
      nameCountry.value = data[0].name;
      validation();
    });

    const validationCountryValue = (Value) => {
      const upperCountry = Value.charAt(0).toUpperCase();
      const residueCountry = Value.slice(1);
      const value = upperCountry + residueCountry;
      togglefilter(value, changeFilter.value);
      validationArrayFilter();
    };

    const validationArrayFilter = () => {
      getFilterCountriesAVailable.value.length != 0
        ? (isActiveFilter.value = true)
        : (isActiveFilter.value = false);
    };

    const validation = () => {
      getCountryCode.value != ''
        ? (nameCountryCode.value = getCountryCode.value)
        : (nameCountryCode.value = '');
    };

    onMounted(() => {
      obtainCountriesAvailable();
    });
    const search = () => {
      searchValue.value.length > 0 &&
        obtainPublicHolidays(
          searchValue.value.toUpperCase(),
          '',
          yearValue.value
        );
    };

    return {
      yearValue,
      changeFilter,
      isActiveFilter,
      searchCountryAvailable,
      nameCountry,
      nameCountryCode,
      toolbar,
      searchValue,
      getLoading,
      getCountryName,
      getYear,
      getHolidaysCountry,
      getCountriesToUse,
      getFilterCountriesAVailable,
      obtainPublicHolidays,
      search,
      validationArrayFilter,
    };
  },
};
</script>

<style lang="scss" scoped>
.col-6,
.col-2 {
  height: auto;
}
.center {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
}
.column-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
}
.container {
  @media (max-width: $breakpoint-lg-max) {
    text-align: start;
  }
  @media (max-width: $breakpoint-md-max) {
    text-align: center;
  }
}
.container-btn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: $breakpoint-xs-max) {
    justify-content: center;
  }
}
</style>
