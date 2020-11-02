exports.up = async (sql) => {
  await sql`
    CREATE TABLE IF NOT EXISTS wordlists (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
      list_name varchar(100),
      user_id_num integer NOT NULL REFERENCES users(id)
    );
	`;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE IF EXISTS wordlists;
	`;
};
