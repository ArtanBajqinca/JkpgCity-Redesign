// External Module Imports
const { Client } = require("pg");
require("dotenv").config();

// ModelClass Definition
class ModelClass {
  // Constructor to initialize the database client
  constructor() {
    this.client = new Client({
      user: "postgres",
      host: process.env.PG_HOST || "localhost",
      database: "postgres",
      // password: process.env.PG_PASSWORD,
      password: "1234",
      port: 5432,
    });
  }

  // Initialize database connection
  async init() {
    await this.client.connect();
  }

  // Retrieve all companies from the database
  async getAllCompanies() {
    const res = await this.client.query("SELECT * FROM public.companies");
    return res.rows;
  }

  // Retrieve a single company by its ID
  async getCompany(id) {
    const res = await this.client.query(
      "SELECT * FROM public.companies WHERE id = $1",
      [id]
    );
    return res.rows[0];
  }

  // Retrieve all distinct districts from the companies table
  async getAllDistricts() {
    const res = await this.client.query(
      "SELECT DISTINCT district FROM public.companies"
    );
    return res.rows.map((row) => row.district);
  }

  // Retrieve all distinct categories from the companies table
  async getAllCategories() {
    const res = await this.client.query(
      "SELECT DISTINCT type FROM public.companies"
    );
    return res.rows.map((row) => row.type);
  }

  /////////////////////////////////////////////////
  // D A T A B A S E   S E T U P   M E T H O D S //
  /////////////////////////////////////////////////

  // Setup database tables and insert initial data
  async setupDatabase(companyJson) {
    // Create companies table if it doesn't exist
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

    // Set table ownership (might not be necessary for every deployment)
    await this.client.query(`
      ALTER TABLE IF EXISTS public.companies
          OWNER to postgres
    `);

    // Insert companies from JSON if they don't already exist
    for (const company of companyJson) {
      const { rows } = await this.client.query(
        "SELECT * FROM public.companies WHERE name = $1",
        [company.name]
      );

      if (rows.length === 0) {
        try {
          await this.client.query(
            "INSERT INTO public.companies (name, url, district, type) VALUES ($1, $2, $3, $4)",
            [company.name, company.url, company.district, company.type]
          );
        } catch (error) {
          console.error(`Failed to insert company: ${company.name}`, error);
        }
      }
    }
  }
}

// Export an instance of the ModelClass
module.exports = new ModelClass();
