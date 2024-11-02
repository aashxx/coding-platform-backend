const sqlite3 = require('sqlite3').verbose();

const fixedMockData = [
  { id: 1, name: 'Alice Johnson', department: 'Sales', salary: 60000, hire_date: '2015-06-20', job_title: 'Manager', manager_id: null, years_experience: 10 },
  { id: 2, name: 'Adam Smith', department: 'IT', salary: 50000, hire_date: '2018-03-15', job_title: 'Developer', manager_id: 1, years_experience: 5 },
  { id: 3, name: 'Charlie Brown', department: 'HR', salary: 55000, hire_date: '2012-11-03', job_title: 'Analyst', manager_id: 1, years_experience: 8 },
  { id: 4, name: 'Daisy Carter', department: 'Finance', salary: 75000, hire_date: '2010-09-17', job_title: 'Executive', manager_id: null, years_experience: 15 },
  { id: 5, name: 'Edward Davis', department: 'Marketing', salary: 62000, hire_date: '2017-12-11', job_title: 'Consultant', manager_id: 2, years_experience: 7 },
  { id: 6, name: 'Fiona Green', department: 'Sales', salary: 40000, hire_date: '2020-01-10', job_title: 'Analyst', manager_id: 1, years_experience: 3 },
  { id: 7, name: 'George Harris', department: 'IT', salary: 80000, hire_date: '2013-07-22', job_title: 'Developer', manager_id: null, years_experience: 12 },
  { id: 8, name: 'Hannah Lee', department: 'HR', salary: 45000, hire_date: '2019-05-23', job_title: 'Consultant', manager_id: 3, years_experience: 4 },
  { id: 9, name: 'Ivan Young', department: 'Finance', salary: 70000, hire_date: '2016-09-29', job_title: 'Manager', manager_id: 4, years_experience: 10 },
  { id: 10, name: 'Julia Thomas', department: 'Marketing', salary: 54000, hire_date: '2014-04-05', job_title: 'Executive', manager_id: 5, years_experience: 6 },
];

const setupMockDatabase = () => {
  const db = new sqlite3.Database(':memory:');

  db.serialize(() => {
    db.run(`
      CREATE TABLE employees (
        id INTEGER PRIMARY KEY,
        name TEXT,
        department TEXT,
        salary INTEGER,
        hire_date DATE,
        job_title TEXT,
        manager_id INTEGER,
        years_experience INTEGER
      );
    `);

    const stmt = db.prepare("INSERT INTO employees VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    for (const { id, name, department, salary, hire_date, job_title, manager_id, years_experience } of fixedMockData) {
      stmt.run(id, name, department, salary, hire_date, job_title, manager_id, years_experience);
    }
    stmt.finalize();
  });

  return db;
};

const executeSQLWithValidation = async (query) => {
  const db = setupMockDatabase();

  return new Promise((resolve, reject) => {
    db.all(query, [], (err, rows) => {
      db.close(); // Close the database connection after the query
      if (err) {
        reject(err);
      } else {
        resolve({
          rowCount: rows.length,
          data: rows,
        });
      }
    });
  });
};

module.exports = { executeSQLWithValidation };
