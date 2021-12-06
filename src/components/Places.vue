<template>
  <div>
    <input type="text" v-model="location">
    <ul>
      <li v-for="(result, i) in searchResults" :key="i">
        {{ result }} // list of all places
      </li>
    </ul>
  </div>
</template>


<script>
  import {useMeta} from 'quasar'

  const metaData = {
    script: [{
      src: `https://maps.googleapis.com/maps/api/js?key=AIzaSyCr7OdYzUZN0nSF3oOOCrvtZsvQji9JurQ&libraries=places`,
      async: true,
      defer: true,
      callback: () => this.MapsInit()
    }]
  };
  export default {
    name: "Places",
    data: () => ({
      location: '',
      searchResults: [],
      service: null
    }),
    setup() {
      // needs to be called in setup()
      useMeta(
        () => {
          // compute or reference other stuff
          // in your component
          // then return:
          return metaData;
        })
    },
    metaInfo() {
      return {
        script: [{
          src: `https://maps.googleapis.com/maps/api/js?key=AIzaSyCr7OdYzUZN0nSF3oOOCrvtZsvQji9JurQ&libraries=places`,
          async: true,
          defer: true,
          callback: () => this.MapsInit() // will declare it in methods
        }]
      }
    },
    methods: {
      MapsInit() {
        this.service = new window.google.maps.places.AutocompleteService()
      },
      displaySuggestions(predictions, status) {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
          this.searchResults = []
          return
        }
        this.searchResults = predictions.map(prediction => prediction.description)
      }
    },
    watch: {
      location(newValue) {
        if (newValue) {
          this.service.getPlacePredictions({
            input: this.location,
            types: ['(cities)']
          }, this.displaySuggestions)
        }
      }
    }
  }
</script>

<style scoped>

</style>
