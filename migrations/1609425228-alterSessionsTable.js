exports.up = async (sql) => {
  await sql`
    ALTER TABLE sessions 
      DROP COLUMN token,
      ADD token varchar(300);
  
	`;
};

exports.down = async (sql) => {
  await sql`
   ALTER TABLE sessions 
    ADD token varchar(32),
    DROP COLUMN token;
   
	`;
};
