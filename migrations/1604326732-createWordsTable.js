exports.up = async (sql) => {
  await sql`
    CREATE TABLE IF NOT EXISTS words (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
      lang_1 varchar(100),
			-- lang_2 varchar(100) NOT NULL UNIQUE,
      list_id integer REFERENCES wordlists(wordlists_id) ON DELETE CASCADE

    );
	`;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE IF EXISTS words;
	`;
};
