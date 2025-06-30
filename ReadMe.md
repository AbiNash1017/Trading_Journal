## Work Division Plan for 4 Developers

**Backend Developers**
1. *`Abinash`*

### User Authentication
- Login/Sign-up with email/password
- Anonymous sign-in option
- Role-based access control
- JWT integration


### Trade Management APIs
- CRUD APIs for trades
- Auto-generate Date/Time and Session
- Calculate Pips Gained/Lost, PnL, R Factor
- Handle screenshot uploads


---

2. *``*

### Analytics APIs
- Fetch data for dashboard (Total Trades, Win Rate, etc.)
- Aggregation logic for analytics

### Strategy Manager APIs
- CRUD APIs for strategies
- Manage confluences selection

### Payment Integration
- Stripe integration for subscriptions

--- 
- Security and Data Handling
    - Secure data and encryption
    - Environment variable management
    - Input validation and error handling

---

**Frontend Developers**

3. *``*

### User Authentication UI
- Login/Sign-up pages
- Anonymous sign-in UI


### Trade Management UI
- Trade creation form with dropdowns and fields
- Auto-populate Date/Time and Session
- Screenshot upload feature

----

4. *``*

### Analytics Dashboard
- Interactive dashboard with charts and tables
- API integration for data display
- Sorting, filtering, pagination for tables

### Strategy Manager UI
- Strategy creation and management interfaces
- Confluence selection UI

---
- UI/UX Polish
    - Responsive design
    - Dynamic/interactive elements
    - Consistent styling (e.g., Tailwind CSS)

---
### Deployment and CI/CD
Vercel deployment with custom domain
CI/CD pipeline setup


