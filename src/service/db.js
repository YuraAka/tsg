export default class Database {
  loadUser(flat, password) {
      if (flat !== '17' || password !== '123') {
        return null
      }

      return {
        first_name: 'yura',
        last_name: 'akatov',
        email: 'yuraaka@somemail.com',
        id: 123
      }
  }

  loadNews() {
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