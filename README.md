<p align="center">
  <img src="https://user-images.githubusercontent.com/77505989/226121872-7faa0319-50f6-42a4-9a88-86f6a04b2dc3.png" alt="BANNER" />
</p>

## Why FairShare?
- A crowdfunding and investment platform that has been developed to make **funding more accessible to women and encourage gender lens investing**.
- Only 15% of women received capital from venture capitalists in recent years and the growth rate of funding for female-founded companies has plateaued. Women entrepreneurs face greater challenges in accessing financial capital than men.
- **Crowdfunding** is a viable alternative of funding for women entrepreneurs as trustworthiness is an important factor and people are more likely to support **female entrepreneurs**.
- **Gender lens scores** should be included in companies' weighting in indices, including ESG-based indices. **As female-run startups generated 78 cents in revenue for every dollar of investment raised**, outperforming their male counterparts despite raising less money.

## Who can use FairShare?
1. Entrepreneurs looking for crowdfunding as an alternative of traditional funding.
2. Investors/mentors looking to invest or give back to the community.

## What it is capable of?
1. **Crowdfunding:** FareShare is a crowdfunding platform (both equity and reward) for women-led businesses who seek alternative funding and an investment gateway for gender lens investing.
2. **Gender Lens Investing Gateway:** Apart from investing in crowdfunding campaigns, investors are given avenues to diversify their investment via the gender equality funds list(source: genderequalityfunds.org, which is ranked by gender equality scores).
3. **Gender Toolkit:** The app has a gender lens toolkit with three features:
    - Gender Lens Scorecard Test
    - Investor Risk Profiler
    - Media Analyzer using Natural Language Processing
4. **Benchmarking (Gender Equality Funds and Equity Index):** The Gender Lens Mutual Fund features a list of mutual funds with their performances over the years and ranked based on the gender lens score.
5) **Dashboard and Login:** The dashboard keeps track of and updates the user's crowdfunding campaigns and investments. The user can log in securely using an encrypted password or Google login.

## Technology Stack
<p align="center">
  <img src="https://user-images.githubusercontent.com/77505989/226122941-ad557186-a081-4d67-91bc-04a68d6135e9.png" alt="TECH" />
</p>

## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called fairsharedb: `create database fairsharedb;`
- Create a `.env` file in project directory and add

```bash
  DB_NAME=fairsharedb
  DB_PASS=YOURPASSWORD
  JWT_SECRET=YOURSECRET
```

- Replace `YOUR_PASSWORD` with your actual password

- Run `npm run migrate` in the main folder of this repository, in a new terminal window. This will create 4 tables (applications, events, organizations and users) in your database.

### Run Your Development Servers

- Run `npm start` in project directory to start the Express server on port 5000
- `cd client` and run `npm start` to run your development build. The app will run on `http://localhost:8080` as the default port.



## Future Prospects
- AI-advising which can be iterated on the gender lens scorecard and investor profiler.
- AI/ML modelling that uses the quantitative data gathered from the platform and trains these models using unbiased data so women in finance have equal opportunity.
- A networking platform for our app members to connect with bigger NGO/ other organizations with community projects

## Creators
- [Manasvi Singh Chauhan](https://github.com/Alcyone713)
- [Kartik Mehta](https://github.com/kartikmehta8)

<h2>
    <p align="center">
        Invest in gender equality, change the world.
    </p>
</h2>
