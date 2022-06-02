import {
  CountriesAvailable,
  HolyDaysCountry,
} from 'src/modules/Country/models/Country';
import { computed } from 'vue';
import { useStore } from '../store/index';

const useCountry = () => {
  const store = useStore();
  return {
    getCountriesToUse: computed<CountriesAvailable[]>(
      () => store.getters['Country/getCountriesToUse']
    ),
    getHolidaysCountry: computed<HolyDaysCountry[]>(
      () => store.getters['Country/getHolidaysCountry']
    ),
    getFilterCountriesAVailable: computed<CountriesAvailable[]>(
      () => store.getters['Country/getFilterCountriesAVailable']
    ),
    getCountryCode: computed<string>(
      () => store.getters['Country/getCountryCode']
    ),
    getCountryName: computed<string>(
      () => store.getters['Country/getCountryName']
    ),
    getLoading: computed<boolean>(() => store.getters['Country/getLoading']),
    getYear: computed<string>(() => store.getters['Country/getYear']),
    obtainCountriesAvailable: () =>
      store.dispatch('Country/obtainCountriesAvailable'),
    obtainPublicHolidays: (
      countryCode: string,
      countryName?: string,
      year?: string
    ) =>
      store.dispatch('Country/obtainPublicHolidays', {
        countryCode,
        countryName,
        year,
      }),
    togglefilter: (value: string, changeFilter: boolean) =>
      store.commit('Country/togglefilter', { value, changeFilter }),
  };
};

export default useCountry;
