const { Client } = require("pg");
require("dotenv").config();

class ModelClass {
  constructor() {
    this.client = new Client({
      user: "postgres",
      host: process.env.PG_HOST || "localhost",
      database: "postgres",
      password: process.env.PG_PASSWORD,
      port: 5432,
    });
  }

  async init() {
    await this.client.connect();
  }

  async setupDatabase(companyJson) {
    await this.client.query(`
      CREATE TABLE IF NOT EXISTS public.companies
      (
          id SERIAL,
          name text,
          url text,
          district text,
          type text,
          CONSTRAINT companies_pkey PRIMARY KEY (id)
      )`);

    await this.client.query(`
      ALTER TABLE IF EXISTS public.companies
          OWNER to postgres
    `);

    for (const company of companyJson) {
      const { rows } = await this.client.query(
        `
        SELECT * FROM public.companies WHERE name = $1
        `,
        [company.name]
      );

      if (rows.length === 0) {
        try {
          await this.client.query(
            `
            INSERT INTO public.companies (name, url, district, type)
            VALUES ($1, $2, $3, $4)
            `,
            [company.name, company.url, company.district, company.type]
          );
        } catch (error) {
          console.error(`Failed to insert company: ${company.name}`, error);
        }
      }
    }
  }

  async getAllCompanies() {
    const res = await this.client.query("SELECT * FROM public.companies");
    return res.rows;
  }

  async getCompany(id) {
    const res = await this.client.query(
      "SELECT * FROM public.companies WHERE id = $1",
      [id]
    );
    return res.rows[0];
  }
}

module.exports = new ModelClass();
