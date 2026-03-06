
import { defineConfig } from 'cypress'

export default defineConfig({
   viewportWidth: 1280,
  viewportHeight: 720,

  defaultCommandTimeout: 4000,
  pageLoadTimeout: 30000,

  screenshotOnRunFailure:true,
   video: false,

   // Configuration des captures d'écran
    screenshotsFolder: "cypress/screenshots",

    // Dossier des vidéos
    videosFolder: "cypress/videos",

    // test retries
     retries: {
    // Configure retry attempts for `cypress run`
    // Default is 0
    runMode: 2,
    // Configure retry attempts for `cypress open`
    // Default is 0
    openMode: 0,
  },
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    setupNodeEvents(on, config) {
      // bind to the event we care about
      // on('<event>', (arg1, arg2) => {
      //   // plugin stuff here
      // })
       const _ = import('typescript') // yup, dev dependencies, j'ai du mettre import car require ne fonctionnait pas ( cf : https://dev.to/nishanthan-k/understanding-require-vs-import-in-javascript-a-practical-guide-4p8l)
    },
     baseUrl: 'http://localhost:8080',
  },
})


