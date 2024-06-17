import lang from './en-US.json'

export default defineI18nLocale(async () => {
  return {
    ...lang,
  }
})
