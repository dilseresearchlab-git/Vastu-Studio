import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '4jo8uqhq',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    appId: 'qe0u2k3imd1ziz2av7zfvxac',
  },
})
