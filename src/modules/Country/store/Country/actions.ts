import { StateInterface } from 'src/store';
import { ActionTree } from 'vuex';
import { axiosInstance } from '../../helpers/axiosIstance';
import { PropsPublicHolidays } from '../../models/Country';

import { StateCountry } from './state';

const actions: ActionTree<StateCountry, StateInterface> = {
  obtainCountriesAvailable: async (context) => {
    try {
      const response = await axiosInstance.get(
        'https://date.nager.at/api/v3/AvailableCountries'
      );
      const { data } = response;
      if (response.status === 200) {
        context.commit('addCountriesAvailable', data);
      }
    } catch (error) {
      console.error(error);
    }
  },
  obtainPublicHolidays: async (
    context,
    { countryCode, countryName = '', year = '2021' }: PropsPublicHolidays
  ) => {
    year === '' && (year = '2021');
    try {
      const response = await axiosInstance.get(
        `https://date.nager.at/api/v3/publicholidays/${year}/${countryCode}`
      );
      const { data } = response;

      if (response.status === 200) {
        context.commit('toggleLoading');
        context.commit('addPublicHolidays', data);
        context.commit('changeCountryCode_Name', { countryCode, countryName });
        context.commit('changeYear', year);
        setTimeout(() => {
          context.commit('toggleLoading');
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  },
};

export default actions;
