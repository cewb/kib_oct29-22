import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PgService implements OnModuleInit {

  pgp = require('pg-promise')();

  connConfig = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
  }

  pg = this.pgp(this.connConfig);

  onModuleInit() {
    // console.log(this.pg)
    // throw new Error('Method not implemented.');
  }

  getDbUsers(): Promise<any> {
    var users = `
    SELECT  per.person_id
        ,per.full_name
        ,usr.username
        ,ema.email_address
        ,loc.street
        ,loc.suite
        ,loc.city
        ,loc.zip_code
        ,loc.geo_lat
        ,loc.geo_lng
        ,com.name com_name
        ,com.catch_phrase com_catch_phrase
        ,com.bs com_bs
    FROM
    person per JOIN
    per_contact con ON per.person_id = con.person_id JOIN
    "user" usr ON per.person_id = usr.person_id JOIN
    per_email ema ON per.person_id = ema.person_id JOIN
    per_address addr ON per.person_id = addr.person_id JOIN
    per_employment emp ON per.person_id = emp.person_id JOIN
    location loc ON addr.location_id = loc.location_id JOIN
    company com ON emp.company_id = com.company_id
    `;

    return this.pg.any(users) as Promise<any>;
  }


  
  getDbUser(person_id): Promise<any> {
    var users = `
    SELECT  per.person_id
        ,per.full_name
        ,usr.username
        ,ema.email_address
        ,loc.street
        ,loc.suite
        ,loc.city
        ,loc.zip_code
        ,loc.geo_lat
        ,loc.geo_lng
        ,com.name com_name
        ,com.catch_phrase com_catch_phrase
        ,com.bs com_bs
    FROM
    person per JOIN
    per_contact con ON per.person_id = con.person_id JOIN
    "user" usr ON per.person_id = usr.person_id JOIN
    per_email ema ON per.person_id = ema.person_id JOIN
    per_address addr ON per.person_id = addr.person_id JOIN
    per_employment emp ON per.person_id = emp.person_id JOIN
    location loc ON addr.location_id = loc.location_id JOIN
    company com ON emp.company_id = com.company_id
    WHERE per.person_id = ${person_id}
    `;

    return this.pg.any(users) as Promise<any>;
  }



  pushPhUser(userJson: JSON): Promise<any> {
    return this.insertPerson(userJson).then((data) => {
      let person_id = data[0]["person_id"];

      this.insertUser(userJson, person_id);
      this.insertEmail(userJson, person_id);

      this.insertPerContact(userJson, person_id);

      this.insertLocation(userJson).then((data) => {
        let location_id = data[0]["location_id"];

        this.insertAddress(person_id, location_id);
      });

      this.insertCompany(userJson).then((data) => {
        let company_id = data[0]["company_id"];

        this.insertEmployment(person_id, company_id)
      });
    }
    ) as Promise<any>;
  }

  getPing(param: string[]): Promise<any> {
    var qry = `SELECT 'a' as col1, 'b' as col2 where $1 = $2`;

    return this.pg.any(qry, param) as Promise<any>;
  }

  insertPerson(json: JSON): Promise<any> {
    var person = `INSERT INTO person (full_name) VALUES ('${json["name"]}') RETURNING person_id`;

    return this.pg.any(person) as Promise<any>;
  }

  insertUser(json: JSON, person_id): Promise<any> {
    var user = `INSERT INTO "user" (
      person_id, username
    ) VALUES (
      ${person_id}, '${json["username"]}'
    ) RETURNING "user_id"`;

    return this.pg.any(user) as Promise<any>;
  }

  insertEmail(json: JSON, person_id): Promise<any> {
    var email = `INSERT INTO per_email (
        person_id, email_address
      ) VALUES (
        ${person_id}, '${json["email"]}'
      ) RETURNING email_id`;

    return this.pg.any(email) as Promise<any>;
  }

  insertPerContact(json: JSON, person_id) {
    var contact = `INSERT INTO per_contact (
      person_id, phone, website
    ) VALUES (
      ${person_id}, '${json["phone"]}', '${json["website"]}'
    )`;

    this.pg.none(contact);
  }

  insertLocation(json: JSON): Promise<any> {
    var location = `INSERT INTO location (
      street, suite, city, zip_code, geo_lat, geo_lng
    ) VALUES (
      '${json["address"]["street"]}', 
      '${json["address"]["suite"]}', 
      '${json["address"]["city"]}', 
      '${json["address"]["zipcode"]}', 
      '${json["address"]["geo"]["lat"]}', 
      '${json["address"]["geo"]["lng"]}'
    ) RETURNING location_id`;

    return this.pg.any(location) as Promise<any>;
  }

  insertAddress(person_id, location_id): Promise<any> {
    var address = `INSERT INTO per_address (
      person_id, location_id
    ) VALUES (
      ${person_id}, ${location_id}
    ) RETURNING address_id`;

    return this.pg.any(address) as Promise<any>;
  }

  insertCompany(json: JSON): Promise<any> {
    var company = `INSERT INTO company (
      name, catch_phrase, bs
    ) VALUES (
      '${json["company"]["name"]}',
      '${json["company"]["catchPhrase"]}',
      '${json["company"]["bs"]}'
    ) RETURNING company_id`;

    return this.pg.any(company) as Promise<any>;
  }

  insertEmployment(person_id, company_id): Promise<any> {
    var employment = `INSERT INTO per_employment (
      person_id, company_id
    ) VALUES (
      ${person_id}, ${company_id}
    )`;

    return this.pg.any(employment) as Promise<any>;
  }

}
