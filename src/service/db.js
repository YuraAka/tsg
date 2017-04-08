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

  readNews() {
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

  readWater() {
    return [
      {
        date: 'Январь',
        cold: 5,
        hot: 15,
        id: 1
      },
      {
        date: 'Февраль',
        cold: 15,
        hot: 25,
        id: 2
      },
      {
        date: 'Март',
        cold: 25,
        hot: 35,
        id: 3
      }
    ]
  }

  writeWater(data) {
    console.info('Hot: ', data.hot)
    console.info('Cold: ', data.cold)
    return {now: 'Июнь 2017'}
  }
}