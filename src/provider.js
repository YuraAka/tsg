export default class DataProvider {
  fetchNews() {
    return [
      {
        title: 'Mr. Brown birthday',
        preview: 'mr brown is celebrating birthday today',
        date: 1234566,
        id: 1
      },
      {
        title: 'First metting of new TSG members',
        preview: 'TSG government met after elections',
        date: 1234566,
        id: 2
      }
    ]
  }
}