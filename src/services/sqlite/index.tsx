import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
        name: 'Graxaria',
        location: 'default'
    },
    () => {},
    error => { console.log(error) }
);

export default db;