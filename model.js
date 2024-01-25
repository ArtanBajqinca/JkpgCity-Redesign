const { Client } = require("pg");

class Model {
  constructor() {
    this.client = new Client({
      user: "postgres",
      host: "localhost",
      database: "postgres",
      password: process.env.PG_PASSWORD,
      port: 5432,
    });
  }

  async init() {
    await this.client.connect();
  }

  async setup(companyJson) {
    // Create the table if it doesn't exist
    await this.client.query(`
        CREATE TABLE IF NOT EXISTS public.companies
        (
            id serial NOT NULL,
            name text,
            url text,
            district text,
            type text,
            CONSTRAINT companies_pkey PRIMARY KEY (id)
        )
    `);

    for (const company of companyJson) {
      const checkForCompany = await this.client.query(
        `
            SELECT * FROM public.companies
            WHERE name = $1
            LIMIT 1
        `,
        [company.name]
      );

      console.log(checkForCompany.rows);

      if (checkForCompany.rows.length === 0) {
        await this.client.query(
          `
                INSERT INTO public.companies (name, url, district, type)
                VALUES ($1, $2, $3, $4)
            `,
          [company.name, company.url, company.district, company.type]
        );
      }
    }
  }

  async getAllCompanies() {
    const res = await this.client.query("SELECT * FROM public.companies"); // Changed to lowercase
    return res.rows;
  }
}

module.exports = Model;
