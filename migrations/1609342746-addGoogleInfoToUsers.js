exports.up = async (sql) => {
  await sql`
	ALTER TABLE users 
		ADD COLUMN external_type varchar(16),
		ADD COLUMN google_id varchar(64);
		
		`;
};

exports.down = async (sql) => {
  await sql`
	ALTER TABLE users 
		DROP COLUMN external_type,
		DROP COLUMN google_id;
	
		`;
};
