import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
        name: 'Graxaria',
        location: 'default'
    },
    () => {},
    error => { console.error(error) }
);

export default db;